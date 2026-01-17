import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">Overview</Link>
    <Link to="/lighting">Lighting</Link>
    <Link to="/vision">Vision</Link>
    <Link to="/safety">Safety</Link>
    <Link to="/logs">Logs</Link>
    <Link to="/settings">System</Link>
  </nav>
);

export default Navbar;
