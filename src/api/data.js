const url = "https://frontend-take-home-service.fetch.com"

//Hits the API and gets the ids for the dogs that matches the query params
//Function takes URLSearchParams object and builds a query string to filter dogs by
export async function findDogs(params){
    let searchUrl = `${url}/dogs/search`
    if (params.size > 0) {
        searchUrl += "?"
        searchUrl += params.toString()
    }

    return await fetch(searchUrl, {credentials: "include", method: "GET"})
}

//Hits the API and gets the dog data for the dogs with the IDs in the given array
export async function getDogs(ids){
    const body = JSON.stringify(ids)
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    return await fetch(`${url}/dogs`, {credentials: "include", method: "POST", headers, body})
}

//Hits the API and gets the list of breeds
export async function getBreeds() {
    return await fetch(`${url}/dogs/breeds`, {credentials: "include", method: "GET"})
}

//Hits the API and gets the locations for the given zip codes
export async function getLocations(zipCodes) {
    const body = JSON.stringify(zipCodes)
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    return await fetch(`${url}/locations`, {credentials: "include", method: "POST", headers, body})
}