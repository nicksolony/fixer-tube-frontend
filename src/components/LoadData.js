import React from 'react';
import { connect } from "react-redux";
import {loadData} from "../redux/actions/videoActions"


const LoadData = (props) => {
    
        props.loadDataFromDb()
        return (
            <div>LOADING...</div>
        )
    
}


const mapDispatchToProps = (dispatch) => {
    return {
        loadDataFromDb: () => dispatch(loadData())
    }
  }

export default connect (null,mapDispatchToProps)(LoadData);

