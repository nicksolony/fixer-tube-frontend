import React from 'react';
import {Link} from 'react-router-dom';



const MainCategoryBtn = (props) => {
    return (
       
            <Link to={`/main_categories/${props.category.slug}`}>
                <img src={props.category.icon_src} alt={props.category.name} width="200px" height="200px"/>
            </Link>
       
    )
}

export default MainCategoryBtn;

