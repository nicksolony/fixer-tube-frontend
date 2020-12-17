import React from 'react';
import {Link} from 'react-router-dom';



const BrandItem = (props) => {
    return (
        
    <Link to={`${props.url}/brands/${props.item.slug}`}><h3>{props.item.name}</h3></Link>
    )
}
       

export default BrandItem;

