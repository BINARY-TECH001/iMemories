import React, { useState, useEffect } from 'react'
import './form.scss'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { FiEdit } from 'react-icons/fi'
import { GrFormClose } from 'react-icons/gr'

const Form = ({ currentId, setCurrentId, formOpen, setFormOpen }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null,
  )
  const dispatch = useDispatch()
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  })

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, postData))
    } else {
      dispatch(createPost(postData))
    }
    clear()
    handleFormOpen(false)
  }

  const clear = () => {
    setCurrentId(null)
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    })
  }

  const handleFormOpen = () => {
    setFormOpen(true)
  }

  const FormButton = () => {
    return (
      <button className="edit" onClick={handleFormOpen}>
        {' '}
        <FiEdit className="edit-icon" />{' '}
      </button>
    )
  }

  return (
    <div className="form">
      {formOpen ? (
        <div className="form__container">
          <form action="" autoComplete="off" onSubmit={handleSubmit}>
            <button className="close__form" onClick={() => setFormOpen(false)}>
              {' '}
              <GrFormClose className="close__icon" />{' '}
            </button>
            <h6>
              {' '}
              {currentId ? 'Editing' : 'Creating'} an <i>iMemory</i>{' '}
            </h6>
            <input
              type="text"
              placeholder="Creator"
              name="creator"
              value={postData.creator}
              onChange={(e) =>
                setPostData({ ...postData, creator: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={postData.title}
              onChange={(e) =>
                setPostData({ ...postData, title: e.target.value })
              }
            />
            <textarea
              type="text"
              placeholder="Message"
              name="message"
              value={postData.message}
              onChange={(e) =>
                setPostData({ ...postData, message: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Tags"
              name="tags"
              value={postData.tags}
              onChange={(e) =>
                setPostData({ ...postData, tags: e.target.value.split(',') })
              }
            />

            <div className="fileInput">
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setPostData({ ...postData, selectedFile: base64 })
                }
              />
            </div>

            <button className="btn__submit"> Submit </button>
            <button className="btn__submit" onClick={clear}>
              {' '}
              Clear{' '}
            </button>
          </form>
        </div>
      ) : (
        <FormButton />
      )}
    </div>
  )
}

export default Form
