<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class UserPokemon extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name'];

    public function userInfo()
    {
        return Auth::user()->attributes;
    }

    public function index()
    {
        return Auth::user()->pokemon;
    }

    public function store($fields)
    {
        return Auth::user()->pokemon->create($fields);
    }

    public function show($id)
    {
        $show = Auth::user()->pokemon->find($id);

        if (!$show) {
            throw new \Exception('Nada Encontrado', -404);
        }

        return $show;
    }

    public function updateList($fields, $id)
    {
        $userPokemon = $this->show($id);

        $userPokemon->update($fields);
        return $userPokemon;
    }

    public function destroyList($id)
    {
        $userPokemon = $this->show($id);

        $userPokemon->delete();
        return $userPokemon;
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
