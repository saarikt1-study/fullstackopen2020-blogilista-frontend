import React, { useState } from 'react'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 10,
  paddingBottom: 10,
  paddingRight: 10,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 10,
  marginLeft: 20,
  marginRight: 20
}

const Blog = ({ blog, loggedUserId }) => {
  const [visible, setVisibility] = useState(false)

  const detailsVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'Hide details' : 'View details'

  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(updateBlog({
      user: blog.user && blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url,
      id: blog.id
    }))
  }

  const blogCreatorId = blog.user && blog.user.id

  const createdByLoggedUser = loggedUserId === blogCreatorId

  return (
    <div id='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      <button onClick={() => setVisibility(!visible)}>{buttonLabel}</button>
      <div style={detailsVisible} className='blogDetails'>
        {blog.url}
        <br />
        Likes: {blog.likes}
        <button onClick={handleClick}>Like</button>
        <br />
        {blog.user && blog.user.name}
        {createdByLoggedUser && <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete blog</button>}
      </div>
    </div>
  )
}

export default Blog
