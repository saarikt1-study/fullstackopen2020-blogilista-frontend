import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const BlogDetails = () => {
  const blogs = useSelector(state => state.blogs)
  const id = useParams().id
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      {blog.user &&
        <p>Added by {blog.user.name}</p>
      }
    </div>
  )
}

export default BlogDetails