import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./components/figmaSlice";

const store = configureStore({
    reducer: {
        data: dataReducer,
    },
});

export default store;
