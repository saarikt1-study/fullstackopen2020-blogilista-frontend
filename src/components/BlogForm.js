import React, { useState } from 'react'
import styled from 'styled-components'

const Button = styled.button`
  box-shadow: 0px 1px 0px 0px #1c1b18;
  background:linear-gradient(to bottom, #eae0c2 5%, #ccc2a6 100%);
  background-color:#eae0c2;
  border-radius:15px;
  border:2px solid #333029;
  display:inline-block;
  cursor:pointer;
  color:#505739;
  font-family:Arial;
  font-size:14px;
  font-weight:bold;
  padding:12px 16px;
  text-decoration:none;
  text-shadow:0px 1px 0px #ffffff;
`

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Add blogs!</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          id='title'
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          id='author'
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br />
        Url:
        <input
          id='url'
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br />
        <Button type='submit'>create</Button>
      </form>
    </>
  )
}

export default BlogForm