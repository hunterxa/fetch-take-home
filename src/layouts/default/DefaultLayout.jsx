import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { SelectedDogsContext } from '../../context/SelectedDogsContext'
import Header from '../../components/header/Header'
import './default-layout.css'

export default function DefaultLayout() {
  //Array of selected dog IDs to be saved in context
  const [selectedDogs, setSelectedDogs] = useState([])

  return (
    <>
      <SelectedDogsContext.Provider value={{ selectedDogs, setSelectedDogs }}>
        <Header />
        <main>
          <Outlet />
        </main>
      </SelectedDogsContext.Provider>
    </>
  )
}