import { useState, useEffect, useRef } from "react";
import { getPeople, getCharacter, searchCharacter } from "./api/people";
import './App.css';
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";


function App() {
  const inputSearch = useRef();
  const [searchString, setSearchString] = useState();
  const [people, setPeople] = useState([]);
  const [currentCharacter, setCurrentCharacter] = useState();
  const [details, setDetails] = useState({})
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)

  useEffect(() => {
    getPeople(page).then(setPeople)
  }, [page]);

  useEffect(() => {
    getCharacter(currentCharacter).then(setDetails)
  }, [currentCharacter])

  const showDetails = (character) => {
    const id = Number(character.url.split('/').slice(-1))
    setCurrentCharacter(id);
    //console.log(character.url)
    //console.log(id)
    //console.log(details.result.properties.name)
    
    setModal(true)
  }
  

  const handleSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value;

    setSearchString(text);
    searchCharacter(searchString).then(setPeople)
  }

  const handlePage = (next) => {
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next > 9) return;

    setPage(page + next);
    console.log(page)
  }

  return (
    <>
      <Navbar ref={inputSearch} onChange={handleSearch}/>
      {/* <form className="d-flex  ">
        <input className="mx-auto my-2" ref={inputSearch} type="text" onChange={handleSearch} placeholder="Search for a character"></input>

      </form> */}
      <div className="d-flex flex-column ">
        <h1 className="mx-auto mt-3">Starwars Characters</h1>
        <h6 className="mx-auto mb-5">A guide from a galaxy far, far away </h6>
      </div>

      <div className="row d-flex">
        {people?.results?.map((character) => (
          <div class="card mb-3 mx-2 col-6 text-center mx-auto bg-dark" key={character.name} onClick={() => showDetails(character)} data-bs-toggle="modal" data-bs-target="#exampleModal">
            <div class="card-body" >
              <h5 class="card-title">{character.name}</h5>
            </div>
          </div>
        ))
        }
      </div>
      <section className="d-flex">
        <button className="btn btn-secondary mx-auto" onClick={() => handlePage(-1)}>Previous</button>
        <p className="mx-auto">Page {page}</p>
        <button className="btn btn-secondary mx-auto" onClick={() => handlePage(1)}>Next</button>
      </section>
      {details && modal && (
        <>
          <Modal name={details?.result?.properties?.name} mass={details?.result?.properties?.mass} height={details?.result?.properties?.height} birth_year={details?.result?.properties?.birth_year} />
        </>

      )}

    </>
  );
}

export default App;
