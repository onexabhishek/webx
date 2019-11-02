//Select Element Where editor has to set
var editor = ace.edit("editor");
var editorRes = ace.edit("editorResult");
//Select theme
    editor.setTheme("ace/theme/chrome");
    editorRes.setTheme("ace/theme/chrome");
//Select Editor Mode
    

class Formatter{
	init(){
		let data = this.submit()
		editor.getSession().setMode("ace/mode/"+data.lang);
    	editorRes.getSession().setMode("ace/mode/"+data.lang);
	}
	submit(){
		return {
			input:editor.getValue(),
			lang:$('#lang').val(),
			action:$('#action').val(),
			indend:parseInt($('#indend').val()),
			encoding:$('#encoding').val(),
		}
	}
	format(input=false){
		let configData = this.submit();
		var load = prettier.format(input || configData.input, {
		  plugins: prettierPlugins,
		  parser: configData.lang,
		  tabWidth:configData.indend
		});
		editorRes.setValue(load);
		console.log(load);
	}
	
}
let formatter = new Formatter;
formatter.init();


$('#lang').change(function(){
	window.location.href=siteUrl($(this).val()+'-formatter');
})
$('.adp-format').click(function(e){
	e.preventDefault();
	formatter.format();
})