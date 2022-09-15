import { faker } from '@faker-js/faker'

import { Comment } from '../../types'

export const comment: Comment = {
  id: 1,
  name: faker.name.fullName(),
  message: faker.random.words(5),
  created: faker.date.past(),
}
