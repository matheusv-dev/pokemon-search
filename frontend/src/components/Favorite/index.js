import { MdOutlineCatchingPokemon } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Favorite({ pokemon }) {
  return (
    <Link to={`/?pokemon=${pokemon}`} className="bg-white rounded-lg p-2 flex gap-1 font-bold items-center">
      <MdOutlineCatchingPokemon className="text-red-400 shadow-sm" size={20} />
      {pokemon.charAt(0).toUpperCase() + pokemon.slice(1)}
    </Link>
  )
}