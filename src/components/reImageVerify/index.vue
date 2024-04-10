<template>
  <canvas ref="domRef" width="120" height="40" @click="getImgCode" />
</template>

<script lang="ts" setup name="ReImageVerify">
import { watch } from 'vue'
import { useImageVerify } from '@/hook/useImageVerify.ts'
// defineOptions({
//   name: "ReImageVerify"
// });

interface Props {
  code?: string
}

interface Emits {
  (e: 'update:code', code: string): void
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
})

const emit = defineEmits<Emits>()

const { domRef, imgCode, setImgCode, getImgCode } = useImageVerify()

watch(
  () => props.code,
  (newValue) => {
    setImgCode(newValue)
  }
)
watch(imgCode, (newValue) => {
  emit('update:code', newValue)
})

defineExpose({ getImgCode })
</script>
