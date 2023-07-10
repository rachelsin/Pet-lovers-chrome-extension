// searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSearchResults = createAsyncThunk(
    'search/fetchSearchResults',
    async (searchInput) => {
        try {
            const response = await fetch(`https://www.google.com/search?q=${searchInput}`);
            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error('Failed to fetch search results');
        }
    }
);

const searchSlice = createSlice({
    name: 'search',
    initialState: {
        searchInput: '',
        searchType: 'https://www.google.com/search?q=',
        searchResults: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setSearchType: (state, action) => {
            state.searchType = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSearchResults.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchSearchResults.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(fetchSearchResults.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export const { setSearchInput, setSearchType } = searchSlice.actions;

export default searchSlice.reducer;
