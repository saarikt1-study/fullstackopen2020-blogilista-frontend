const initialState = null

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NOTIFICATION':
        return action.data.msg
      default:
        return state
    }
}

export const setNotification = (msg) => {
  return {
      type: 'NOTIFICATION',
      data: {
        msg
      }
  }
}

export default reducer