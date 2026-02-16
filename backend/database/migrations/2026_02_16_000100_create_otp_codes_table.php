<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('otp_codes', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id');
            $table->string('code', 6);
            $table->dateTime('expiration');
            $table->boolean('used')->default(false);
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    public function down(): void {
        Schema::dropIfExists('otp_codes');
    }
};
