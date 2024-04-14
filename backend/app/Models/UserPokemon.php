<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserPokemon extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'name'];

    public function index()
    {
        return auth()
            ->user()
            ->UserPokemon
            ->sortBy("name");
    }

    public function create($fields)
    {
        return auth()
            ->user()
            ->userPokemon()
            ->create($fields);
    }

    public function show($id)
    {
        $show = auth()
            ->user()
            ->UserPokemon()
            ->find($id);

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

    public function user()
    {
        return $this->hasOne(User::class);
    }
}
