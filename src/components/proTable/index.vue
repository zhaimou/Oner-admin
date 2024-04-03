<template>
  <!-- 查询表单 -->
  <SearchForm
    v-show="isShowSearch"
    :search="_search"
    :reset="_reset"
    :columns="searchColumns"
    :search-param="searchParam"
    :search-col="searchCol"
  />
  <div class="card table-main">
    <!-- 表格头部 操作按钮 -->
    <div class="table-header">
      <div class="header-button-lf">
        <slot
          name="tableHeader"
          :selected-list="selectedList"
          :selected-list-ids="selectedListIds"
          :is-selected="isSelected"
        />
      </div>
      <div v-if="toolButton" class="header-button-ri">
        <slot name="toolButton">
          <el-button
            v-if="showToolButton('refresh')"
            :icon="Refresh"
            circle
            @click="getTableList"
          />
          <el-button
            v-if="showToolButton('setting') && columns.length"
            :icon="Operation"
            circle
            @click="openColSetting"
          />
          <el-button
            v-if="showToolButton('search') && searchColumns?.length"
            :icon="Search"
            circle
            @click="isShowSearch = !isShowSearch"
          />
        </slot>
      </div>
    </div>
    <!-- 表格主体 -->
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="processTableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="selectionChange"
    >
      <!-- 默认插槽 -->
      <slot />
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || radio || index || expand || sort -->
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type)"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        >
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>
            <!-- radio -->
            <el-radio
              v-if="item.type == 'radio'"
              v-model="radio"
              :label="scope.row[rowKey]"
            >
              <i></i>
            </el-radio>
            <!-- sort -->
            <el-tag v-if="item.type == 'sort'" class="move">
              <el-icon> <DCaret /></el-icon>
            </el-tag>
          </template>
        </el-table-column>
        <!-- other -->
        <TableColumn
          v-if="!item.type && item.prop && item.isShow"
          :column="item"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </template>
      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append" />
      </template>
      <!-- 无数据 -->
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handle-size-change="handleSizeChange"
        :handle-current-change="handleCurrentChange"
      />
    </slot>
  </div>
  <ColSetting v-if="toolButton" ref="colRef" v-model:col-setting="colSetting" />
</template>

<script setup lang="tsx">
import { ElTable } from 'element-plus'
import { BreakPoint } from '@/components/grid/interface'
import { ColumnProps, TypeProps } from '@/components/proTable/interface'
import SearchForm from '@/components/searchForm/index.vue'
import { computed, onMounted, reactive, ref, unref } from 'vue'
import { useTable } from '@/hook/useTable'
import { useSelection } from '@/hook/useSelection'
import TableColumn from './components/TableColumn.vue'
import Pagination from './components/Pagination.vue'
import { watch } from 'vue'
import { Refresh, Operation, Search } from '@element-plus/icons-vue'
import ColSetting from './components/ColSetting.vue'
export interface ProTableProps {
  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[] // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
  requestApi?: (params: any) => any // 请求表格数据的 api ==> 非必传
  requestAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
  title?: string // 表格标题 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  initParam?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
  searchCol?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
const props = withDefaults(defineProps<ProTableProps>(), {
  columns: () => [],
  //   requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
  requestAuto: true,
  pagination: true,
  initParam: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
})

const tableRef = ref<InstanceType<typeof ElTable>>()
const columnTypes: TypeProps[] = [
  'selection',
  'radio',
  'index',
  'expand',
  'sort',
]
const isShowSearch = ref(true)
// const radio = ref("");
const { selectionChange, selectedList, selectedListIds, isSelected } =
  useSelection(props.rowKey)
//   console.log()
const {
  tableData,
  pageable,
  searchParam,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  getTableList,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback,
  props.requestError
)
onMounted(() => {
  //   dragSort();
  //    console.log(props.requestAuto)
  props.requestAuto && getTableList()
  props.data && (pageable.value.total = props.data.length)
  console.log('1')
})

const processTableData = computed(() => {
  if (!props.data) return tableData.value
  if (!props.pagination) return props.data
  return props.data.slice(
    (pageable.value.pageNum - 1) * pageable.value.pageSize,
    pageable.value.pageSize * pageable.value.pageNum
  )
})
watch(() => props.initParam, getTableList, { deep: true })

const radio = ref('')
// 接收 columns 并设置为响应式
const tableColumns = reactive<ColumnProps[]>(props.columns)
// 扁平化 columns
const flatColumns = computed(() => flatColumnsFunc(tableColumns))

const flatColumnsFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = []
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // column 添加默认 isShow && isFilterEnum 属性值
    col.isShow = col.isShow ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    await setEnumMap(col)
  })
  return flatArr.filter((item) => !item._children?.length)
}
const enumMap = ref(new Map<string, { [key: string]: any }[]>())
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
  if (!enumValue) return

  // 如果当前 enumMap 存在相同的值 return
  if (
    enumMap.value.has(prop!) &&
    (typeof enumValue === 'function' || enumMap.value.get(prop!) === enumValue)
  )
    return

  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (typeof enumValue !== 'function')
    return enumMap.value.set(prop!, unref(enumValue!))

  // 为了防止接口执行慢，而存储慢，导致重复请求，所以预先存储为[]，接口返回后再二次存储
  enumMap.value.set(prop!, [])

  // 当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  const { data } = await enumValue()
  enumMap.value.set(prop!, data)
}
// console.log(flatColumns.value)
// console.log(item.search)
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter((item) => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!)
})
// searchColumns.value?.forEach((column, index) => {
//   column.search!.order = column.search?.order ?? index + 2;
//   const key = column.search?.key ?? handleProp(column.prop!);
//   const defaultValue = column.search?.defaultValue;
//   if (defaultValue !== undefined && defaultValue !== null) {
//     searchInitParam.value[key] = defaultValue;
//     searchParam.value[key] = defaultValue;
//   }
// });
const emit = defineEmits<{
  search: []
  reset: []
  dargSort: [{ newIndex?: number; oldIndex?: number }]
}>()
const _search = () => {
  search()
  emit('search')
}
const _reset = () => {
  reset()
  emit('reset')
}
const clearSelection = () => tableRef.value!.clearSelection()
const showToolButton = (key: 'refresh' | 'setting' | 'search') => {
  return Array.isArray(props.toolButton)
    ? props.toolButton.includes(key)
    : props.toolButton
}

const colRef = ref()
const colSetting = tableColumns!.filter((item) => {
  const { type, prop, isShow } = item
  return !columnTypes.includes(type!) && prop !== 'operation' && isShow
})
const openColSetting = () => colRef.value.openColSetting()
defineExpose({
  element: tableRef,
  tableData: processTableData,
  radio,
  pageable,
  searchParam,
  // searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  enumMap,
  isSelected,
  selectedList,
  selectedListIds,
})
</script>
