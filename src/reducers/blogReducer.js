import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)


  switch(action.type) {
    case 'UPDATE_BLOG':
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data)
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
        return action.data
    default:
      return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const createComment = (blog) => {
  return async dispatch => {
    await blogService.createComment(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blog
    })
  }
}

export const updateBlog = (newBlog) => {
  return async dispatch => {
    await blogService.update(newBlog.id, newBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
      await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export default reducer