import { cacheLife } from 'next/cache'

const getCurrentYear = async () => {
  'use cache'
  cacheLife('hours')
  return new Date().getFullYear()
}

export default getCurrentYear
