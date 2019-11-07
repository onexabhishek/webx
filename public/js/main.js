//Select Element Where editor has to set
var editor = ace.edit("editor");
var editorRes = ace.edit("editorResult");
//Select theme
    editor.setTheme("ace/theme/chrome");
    editorRes.setTheme("ace/theme/chrome");
//Select Editor Mode
    

class Formatter{
	init(){
		let data = this.getSettings()
		editor.getSession().setMode("ace/mode/"+data.lang);
    	editorRes.getSession().setMode("ace/mode/"+data.lang);
    	editor.setValue(data.input);
    	$('#lang').val(data.lang);
    	$('#indend').val(data.indend);
    	$('#action').val(data.action);
    	$('#encoding').val(data.encoding);
    	this.saveSettings();
	}
	submit(){
		return {
			input:editor.getValue(),
			lang:$('#lang').val(),
			action:$('#action').val(),
			indend:parseInt($('#indend').val()),
			encoding:$('#encoding').val(),
			parser:this.parser($('#lang').val())
		}
	}
	parser(lang){
		if(lang){
			if(lang=='xml'||lang == 'javascript'){
				return 'flow';
			}else if(lang == 'css'){
				return 'postcss';
			}else{
				return lang;
			}
		}else{
			return lang;
		}
	}
	format(input=false){
		$('.box-progress').show();
		let configData = this.submit();
		if(configData.lang == 'json'){
			var load = JSON.stringify(JSON.parse(input || configData.input),null,configData.indend)
		}else{
			var load = prettier.format(input || configData.input, {
			  plugins: prettierPlugins,
			  parser: configData.parser,
			  tabWidth:configData.indend
			});
		}
		if(input){
			editor.setValue(input);
		}
		editorRes.setValue(load);
		this.saveSettings(this.submit());
		$('html, body').animate({
	        scrollTop: $("#resultBox").offset().top
	    }, 1000);
		// console.log(load);
		$('.box-progress').hide();
	}
	saveSettings(data=false){
		if(data){
			let datas = JSON.parse(localStorage.getItem('formatter_config'));
			for(var i in data){
				if(data.hasOwnProperty(i)){
					datas[i] = data[i];
				}
				
			}
			localStorage.setItem('formatter_config',JSON.stringify(datas));
		}else{

			localStorage.setItem('formatter_config',JSON.stringify(this.submit()));
		}
		
	}
	getSettings(){
		return JSON.parse(localStorage.getItem('formatter_config'));
	}
	
}
var formatter = new Formatter;
formatter.saveSettings({lang:$('#init_lang').val(),parser:formatter.parser($('#init_lang').val())});
formatter.init();

window.close = function(id){
	$(id).click();
}

$('#lang').change(function(){
	window.location.href=siteUrl($(this).val()+'-formatter');
})
$('.adp-format').click(function(e){
	e.preventDefault();
	formatter.format();
})
$('.urlModal').on('submit',(e)=>{
	e.preventDefault();
	// console.log($('#loadUrl').val());
	$.ajax({
	   url:siteUrl('adp/urltofile'),
	   type:'GET',
	   data:'url='+$('#loadUrl').val(),
	   success: function(data){
	       // console.log(data);
	       formatter.format(data);

	   }
	});
	// $('#urlModal').modal('hide');
	$("#urlModal .close").click();
	$("#urlModal .close").click();
	

})
