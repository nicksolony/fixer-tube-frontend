import React, {Component} from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { addVideo } from "../redux/actions/videoActions";

class NewVideo extends Component {

    state = {
        name:'',
        description:'',
        url:'',
        brandId:null,
        categoryId:null,
        errors: {
            name:"* Required",
            url:"* Required",
            brandId:"Please select Brand, if can't find specific brand choose other",
            categoryId:"Please select Category",
        }
    };

    handleChange = (e) => {
        
       

        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {
            
            case 'name': 
              if (value==='') {
                  errors.name = "Name can't be blank!"
              } else if (this.props.videos.find(video=>video.name===value)) {
                errors.name = "Video with this name exist!"
              } else {
                errors.name = ''
              }
              break;
            case 'url': 
              if (value==='') {
                  errors.url = "URL can't be blank!"
              } else if (this.props.videos.find(video=>video.url===value)) {
                errors.url = "Video with this url exist!"
              } else {
                errors.url = ''
              }
              break;
            default:
              break;
          }
        
          this.setState({errors, [name]: value})
        
        
    };

    handleBrandSelection = (brand) =>{ 
        let errors = this.state.errors;
        if (!!brand.value) {
            errors.brandId=""  
        } else {
            errors.brandId="Brand can't be blank!"
        } 
        this.setState({errors, brandId: brand.value})
    };

    handleCategorySelection = (category) =>{
        this.setState(
            {categoryId: category.value}
        )

        let errors = this.state.errors;
        if (!!category.value) {
            errors.categoryId=""  
        } else {
            errors.categoryId="Category can't be blank!"
        } 
        this.setState({errors, categoryId: category.value})

    };

    createNewVideo = (video) => {
        const newVideo = {
            "name": video.name,
            "description": video.description,
            "url":video.url,
            "brand_id":video.brandId,
            "category_id":video.categoryId
        }
        
        this.props.addVideo(newVideo,this.props.history)
        
        this.setState({
            name:'',
            description:'',
            url:'',
            brandId:null,
            categoryId:null
        })
    };

    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(value => {
            value.length > 0 && (valid = false)
        });
        return valid;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.validateForm(this.state.errors)) {
            this.createNewVideo(this.state);
        } else {
            alert("Please fill in required fields")
        }
    };
    


    render(props) {
        const brands = this.props.brands.map(brand=>({ value: brand.id, label: brand.name }));
        const categories = this.props.categories.map(category=>({ value: category.id, label: category.name }));
        const {errors} = this.state;
        return(
            <div>
                <div className="newEditVideo"> 
                    
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><h2>Add new video here:</h2></td>
                                    <td></td>
                                </tr>
                            <tr>
                                <td><label>Video Name: </   label></td>
                                <td align="left"><input type="text" size="40" name="name" value= {this.state.name}  placeholder="Type name of your video here" onChange={this.handleChange}/></td>
                                <td>{errors.name.length > 0 && <span className='error'>{errors.name}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Video Description: </label></td>
                                <td align="left"><textarea rows="4" cols="43"name="description" value= {this.state.description}  placeholder="Type description of your video here" onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><label>Brand: </label></td>
                                <td align="left"><Select 
                                    value={this.state.value}
                                    onChange={this.handleBrandSelection}
                                    options={brands}
                                /></td>
                                <td>{errors.brandId.length > 0 && <span className='error'>{errors.brandId}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Category: </label></td>
                                <td align="left"><Select 
                                    value={this.state.value}
                                    onChange={this.handleCategorySelection}
                                    options={categories}
                                /></td>
                                <td>{errors.categoryId.length > 0 && <span className='error'>{errors.categoryId}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>YouTube URL: </label></td>
                                <td align="left"><input size="40" type="text" name="url" value= {this.state.url}  placeholder="Paste YouTube link here - https://www.youtube.com/watch?v=HYVJcq7Ika8" onChange={this.handleChange}/></td>
                                <td>{errors.url.length > 0 && <span className='error'>{errors.url}</span>}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Add Video"/></td>
                            </tr>
                            </tbody>
                        </table>   
                    </form>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (store) => store.main;
const mapDispatchToProps = (dispatch) => {
    return {
        addVideo: (newVideo,history) => dispatch(addVideo(newVideo,history))
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(NewVideo);