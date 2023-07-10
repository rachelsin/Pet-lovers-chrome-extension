import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the async thunk for fetching weather data
export const fetchWeatherData = createAsyncThunk(
    'weather/fetchWeatherData',
    async (coordinates, { rejectWithValue }) => {
        try {
            const { latitude, longitude } = coordinates;
            const apiKey = 'cf2e7ca89c37d7508766faa5723d2499';
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch weather data.');
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeatherData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWeatherData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchWeatherData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const selectWeatherData = (state) => state.weather.data;
export const selectWeatherLoading = (state) => state.weather.loading;
export const selectWeatherError = (state) => state.weather.error;

export default weatherSlice.reducer;
