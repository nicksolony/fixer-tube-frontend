export default function videoReducer (state = {mainCategories:[],brands:[],categories:[],videos:[]},action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return {...state,
                mainCategories: action.payload.main_categories,
                categories: action.payload.categories.sort((a, b) => a.name.localeCompare(b.name)),
                brands: action.payload.brands.sort((a, b) => a.name.localeCompare(b.name)),
                videos: action.payload.videos.sort((a, b) => a.name.localeCompare(b.name))
              }
        case 'ADD_VIDEO':
            // state.videos.push(action.payload)
            // const newArr = 
            return {...state,
                videos: [...state.videos, action.payload],
                newVideo: action.payload
            }
        case 'EDIT_VIDEO':
            const updatedArr = state.videos.map(video=>{
                if (video.id !== action.payload.id) {
                    return video
                } else {
                    return action.payload
                }
            })
            return {...state,
                videos: updatedArr,
                editedVideo: action.payload
            }
        case 'DELETE_VIDEO':
            return {...state,
                videos: state.videos.filter(video=>video.id !== action.payload)
            }
        default:
            return state;
    }
}