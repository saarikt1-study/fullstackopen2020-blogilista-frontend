import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)

  switch(action.type) {
    // case 'VOTE':
    //   const id = action.data.id
    //   const changedAnecdote = action.data.newObject
    //   return state.map(anecdote =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   )
    case 'LIKE':
      console.log('Like happened', action.data)
      return state
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

export const updateBlog = (id, newBlog) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(id, newBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
  }
}

// const updateBlog = async (id, blogObject) => {
//   const response = await blogService.update(id, blogObject)
//   const updatedBlog = blogs.find(b => b.title === response.title)

//   updatedBlog.likes = blogObject.likes
//   // setBlogs(blogs.map(blog => blog.id === blogObject.id ?
//   //   updatedBlog : blog))
// }

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