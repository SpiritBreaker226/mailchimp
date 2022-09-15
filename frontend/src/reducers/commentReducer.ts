import { Action, InitialState, Types } from '../types'

export const commentReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.AddComment:
      const comments = [...state.comments]

      comments.push(action.payload.newComment)

      return {
        ...state,
        comments,
      }
    case Types.RemoveComments:
      return {
        ...state,
        comments: [],
      }
    default:
      return state
  }
}
