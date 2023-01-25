import React from 'react'
import Post from './Post/Post'
import './posts.scss'
import { useSelector } from 'react-redux'

const Posts = ({setCurrentId, setFormOpen}) => {
  const posts = useSelector((state)=> state.posts)
  console.log(posts)

  return (
      !posts.length ? <div className="posts__wrapper nothing"> Loading... </div> : (
        <div className="posts__wrapper">
          {posts.map((post)=>(
            <div key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} setFormOpen={setFormOpen} />
            </div>
          ))}
        </div>
      )
  )
}

export default Posts
