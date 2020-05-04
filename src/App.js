import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMsg('ERROR: Wrong credentials')
      setTimeout(() => {
        setNotificationMsg(null)
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <>
      <h2>Add blogs!</h2>
      <form onSubmit={addBlog}>
        Title:
        <input
          value={title}
          onChange={handleTitleChange}
        />
        <br />
        Author:
        <input
          value={author}
          onChange={handleAuthorChange}
        />
        <br />
        Url:
        <input
          value={url}
          onChange={handleUrlChange}
        />
        <br />
        <button type='submit'>create</button>
      </form>
    </>
  )

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))
    setTitle('')
    setAuthor('')
    setUrl('')

    setNotificationMsg(`${blogObject.title} added!`)
    setTimeout(() => {
      setNotificationMsg(null)
    }, 4000)
  }
  
  if (user === null) {
    return (
      <div>
        <Notification message={notificationMsg}/>
        <h2>Log in to application</h2>
        { loginForm() }
      </div>
    )
  }
  
  return (
    <div>
      <Notification message={notificationMsg}/>
      <h1>List of Blogs</h1>
        <p>{user.name} logged in</p>
        <button onClick={handleLogout}>logout</button>
        { blogForm() }
        <h2>Blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
    </div>
  )
}

export default App