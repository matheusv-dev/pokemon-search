<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\UserPokemonController;
use App\Models\UserPokemon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('register', [UserController::class, 'store'])->name('users.store');
Route::post('login', [UserController::class, 'login'])->name('users.login');

Route::group(['prefix' => 'v1', 'middleware' => 'jwt.verify'], function () {
  Route::post('logout',  [UserController::class, 'logout'])->name('users.logout');
  /*
   * O comando api Resources cria as rotas necessárias para CRUD (index, show, store, update e destroy) 
   */

  Route::apiResources([
    'userPokemon'  =>  UserPokemonController::class,
  ]);
});
