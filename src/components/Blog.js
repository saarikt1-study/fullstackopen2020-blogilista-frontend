import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const BlogListItem = styled.div`
  padding: 10px;
  margin: 0px 10px 10px 0px;
  border: 1px solid gray;
`


const Blog = ({ blog }) => {

  // const blogCreatorId = blog.user && blog.user.id
  // const createdByLoggedUser = loggedUserId === blogCreatorId

  return (
    <BlogListItem>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
      {/* {createdByLoggedUser && <button onClick={() => dispatch(deleteBlog(blog.id))}>Delete blog</button>} */}
    </BlogListItem>
  )
}

export default Blog
