import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../databases/realtimeDatabase.js'

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({baseUrl: baseUrl}),
    tagTypes: ['profileImageGet', 'getOrders'],

    endpoints: (builder) => ({

        getCategories: builder.query({
            query: () => `categories.json`
        }),

        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,

            transformResponse: (response) => {                
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),

        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,

            transformResponse: (response) => {
                
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) return responseTransformed[0]
                return null
            }
        }),

        postOrder: builder.mutation({
            query: ({...order}) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            }),
            invalidatesTags: ['getOrders']
        }),

        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        
        postProfileImage: builder.mutation({
            query: ({image, localId}) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet'] 
        }),

        getOrders: builder.query({
            query: () => `orders.json`,
            providesTags: ['getOrders']
        }),
    })
})

export const {useGetCategoriesQuery, useGetProductByIdQuery, useGetProductsByCategoryQuery, usePostOrderMutation, useGetProfileImageQuery, usePostProfileImageMutation, useGetOrdersQuery} = shopApi