import React, {Component} from "react";
import { connect } from "react-redux";
import MainCategoryBtn from "./MainCategoryBtn"



class MainCategories extends Component {

    render() {
        if (this.props.mainCategorie<1) {
            return (
                <div>LOADING...</div>
            )
        } else {
            
            const rowSize=this.props.mainCategories.length/2
            const row1 = this.props.mainCategories.slice(0,rowSize)
            const row2 = this.props.mainCategories.slice(rowSize,this.props.mainCategories.length)
            return(
                <div >
                   <table className="MainCategories">
                       <tbody>
                            <tr>
                                {row1.map((cat) => <td className='mainCategory' key={cat.id}><MainCategoryBtn category={cat} key={cat.id}/></td>)}
                            </tr>
                            <tr>
                                {row2.map((cat) => <td className='mainCategory' key={cat.id}><MainCategoryBtn category={cat} key={cat.id}/></td>)}
                         </tr>
                        </tbody>
                   </table>
                </div>
            )   
        }
    }
}

const mapStateToProps = (store) => store.main;


export default connect (mapStateToProps)(MainCategories);