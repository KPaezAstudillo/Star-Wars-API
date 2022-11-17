import { useState, useEffect } from "react";
import { getPeople, getCharacter, searchCharacter } from "./api/people";
import './App.css';
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import CharacterCard from "./components/CharacterCard";


function App() {
  const [searchString, setSearchString] = useState();
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState();
  const [details, setDetails] = useState({})
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)


  //fetch every time the page number changes
  useEffect(() => {
    getPeople(page).then(setPeople)
  }, [page]);

  //fetch to show details every time the user clicks a character
  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails)
  }, [currentCharacter])

  //function to extract id from the character's details and display modal 
  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-2)[0])
    console.log(Number(character.url.split('/').slice(-2)[0]))
    setCurrentCharacter(id);

    setModal(true)
  }

//function to extract value from input and assign that value to searchCharacter fetch
  const handleSearch = (event) => {
    event.preventDefault();
    const text = event.target.value;
    setSearchString(text);
    searchCharacter(searchString).then(setPeople)
  }

  //set new page number according to previous or next button
  const handlePage = (next) => {
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next > 9) return;

    setPage(page + next);
  
  }

  return (
    <>
      <Navbar onChange={handleSearch} />
      <div className="d-flex flex-column ">
        <h1 className="mx-auto mt-3">Starwars Characters</h1>
        <h6 className="mx-auto mb-5">A guide from a galaxy far, far away </h6>
      </div>

      {/* cards with characters names */}
      <div className="row d-flex">
        {people?.results?.map((character) =>
        (
          <CharacterCard onClick={() => showDetails(character)} key={character.name} name={character.name} />
        ))
        }
      </div>
      <div className="d-flex">
        <button className="btn btn-secondary ms-auto me-5 bg-warning text-black" onClick={() => handlePage(-1)}>Previous</button>
        Page {page}
        <button className="btn btn-secondary me-auto ms-5 bg-warning text-black" onClick={() => handlePage(1)}>Next</button>
      </div>

      {/* modal displayed when user clicks on character's card */}
      {details && modal && (
        <>
          <Modal name={details?.name} mass={details?.mass} height={details?.height} birth_year={details.birth_year} />
        </>

      )}

    </>
  );
}

export default App;
