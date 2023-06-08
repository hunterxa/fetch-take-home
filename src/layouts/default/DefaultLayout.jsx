import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import { UserContext } from '../../context/UserContext'
import Header from '../../components/header/Header'
import './default-layout.css'

export default function DefaultLayout() {
  //Array of selected dog IDs to be saved in context
  const [selectedDogs, setSelectedDogs] = useState([])
  const [user, setUser] = useState({})

  return (
    <>
      <UserContext.Provider value={{user, setUser}}>
        <Header />
        <SelectedDogsContext.Provider value={{ selectedDogs, setSelectedDogs }}>
        <main>
          <Outlet />
        </main>
        </SelectedDogsContext.Provider>
        </UserContext.Provider>
    </>
  )
}