const url = "https://frontend-take-home-service.fetch.com"

export async function getDogs(){
    //TODO: build out query params

    const res =  await fetch(`${url}/dogs/search`, {credentials: "include", method: "GET"})
    return res
}