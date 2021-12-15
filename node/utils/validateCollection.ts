import type { Collection } from '../typings/collection'

export const validateCollection = (collection: Collection) => {
  if (collection.TotalProducts < 5) {
    return `A coleção é muito pequena, possui menos de 5 produtos! (${collection.TotalProducts} produtos).`
  }

  return 'A coleção está otimizada!'
}
