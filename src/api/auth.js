//Base url to access the api
const url = "https://frontend-take-home-service.fetch.com"

//Send Post request to /auth/login
//Api takes in name and email as parameters
//Return a promise with response
export async function login(name, email) {
  const body = JSON.stringify({ name: name, email: email })
  const headers = new Headers()
  headers.append("Content-Type", "application/json")
  return await fetch(`${url}/auth/login`, {method: "POST", body: body, headers: headers, mode: 'cors', credentials: 'include'})
}

export async function logout() {
  return await fetch(`${url}/auth/logout`, {method: "POST", mode: 'cors', credentials: 'include'})
}