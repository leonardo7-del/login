<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';
    public $timestamps = false;
    protected $fillable = ['email', 'password_hash'];

    public function auditLogs()
    {
        return $this->hasMany(AuditLog::class);
    }

    public function otpCodes()
    {
        return $this->hasMany(OtpCode::class);
    }
}
