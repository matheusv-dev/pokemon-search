import { useContext, useEffect } from "react";
import Logon from "../Logon";
import Search from "../Search";
import { UserContext } from "../../context/UserContext";
import Sidebar from "../../components/Sidebar";

export default function Home() {

  const { token, favoriteList, getFavorites } = useContext(UserContext)

  useEffect(() => {
    getFavorites()
  }, [])

  return (
    <div className="max-w-base grid grid-cols-[1fr_250px] max-h-screen h-full">
      <div className="">
        <Search />
      </div>
      <div className="bg-orange-400 h-screen">
        {!token ? (<Logon />) : (<Sidebar />)}
      </div>
    </div>
  )
}