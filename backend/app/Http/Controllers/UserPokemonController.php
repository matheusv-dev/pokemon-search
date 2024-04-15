<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UserPokemon\StoreUserPokemon;
use App\Models\UserPokemon;
use App\Services\ResponseService;
use App\Transformers\UserPokemon\UserPokemonResource;
use App\Transformers\UserPokemon\UserPokemonResourceCollection;
use Illuminate\Support\Facades\Auth;

class UserPokemonController extends Controller
{
    private $userPokemon;

    public function __construct(UserPokemon $userPokemon)
    {
        $this->userPokemon = $userPokemon;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new UserPokemonResourceCollection($this->userPokemon->index());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUserPokemon $request)
    {
        try {
            $postData = $request->all();
            $postData += ["user_id" => $this->userPokemon->userInfo()['id']];

            $data = $this
                ->userPokemon
                ->create($postData);
        } catch (\Throwable | \Exception $e) {
            return ResponseService::exception('userPokemon.store', null, $e);
        }

        return new UserPokemonResource($data, array('type' => 'store', 'route' => 'userPokemon.store'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\TaskList  $taskList
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        print_r($id);

        try {
            $data = $this
                ->userPokemon
                ->show($id);
        } catch (\Throwable | \Exception $e) {
            return ResponseService::exception('userPokemon.show', $id, $e);
        }

        return new UserPokemonResource($data, array('type' => 'show', 'route' => 'userPokemon.show'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $data = $this
                ->userPokemon
                ->updateList($request->all(), $id);
        } catch (\Throwable | \Exception $e) {
            return ResponseService::exception('userPokemon.update', $id, $e);
        }

        return new UserPokemonResource($data, array('type' => 'update', 'route' => 'userPokemon.update'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\TaskList  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $data = $this
                ->userPokemon
                ->destroyList($id);
        } catch (\Throwable | \Exception $e) {
            return ResponseService::exception('userPokemon.destroy', $id, $e);
        }
        return new UserPokemonResource($data, array('type' => 'destroy', 'route' => 'userPokemon.destroy'));
    }
}
