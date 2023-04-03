import { configureStore } from '@reduxjs/toolkit'
import bottomTabsReducer from "./Perfil/reducer"
import mangaReducer from "./Manga/reduce"
import captureState from "./Capture/reducer"
import mangaClickReducer from "./Details/reducer"

export const store = configureStore ({
  reducer: {
    bottomTabsReducer: bottomTabsReducer,
    mangareducer: mangaReducer,
    checked: captureState,
    mangaClickReducer: mangaClickReducer
  },
  devTools: true,
})
