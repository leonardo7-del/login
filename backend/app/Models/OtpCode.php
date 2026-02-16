<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OtpCode extends Model
{
    protected $table = 'otp_codes';
    public $timestamps = false;
    protected $fillable = ['user_id', 'code', 'expiration', 'used'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
