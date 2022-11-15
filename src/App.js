import { useState, useEffect, useRef } from "react";
import { getPeople, getCharacter, searchCharacter } from "./api/people";
import './App.css';


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
    const id = Number(character.url.split('/').slice(-2)[0])
    setCurrentCharacter(id);
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
  }

  return (
    <div>

      <form className="d-flex  ">
        <input className="mx-auto my-2" ref={inputSearch} type="text" onChange={handleSearch} placeholder="Search for a character"></input>

      </form>
      <div className="d-flex flex-column ">
        <h1 className="mx-auto">Starwars Characters</h1>
        <h6 className="mx-auto">A guide from a galaxy far, far away </h6>
      </div>

      <div className="row d-flex">
        {people?.results?.map((character) => (
          <div class="card mb-3 mx-2 col-6 text-center mx-auto" key={character.name} onClick={() => showDetails(character)} data-bs-toggle="modal" data-bs-target="#exampleModal">
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
          <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">{details.name}</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>Mass: {details.mass}</p>
                  <p>Height: {details.height}</p>
                  <p>Year of Birth: {details.birth_year}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        </>

      )}

    </div>
  );
}

export default App;
