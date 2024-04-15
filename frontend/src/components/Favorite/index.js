import { MdOutlineCatchingPokemon } from "react-icons/md";

export default function Favorite({ pokemon }) {
  return (
    <div className="bg-white rounded-lg p-2 flex gap-1 font-bold items-center">
      <MdOutlineCatchingPokemon className="text-red-400 shadow-sm" size={20} />
      {pokemon}
    </div>
  )
}