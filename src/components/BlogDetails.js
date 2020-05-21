import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const BlogDetails = () => {
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
      {blog.comments[0] &&
        <div>
          <h3>Comments:</h3>
          <ul>
            {blog.comments.map(comment => 
              <li key={comment.id} >{comment.content}</li>
              )}
          </ul>
        </div>
      }
    </div>
  )
}

export default BlogDetails