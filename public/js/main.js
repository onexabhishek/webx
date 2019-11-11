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


$('.download').click(function(){
	if(editorRes.getValue() == ''){
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
