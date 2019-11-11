<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;

class ConversionController extends Controller{
	public function convert($from,$to){
		$data['scripts'] = ['js/converter.js'];
		$data['from'] = $from;
		$data['to'] = $to;
		if($from == 'pug' && $to == $to){
			array_push($data['scripts'],'vendor/jade.min.js');
		}

		return view('converter.index')->with($data);
	}
}