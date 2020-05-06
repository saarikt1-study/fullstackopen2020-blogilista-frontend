import React, { useState } from 'react'

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
          value={newTitle}
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
        />
        <br />
        Url:
        <input
          value={newUrl}
          onChange={handleUrlChange}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default BlogForm