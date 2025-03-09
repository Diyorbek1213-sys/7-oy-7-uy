import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://dummyjson.com'
    }),

    endpoints: build => ({
        getAll: build.query({
            query: () => '/posts'
        }),
        deletePost: build.mutation({
            query: (id) => ({
                url: `/posts/${id}`,
                method: 'DELETE'
            })
        }),
        searchPosts: build.query({
            query: (searcher) => `/posts/search?q=${searcher}`
        })
    })
})

export const { useGetAllQuery, useDeletePostMutation, useLazySearchPostsQuery } = postsApi
export default postsApi