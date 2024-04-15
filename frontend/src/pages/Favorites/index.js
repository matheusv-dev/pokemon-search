import { useContext, useEffect } from "react";
import Logon from "../Logon";
import Search from "../Search";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar";
import CardPokemon from "../../components/CardPokemon";

export default function Favorites() {

  const { favoriteList } = useContext(UserContext)


  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {favoriteList.map(fav => {
        return <CardPokemon pokemon={fav.name} />
      })}
    </div>
  )
}