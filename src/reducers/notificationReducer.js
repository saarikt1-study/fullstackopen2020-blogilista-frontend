const initialState = null

const reducer = (state = initialState, action) => {
    switch(action.type) {
      case 'NOTIFICATION':
        console.log('Goes to the reducer')
        return action.data.msg
      default:
        return state
    }
}

export const setNotification = (msg) => {
  console.log('Goes to the action creator')
  return {
      type: 'NOTIFICATION',
      data: {
        msg
      }
  }
}

export default reducer