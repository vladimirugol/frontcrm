import { createAsyncThunk } from "@reduxjs/toolkit";
import { DealStatus } from "../../types"; 

export interface DealData {
    title: string;
    budget: number;
    dealStatus: DealStatus; 
}

export interface DealResponse extends DealData {
    did: number;
}

interface UpdateDealArgs {
    did: number;
    data: Partial<DealData>; 
}

const BASE_URL = "/api/deals";

export const createDeal = createAsyncThunk<
    DealResponse,      
    DealData,          
    { rejectValue: string } 
>(
    'deals/add',
    async (dealData, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dealData),
                credentials: "include", 
            });

            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue(errorText || "Failed to create deal");
            }

            return (await response.json()) as DealResponse;
        } catch  {
            return rejectWithValue("Network error ");
        }
    }
);

export const fetchDeals = createAsyncThunk<
    DealResponse[],
    void,
    { rejectValue: string }
>(
    'deals/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/all`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue(errorText || "Failed to fetch deals");
            }

            return (await response.json()) as DealResponse[];
        } catch  {
            return rejectWithValue("Network error");
        }
    }
);

export const updateDeal = createAsyncThunk<
    DealResponse,
    UpdateDealArgs,
    { rejectValue: string }
>(
    'deals/update',
    async ({ did, data }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/update/${did}`, {
                method: "PATCH", 
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue(errorText || "Failed to update deal");
            }

            return (await response.json()) as DealResponse;
        } catch  {
            return rejectWithValue("Network error");
        }
    }
);

export const deleteDeal = createAsyncThunk<
    number, 
    number, 
    { rejectValue: string }
>(
    'deals/delete',
    async (did, { rejectWithValue }) => {
        try {
            const response = await fetch(`${BASE_URL}/delete/${did}`, {
                method: "DELETE",
                credentials: "include",
            });

            if (!response.ok) {
                const errorText = await response.text();
                return rejectWithValue(errorText || "Failed to delete deal");
            }
            return did; 
        } catch  {
            return rejectWithValue("Network error");
        }
    }
);