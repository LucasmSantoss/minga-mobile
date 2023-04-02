// import { createReducer } from "@reduxjs/toolkit";
// import mangasActions from './actions'

// const {read_mangas, read_manga} = mangasActions

// const initialState ={
//     mangas: [],
//     manga: {}
// }

// const reducer = createReducer(
//     initialState,
//     (builder) => builder
//     .addCase(
//         read_mangas.fulfilled,
//         (state,actions)=>{
//             let newState = {
//                 ...state,
//                 mangas: actions.payload.mangas
//             }
//             return newState
//         }
//     )
//     .addCase(
//         read_manga.fulfilled,
//         (state,actions)=>{
//             let newState = {
//                 ...state,
//                 manga: actions.payload.manga
//             }
//             return newState
//         }
//     )
// )

// export default reducer


import { createReducer } from "@reduxjs/toolkit"
import actions from './actions'


const { captureChapter, captureManga} = actions

const initialstate = {
   manga:[],
   chapter:[],
}

const reducer = createReducer(
    initialstate,
    (builder) => builder
   .addCase(
            captureManga.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    manga: action.payload.manga
                }
                return newState
            }
        )
      .addCase(
            captureChapter.fulfilled,
            (state,action)=>{
                let newState = {
                    ...state,
                    chapter: action.payload.chapter
                }
                return newState
            }
        ) 
     
)
export default reducer 