import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgPokemon } from "react-icons/cg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { z } from "zod";
import Badge from "../../components/Badge";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";


const pokemonSearch = z.object({
  pokemon: z.string(),
})


export default function Search() {

  const [searchParams, setSearchParams] = useSearchParams()
  const [pokemonSearched, setPokemonSearched] = useState(searchParams.get('pokemon').toLowerCase())
  const [pokemonResult, setPokemonResult] = useState()
  const [isFavorite, setIsFavorite] = useState(undefined)
  const { setFavorite, favoriteList, removeFavorite } = useContext(UserContext)

  const {
    handleSubmit,
    formState: { errors },
    register,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(pokemonSearch),
    defaultValues: {
      pokemon: ''
    }
  })

  const onSubmit = useCallback(
    async form => {
      var queryParams = new URLSearchParams(window.location.search);
      console.log(queryParams)
      queryParams.set("pokemon", form.pokemon.toLowerCase());
      window.history.replaceState(null, null, "?" + queryParams.toString());

      setPokemonSearched(form.pokemon.toLowerCase())
      buscarPokemon(pokemonSearched)
    },
    [],
  )

  async function buscarPokemon(pokemon) {
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => {
        return response.json()
      })
      .then((data) => {
        setPokemonResult(data);

        setIsFavorite(undefined)
        if (favoriteList) {
          favoriteList.forEach(fav => {
            if (fav.name.toLowerCase() === data.name) {
              setIsFavorite(fav)
            }
          })
        }
      })
  }

  async function favoritarPokemon() {
    await setFavorite({ name: pokemonResult.name })
  }

  async function removerFavoritoPokemon() {
    await removeFavorite(isFavorite.id)
  }

  const pokemonValue = watch('pokemon')
  const setPokemonValue = value => setValue('pokemon', value)

  function convertNumber(numero) {
    return numero / 10
  }

  useEffect(() => {
    buscarPokemon(pokemonSearched)
  }, [pokemonSearched, favoriteList])

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(onSubmit)} className="flex bg-white">
        <TextField id="pokemon"
          label="Pokemon"
          variant="filled"
          name="pokemon"
          value={pokemonValue}
          onChange={(event) => {
            setPokemonValue(event.target.value);
          }}
          className="w-full"
          placeholder="Pesquise o nome do pokemon"
          color="warning"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CgPokemon />
              </InputAdornment>
            ),
          }}
          required
          {...register('pokemon')}
        />
        <Button type="submit" color="warning" variant="outlined"><FaMagnifyingGlass /></Button>
      </form>
      {pokemonResult && (
        <div className="grid grid-cols-[500px_1fr] gap-2 p-4">
          <div>
            <img src={pokemonResult.sprites.other['official-artwork'].front_default} alt="" width={500} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-lg">{pokemonResult.name.charAt(0).toUpperCase() + pokemonResult.name.slice(1)}</span>
              <button
                onClick={isFavorite ? removerFavoritoPokemon : favoritarPokemon}>
                {isFavorite ? <MdFavorite size={24} className="text-red-500" /> : <MdFavoriteBorder size={24} className="text-red-500" />}
              </button>
            </div>
            <div className="gap-2 bg-orange-300 p-4 rounded-lg grid grid-cols-2">
              <div className="flex flex-col gap-1">
                <span className="bold">Altura</span>
                <span>{convertNumber(pokemonResult.height)} m</span>
              </div>
              <div className="flex flex-col gap-1">
                <span>Peso</span>
                <span>{convertNumber(pokemonResult.weight)} kg</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {pokemonResult.types.map((type) => {
                return <Badge type={type.type.name} key={type.type.name} />
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}