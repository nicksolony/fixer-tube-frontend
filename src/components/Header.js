import React, {Component} from 'react';
import MainCategories from './MainCategories';
import Navbar from './Navbar';



class Header extends Component {
    render() {
        return(
            <div>
                <Navbar />
               < MainCategories />
            </div>
        )
    }
}

export default Header;