<template>
  <section class="ui-component">
    <el-descriptions
      class="descriptions-box"
      v-bind="props"
    >
      <template #extra>
        <slot name="extra"></slot>
      </template>
      <template v-for="(field, index) in fields" :key="index">
        <el-descriptions-item :label="field.label" v-bind="buildProps(field)">
          <template #label>
            <div
              class="flex f-aic"
              :class="{
                showIcon:Boolean(showChangeIcon(field))
              }"
            >
              {{ field.label }}
            </div>
          </template>

          <template v-if="field.type === 'text'">
            {{ useText(field, data) }}
          </template>
          <template v-if="field.type === 'dict'">
            {{ getDictValue(field.transform,useText(field, data)) }}
          </template>
          <template v-else-if="field.type === 'slot'">
            <slot :name="field.slotName || field.key" :item="field" :data="data"></slot>
          </template>
          <template v-else-if="field.type === 'image'">
            <ImagePreview :data="useText(field, data)" />
          </template>
          <template v-else-if="field.type === 'fileView'">
            <div v-if="!useText(field, data)" class="tip">暂无附件</div>
            <FileView v-else :model-value="useText(field, data)" />
          </template>
          <template v-else-if="field.type">
            <Component
              :is="`${componentConfig.prefix}${field.type}`"
              :value="field.value"
              disabled
              style="display: inline;"
            />
          </template>
          <template v-else>
            {{ getValue(data,field ) }}
          </template>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </section>
</template>
<script lang="ts">
import { FieldItem } from '@/typings/items'
import { computed, defineComponent, inject, PropType } from 'vue'
import useText from '@/hooks/state/use-text'
import FileView from '@/components/UI/fileView/src/fileView.vue'
import Config from '@/config'
import { getDictValue ,getValue } from '@/utils'
import { parseTime } from '@/utils'
import { getCurrentInstance } from 'vue'
import ImagePreview from '@/components/ImagePreview.vue'
export default defineComponent({
  name: 'UiDescriptions',
  components: {
    FileView,
    ImagePreview
  },
  props: {
    fields: { type: Array as PropType<FieldItem[]>, default: () => [] },
    data: { type: Object as PropType<any>, default: () => ({}) },
    options: { type: Object, default: () => ({}) },
    compositeType:{ type:String,default:'单一文本' },
    activeIndex:{ type:Number,default:0 }
  },
  setup (props: any) {
    const cProps = computed(() => props.options.props || {
      column: 3,
      border:true,
      direction:'vertical',
      // size:'small'
    })
    const itemProps = computed(() => props.options.itemProps || {
      span: 1
    })

    function buildProps (field:FieldItem) {
      return Object.assign({}, itemProps.value, field.props)
    }
    let pageOptions:any = inject('page-options')  || null

    function showChangeIcon (field:FieldItem){
      if(JSON.stringify(pageOptions) == '{}'){
        return false
      }
      try {
        let { label,key } = field
        let { labels = [],keys = [] } = pageOptions
        if(labels.includes(label)){
          return true
        }

        // 单一字段和复合字段的对比
        if(props.compositeType == '单一文本'){
          if(keys.includes(key.replace('planningResult.',''))){
            return true
          }
        }else{
          let comparisonList = pageOptions.compositeComparisonResult.find(item=>{
            return  item.type == props.compositeType
          })
          if(comparisonList){
            let current = comparisonList.comparisonResult.find(policy=>{
              return policy.index == props.activeIndex
            })
            return current &&  current.comparison.map(e=>e.key).includes(key)
          }
        }
      } catch (error) {
        return false
      }
    }
    let ctx = getCurrentInstance()
    function onShowDetail (){
      PubSub.publish('show-comparison-detail',pageOptions)
    }
    return {
      props: cProps,
      itemProps,
      componentConfig: Config.component,
      // hooks
      useText,
      buildProps,
      parseTime,
      pageOptions,
      showChangeIcon,
      onShowDetail,
      getDictValue,
      getValue
    }
  }
})
</script>
<style lang="scss" scoped>
.ui-component {
// font-size: 18px !important;
}
.htmlSize{
  // font-size: 16px !important;
}
.el-descriptions--small .el-descriptions__body .el-descriptions__table.is-bordered .el-descriptions__cell{
//  font-size: 16px;
}
</style>
