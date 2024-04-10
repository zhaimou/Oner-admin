import { MenuOptions } from '@/types/global'
export type LayoutType = 'vertical' | 'classic' | 'transverse' | 'columns'
export type AssemblySizeType = 'large' | 'small' | 'default'
export type LanguageType = 'zh' | 'en' | null
export interface UserState {
  token: string
  userInfo: {
    name: string
    age?: number
  }
  userVerify?: string
  currentPage?: number
}
// export interface
export interface AuthState {
  routeName: string
  authButtonList: {
    [key: string]: string[]
  }
  authMenuList: MenuOptions[]
}
export interface GlobalState {
  layout: LayoutType
  assemblySize: AssemblySizeType
  language: LanguageType
  maximize: boolean
  primary: string
  isDark: boolean
  isGrey: boolean
  isWeak: boolean
  asideInverted: boolean
  headerInverted: boolean
  isCollapse: boolean
  accordion: boolean
  breadcrumb: boolean
  breadcrumbIcon: boolean
  tabs: boolean
  tabsIcon?: boolean
  footer: boolean
  //   setGlobalState?: (key: any, value: any) => {}
}
export interface KeepAliveState {
  keepAliveName: string[]
}
/* tabsMenuProps */
export interface TabsMenuProps {
  icon?: string
  title?: string
  path?: string
  name?: string
  close?: boolean
  isKeepAlive?: boolean
}
/* TabsState */
export interface TabsState {
  tabsMenuList: TabsMenuProps[]
}
