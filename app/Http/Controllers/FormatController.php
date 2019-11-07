<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormatController extends Controller
{
    public function index(){

    	return view('formatter.index');
    }
    public function format($lang){
        if($lang == 'xml' || $lang == 'javascript'){
            $data['scripts'] = 'vendor/prettier/standalone.js,vendor/prettier/parser-flow.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
        }elseif($lang == 'json'){
            $data['scripts'] = 'vendor/prettier/standalone.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
        }elseif($lang == 'css'){
            $data['scripts'] = 'vendor/prettier/standalone.js,vendor/prettier/parser-postcss.js';
        }elseif($lang == 'php'){
            $data['scripts'] = 'vendor/prettier/standalone.js,vendor/prettier/parser-postcss.js,vendor/prettier/plugin-php/standalone.js';
        }else{
            $data['scripts'] = 'vendor/prettier/standalone.js,vendor/prettier/parser-'.$lang.'.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
            // $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-'.$lang.'.js';
        }
        $data['lang'] = $lang;
        
        return view('formatter.index')->with($data);
    }
    public function html(){
    	$data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-html.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
    	return view('formatter.index')->with($data);
    }
    public function css(){
        $data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-postcss.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
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


}
