import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const read_all_companies = createAsyncThunk("read_all_companies", async () => {
  let token = localStorage.getItem('token')
  let headers = { headers: { 'Authorization': `Bearer ${token}` } }
  try {
    let res = await axios.get("https://minga-grupoblanco.onrender.com/api/companies/admin",headers);
    //console.log(res)
    return { active_company: res.data.companyActive , inactive_company: res.data.companyInactive};
  } catch (error) {
    return { active_company: [], inactive_company:[]};
}});
  
const update_active =createAsyncThunk(
  "update_active",
  async({_id, active})=>{
    let token = localStorage.getItem('token')
    let headers = { headers: { 'Authorization': `Bearer ${token}` } }
    try {
      console.log(_id)
      let response = await axios.put(`https://minga-grupoblanco.onrender.com/api/companies/admin/${_id}` , {active:active},headers);
      console.log(response)
      return {
        company: response.data.company,
        success: true
      }
    } catch (error) {
      //console.log(error);
      return {
        company: [],
        success: true
      }
    }
  }
)


  const companyActions = { read_all_companies, update_active};
  export default companyActions;
