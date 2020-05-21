import React, { useState } from 'react'
// import { updateBlog } from '../reducers/blogReducer'
// import { useDispatch } from 'react-redux'
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

const Blog = ({ blog }) => {

  // const blogCreatorId = blog.user && blog.user.id
  // const createdByLoggedUser = loggedUserId === blogCreatorId

  return (
    <div id='blog' style={blogStyle}>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      {/* {createdByLoggedUser && <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete blog</button>} */}
    </div>
  )
}

export default Blog
