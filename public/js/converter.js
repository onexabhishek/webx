$('#converter').change(function(){
	let lang = $(this).val().split(',');
	window.location.href=siteUrl(lang[0]+'-'+lang[1]);
})
//Select Element Where editor has to set
var editorFrom = ace.edit("editorFrom");
var editorTo = ace.edit("editorResult");
//Select theme
editorFrom.setTheme("ace/theme/chrome");
editorTo.setTheme("ace/theme/chrome");

class Converter extends Adp{
	init(){
		let configData = this.get();
		editorFrom.getSession().setMode("ace/mode/"+configData.from);
		editorTo.getSession().setMode("ace/mode/"+configData.to);
	}
	get(){
		let langConfig = this.getEngine();
		return{
			input:editorFrom.getValue(),
			from:langConfig.from,
			to:langConfig.to,
			converter:$('#converter').val(),
			indend:$('#indend').val()
		}
	}
	set(data=false){
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
	convert(){
		let configData = this.get();
		if(configData.from == 'pug' || 'jade' && configData.to == 'html'){
			let res = jade.render(configData.input,{pretty:true});
			editorTo.setValue(res)
		}
	}
	getEngine(){
		let lang = $('#converter').val().split(',');
		if(lang[0] == 'pug'){
			lang[0] = 'jade'
		}else if(lang[1] == 'pug'){
			lang[1] = 'jade'
		}
		return {
			from:lang[0],to:lang[1]
		}
	}
}

var converter = new Converter;
converter.init();
$('.adp-convert').click(function(e){
	e.preventDefault();
	converter.convert();
})