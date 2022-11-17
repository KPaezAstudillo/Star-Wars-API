//this fetch function gets list of characters
export async function getPeople(page){
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    const data = await response.json();
    return data;
}

//this fetch function gets single character info
export async function getCharacter(id){
    const response = await fetch(`https://swapi.dev/api/people/${id}`)
    const data = await response.json();
    return data;
}

//this fetch function searches for the user input
export async function searchCharacter(string){
    const response = await fetch(`https://swapi.dev/api/people/?search=${string}`)
    const data = await response.json();
    return data;
}