const LOAD_DATA = 'LOAD_DATA';
const ADD_VIDEO = 'ADD_VIDEO';
const EDIT_VIDEO = 'EDIT_VIDEO';
const DELETE_VIDEO = 'DELETE_VIDEO';

export const loadData = () => {
    return (dispatch) => {
        fetch('http://localhost:3001/main_categories')
        .then(resp => resp.json())
        .then(data => dispatch({type: LOAD_DATA, payload: data}))
    }
};

export const addVideo = (newVideo,history) => {
    
    return (dispatch) => {
        fetch('http://localhost:3001/videos/',{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Accepts':'application/json'
            },
            body: JSON.stringify(newVideo)
        })
        .then(resp => resp.json())
        .then(newVideoObj => {
            dispatch({type: ADD_VIDEO, payload: newVideoObj})
            history.push(`${newVideoObj.slug}`)
        })
    }
};

export const editVideo = (editedVideo,history) => {
    
    return (dispatch) => {
        fetch(`http://localhost:3001/videos/${editedVideo.slug}`,{
            method: 'put',
            headers: {
                'Content-Type':'application/json',
                'Accepts':'application/json'
            },
            body: JSON.stringify(editedVideo)
        })
        .then(resp => resp.json())
        .then(editedVideoObj => {
            dispatch({type: EDIT_VIDEO, payload: editedVideoObj})
            history.push(`/videos/${editedVideoObj.slug}`)
        })
    }
};


export const deleteVideo = (video,history) => {
    
    return ((dispatch) => {
        fetch(`http://localhost:3001/videos/${video.slug}`,{
            method: 'delete',
            headers: {
                'Content-Type':'application/json',
                'Accepts':'application/json'
            }
        })
        dispatch({type: DELETE_VIDEO, payload: video.id})
        history.push(`/`)
        })
    }
