import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import { connect } from "react-redux";
import {deleteVideo} from "../redux/actions/videoActions"
import LoadData from './LoadData';


class Video extends Component {
    
    video = this.props.videos.find(video=>video.slug===this.props.match.params.slug)

    handleEdit = () =>{
        this.props.history.push(`/videos/${this.props.match.params.slug}/edit`);
    }

    handleDelete = () =>{
        this.props.deleteVideo(this.video,this.props.history)
    }
    
    
    render() {
    
        if (this.props.mainCategories.length<1) {
            return (<LoadData/>)
        } else {

        if (this.video) {
        const {name, description, url,brand_id,category_id} = this.video;
        const shortUrl = url.split("https://www.youtube.com/watch?v=")[1]
        const link = `https://www.youtube.com/embed/${shortUrl}`
        const brand=this.props.brands.find((brand)=>brand.id===brand_id)
        const category=this.props.categories.find((category) =>category.id===category_id)
        
        return (
            <div className="video">
                <h2>
                    {name} 
                    <input type="submit" value="✏️" onClick={this.handleEdit}/>
                    <input type="submit" value="🗑️" onClick={this.handleDelete}/>
                </h2>
                <h3><Link to={`/categories/${category.slug}`}>  {category.name}</Link> - <Link to={`/brands/${brand.slug}`}>{brand.name}</Link></h3>
                <p>{description}</p>
                <div>
                    <iframe title={name} width="560" height="315"   src={link}  frameBorder="0"   allow="accelerometer; autoplay;   clipboard-write; encrypted-media; gyroscope;  picture-in-picture"  allowFullScreen="allowFullScreen"></iframe>
                </div>
                
            </div>
        )
        } else {
            this.props.history.push('/');
        }
    }
}   
}

const mapStateToProps = (store) => store.main;

const mapDispatchToProps = (dispatch) => {
    return {
        deleteVideo: (video,history) => dispatch(deleteVideo(video,history))
    }
  }


export default connect (mapStateToProps,mapDispatchToProps)(Video);