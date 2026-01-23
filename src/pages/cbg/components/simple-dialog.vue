<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="50%"
    body-padding="20"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <iframe
      src="https://xyq-m.cbg.163.com/cgi/mweb/equip/77/202511071900113-77-AVHGXDEPIP43Q?refer_sn=019BE4FE-EAE0-EABE-F041-E3808D1F8E9E"
      frameborder="0"
      width="100%"
      height="400px"
    ></iframe>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  row: { type: Object, default: () => ({}) }
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

<style lang="scss" scoped></style>
