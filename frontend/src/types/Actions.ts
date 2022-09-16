import { Comment } from './Comment'

export type InitialState = {
  comments: Comment[]
}

export enum Types {
  AddComment = 'ADD_COMMENT',
  AddComments = 'ADD_COMMENTS',
  RemoveComments = 'REMOVE_COMMENTS',
}

type CommentPayload = {
  [Types.AddComment]: {
    newComment: Comment
  }
  [Types.AddComments]: {
    comments: Comment[]
  }
  [Types.RemoveComments]: {}
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type CommentActions =
  ActionMap<CommentPayload>[keyof ActionMap<CommentPayload>]

export type Action = CommentActions
