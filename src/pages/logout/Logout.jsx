import { redirect } from "react-router-dom"
import { logout } from "../../api/auth"

export async function loader() {
  const res = await logout()
  if (res.status === 200) {
    return redirect("/?message=You%20have%20been%20logged%20out")
  } else {
    throw new Error("Error logging out")
  }
}

export default function Logout() {
  return (
    <div className="logout-page">
      <h1>Logout</h1>
    </div>
  )
}