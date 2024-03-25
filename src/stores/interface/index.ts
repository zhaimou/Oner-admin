export interface UserState {
  token: string
  userInfo: {
    name: string
    age?: number
  }
}
// export interface
export interface AuthState {
  routeName: string
  authButtonList: {
    [key: string]: string[]
  }
  authMenuList: Menu.MenuOptions[]
}
