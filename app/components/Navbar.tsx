import {Link} from "react-router";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to= "/">
        <p className="text-2xl font-bold text-gradient">LynxV</p>
      </Link>
      <Link to='/upload ' className="primary-button w-fit">
        Upload Resume
      </Link>
    </nav>
  )
}

export default Navbar