import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const notificationMsg = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
        dispatch(setNotification('ERROR: Wrong credentials'))
        setTimeout(() => {
          dispatch(setNotification(null))
        }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(createBlog(blogObject))
    dispatch(setNotification(`${blogObject.title} added!`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 4000)
  }

  const padding = {
    padding: 5
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
    <Router>
      <div>
        <Link style={padding} to="/blogs">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <Notification message={notificationMsg}/>
        <h1>Blog App</h1>
      </div>

      <Switch>
        <Route path="/blogs">
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
              loggedUserId={user.id}
            />
          )}
        </Route>
        <Route path="/users">
          {/* <Users /> */}
        </Route>
      </Switch>
    </Router>
  )
}

export default App