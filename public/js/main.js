$.noConflict();

//Select Editor Mode
// $.alert({
//     title: 'Alert!',
//     content: 'Simple alert!',
// });


// ######### Formatter ##########

window.close = function(id){
	$(id).click();
}
let resultData = '';
if(typeof window.formatter != 'undefined'){
		resultData=editorRes.getValue();
}
if(typeof window.converter != 'undefined'){
	resultData=editorFrom.getValue();
}

$('.download').click(function(){
	if(resultData == ''){
		$.alert({
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
	inputdata.value=resultData;
	let inputToken = document.createElement("input");
	inputToken.type='text';
	inputToken.name='_token';
	inputToken.value=$('meta[name=csrf-token]')[0].content;
	let inputLang = document.createElement("input");
	inputLang.type='text';
	inputLang.name='lang';
	if(typeof window.formatter != 'undefined'){
		inputLang.value=formatter.getSettings().lang;
	}
	if(typeof window.converter != 'undefined'){
		inputLang.value=converter.get().extension;
	}

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
  		columnClass:'m',
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

// ######### Converter ############
