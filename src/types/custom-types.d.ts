import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

declare module '@wangeditor/editor' {
  // 扩展 Text
  interface SlateText {
    text: string
  }

  // 扩展 Element
  interface SlateElement {
    type: string
    children: SlateDescendant[]
  }
}
