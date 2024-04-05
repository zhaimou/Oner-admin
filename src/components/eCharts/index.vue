<template>
  <div id="echarts" ref="chartRef" :style="echartsStyle" />
</template>

<script setup lang="ts" name="ECharts">
import {
  computed,
  markRaw,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue'
import echarts, { ECOption } from './config'
import { EChartsType, ECElementEvent } from 'echarts/core'
import { useDebounceFn } from '@vueuse/core'
import { useGlobalStore } from '@/stores/modules/global'
import { storeToRefs } from 'pinia'
interface Props {
  option: ECOption
  renderer?: 'canvas' | 'svg'
  resize?: boolean
  theme?: any | string
  width?: number | string
  height?: number | string
  onClick?: (event: ECElementEvent) => any
}
const props = withDefaults(defineProps<Props>(), {
  renderer: 'canvas',
  resize: true,
})

const echartsStyle = computed(() => {
  return props.width || props.height
    ? { height: props.height + 'px', width: props.width + 'px' }
    : { height: '100%', width: '100%' }
})

const chartRef = ref<HTMLDivElement | HTMLCanvasElement>()
const chartInstance = ref<EChartsType>()

const draw = () => {
  if (chartInstance.value) {
    chartInstance.value.setOption(props.option, { notMerge: true })
  }
}
watch(props, () => {
  draw()
})
const handleClick = (event: ECElementEvent) =>
  props.onClick && props.onClick(event)

const init = () => {
  if (!chartRef.value) return
  //一行尝试从 DOM 元素中获取已经存在的 ECharts 实例，
  //   并将其赋值给 chartInstance。chartInstance 可能是一个 Vue ref，
  // 用于引用当前图表的 ECharts 实例。
  chartInstance.value = echarts.getInstanceByDom(chartRef.value)

  if (!chartInstance.value) {
    chartInstance.value = markRaw(
      echarts.init(chartRef.value, props.theme, {
        renderer: props.renderer,
      })
    )
    chartInstance.value.on('click', handleClick)
    draw()
  }
}

const resize = () => {
  if (chartInstance.value && props.resize) {
    chartInstance.value.resize({ animation: { duration: 300 } })
  }
}

const debouncedResize = useDebounceFn(resize, 300, { maxWait: 800 })
const globalStore = useGlobalStore()
const { maximize, isCollapse, tabs, footer } = storeToRefs(globalStore)

watch(
  () => [maximize, isCollapse, tabs, footer],
  () => {
    debouncedResize()
  },
  { deep: true }
)
// nextTick，用于在 DOM 更新完成后执行指定的回调函数。
// 在这里，它确保在下一个 DOM 更新周期之后执行 init() 函数。这样做的目的是等待 Vue 完成对 DOM 的更新，以便确保在初始化之前具有最新的 DOM 结构。
onMounted(() => {
  nextTick(() => init())
  window.addEventListener('resize', debouncedResize)
})
onBeforeUnmount(() => {
  chartInstance.value?.dispose()
  window.removeEventListener('resize', debouncedResize)
})

defineExpose({
  getInstance: () => chartInstance.value,
  resize,
  draw,
})
</script>
