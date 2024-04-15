import { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext"
import { CgPokemon } from "react-icons/cg"
import Favorite from "../Favorite"
import { GiConsoleController } from "react-icons/gi"

export default function Sidebar() {

  const { favoriteList } = useContext(UserContext)

  console.log(favoriteList)

  return (
    <div>
      <div className="bg-white p-4">
        <h1 className="text-center text-lg flex items-center gap-2"><CgPokemon className="text-yellow-400 shadow-sm" size={30} /> Pokemons Favoritos</h1>
      </div>
      <div className="p-2 flex flex-col gap-2">
        {favoriteList ?
          (
            favoriteList.map(pokemon => {
              return (
                <Favorite key={pokemon.name} pokemon={pokemon.name} />
              )
            })
          ) :
          (<div className="text-center w-full">Nenhum pokemon favoritado</div>)
        }
      </div>
    </div>
  )
}