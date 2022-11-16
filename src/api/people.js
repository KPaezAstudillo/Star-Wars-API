export async function getPeople(page){
    const response = await fetch(`https://www.swapi.tech/api/people/?page=${page}`);
    const data = await response.json();
    return data;
}

export async function getCharacter(id){
    const response = await fetch(`https://www.swapi.tech/api/people/${id}`)
    const data = await response.json();
    return data;
}

export async function searchCharacter(string){
    const response = await fetch(`https://www.swapi.tech/api/people/?search=${string}`)
    const data = await response.json();
    return data;
}