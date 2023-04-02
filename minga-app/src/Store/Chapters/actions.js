import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const read_chapters = createAsyncThunk(
    'read_chapters',
    async ({ id, page, limit }) => {
        let token = localStorage.getItem('token')
        let headers = { headers: { 'Authorization': `Bearer ${token}` } }
        let url = ''
        if (page) {
            url = 'https://minga-grupoblanco.onrender.com/api/chapters?manga_id=' + id + '&page=' + page;
        }
        if (limit === 0) {
            url = 'https://minga-grupoblanco.onrender.com/api/chapters?manga_id=' + id + '&limit=' + limit;
        }

        try {
            let response = await axios.get(url, headers)
            console.log(response)
            return {
                chapters: response.data.chapter,
                count: response.data.count
            }
        } catch (error) {
            return {
                chapters: [],
                count: 0
            }
        }
    }
)

const get_chapter = createAsyncThunk(
    'get_chapter',
    async ({ id }) => {
        if ( id ) {

            let token = localStorage.getItem('token')
            let headers = { headers: { 'Authorization': `Bearer ${token}` } }
            let url = 'https://minga-grupoblanco.onrender.com/api/chapters/' + id;
            try {
                let response = await axios.get(url, headers)
                return {
                    chapter: response.data.chapter
                }
            } catch (error) {
                return {
                    chapter: {}
                }
            }
        } else {
            return {
                chapter: {}
            }
        }
    }
)

const actions = { read_chapters, get_chapter }

export default actions