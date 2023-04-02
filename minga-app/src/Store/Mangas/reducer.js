import { createReducer } from "@reduxjs/toolkit";
import mangasActions from './actions'

const {read_mangas, read_manga} = mangasActions

const initialState ={
    mangas: [],
    manga: {}
}

const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        read_mangas.fulfilled,
        (state,actions)=>{
            let newState = {
                ...state,
                mangas: actions.payload.mangas
            }
            return newState
        }
    )
    .addCase(
        read_manga.fulfilled,
        (state,actions)=>{
            let newState = {
                ...state,
                manga: actions.payload.manga
            }
            return newState
        }
    )
)

export default reducer