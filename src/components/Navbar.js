import './navbar.css';
import logo from '../assets/image.png'
import { Link } from 'react-router-dom';
function Navbar(){
    return(
        <nav className="navbar">
            <div className="logo">
                <img src={logo} alt="Codeforces Logo"></img>
            </div>
            <div className="name">
                <h1>
                    CF Problem Recommender
                </h1>
            </div>
            <div className="navlinks">
                <Link to="/" className='as'>Home</Link>
                <Link to="/about" className='as'>About CF</Link>
            </div>
        </nav>
    )
}
export default Navbar;