class Adp{
	modal_alert(config){
		$.confirm(config);
	}
	alert_dialog(msg){
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
	}
}   
