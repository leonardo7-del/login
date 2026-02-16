<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RegisterController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8', 'max:255'],
        ]);

        return DB::transaction(function () use ($data, $request) {
            $hashed = password_hash($data['password'], PASSWORD_BCRYPT);

            $user = User::create([
                'email' => $data['email'],
                'password_hash' => $hashed,
            ]);

            AuditLog::create([
                'user_id' => $user->id,
                'action' => 'user__registration',
                'ip_address' => $request->ip(),
                'details' => 'Registro de usuario',
            ]);

            return response()->json([
                'id' => $user->id,
                'email' => $user->email,
            ], 201);
        });
    }
}
