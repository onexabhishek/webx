var adp = new Adp;
$('#converter').change(function(){
	let lang = $(this).val().split(',');
	window.location.href=siteUrl(lang[0]+'-to-'+lang[1]);
})
$('#converter').val($('#init_lang').val());
//Select Element Where editor has to set
var editorFrom = ace.edit("editorFrom");
var editorTo = ace.edit("editorResult");
//Select theme
editorFrom.setTheme("ace/theme/chrome");
editorTo.setTheme("ace/theme/chrome");

class Converter extends Adp{
	init(){
		let configData = this.get();
		editorFrom.getSession().setMode("ace/mode/"+configData.mode);
		editorTo.getSession().setMode("ace/mode/"+configData.resMode);
	}
	get(){
		let langConfig = this.getEngine();
		return{
			input:editorFrom.getValue(),
			from:langConfig.from,
			to:langConfig.to,
			mode:langConfig.inputMode,
			resMode:langConfig.resMode,
			extension:langConfig.extension,
			converter:$('#converter').val(),
			indend:$('#indend').val()
		}
	}
	set(data=false){
		if(data){
			let datas = JSON.parse(localStorage.getItem('converter_config'));
			for(var i in data){
				if(data.hasOwnProperty(i)){
					datas[i] = data[i];
					if(i == 'input'){
						editorFrom.setValue(data[i]);
					}else if(i == 'converter'){
						$('#converter').val(data[i])
					}else if(i == 'indend'){
						$('#indend').val(data[i])
					}else if(i == 'from'){
						editorFrom.getSession().setMode("ace/mode/"+data[i]);
					}else if(i == 'to'){
						editorTo.getSession().setMode("ace/mode/"+data[i]);
					}
				}
				
			}
			this.saveSettings(datas)
		}
	}
	saveSettings(data=false){
		if(data){
			let datas = JSON.parse(localStorage.getItem('converter_config'));
			for(var i in data){
				if(data.hasOwnProperty(i)){
					datas[i] = data[i];
				}
				
			}
			localStorage.setItem('converter_config',JSON.stringify(datas));
		}else{

			localStorage.setItem('converter_config',JSON.stringify(this.get()));
		}
		
	}
	getSettings(){
		
		let datas = localStorage.getItem('converter_config');
		if(typeof datas != 'undefined' && datas != null){
			return JSON.parse(datas);
		}
		return this.get();
	}
	convert(){
		let configData = this.get();
		if(configData.from == 'jade' && configData.to == 'html'){
			let res = jade.render(configData.input,{pretty:true,prettyIndent:configData.indend});
			editorTo.setValue(res)
		}
		if(configData.from == 'pug' && configData.to == 'html'){
			let pug = require('pug');
			let res = pug.render(configData.input,{pretty:true});
			editorTo.setValue(res)
		}else if(configData.from == 'yaml' && configData.to == 'javascript'){
			try {
			  var doc = jsyaml.load(configData.input);
			  // console.log(doc);
			  editorTo.setValue(JSON.stringify(doc,null,parseInt(configData.indend)))
			} catch (e) {
			  console.log(e);
			  adp.alert_dialog(e);
			}
		}else if(configData.from == 'sass' || 'scss' && configData.to == 'css'){
			try {
				var sass = new Sass();
			  sass.compile(configData.input,{indent:this._x(' ',configData.indend).toString()},function(result){
			  	console.log(result)
			  	if(result.status == 0){
			  		editorTo.setValue(result.text);
			  	}else{
			  		editorTo.setValue(result.formatted);
			  		adp.alert_dialog(result.message);
			  	}
			  });
			  
			} catch (e) {
			  adp.alert_dialog(e);
			}
		}else if(configData.from == 'javascript' && configData.to == 'coffeescript'){
			try{
				let result = js2coffee.build(configData.input,{indent:configData.indend});
				console.log(result)
				editorTo.setValue(result.code)
				this.saveSettings()
				// result.code     
				// result.ast      
				// result.map      
				// result.warnings 
				}
				catch (e) {
				    console.log(e)
				  // e.message       
				  // e.description   
				  // e.start        
				  // e.end           
				  // e.sourcePreview
				}
		}
	}
	getEngine(){
		let lang = $('#converter').val().split(','),inputMode,resMode,ext;
		inputMode =lang[0];
		resMode =lang[1];
		if(lang[0] == 'pug'){
			inputMode  = 'jade'
		}else if(lang[1] == 'pug'){
			lang[1] = 'jade'
		}
		if(lang[1] == 'coffeescript'){
			ext = resMode = 'coffee'
		}
		if(lang[1] == 'javascript'){
			ext = 'js'
		}
		return {
			from:lang[0],to:lang[1],inputMode:inputMode,resMode:resMode,extension:ext
		}
	}
	_x(string,times){
		let given_str = '';
		for(let i=0;i<times;i++){
			given_str +=string;
		}
		return given_str;
	}
}

var converter = new Converter;
converter.init();
converter.saveSettings();
let off_data = converter.getSettings();
converter.set({input:off_data.input});
$('.adp-convert').click(function(e){
	e.preventDefault();
	converter.convert();
})
$('.urlModal').on('submit',(e)=>{
	e.preventDefault();
	// console.log($('#loadUrl').val());
	$.ajax({
	   url:siteUrl('adp/urltofile'),
	   type:'GET',
	   data:'url='+$('#loadUrl').val(),
	   success: function(data){
	       converter.set({input:data});
	       converter.convert(data);
	   }
	});
	// $('#urlModal').modal('hide');
	$("#urlModal .close").click();
	$("#urlModal .close").click();
	

})

// function runOCR(url){
//   Tesseract.recognize(url)
//     .then(function(result) {
//       document.getElementById("ocr_results").innerText = result.text;
//     }).progress(function(result) {
//       document.getElementById("ocr_status").innerText = result["status"]+" ("+(result["progress"] * 100) + "%)";
//     });
// }
// runOCR('https://tesseract.projectnaptha.com/img/eng_bw.png');