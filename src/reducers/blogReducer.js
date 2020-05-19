import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    // case 'VOTE':
    //   const id = action.data.id
    //   const changedAnecdote = action.data.newObject
    //   return state.map(anecdote =>
    //     anecdote.id !== id ? anecdote : changedAnecdote
    //   )
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'INIT_BLOGS':
        return action.data
    default:
      return state
  }
}

export const INIT_BLOGS = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
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

// export const createAnecdote = (content) => {
//   return async dispatch => {
//     const newAnecdote = await anecdoteService.createNew(content)
//     dispatch({
//       type: 'NEW_ANECDOTE',
//       data: newAnecdote
//     })
//   }
// }

export default reducer