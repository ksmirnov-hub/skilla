import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithToken from './helpers/customFetchBase';

const APP_URI = 'https://api.skilla.ru/mango/getList';

export const callsApi = createApi({
	reducerPath: 'callsApi',
	baseQuery: baseQueryWithToken,
	entityTypes: ["Calls"],
	endpoints: (builder) => ({
		fetchCalls: builder.query({
			query({
				type,
				periodEnd,
				periodStart,
				sort,
				order
			}) {
				let sortDirection = order ? '&order=' + order : '';
				let sortBy = sort ? '&sort_by=' + sort + sortDirection : ''
				let tail = '?date_start=' + periodStart + '&date_end=' + periodEnd + '&in_out=' + type + sortBy;
				return {
                    url: APP_URI + tail,
					method: 'POST',
				};
			  },
			providesTags: (result) => ["Calls"],
			invalidatesTags: ["Calls"],
		}),
	    clearData: builder.query({
			invalidatesTags: ["Calls"],
		})
	}),
})

export const {
	useFetchCallsQuery,
	useClearDataQuery
} = callsApi;
