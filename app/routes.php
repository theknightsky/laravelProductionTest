<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
    // print_r(json_encode("['html','css','js']"));
});

Route::group(array('prefix' => 'api'), function(){
    Route::resource('portfolioItems', 'portfolioItemsController',
        array('only'=> ['index','show']));
});


App::missing(function($exception)
{
    // return Response::view('errors.missing', array(), 404);
    return Redirect::to('/');
});
