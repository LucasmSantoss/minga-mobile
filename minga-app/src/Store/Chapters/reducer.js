import { createReducer } from "@reduxjs/toolkit";
import chaptersActions from "./actions"

const { read_chapters, get_chapter } = chaptersActions

const initialState ={
    chapters : [], 
    count: 0,
    chapter: {}
}

const reducer = createReducer(
    initialState,
    (builder) => builder
    .addCase(
        read_chapters.fulfilled,
        (state,actions)=>{
            console.log(actions)
            let newState = {
                ...state,
                chapters: actions.payload.chapters,
                count: actions.payload.count
            }
            return newState
        }
    )
    .addCase(
        get_chapter.fulfilled,
        (state,actions)=>{
            let newState = {
                ...state,
                chapter: actions.payload.chapter
            }
            return newState
        }
    )
)

export default reducer