import React ,{useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'



const Navbar = () => {
  let location=useLocation()
  useEffect(() => {
    console.log(location)
  }, [location])
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNotebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""} `} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/About"?"active":""} `} to="/About">About</Link>
        </li>
        
        
      </ul>
      <form className="d-flex" >

      <Link className="btn btn-primary  me-2" to="/login" style={{marginLeft:1050}} role="button">Login</Link>
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
