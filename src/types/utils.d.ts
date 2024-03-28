type ObjToKeyValUnion<T> = {
  [K in keyof T]: { key: K; value: T[K] }
}[keyof T]
type ObjToKeyValArray<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T]
