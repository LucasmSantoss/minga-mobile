import { configureStore } from '@reduxjs/toolkit'
import bottomTabsReducer from "./Profile/reducer"

export const store = configureStore ({
  reducer: {
    bottomTabsReducer: bottomTabsReducer
  },
  devTools: true,
})
