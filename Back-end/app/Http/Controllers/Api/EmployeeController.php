<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function store(Request $request)
    {
        // 1. التحقق من البيانات المرسلة من React
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|unique:users,username',
            'password' => 'required|string|min:6',
            'role' => 'required|in:manager,cashier',
        ]);

        // 2. إنشاء الموظف (المستخدم) في قاعدة البيانات
        $user = User::create([
            'name' => $validated['name'],
            'username' => $validated['username'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        return response()->json(['message' => 'تمت إضافة الموظف بنجاح', 'user' => $user], 201);
    }

    public function index()
    {
        return response()->json(User::all(), 200);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        if (Auth::id() == $id && $request->status === 'inactive') {
        return response()->json([
            'message' => 'لا يمكنك حظر حسابك الشخصي لضمان استمرار وصولك للنظام'
        ], 403);
    }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
        'username' => 'sometimes|string|unique:users,username,'.$id,
        'password' => 'nullable|string|min:6',
        'role' => 'sometimes|in:manager,cashier',
        'status' => 'required|in:active,inactive',
    ]);

        $user->update(['status' => $validated['status']]);

        if ($user->status === 'inactive') {
        $user->tokens()->delete();
    }
        return response()->json([
            'message' => 'تم تحديث حالة الموظف بنجاح',
            'user' => $user
        ]);
    }

    public function destroy($id)
    {
       try {
        $user = User::findOrFail($id); // سيعطي خطأ 404 إذا لم يجد المستخدم

        if (Auth::id() == $id) {
            return response()->json(['message' => 'لا يمكنك حذف حسابك الشخصي'], 403);
        }

        $user->delete();

        return response()->json(['message' => 'تم الحذف بنجاح']);
    } catch (\Exception $e) {
        // هذا السطر سيطبع الخطأ الحقيقي في ملف laravel.log
        return response()->json(['message' => 'خطأ داخلي: ' . $e->getMessage()], 500);
    }
    }
}
