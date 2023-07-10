import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slice/weatherSlice';
import backgroundReducer from './slice/backgroundSlice';
import googleSearchReducer from './slice/googleSearchSlice';

const store = configureStore({
    reducer: {
        weather: weatherReducer,
        background: backgroundReducer,
        search: googleSearchReducer,
    },
});

export default store;


