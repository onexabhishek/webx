<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FormatController extends Controller
{
    public function index(){

    	return view('formatter.index');
    }
}
