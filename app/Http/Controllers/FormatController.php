<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormatController extends Controller
{
    public function index(){

    	return view('formatter.index');
    }
    public function format($lang){
        $data['scripts'] = ['vendor/prettier/standalone.js'];
        $data['ext_scripts'] = [];
        if($lang == 'xml' || $lang == 'javascript'){
            array_push($data['scripts'],'vendor/prettier/parser-flow.js','js/formatter.js');
        }elseif($lang == 'json'){
            array_push($data['scripts'],'js/formatter.js');
        }elseif($lang == 'css'){
            array_push($data['scripts'],'vendor/prettier/parser-postcss.js','js/formatter.js');
        }elseif($lang == 'php'){
            array_push($data['scripts'],'vendor/prettier/plugin-php/standalone.js','js/formatter.js');
        }else{
            array_push($data['scripts'],'vendor/prettier/parser-'.$lang.'.js','js/formatter.js');
            // $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-'.$lang.'.js';
        }
        $data['lang'] = $lang;
        
        return view('formatter.index')->with($data);
    }
    public function html(){
    	$data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-html.js';
    	return view('formatter.index')->with($data);
    }
    public function css(){
        $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-postcss.js';
        return view('formatter.index')->with($data);
    }
    public function yaml(){
        $data['scripts'] = 'https://unpkg.com/@babel/standalone/babel.min.js,https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-yaml.js';
        return view('formatter.index')->with($data);
    }
    public function typescript(){
        $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-typescript.js';
        return view('formatter.index')->with($data);
    }
     public function javascript(){
        $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-typescript.js';
        return view('formatter.index')->with($data);
    }
    public function urltofile(){
    	$data['data'] = file_get_contents($_GET['url']);
        // $data['lang']  = pathinfo($_GET['url'])['extension'];
    	return $data['data'];
    }
    public function loadfile(){
    	
    	return view('tools.loadfile');
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
    public function datatofile(Request $request){
        return response($_POST['data'])
            ->withHeaders([
                'Content-Type' => 'application/octet-stream',
                 'Cache-Control' => 'no-store, no-cache',
                'Content-Disposition' => 'attachment;filename=adptool-formatter.'.$_POST['lang'],
                'Connection' => 'close',
            ]);
        
    }


}
