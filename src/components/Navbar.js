import React from 'react';
import { Link } from "react-router-dom";
import Search from './Search';

const Navbar = () => {


    
        return(
            <div id='NavBar' >
                
                <Link to="/" className="navItem">Home</Link>
                
                <Link to="/videos/new" className="navItem">Add Video</Link>
                
                <Search className="SearchForm"/>        
                
            </div>
        )
    }



export default Navbar;