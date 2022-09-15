import * as Yup from 'yup'

export const AddCommentSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  message: Yup.string()
    .min(2, 'Message is too short')
    .max(2000, 'Message is too long')
    .required('Message is required'),
})
