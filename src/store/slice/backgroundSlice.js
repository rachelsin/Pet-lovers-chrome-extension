import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// const petFromLocalStorage = localStorage.getItem('pet');

// const initialPet = petFromLocalStorage ? petFromLocalStorage : 'dog';

export const fetchRandomDogImage = createAsyncThunk(
    'background/fetchRandomDogImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/image/random');
            const data = await response.json();
            return data.message;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchRandomCatImage = createAsyncThunk(
    'background/fetchRandomCatImage',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://api.thecatapi.com/v1/images/search');
            const data = await response.json();
            return data[0].url;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const backgroundSlice = createSlice({
    name: 'background',
    initialState: {
        pet: 'dog',
        imageURL: '',
        loading: false,
        error: null,
    },
    reducers: {
        setImageURL: (state, action) => {
            state.imageURL = action.payload;
        },
        setPet: (state, action) => {
            state.pet = action.payload;
            // localStorage.setItem('pet', action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRandomDogImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomDogImage.fulfilled, (state, action) => {
                state.loading = false;
                state.imageURL = action.payload;
            })
            .addCase(fetchRandomDogImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchRandomCatImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRandomCatImage.fulfilled, (state, action) => {
                state.loading = false;
                state.imageURL = action.payload;
            })
            .addCase(fetchRandomCatImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setImageURL, setPet } = backgroundSlice.actions;
export const selectImageURL = (state) => state.background.imageURL;
export const selectLoading = (state) => state.background.loading;
export const selectError = (state) => state.background.error;

export default backgroundSlice.reducer;
