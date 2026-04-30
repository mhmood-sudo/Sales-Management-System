<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'username',
        'password',
        'role',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function shifts()
    {
        return $this->hasMany(Shift::class);
    }

    public function sales()
    {
        return $this->hasMany(Sale::class);
    }

    public function returns()
    {
        return $this->hasMany(SaleReturn::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function activityLogs()
    {
        return $this->hasMany(ActivityLog::class);
    }

    public function damagedGoods()
    {
        return $this->hasMany(DamagedGood::class);
    }

public function findForPassport($username) {
    return $this->where('username', $username)->first();
}
}
