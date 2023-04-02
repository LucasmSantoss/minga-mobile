// import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const read_mangas = createAsyncThunk(
//     "read_mangas",
//     async ({ page, inputText, categories, order, headers }) => {
//         try{
//             let response = await axios.get("https://minga-grupoblanco.onrender.com/api/manga/?page="+page+"&title="+inputText.trim()+"&category="+categories+"&order="+order,headers)
//             console.log(response)
//             return { mangas: response.data.mangas}
            
//         }catch(error){
//             return { mangas: '' }
//         }
//     }
// )

// const read_manga = createAsyncThunk(
//     'read_manga',
//     async ({ id }) => {
//         let token = localStorage.getItem('token')
//         let headers = { headers: { 'Authorization': `Bearer ${token}` } }
//         let url = 'https://minga-grupoblanco.onrender.com/api/manga/' + id;
//         try {
//             let response = await axios.get(url, headers)
//             return {
//                 manga: response.data.manga
//             } 

//         } catch (error) {
//             return {
//                 manga: {}
//             }
//         }
//     }
// )



// const actions = { read_mangas, read_manga }

// export default actions

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let captureManga = createAsyncThunk(
    'captureManga',
    async ({ manga_id }) => {
        try {
            let response = await axios.get(`https://minga-0gy1.onrender.com/mangas/` + manga_id)
            return {
                manga: response.data.manga
            }
        } catch (error) {
            console.log(error)
            return {
                manga: []
            }
        }
    }
)
const captureChapter = createAsyncThunk(
    'captureChapter',
    async ({ manga_id, page }) => {
        try {
            let response = await axios.get("https://minga-0gy1.onrender.com/chapters?manga_id=" + manga_id + "&page=" + page)
            return { chapter: response.data.chapter }
        } catch (error) {
            return { chapter: [] }
        }
    }
)

const actions = { captureChapter, captureManga }

export default actions 