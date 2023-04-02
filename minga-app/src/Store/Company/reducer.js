import { createReducer } from "@reduxjs/toolkit";
import  companyActions  from "./actions";
const {read_all_companies, update_active} = companyActions
const initialState = {
    companies: "",inactiveCompany:{},activeCompany:{}
};

const companyReducer = createReducer(
    initialState, (builder) => {
        builder.addCase(read_all_companies.fulfilled,
            (state, action) => {
                let newState = {
                    ...state,
                    activeCompany: action.payload.active_company,
                    inactiveCompany: action.payload.inactive_company,
            
                }
                return newState;
            })
            .addCase(
                update_active.fulfilled,
                (state, action) => {
                  let newState = {}
                  if (action.payload.success) {
                    let _id = action.payload.company._id
                    let active = action.payload.company.active
                    if (active) {
                      newState = {
                        ...state,
                        inactiveCompany:state.inactiveCompany.filter(item=>item._id !== _id ),
                        activeCompany:[...state.activeCompany, action.payload.company]
                      }
                    }else {
                      newState = {
                        ...state,
                        activeCompany:state.activeCompany.filter(item=>item._id !== _id ),
                        inactiveCompany:[...state.inactiveCompany, action.payload.company]
                      }
                    }
                  }
          
                });
    });

export default companyReducer;