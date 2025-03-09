import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useGetAllQuery, useDeletePostMutation, useLazySearchPostsQuery } from '../lib/apiSlice/postsApi'

const Home = () => {
  const { data, error, isLoading } = useGetAllQuery()
  const [deletePost] = useDeletePostMutation()
  const [searchValue, setSearchValue] = useState('')
  const [searcher, { data: searchData }] = useLazySearchPostsQuery()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    if (data?.posts) {
      setPosts(data?.posts)
    }
  }, [data])

  const handleDelete = async (id) => {
    try {
      await deletePost(id).unwrap() // "unwrap" ustoz bu promiseni ichidagi response ni to'g'ri olib berarkan agar oddiy ishlatilsa catch ga xatolik tushmaydi ekan
      setPosts(posts.filter(item => item.id !== id))
      alert('Deleted!')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault()
    if (searchValue.trim() !== '') {
      try {
        const res = await searcher(searchValue).unwrap()
        if (searchValue.trim() !== '') {
          setPosts(res.posts)
        } else {
          setPosts(data?.posts)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (searchValue.trim() === '') {
      setPosts(data?.posts)
    }
  }

  return (
    <div>
      <header className='flex justify-between p-12 px-25 border-b items-center border-gray-300'>
        <div>
          <img className='w-[70px] h-[70px] rounded-full' src="https://picsum.photos/200/300" alt="image" />
        </div>
        <h1 className='font-bold text-7xl opacity-50'>Posts</h1>
        <Navbar />
      </header>

      <div className='container mx-auto mt-30'>
        <form className='flex items-center gap-7'>
          <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className='border mb-7 p-3 w-[400px] rounded-md border-gray-400' type="search" placeholder='Search...' />
          <button onClick={handleSearch} className='p-3 mb-7 bg-gray-800 text-gray-200 font-bold rounded-md hover:bg-gray-400 transition-all cursor-pointer'>Search</button>
        </form>
        <div className='flex flex-col gap-10'>
          {
            posts.length > 0 && posts.map(item => {
              return (
                <div className='p-9 rounded-2xl bg-gray-100 shadow-2xl border-t border-gray-400' key={item.id}>
                  <h3 className='text-gray-500'><b className='text-gray-600'>Title: </b>{item.title}</h3>
                  <div className='text-gray-500'><b className='text-gray-600'>Tags:</b>{item.tags.map((sss, index) => {
                    return <h3 key={index}>{sss}</h3>
                  })}</div>
                  <h3 className='text-gray-500'><b className='text-gray-600'>Views:</b> {item.views}</h3>
                  <p className='text-gray-500'><b className='text-gray-600'>Description: </b> {item.body}</p>
                  <div className='text-gray-500'>
                    <b className='text-gray-600'>Likes:</b>
                    {
                      item.reactions &&
                      Object.entries(item.reactions).map(([key, value], index) => (
                        <li key={index}>{key}: {value}</li>
                      ))
                    }
                  </div>
                  <button onClick={() => handleDelete(item.id)} className='text-gray-200 cursor-pointer hover:bg-gray-400 transition-all font-bold mt-4 p-2 bg-gray-800 rounded-md'>Delete</button>
                </div>
              )
            })
          }
          {
            posts.length === 0 && <h2>The posts haven't arrived yet.</h2>
          }
        </div>
      </div>
    </div>
  )
}

export default Home