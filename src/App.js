import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [notificationMsg, setNotificationMsg] = useState(null)
  const dispatch = useDispatch()
  const notificationMsg = useSelector(state => state)

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
      console.log('Should show notification')
    } catch (exception) {
        dispatch(setNotification('ERROR: Wrong credentials'))
        setTimeout(() => {
          dispatch(setNotification(null))
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
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogFormRef = React.createRef()

  const blogForm = () => (
    <Togglable buttonLabel="New blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const updateBlog = async (id, blogObject) => {
    const response = await blogService.update(id, blogObject)
    const updatedBlog = blogs.find(b => b.title === response.title)

    updatedBlog.likes = blogObject.likes
    setBlogs(blogs.map(blog => blog.id === blogObject.id ?
      updatedBlog : blog))
  }

  const deleteBlog = async (id) => {
    setBlogs(blogs.filter(b => b.id !== id))
    await blogService.deleteBlog(id)
    
    // const blog = blogs.find(b => b.id === id)
    // if (window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
    //   await blogService.deleteBlog(id)
    // }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    dispatch(setNotification(`${blogObject.title} added!`, 4))
    // setNotificationMsg(`${blogObject.title} added!`)
    // setTimeout(() => {
    //   setNotificationMsg(null)
    // }, 4000)
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
      {blogs
        .sort((a, b) => {
          return b.likes - a.likes
        })
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            updateBlog={updateBlog}
            deleteBlog={deleteBlog}
            loggedUserId={user.id}
          />
        )}
    </div>
  )
}

export default App