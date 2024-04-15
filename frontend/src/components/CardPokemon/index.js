import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../context/UserContext"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import Badge from "../Badge"
import { GiWeight } from "react-icons/gi"
import { RxHeight } from "react-icons/rx"

export default function CardPokemon({ pokemon }) {

  const [pokemonResult, setPokemonResult] = useState()
  const [isFavorite, setIsFavorite] = useState(undefined)
  const { setFavorite, favoriteList, removeFavorite } = useContext(UserContext)

  async function buscarPokemon(pokemon) {

    if (!pokemon) return false;

    pokemon = pokemon.toLowerCase()

    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(response => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
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

  function convertNumber(numero) {
    return numero / 10
  }

  useEffect(() => {
    buscarPokemon(pokemon)
  }, [pokemon])

  return (
    <>
      {pokemonResult && (
        <div className="grid grid-cols-[auto_1fr] gap-2 p-4 bg-slate-300 rounded-lg w-full">
          <div>
            <img src={pokemonResult.sprites.other['official-artwork'].front_default} alt="" className="max-w-[300px] w-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <span className="text-lg font-bold">{pokemonResult.name.charAt(0).toUpperCase() + pokemonResult.name.slice(1)}</span>
                <span className="text-lg">Nº {pokemonResult.id}</span>
              </div>
              <button
                onClick={isFavorite ? removerFavoritoPokemon : favoritarPokemon}>
                {isFavorite ? <MdFavorite size={24} className="text-red-500" /> : <MdFavoriteBorder size={24} className="text-red-500" />}
              </button>
            </div>
            <div className="gap-2 rounded-lg flex flex-wrap">

              <div className="flex gap-1 bg-white rounded-lg items-center overflow-hidden">
                <span className="bg-blue-400 p-2"><RxHeight size={20} /></span>
                <span className="px-1">{convertNumber(pokemonResult.height)} m</span>
              </div>
              <div className="flex gap-1 bg-white rounded-lg items-center overflow-hidden">
                <span className="bg-blue-400 p-2"><GiWeight size={20} /></span>
                <span className="px-1">{convertNumber(pokemonResult.weight)} kg</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {pokemonResult.types.map((type) => {
                return <Badge type={type.type.name} key={type.type.name} />
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}