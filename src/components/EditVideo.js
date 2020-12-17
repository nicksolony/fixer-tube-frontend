import React, {Component} from 'react';
import { connect } from "react-redux";
import Select from 'react-select';
import { editVideo } from "../redux/actions/videoActions";

class EditVideo extends Component {
    
    video = this.props.videos.find(video=>video.slug===this.props.match.params.slug)

    state = {
        name: "",
        description:'',
        url:'',
        brandId:null,
        categoryId:null,
        slug:'',
        errors: {
            name:"* Required",
            url:"* Required",
            brandId:"Please select Brand, if can't find specific brand choose other",
            categoryId:"Please select Category",
        }
    };

    componentDidMount() {
        
        this.setState({name: this.video.name,
             description: this.video.description,
             url: this.video.url,
             brandId:this.video.brand_id,
             categoryId:this.video.category_id,
             slug: this.video.slug,
             errors: {
                 name:"",
                 url:"",
                 brandId:"",
                 categoryId:"",}
       })
    }

    handleChange = (e) => {
        
        // this.setState({[e.target.name]: e.target.value});

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

    editCurrentVideo = (video) => {
        const editedVideo = {
            "name": video.name,
            "description": video.description,
            "url":video.url,
            "brand_id":video.brandId,
            "category_id":video.categoryId,
            "slug":video.slug
        }
        
        this.props.editVideo(editedVideo,this.props.history)
        
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
            this.editCurrentVideo(this.state);
        } else {
            alert("Please correct all errors")
        }
    }; 

    render(props) {
        const brands = this.props.brands.map(brand=>({ value: brand.id, label: brand.name }));
        const categories = this.props.categories.map(category=>({ value: category.id, label: category.name }));
        const {errors} = this.state;
        let video={}
        if (this.video) {
            video = this.video
        } else {
            video = this.props.videos.find(video=>video.slug===this.props.editedVideo.slug)
        }
        
        const brand = this.props.brands.find(brand => brand.id===video.brand_id)
        const category = this.props.categories.find(category => category.id===video.category_id)
        
      
        return(
            <div>
                <div className="newEditVideo"> 
                    
                    <form onSubmit={this.handleSubmit}>
                        <table>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td><h2>Edit video here:</h2></td>
                                    <td></td>
                                </tr>
                            <tr>
                                <td><label>Video Name: </   label></td>
                                <td align="left"><input type="text"  size="47" name="name" value= {this.state.name}  placeholder="Type name of your video here" onChange={this.handleChange}/></td>
                                <td>{errors.name.length > 0 && <span className='error'>{errors.name}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Video Description: </label></td>
                                <td align="left"><textarea rows="4" cols="50"name="description" value= {this.state.description}  placeholder="Type description of your video here" onChange={this.handleChange}/></td>
                            </tr>
                            <tr>
                                <td><label>Brand: </label></td>
                                <td align="left"><Select 
                                    value={this.state.value}
                                    onChange={this.handleBrandSelection}
                                    options={brands}
                                    defaultValue={{ label: `${brand.name}`, value: brand.id }}
                                />
                                </td>
                                <td>{errors.brandId.length > 0 && <span className='error'>{errors.brandId}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>Category: </label></td>
                                <td align="left"><Select 
                                    value={this.state.value}
                                    onChange={this.handleCategorySelection}
                                    options={categories}
                                    defaultValue={{ label: `${category.name}`, value: category.id }}
                                /></td>
                                <td>{errors.categoryId.length > 0 && <span className='error'>{errors.categoryId}</span>}</td>
                            </tr>
                            <tr>
                                <td><label>YouTube URL: </label></td>
                                <td align="left"><input size="47" type="text" name="url" value= {this.state.url}  placeholder="Paste YouTube link here - https://www.youtube.com/watch?v=HYVJcq7Ika8" onChange={this.handleChange}/></td>
                                <td>{errors.url.length > 0 && <span className='error'>{errors.url}</span>}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Update Video"/></td>
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
        editVideo: (editedVideo,history) => dispatch(editVideo(editedVideo,history))
    }
  }


export default connect(mapStateToProps,mapDispatchToProps)(EditVideo);