import { Outlet } from 'react-router-dom'
import Header from '../../components/header/Header'
import './default-layout.css'

export default function DefaultLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  )
}