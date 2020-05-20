import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    case 'LIKE':
      const updatedBlog = action.data
      return state.map(blog =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
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

export const updateBlog = (newBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(newBlog.id, newBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

// export const voteForAnecdote = (id, newObject) => {
//   return async dispatch => {
//     await anecdoteService.update(id, newObject)
//     dispatch({
//       type: 'VOTE',
//       data: { id, newObject }
//     })
//   }
// }


export default reducer