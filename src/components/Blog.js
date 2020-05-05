import React from 'react'
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

const Blog = ({ blog }) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
  </div>
)

export default Blog
