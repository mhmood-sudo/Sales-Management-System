<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerDebt extends Model
{
    protected $fillable = ['sale_id', 'customer_id', 'amount', 'due_date'];

    public function sale()
    {
        return $this->belongsTo(Sale::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
}
