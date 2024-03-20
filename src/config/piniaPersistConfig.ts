import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

export function piniaPersistConfig(name: string, paths?: string[]) {
  const persist: PersistedStateOptions = {
    key: name,
    storage: localStorage,
    paths,
  }

  return persist
}
export default piniaPersistConfig
