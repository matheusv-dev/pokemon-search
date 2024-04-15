import { useContext, useEffect } from "react";

import CardPokemon from "../../components/CardPokemon";
import { UserContext } from "../../context/UserContext";

export default function Favorites() {

  const { favoriteList } = useContext(UserContext)


  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {favoriteList.map(fav => {
        return <CardPokemon key={fav.name} pokemon={fav.name} />
      })}
    </div>
  )
}