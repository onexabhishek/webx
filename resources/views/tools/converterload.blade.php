<!DOCTYPE html>
<html>
<head>
  <title>Tool 1</title>
  <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <style>
      
    </style>
</head>
<body>
     <?php
         echo Form::open(array('url' => '/converter/fileopen','files'=>'true','class'=>'fileModal'));
      ?>
      <div class="form-group"> 
        {{ Form::file('file',['class'=>'form-control','id'=>"loadFile"]) }}
      </div>
      <div class="modal-footer">
        {{ Form::submit('Upload File',['class'=>'btn btn-primary']) }}
      </div>
      {!! Form::close() !!}
      <script src="{{ asset('vendor/jquery/jquery.min.js') }}"></script>
      <script src="{{ asset('vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
      <script src="{{ asset('js/config.js') }}"></script>
      <script>
        $('.fileModal').on('submit',function(e){
  e.preventDefault();
  
  // var data = new FormData();
  // jQuery.each(jQuery('#loadFile')[0].files, function(i, file) {
  //     data.append('file-'+i, file);
  // });
  // console.log(data);
  // $.ajax({
  //    url:siteUrl('adp/fileopen'),
  //    type:'POST',
  //    data:$(this).serialize()+'&file='+data,
  //    success: function(data){
  //        console.log(data);
  //        editor.setValue(data);

  //    }
  // });
  var formData = new FormData(this);

        $.ajax({
            type:'POST',
            url: siteUrl('converter/fileopen'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log(data);
                // window.top.formatter.init();
                let body =JSON.parse(data);
                let config = window.parent.converter.get();
                console.log(config);
                  window.parent.close(".close");
                  window.parent.close(".close");
                if(body.lang != config.from){
                  window.parent.converter.modal_alert({
                    icon: 'fas fa-exclamation-triangle',
                    title: 'Encountered an error!',
                    content: 'Invalid '+config.from+' File',
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Try again',
                            btnClass: 'btn-red',
                            action: function(){
                            }
                        }
                    }
                });
                  // window.parent.alert('Invalid '+config.lang);
                }else{
                  window.parent.converter.set({input:body.data});
                  window.parent.converter.convert();
                }
                
               
            },
            error: function(data){
                window.parent.close(".close");
                window.parent.close(".close");
                window.parent.converter.modal_alert({
                    icon: 'fas fa-exclamation-triangle',
                    title: 'Encountered an error!',
                    content: data.responseJSON.message,
                    type: 'red',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Try again',
                            btnClass: 'btn-red',
                            action: function(){
                            }
                        }
                    }
                });
            }
        });
  // $('#urlModal').modal('hide');
  // $("#urlModal .close").click();
  $("#urlModal .close").click();
  

})
      </script> 
</body>
</html>