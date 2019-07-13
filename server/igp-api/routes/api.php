<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('auth/register', 'Auth\RegisterController@doRegister');
Route::post('auth/login', 'Auth\LoginController@doLogin');
Route::get('image', 'UserController@generateCaptcha');
Route::post('validate', 'UserController@validateCaptcha');
Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user', 'UserController@getAuthUser');
    Route::get('auth/logout', 'Auth\LoginController@logout');
    Route::post('user/update', 'UserController@updateProfile');
});
