import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
// import MainCategories from "./MainCategories"
// import {loadData} from "../redux/actions/videoActions"

import LoadData from './LoadData';

function comprare(a, b) {
    const videoA = a.name.toUpperCase();
    const videoB = b.name.toUpperCase();
  
    let comparison = 0;
    if (videoA > videoB) {
      comparison = 1;
    } else if (videoA < videoB) {
      comparison = -1;
    }
    return comparison;
}

function returnResults(mainCategory,brand,videos, categories) {
    return (
        <div>
            <div className="mainCategoryListing">
               { !!mainCategory ? <h1>{mainCategory.name} - {brand.name}</h1>: <h1>{brand.name}</h1>}
                
                <h2>Videos</h2>
                <ul>
                    {videos.map(video=>
                      
                       <Link to={`/videos/${video.slug}`} key={video.id}>
                           <li >{categories.find((category)=>category.id===video.category_id).name} - {video.name}</li>
                        </Link>
                    )}
                </ul>
                    
                 
            </div>
        </div>
    )
}


const Brand = (props) => {
    
    if (props.mainCategories.length<1) {
        return (<LoadData/>)
    } else {
        const mainCategory = props.mainCategories.find((cat)=>cat.slug===props.match.params.main_category_slug);
        const brand = props.brands.find((brand)=>brand.slug===props.match.params.slug);
        
        
        if (mainCategory) {
            const categories = props.categories.filter(category=>category.main_category_id === mainCategory.id)

            const categoryIds = categories.map(category=>{return category.id})
            const videos = props.videos.filter(video=>categoryIds.includes(video.category_id)).filter(video=>video.brand_id===brand.id)
            return (returnResults(mainCategory,brand,videos, categories))

        } else {
            const categories = props.categories;
            const videos = props.videos.filter(video=>video.brand_id===brand.id).sort(comprare)
            return (returnResults(mainCategory,brand,videos, categories))
        }

    }
}



const mapStateToProps = (store) => store.main;


export default connect (mapStateToProps)(Brand);

