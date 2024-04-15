import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgPokemon } from "react-icons/cg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { z } from "zod";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CardPokemon from "../../components/CardPokemon";


const pokemonSearch = z.object({
  pokemon: z.string(),
})


export default function Search() {

  const [searchParams] = useSearchParams()
  const paramPokemon = searchParams.size > 0 ? searchParams.get('pokemon').toLowerCase() : ""
  const [pokemonSearched, setPokemonSearched] = useState(paramPokemon)
  const [isFavorite, setIsFavorite] = useState(undefined)

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
      queryParams.set("pokemon", form.pokemon.toLowerCase());
      window.history.replaceState(null, null, "?" + queryParams.toString());

      setPokemonSearched(form.pokemon.toLowerCase())
    },
    [],
  )

  const pokemonValue = watch('pokemon')
  const setPokemonValue = value => setValue('pokemon', value)

  useEffect(() => {
    setPokemonSearched(paramPokemon)
  }, [paramPokemon])

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
      <div className="px-2">
        {pokemonSearched && (
          <CardPokemon pokemon={pokemonSearched} isFavorite={isFavorite} />
        )}
      </div>
    </div>
  )
}