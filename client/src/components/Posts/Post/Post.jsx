import React from 'react'
import './post.scss'
import { MdThumbUpOffAlt } from 'react-icons/md'
import { RiDeleteBinLine } from 'react-icons/ri'
import { GrEdit } from 'react-icons/gr'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'

const Post = ({ post, setCurrentId, setFormOpen }) => {
  const dispatch = useDispatch()

  const handleEdit = () => {
    setCurrentId(post._id)
    setFormOpen(true)
  }

  return (
    <div className="card" key={post.id}>
      <div className="card-header">
        <img src={post.selectedFile} alt="header" />
      </div>

      <div className="more">
        <h5> Author : {post.creator}</h5>
        <button onClick={handleEdit}>
          {' '}
          <GrEdit />{' '}
        </button>
      </div>
      <div className="card-body">
        <h4> {post.title} </h4>
        <p> {post.message} </p>
      </div>
      <div className="tags">
        <span> {post.tags.map((tag) => ( <span> #{tag} </span> ))} </span>
      </div>
      <div className="actions">
        <button onClick={() => dispatch(likePost(post._id))}>
          {' '}
          <MdThumbUpOffAlt className="icon" /> &nbsp; Like &nbsp;
          {post.likeCount}{' '}
        </button>
        <button onClick={() => dispatch(deletePost(post._id))}>
          {' '}
          <RiDeleteBinLine className="icon" /> Delete{' '}
        </button>
      </div>
      <div className="user">
        <img src={post.selectedFile} alt="user" />
        <div className="user-info">
          <h5>{post.creator}</h5>
          <small> {moment(post.createdAt).fromNow()} </small>
        </div>
      </div>
    </div>
  )
}

export default Post
