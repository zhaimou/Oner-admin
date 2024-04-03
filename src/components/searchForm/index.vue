<template>
  <div v-if="columns.length" class="card table-search">
    <el-form ref="formRef" :model="searchParam">
      <Grid
        ref="gridRef"
        :collapsed="collapsed"
        :gap="[20, 0]"
        :cols="searchCol"
      >
        <Griditem
          v-for="(item, index) in columns"
          :key="item.prop"
          v-bind="getResponsive(item)"
          :index="index"
        >
          <el-form-item>
            <template #label>
              <el-space :size="4">
                <span>{{ `${item.search?.label ?? item.label}` }}</span>
                <el-tooltip
                  v-if="item.search?.tooltip"
                  effect="dark"
                  :content="item.search?.tooltip"
                  placement="top"
                >
                  <i :class="'iconfont icon-yiwen'"></i>
                </el-tooltip>
              </el-space>
              <span>&nbsp;:</span>
            </template>
            <SearchFormItem :column="item" :search-param="searchParam" />
          </el-form-item>
        </Griditem>

        <Griditem suffix>
          <div class="operation">
            <el-button type="primary" :icon="Search" @click="search">
              搜索
            </el-button>
            <el-button :icon="Delete" @click="reset"> 重置 </el-button>
            <el-button
              v-if="showCollapse"
              type="primary"
              link
              class="search-isOpen"
              @click="collapsed = !collapsed"
            >
              {{ collapsed ? '展开' : '合并' }}
              <el-icon class="el-icon--right">
                <component :is="collapsed ? ArrowDown : ArrowUp"></component>
              </el-icon>
            </el-button>
          </div>
        </Griditem>
      </Grid>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import Grid from '../../components/grid/index.vue'
import Griditem from '../../components/grid/components/Griditem.vue'
import { BreakPoint } from '../../components/grid/interface'
import { ColumnProps } from '../../components/proTable/interface'
import { computed, ref } from 'vue'
import SearchFormItem from './component/SearchFormItem.vue'

// import }
interface ProTableProps {
  columns?: ColumnProps[] // 搜索配置列
  searchParam?: { [key: string]: any } // 搜索参数
  searchCol: number | Record<BreakPoint, number>
  search: (params: any) => void // 搜索方法
  reset: (params: any) => void // 重置方法
}
// onMounted(() => {
//   console.log(props.columns)
// })
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  searchParam: () => ({}),
})
const getResponsive = (item: ColumnProps) => {
  return {
    span: item.search?.span,
    offset: item.search?.offset ?? 0,
    xs: item.search?.xs,
    sm: item.search?.sm,
    md: item.search?.md,
    lg: item.search?.lg,
    xl: item.search?.xl,
  }
}
const collapsed = ref(true)

const gridRef = ref()
const breakPoint = computed<BreakPoint>(() => gridRef.value?.breakPoint)

const showCollapse = computed(() => {
  let show = false
  props.columns.reduce((prev, current) => {
    prev +=
      (current.search![breakPoint.value]?.span ?? current.search?.span ?? 1) +
      (current.search![breakPoint.value]?.offset ?? current.search?.offset ?? 0)
    if (typeof props.searchCol !== 'number') {
      if (prev >= props.searchCol[breakPoint.value]) show = true
    } else {
      if (prev >= props.searchCol) show = true
    }
    return prev
  }, 0)
  return show
})
</script>
<style scope lang="scss">
.operation {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 18px;
}
</style>
