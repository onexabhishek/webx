$.noConflict();
//Select Element Where editor has to set
var editor = ace.edit("editor");
var editorRes = ace.edit("editorResult");
//Select theme
    editor.setTheme("ace/theme/chrome");
    editorRes.setTheme("ace/theme/chrome");
//Select Editor Mode
// $.alert({
//     title: 'Alert!',
//     content: 'Simple alert!',
// });

class Adp{
	modal_alert(config){
		$.confirm(config);
	}
}   

class Formatter extends Adp{
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
		$('html, body').animate({
	        scrollTop: $("#resultBox").offset().top
	    }, 1000);
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
	copy(){
		  var textArea = document.createElement("textarea");
		  textArea.value = editorRes.getValue();
		  textArea.style.position="fixed";  //avoid scrolling to bottom
		  document.body.appendChild(textArea);
		  textArea.focus();
		  textArea.select();

		  try {
		    var successful = document.execCommand('copy');
		    var msg = successful ? 'successful' : 'unsuccessful';
		  // //   if(ref){
		  // //   	tippy(ref, {
				// // 	trigger: 'click',
				// // 	arrow: true,
			 // //  		content: '<strong>Copied</strong>',
				// // });
				// PopOver.show();
				// PopOver.setProps({
				//   arrow: true,
				//   animation: 'scale',
				// });
		  //   // }
		    console.log('Copying text command was ' + msg);
		  } catch (err) {
		    console.log('Oops, unable to copy');
		  }
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
$('.copy').click(function(){
	formatter.copy();
})
$('.download').click(function(){
	if(editorRes.getValue() == ''){
	formatter.modal_alert({
		icon: 'fas fa-exclamation-triangle',
        title: 'Encountered an error!',
        content: 'Nothing to Download Result is Empty',
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Ok',
                action: function(){
                }
            }
        }
    });
    return;
	}
	var form = document.createElement("form");
	form.action = siteUrl('adp/datatofile');
	form.method = 'POST';
	let inputdata = document.createElement("textarea");
	inputdata.type='text';
	inputdata.name='data';
	inputdata.value=editorRes.getValue();
	let inputToken = document.createElement("input");
	inputToken.type='text';
	inputToken.name='_token';
	inputToken.value=$('meta[name=csrf-token]')[0].content;
	let inputLang = document.createElement("input");
	inputLang.type='text';
	inputLang.name='lang';
	inputLang.value=formatter.getSettings().lang;

	form.appendChild(inputdata);
	form.appendChild(inputToken);
	form.appendChild(inputLang);
	form.style.display='none';
	document.body.appendChild(form);
	$(form).submit()  
	$(form).remove()  
})
window.onerror = function (msg, url, lineNo, columnNo, error) {
	// console.log(msg);
	// console.log(error);
  $.dialog({
		icon: 'fas fa-exclamation-triangle',
        title: 'Syntax error !',
        content: 'Error:'+msg,
        type: 'red',
        typeAnimated: true,
        buttons: {
            tryAgain: {
                text: 'Ok',
                action: function(){
                }
            }
        }
    })

  return false;
}
tippy('.copy', {
	trigger: 'click',
	arrow: true,
 	content: '<strong>Copied</strong>',
});
