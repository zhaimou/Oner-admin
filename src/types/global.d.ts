// declare namespace Menu {

export interface MenuOptions {
  path: string
  name: string
  component?: string | (() => Promise<unknown>)
  redirect?: string
  meta: MetaProps
  children?: MenuOptions[]
}
export interface MetaProps {
  icon: string
  title: string
  activeMenu?: string
  isLink?: string
  isHide: boolean
  isFull: boolean
  isAffix: boolean
  isKeepAlive: boolean
}
// declare namespace File {
export type ImageMimeType =
  | 'image/apng'
  | 'image/bmp'
  | 'image/gif'
  | 'image/jpeg'
  | 'image/pjpeg'
  | 'image/png'
  | 'image/svg+xml'
  | 'image/tiff'
  | 'image/webp'
  | 'image/x-icon'

export type ExcelMimeType =
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
//   }

// }

// declare namespace Menu {
//     interface MenuOptions {
//       path: string;
//       name: string;
//       component?: string | (() => Promise<unknown>);
//       redirect?: string;
//       meta: MetaProps;
//       children?: MenuOptions[];
//     }
//     interface MetaProps {
//       icon: string;
//       title: string;
//       activeMenu?: string;
//       isLink?: string;
//       isHide: boolean;
//       isFull: boolean;
//       isAffix: boolean;
//       isKeepAlive: boolean;
//     }
//   }
