<template>
  <el-table-column
    :key="columnProps.key"
    :prop="columnProps.key"
    :label="columnProps.label"
    v-bind="useColumnProps"
    :resizable="false"
  >
    <template
      v-if="columnProps.headerSlot && $slots[columnProps.headerSlot]"
      #header="{ column, $index }"
    >
      <slot
        :$key="columnProps.key"
        :name="columnProps.headerSlot"
        :$column="column"
        :$index="$index"
      >
      </slot>
    </template>


    <template
      v-else-if="columnProps.slotName && $slots[columnProps.slotName]"
      #default="{ row, $index }"
    >
      <slot
        :$key="columnProps.key ?? ''"
        :name="columnProps.slotName"
        :$row="row"
        :$column="columnProps"
        :$index="$index"
      ></slot>
    </template>

    <template v-else-if="columnProps.type === 'expand'" #default="{ row }">
      <slot name="expand" v-bind="row">
      </slot>
    </template>
    <template v-else-if="columnProps.formatType === 'time'" #default="{ row }">
      <span :style="{ color: columnProps.setColor || '' }">{{
        $formatDate(row[columnProps.key], columnProps.valueFormat) ||
          row[columnProps.key] ||
          ''
      }}</span>
    </template>
    <template v-else-if="columnProps.formatType === 'dict'" #default="{ row }">
      <span :style="{ color: columnProps.setColor || '' }">{{
        getDictValue(columnProps.valueFormat, row[columnProps.key]) ||
          row[columnProps.key] ||
          ''
      }}</span>
    </template>
    <template v-else-if="columnProps.formatter" #default="{ row }">
      <span :style="{ color: columnProps.setColor || '' }">{{
        columnProps?.formatter
          ? columnProps.formatter(row[columnProps.key] || '', row)
          : row[columnProps.key] || ''
      }}</span>
    </template>
    <template v-else-if="columnProps.clickable" #default="{ row }">
      <span
        class="clickable"
        :style="{ color: columnProps.setColor || '' }"
        @click="$emit('clickable', { key: columnProps.key, row })"
      >{{
        columnProps?.formatter
          ? columnProps.formatter(row[columnProps.key] || '')
          : row[columnProps.key] || ''
      }}</span>
    </template>
    <template v-else-if="columnProps.setColor" #default="{ row }">
      <span :style="{ color: columnProps.setColor || '' }">{{
        columnProps?.formatter
          ? columnProps.formatter(row[columnProps.key] || '')
          : row[columnProps.key] || ''
      }}</span>
    </template>

    <template v-else-if="columnProps.children" #default>
      <template
        v-for="(tableProps, index) in columnProps.children"
        :key="index"
      >
        <TableColumn :column-props="tableProps">
          <template
            v-for="(value, key) in $slots"
            #[key]="{ ...tableColumnProps }"
          >
            <slot :name="key" v-bind="tableColumnProps"></slot>
          </template>
        </TableColumn>
      </template>
    </template>
  </el-table-column>
</template>

<script setup>
import TableColumn from './Table.column.vue'
import { computed } from 'vue'
import { get } from 'lodash-es'

const props = defineProps({
  columnProps: { type: Object, default: () => ({}) }
})

defineEmits(['clickable'])

let useColumnProps = computed(()=>{
  return Object.assign({},props.columnProps,get(props.columnProps,'props',{}))
})

// -------- inject --------

// -------- ref --------

// -------- computed --------

// -------- fn --------

// -------- watch --------

// -------- init --------

// -------- provide --------

// -------- expose --------

function getDictValue() {
  return '-'
}
</script>

<style lang="scss" scoped>
.clickable {
  color: #66b1ff;
  cursor: pointer;
}
</style>
