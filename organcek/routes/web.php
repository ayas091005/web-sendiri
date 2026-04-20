<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KuesionerController;

Route::get('/', function () {
    return view('index');
});


Route::get('/asesmen', function () {
    return view('asesmen');
});

Route::get('/edukasi', function () {
    return view('edukasi');
});

Route::get('/hasil', function () {
    return view('hasil');
});

Route::post('/kuesioner/calculate', [KuesionerController::class, 'calculate']);
