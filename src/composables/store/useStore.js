import { stores } from '@/store/store.js'

export function useStore () {
  const store = stores()
  return store
}
