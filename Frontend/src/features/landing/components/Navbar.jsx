import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import "./../styles/navbar.scss";

const Navbar = () => {

    const [open, setOpen] = useState(false);

    // Later replace this with your auth context
    const user = false;

    return (
        <nav className="navbar">

            <div className="logo">
                HireReady <span>AI</span>
            </div>


            <div className={`nav-links ${open ? "active" : ""}`}>

                <Link to="/">Home</Link>
                <a href="#features">Features</a>
                <a href="#how-it-works">How it Works</a>
                <a href="#about">About</a>


                {
                    user ? (
                        <>
                            <Link to="/dashboard">
                                Dashboard
                            </Link>

                            <button>
                                Logout
                            </button>
                        </>
                    )
                    :
                    (
                        <>
                            <Link 
                              className="login-btn"
                              to="/login"
                            >
                                Login
                            </Link>

                            <Link 
                              className="signup-btn"
                              to="/register"
                            >
                                Get Started
                            </Link>
                        </>
                    )
                }

            </div>


            <button 
              className="menu"
              onClick={() => setOpen(!open)}
            >
                {
                    open ? 
                    <X /> :
                    <Menu />
                }
            </button>

        </nav>
    )
}


export default Navbar;