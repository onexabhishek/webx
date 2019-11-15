<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ConversionController extends Controller{
	public function convert($from,$to){
		$data['styles']= [];
		$data['scripts']= [];
		$data['ext_scripts'] = [];
		$data['from'] = $from;
		$data['to'] = $to;
		if($from == 'jade' && $to == $to){ 
			array_push($data['scripts'],'vendor/jade.min.js');
		}elseif($from == 'pug' && $to == $to){
			array_push($data['ext_scripts'],'https://pugjs.org/js/pug.js');
		}elseif($from == 'yaml' && $to == $to){
			array_push($data['scripts'],'vendor/esprima/dist/esprima.js','vendor/js-yaml/dist/js-yaml.min.js');
		}elseif($from == 'sass' && $to == $to){
			array_push($data['scripts'],'sass.min.js');
		}elseif($from == 'scss' && $to == $to){
			array_push($data['scripts'],'sass.min.js');
		}elseif($from == 'javascript' && $to == 'coffeescript'){
			array_push($data['ext_scripts'],'https://cdn.rawgit.com/js2coffee/js2coffee/v2.1.0/dist/js2coffee.js');
		}
		elseif($from == 'image' && $to == $to){
			array_push($data['scripts'],'vendor/datatables/jquery.dataTables.min.js','vendor/datatables/dataTables.bootstrap4.min.js','js/demo/datatables-demo.js','vendor/tesseract.js/dist/tesseract.min.js');
			array_push($data['styles'],'vendor/datatables/dataTables.bootstrap4.min.css');
			return view('converter.image')->with($data);
		}
		array_push($data['scripts'],'js/converter.js');

		return view('converter.index')->with($data);
	}
	public function fileopen(Request $request){
    	
    	// $data['file'] = file_get_contents($request->file('image'));
        $data['status'] = 'success';
        $lang = $request->file('file')->getClientOriginalExtension();
        if($lang == 'yml' || $lang == 'yaml'){
          $data['lang'] = 'yaml';  
        }else{
            $data['lang'] = $lang;
        }
        
        $data['data'] = file_get_contents($request->file('file'));
        return json_encode($data);
        // return view('tools.loadfile')->with($data);
        // redirect('html');
    }
    public function loadfile(){
    	
    	return view('tools.converterload');
    }

}