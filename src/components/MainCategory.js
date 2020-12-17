import React from 'react';
import { connect } from "react-redux";
import ListItem from './ListItem';
import BrandItem from './BrandItem';
import LoadData from './LoadData';



const MainCategory = (props) => {
    
    if (props.mainCategories.length<1) {
        return (<LoadData/>)
    } else {
        const mainCategory = props.mainCategories.find((cat)=>cat.slug===props.match.params.slug);
        const categories = props.categories.filter(category=>category.main_category_id === mainCategory.id);
       

        const videos = []
        categories.map(category=> videos.push(props.videos.filter(video=>video.category_id ===category.id)))
        const brandIds = videos.flat(2).map(vid=>{return vid.brand_id})
        const brands = props.brands.filter(brand=>brandIds.includes(brand.id))
        const categoryIds = videos.flat(2).map(vid=>{return vid.category_id})
        const selectedCategories = categories.filter(category=>categoryIds.includes(category.id))


        return (
            <div>
              
                <div className="mainCategoryListing">
                    <h1>{mainCategory.name}</h1>
                    <table align="center" margin-right="200px">
                        <tbody>
                        <tr>
                            <td width="50%"><h2>Categories</h2></td>
                        </tr>
                        <tr>
                            <td aligh="right">{selectedCategories.map(cat=>
                                <ListItem item={cat} mainCat={mainCategory} url={'/categories'} key={`category${cat.id}`}/>
                                )}
                            </td>
                            
                        </tr>
                        <tr>
                        <td width="50%"><h2>Brands</h2></td>
                        </tr>
                        <tr><td aligh="right">{brands.map(brand=>
                                <BrandItem item={brand} mainCat={mainCategory} url={`/mainCategory/${mainCategory.slug}`}key={`brand${brand.id}`}/>
                                )}
                            </td></tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
}



const mapStateToProps = (store) => store.main;


export default connect (mapStateToProps)(MainCategory);

