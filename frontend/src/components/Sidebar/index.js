import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { CgPokemon } from "react-icons/cg"
import Favorite from "../Favorite"
import { Button } from "@mui/material"

export default function Sidebar({ onClick, isShowFavorites }) {

  const { favoriteList } = useContext(UserContext)

  function handleFavorites() {
    onClick()
  }

  return (
    <div>
      <div className="bg-white p-4">
        <h1 className="text-center text-lg flex items-center gap-2"><CgPokemon className="text-yellow-400 shadow-sm" size={30} /> Pokemons Favoritos</h1>
      </div>
      <div className="p-2 flex flex-col gap-2">
        {favoriteList ?
          (
            <>
              {favoriteList.map(pokemon => {
                return (
                  <Favorite key={pokemon.name} pokemon={pokemon.name} />
                )
              })
              }

              <Button variant="contained" color="error" onClick={handleFavorites}> {isShowFavorites ? 'Voltar para pesquisa' : 'Ver todos Favoritos'}</Button>
            </>
          ) :
          (<div className="text-center w-full">Nenhum pokemon favoritado</div>)
        }
      </div>
    </div>
  )
}