import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  tagTypes: ['Contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ({ url: 'contacts/', method: 'get' }),
      providesTags: ['Contacts'],
    }),

    addContacts: builder.mutation({
      query: contact => ({
        url: `contacts/`,
        method: 'post',
        data: contact,
      }),
      invalidatesTags: ['Contacts'],
    }),

    removeContacts: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Contacts'],
    }),

    updateContactById: builder.mutation({
      query: contact => ({
        url: `contacts/${contact.id}`,
        method: 'patch',
        data: contact.values,
      }),
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useRemoveContactsMutation,
  useUpdateContactByIdMutation,
  useGetContactByIdQuery,
} = contactsApi;
