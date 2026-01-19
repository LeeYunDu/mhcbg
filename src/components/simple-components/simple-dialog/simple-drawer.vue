<template>
  <el-drawer
    v-model="show"
    v-bind="$attrs"
    destroy-on-close
    append-to-body
    class="simple-drawer"
    :with-header="true"
    @close="onCancel"
  >
    <template v-for="( slot, slotKey ) in $slots" #[slotKey]>
      <slot :name="slotKey"></slot>
    </template>

    <template v-if="footerShow && !$slots.footer" #footer>
      <div class="pass-box">
        <el-button class="btn" type="default" @click="onCancel">取消</el-button>
        <el-button
          :loading="btnLoading"
          type="primary"
          class="btn"
          @click="onConfirm"
        >
          {{ $attrs['confirm-text'] || '提交' }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import _ from 'lodash-es'
import { computed, ref, useAttrs } from 'vue'
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  footerShow: { type: Boolean, default: false },
  bodyPadding: { type: [Array,String], default: () => ([]) },
})

const emits = defineEmits(['update:modelValue','confirm','onCancel'])

const $attrs = useAttrs()

const show = computed({
  get: () => props.modelValue,
  set: val => emits('update:modelValue',val)
})


const btnLoading = ref(false)

const onConfirm = () => {
  btnLoading.value = true
  emits('confirm',() => {
    btnLoading.value = false
  })
}

const onCancel = () => {
  if (_.hasIn($attrs,'onCancel')) return emits('onCancel')
  show.value = false
}

</script>

<style lang="scss">
.simple-drawer {
  &.el-drawer {
    background: #FFFFFF;
    border-radius: 0;

    .el-drawer__header {
      display: flex;
      justify-content: center;
      align-items: end;
      padding: 0 24px;
      width: 100%;
      height: 46px;

      .el-drawer__title {
        font-family: PingFang SC;
        font-size: 16px;
        width: 100%;
        line-height: 28px;
        font-weight: 600;
      }

      .el-drawer__close-btn {
        margin-left: auto;

        i {
          font-size: 20px;
          > svg {
            width: 20px;
            height: 20px;
          }
        }
      }
    }

    .el-drawer__body {
      display: flex;
      flex-direction: column;
      padding: 20px 24px;
      overflow: auto;
    }

    .el-drawer__footer {
      padding: 16px 24px;
      background-color: #fafafa;
      border-top: 1px solid #ebeef5;
      text-align: right;
    }
  }

  .pass-box {
    display: flex;
    justify-content: flex-end;
    gap: 12px;

    .btn {
      font-size: 14px;
      font-weight: 400;
      width: 96px;
      height: 36px;
      border-radius: 4px;
      padding: 0 20px;
      display: inline-block;
      line-height: 36px;
      cursor: pointer;
      min-height: initial;
    }

    .btn[type="primary"] {
      margin-left: 12px;
    }
  }
}
</style>
