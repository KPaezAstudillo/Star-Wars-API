import React from 'react'

export default function Navbar({ref, onChange}) {
    return (
        <nav className="navbar navbar-dark bg-dark">
            <div className="container-fluid">
                {/* <img src='https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png' height='100px' /> */}
                <form className="d-flex" role="search">
                    <input className="form-control mx-auto" type="search" placeholder="Search for a character" aria-label="Search" ref={ref} onChange={onChange}/>
                </form>
            </div>
        </nav>
    )
}
