import React, { useState } from 'react'
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

const Blog = ({ blog, updateBlog, deleteBlog, loggedUserId }) => {
  const [visible, setVisibility] = useState(false)

  const detailsVisible = { display: visible ? '' : 'none' }
  const buttonLabel = visible ? 'Hide details' : 'View details'

  const handleClick = () => {
    updateBlog(blog.id, {
      user: blog.user && blog.user.id,
      title: blog.title,
      author: blog.author,
      likes: blog.likes + 1,
      url: blog.url
    })
  }

  const blogCreatorId = blog.user && blog.user.id

  const createdByLoggedUser = loggedUserId === blogCreatorId

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={() => setVisibility(!visible)}>{buttonLabel}</button>
      <div style={detailsVisible} className='blogDetails'>
        {blog.url}
        <br />
        Likes: {blog.likes}
        <button onClick={handleClick}>Like</button>
        <br />
        {blog.user && blog.user.name}
        {createdByLoggedUser && <button onClick={() => deleteBlog(blog.id)}>Delete blog</button>}
      </div>
    </div>
  )
}

export default Blog
