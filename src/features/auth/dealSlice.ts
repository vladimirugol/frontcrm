import { createSlice } from "@reduxjs/toolkit";
import { createDeal, fetchDeals, updateDeal, deleteDeal, type DealResponse } from "./dealThunks";
interface DealsState {
    items: DealResponse[];
    loading: boolean;
    error: string | null;
}

const initialState: DealsState = {
    items: [],
    loading: false,
    error: null,
};

const dealsSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDeals.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchDeals.fulfilled, (state, action) => {
            state.loading = false;
            state.items = action.payload;
        });
        builder.addCase(fetchDeals.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error fetching deals";
        });

        builder.addCase(createDeal.fulfilled, (state, action) => {
            state.items.push(action.payload); 
        });

        builder.addCase(updateDeal.fulfilled, (state, action) => {
            const index = state.items.findIndex((deal) => deal.did === action.payload.did);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        });

        builder.addCase(deleteDeal.fulfilled, (state, action) => {
            state.items = state.items.filter((deal) => deal.did !== action.payload);
        });
    },
});

export default dealsSlice.reducer;