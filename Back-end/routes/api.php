<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\SaleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EmployeeController;


Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    // معلومات المستخدم الحالي
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // تسجيل الخروج
    Route::post('/logout', [AuthController::class, 'logout']);

    // إحصائيات لوحة التحكم
    Route::get('/dashboard/stats', [DashboardController::class, 'getStats']);

    // المنتجات (تشمل CRUD كامل: index, store, show, update, destroy)
    Route::get('reports/expiring-soon', [ProductController::class, 'expiringSoon']);
    Route::apiResource('products', ProductController::class);

    // المبيعات
    Route::apiResource('sales', SaleController::class);

    // الموظفون
    Route::get('/employees', [EmployeeController::class, 'index']);
    Route::post('/employees', [EmployeeController::class, 'store']);
    Route::delete('/employees/{id}', [EmployeeController::class, 'destroy']);
    Route::put('/employees/{id}', [EmployeeController::class, 'update']);

    // الأقسام (لحفظ وتعديل وجلب الأقسام)
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);

});
