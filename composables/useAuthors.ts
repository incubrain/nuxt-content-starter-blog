import { AUTHORS } from '../types/posts'

export default () => {
  return {
    authors: AUTHORS,
    selectedAuthor: (authorId: number) => {
      return AUTHORS.find((a) => authorId === a.id)
    }
  }
}
