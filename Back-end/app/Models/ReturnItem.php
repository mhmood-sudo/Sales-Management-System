<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleReturn extends Model
{
    protected $table = 'returns';

    protected $fillable = [
        'sale_id', 'user_id', 'product_id',
        'total_refunded', 'price', 'reason'
    ];

    public function sale() { return $this->belongsTo(Sale::class); }
    public function user() { return $this->belongsTo(User::class); }
    public function product() { return $this->belongsTo(Product::class); }
}
