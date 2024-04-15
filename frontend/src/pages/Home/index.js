import { useContext, useEffect, useState } from "react";
import Logon from "../Logon";
import Search from "../Search";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar";
import Favorites from "../Favorites";

export default function Home() {
  const { token, getFavorites } = useContext(UserContext)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    getFavorites()
  }, [token])

  return (
    <div className="max-w-base grid grid-cols-[1fr_250px] max-h-screen h-full">
      <div className="max-h-screen overflow-y-auto">
        {!showFavorites ? (
          <Search />
        ) :
          <Favorites />
        }
      </div>
      <div className="bg-orange-400 h-screen">
        {!token ? (<Logon />) : (<Sidebar onClick={() => setShowFavorites(!showFavorites)} isShowFavorites={showFavorites} />)}
      </div>
    </div>
  )
}