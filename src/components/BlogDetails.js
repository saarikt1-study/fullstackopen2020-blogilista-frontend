import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateBlog, createComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogDetails = () => {
  const [comment, setComment] = useState('')
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()

  const handleClick = () => {
      dispatch(updateBlog({
        user: blog.user && blog.user,
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        id: blog.id
      }))
  }

  const addComment = () => {
    dispatch(createComment({
      ...blog,
      comments: blog.comments.concat({
        content: comment,
        id: blog.id
      })
    }))
    setComment('')
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button onClick={handleClick}>Like</button>
      </p>
      {blog.user &&
        <p>Added by {blog.user.name}</p>
      }
      <div>
        <h3>Comments:</h3>
        <input 
          value={comment}
          onChange={e => {
            setComment(e.target.value)
          }}
        />
        <button onClick={addComment}>
          Add comment
        </button>
        <ul>
          {blog.comments.map(comment => 
            <li key={comment.id} >{comment.content}</li>
            )}
        </ul>
      </div>
    </div>
  )
}

export default BlogDetails