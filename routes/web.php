<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/formatter/', 'FormatController@index')->name('home');
Route::get('{lang}-formatter',['as' => 'format','uses' =>'FormatController@format']);
Route::get('{from}-to-{to}',['as' => 'convert','uses' =>'ConversionController@convert']);
Route::get('/html-formatter', 'FormatController@html')->name('home');
Route::get('/css-formatter', 'FormatController@css')->name('home');
Route::get('/php-formatter', 'FormatController@index')->name('home');
Route::get('/yaml-formatter', 'FormatController@yaml')->name('home');
Route::get('/typescript-formatter', 'FormatController@typescript')->name('home');

// helpers
Route::get('/adp/urltofile', 'FormatController@urltofile');
Route::post('/adp/datatofile', 'FormatController@datatofile');

Route::post('/adp/fileopen', 'FormatController@fileopen');
Route::get('/loadfile', 'FormatController@loadfile');
