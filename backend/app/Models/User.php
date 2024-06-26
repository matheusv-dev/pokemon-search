<?php

namespace App\Models;

use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable implements JWTSubject
{
	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	use HasFactory;

	protected $fillable = [
		'name', 'email', 'password',
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];

	public function create($fields)
	{
		return parent::create([
			'name' => $fields['name'],
			'email' => $fields['email'],
			'password' => Hash::make($fields['password']),
		]);
	}

	public function login($credentials)
	{
		if (!$token = JWTAuth::attempt($credentials)) {
			throw new \Exception('Credencias incorretas, verifique-as e tente novamente.', -404);
		}
		
		return $token;
	}
	public function logout($token)
	{
		if (!JWTAuth::invalidate($token)) {
			throw new \Exception('Erro. Tente novamente.', -404);
		}
	}

	public function getJWTIdentifier()
	{
		return $this->getKey();
	}

	public function getJWTCustomClaims()
	{
		return [];
	}

	public function pokemon(): HasMany
	{
		return $this->hasMany(UserPokemon::class);
	}
}
