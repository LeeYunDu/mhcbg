<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="80%"
    body-padding="20"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="iframe-container">
      <div class="iphone-14"  v-for="(item, index) in data" :key="index">
        <div class="time">
          <div>
            <el-tag type="primary" size="large">上架时间：{{ parseTime(new Date(item.firstOnsaleTime),'{y}-{m}-{d}') }}</el-tag>
          </div>
          <div>
            <el-tag type="success" size="large">{{ getDaysBetweenDates(new Date(item.firstOnsaleTime), new Date()) }}售出</el-tag>

          </div>
        </div>
        <iframe :src="item.cbgLink"  style="width: 100%; height: 100%;"  frameborder="0"></iframe>
      </div>
    </div>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { getDaysBetweenDates } from '../utils/index'
import { parseTime } from '@/utils'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) },
  data: { type: Array, default: () => [] }
})

const emits = defineEmits(['update:modelValue', 'update:row', 'success'])
const row = computed(() => props.row || {})

const state = reactive({
  show: computed({
    get: () => {
      props.modelValue && asyncData()
      return props.modelValue
    },
    set: val => emits('update:modelValue', val)
  }),
  title: '弹窗标题',
  data: {}
})


function onScreenshot () {
}

const iframeRef = ref<any>(null)

function scrollToBottom () {
  // 使用 PostMessage API 与跨域 iframe 通信
  const iframe = iframeRef.value
  if (iframe && iframe.contentWindow) {
    try {
      iframe.contentWindow.postMessage(
        { action: 'scrollToBottom' },
        '*' // 注意：在生产环境中应该指定具体的域名，而不是使用 '*'
      )
    } catch (error) {
      console.error('Failed to send message to iframe:', error)
    }
  }
}

// 监听 iframe 发送的消息
window.addEventListener('message', (event) => {
  // 在生产环境中应该验证 event.origin
  if (event.data && event.data.action === 'scrollToBottomResponse') {
    console.log('Iframe scrolled to bottom successfully')
  }
})

function onClosed () {
  emits('update:row', {})
  emits('update:modelValue', false)
}

function onConfirm (cb: any) {
  onClosed()
  cb()
}

const curParams: any = ref({
  pageNum: 1,
  pageSize: 10
})

async function asyncData () {
  const params: any = Object.assign({}, curParams.value || {})
  // const { success, msg, data }: any = await apiName(params)
  const { success, msg, data }: any = { success: true, msg: '', data: {} }
  if (!success) return ElMessage.error(msg)
  state.data = get(data || {}, 'list', [])
}

</script>

<style lang="scss" scoped>
.iphone-14 {
  width: 33.33%;
  height: 900px;
  position: relative;
  // 1920 * 1080 窗口
  .time{
    position: absolute;
    top: 110px;
    right: 50px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
}

.iframe-container{
  display: flex;
  flex: 0 0 1;
  flex-wrap: wrap;
 
}
</style>
