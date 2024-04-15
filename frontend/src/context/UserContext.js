'use client'
import { createContext, useState } from 'react'

import api from '../services/api'

export const UserContext = createContext({})

export function UserProvider({
  children,
  tkn,
}) {
  const [favoriteListState, setFavoriteListState] = useState()
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState(tkn)

  async function setTokenUser(userToken) {
    setToken(userToken)
  }

  async function getFavorites() {
    await api.get('api/v1/userPokemon', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {

      const refuse = [401, 498];
      if (refuse.indexOf(response.data.status) > -1) {
        localStorage.removeItem('token');
        setToken(undefined)
      } else {
        setFavoriteListState(response.data.data);
      }
    })
  }

  async function setFavorite(data) {

    api.post('api/v1/userPokemon/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {

      const refuse = [401, 498];
      if (refuse.indexOf(response.data.status) > -1) {
        localStorage.clear();
        setToken(undefined)
      } else {
        getFavorites()
      }
    })
  }

  async function removeFavorite(id) {
    api.delete('api/v1/userPokemon/' + id, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {

      const refuse = [401, 498];
      if (refuse.indexOf(response.data.status) > -1) {
        localStorage.clear();
      } else {
        getFavorites()
      }
    })
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        favoriteList: favoriteListState,
        token: token,
        setTokenUser,
        setFavorite,
        removeFavorite,
        getFavorites,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
