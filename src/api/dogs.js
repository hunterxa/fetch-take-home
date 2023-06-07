const url = "https://frontend-take-home-service.fetch.com"

//Hits the API and gets the ids for the dogs that matches the query params
export async function findDogs(){
    //TODO: build out query params

    const res =  await fetch(`${url}/dogs/search?size=5`, {credentials: "include", method: "GET"})
    return res
}

//Hits the API and gets the dog data for the dogs with the ids in the given array
export async function getDogs(ids){
    const body = JSON.stringify(ids)
    const headers = new Headers()
    headers.append("Content-Type", "application/json")
    return await fetch(`${url}/dogs`, {credentials: "include", method: "POST", headers, body})
}