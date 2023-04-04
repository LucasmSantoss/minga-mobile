import { createReducer } from "@reduxjs/toolkit";
import AuthorActions from "./actions.js";

const {read_author,update_author, read_all_authors, update_active_author} = AuthorActions

const initialState ={
    author: [], 
    authorupdate: {}, 
    activeAuthor: {}, 
    inactiveAuthor: {}
}

const reducer = createReducer(
    initialState,
    (builder)=> builder
    .addCase(
        read_author.fulfilled,
        (state,actions)=>{
            let newState ={
                ...state,
                author: actions.payload.author
            }
            return newState
        }
    )
    .addCase(read_all_authors.fulfilled, (state, action) => {
            let newState = {
              ...state,
              activeAuthor: action.payload.active_authors,
              inactiveAuthor: action.payload.inactive_authors,
      
            }
            return newState;
        }
    )
    .addCase(
        update_author.fulfilled,
        (state,actions)=>{
            let newState ={
                ...state,
                author: actions.payload.author
            }
            return newState
        }
    )
    .addCase(
            update_active_author.fulfilled,
            (state, action) => {
              let newState = {}
              if (action.payload.success) {
                let _id = action.payload.author._id
                let active = action.payload.author.active
                if (active) {
                  newState = {
                    ...state,
                    inactiveAuthor:state.inactiveAuthor.filter(item=>item._id !== _id ),
                    activeAuthor:[...state.activeAuthor, action.payload.author]
                  }
                }else {
                  newState = {
                    ...state,
                    activeAuthor:state.activeAuthor.filter(item=>item._id !== _id ),
                    inactiveAuthor:[...state.inactiveAuthor, action.payload.author]
                  }
                }
              }
      
            })
)


export default reducer

// import { createReducer } from "@reduxjs/toolkit";
// import authorActions from "./actions";
// const { read_author, update_author, read_all_authors, update_active_author } = authorActions;
// const initialState = { author: "", authorupdate: {}, activeAuthor: {}, inactiveAuthor: {} };

// const authorReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(read_author.fulfilled, (state, action) => {
//       action.payload.author.createdAt = action.payload.author.createdAt
//        ?.slice(0, 10)
//        .split("-")
//         .reverse()
//         .join("/");
//       let newState = {
//         ...state,
//         author: action.payload.author,
//       };
//       return newState;
//     })

//     .addCase(read_all_authors.fulfilled, (state, action) => {
//       let newState = {
//         ...state,
//         activeAuthor: action.payload.active_authors,
//         inactiveAuthor: action.payload.inactive_authors,

//       };
//       return newState;
//     })
//     .addCase(
//       update_author.fulfilled,
//       (state, actions) => {
//         let newState = {
//           ...state,
//           author: actions.payload.author
//         }
//         return newState
//       })
//     .addCase(
//       update_active_author.fulfilled,
//       (state, action) => {
//         let newState = {}
//         if (action.payload.success) {
//           let _id = action.payload.author._id
//           let active = action.payload.author.active
//           if (active) {
//             newState = {
//               ...state,
//               inactiveAuthor:state.inactiveAuthor.filter(item=>item._id !== _id ),
//               activeAuthor:[...state.activeAuthor, action.payload.author]
//             }
//           }else {
//             newState = {
//               ...state,
//               activeAuthor:state.activeAuthor.filter(item=>item._id !== _id ),
//               inactiveAuthor:[...state.inactiveAuthor, action.payload.author]
//             }
//           }
//         }

//       })
// });
// export default authorReducer