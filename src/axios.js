import axios from 'axios'

export const apiLink = axios.create({
    baseURL: 'https://dummyjson.com'
})