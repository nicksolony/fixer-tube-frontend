import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import LoadData from './LoadData'



const Category = (props) => {
    
    if (props.mainCategories.length<1) {
        return (<LoadData/>)
    } else {
        const category = props.categories.find((category)=>category.slug===props.match.params.slug); 
        const videos = props.videos.filter(video=>video.category_id===category.id).sort(comprare)
        const brands = props.brands;

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
        return (
            <div>
                <div className="mainCategoryListing">
                    <h1>{category.name}</h1>
                    <h2>Videos</h2>
                    <ul>
                        {videos.map(video=>
                          
                           <Link to={`/videos/${video.slug}`} key={`video${video.id}`}>
                               <li key={video.id}>{brands.find((brand)=>brand.id===video.brand_id).name} - {video.name}</li>
                            </Link>
                        )}
                    </ul>
                        
                     
                </div>
            </div>
        )
    }
}



const mapStateToProps = (store) => store.main;

export default connect (mapStateToProps)(Category);

