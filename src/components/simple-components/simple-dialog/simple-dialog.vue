<template>
  <el-dialog
    v-model="show"
    v-bind="$attrs"
    destroy-on-close
    append-to-body
    class="simple-modal"
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
          {{ $attrs['confirm-text'] || '确认' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
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
.simple-modal {
  &.el-dialog{
    background: #FFFFFF;
    border-radius: 0;
    // padding: 0 ;
    .el-dialog__header {
      display: flex;
      justify-content: center;
      align-items: end;
      padding: 0 24px;
      width: 100%;
      height: 46px;
      button {
        i {
          font-size: 25px;
          > svg {
            width: 100%;
            height: 100%;
          }
        }
      }
      .el-dialog__title {
        font-family: PingFang SC;
        font-size: $font-size-20;
        width: 100%;
        line-height: 28px;
      }

    }

    .el-dialog__body {
      display: flex;
      flex-direction: column;
      padding: 20px 17px;
    }
  }

  .pass-box {
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
  .poss-confirm {
    margin-left: 20px;
  }
  .poss-cancel {
    color: rgba(0, 0, 0, 0.65);
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.15);
  }
}
}


</style>
