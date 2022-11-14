import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchContactsFromAPI,
  addContactToAPI,
  deleteContactFromAPI,
} from 'api/api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const contacts = await fetchContactsFromAPI();
      return contacts;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (data, thunkAPI) => {
    try {
      const result = await addContactToAPI(data);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const result = await deleteContactFromAPI(id);
      return result;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);