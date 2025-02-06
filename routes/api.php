<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Controllers\UserController;
use App\Http\Controllers\Api\ApiFootballController;


Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::get('users', [UserController::class, 'index']);
    Route::post('logout', [UserController::class, 'logout']);
    Route::patch('/users/{user}', [UserController::class, 'update']);
    Route::get('users/{user}/api_key', [UserController::class, 'listApiKeyByIdUser']);

    Route::prefix('football')->group(function (){
        Route::get('/matches', [ApiFootballController::class, 'getMatches'])->middleware('jwt');
        Route::get('/teams/statistics', [ApiFootballController::class, 'getStatisticsTeam'])->middleware('jwt');
        Route::get('/rounds', [ApiFootballController::class, 'getRoundsByTeamId'])->middleware('jwt');
    });
});

