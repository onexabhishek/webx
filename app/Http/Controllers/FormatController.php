<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormatController extends Controller
{
    public function index(){

    	return view('formatter.index');
    }
    public function html(){
    	$data['scripts'] = 'https://unpkg.com/prettier@1.18.2/standalone.js,https://unpkg.com/prettier@1.18.2/parser-html.js,https://cdnjs.cloudflare.com/ajax/libs/html-minifier/4.0.0/htmlminifier.js';
    	return view('formatter.index')->with($data);
    }

}
