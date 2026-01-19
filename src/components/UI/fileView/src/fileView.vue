<template>
  <div class="file_list" :class="{img_list:fileType ==='img'}">
    <template v-for="(item,index) in ( fileList || [])" :key="'file'+index">
      <template v-if="fileType === 'img'">
        <div class="img_item">
          <el-image fit="contain" :src="item[urlKey]" :preview-src-list="bigImg" />
          <div class="img_opt_shadow">
            <div v-if="download" class="icon_btn" @click.stop="goDownLoadFile(item,index)">
              下载
            </div>
            <div v-if="remove" class="icon_btn" @click.stop="delItem(item,index)">
              删除
            </div>
          </div>
        </div>
      </template>
      <template v-else-if="fileType === 'video'">
        <div
          v-if="item"
          class="file_item"
          :class="{isLoading:item.status === 'active'}"
        >
          <p>
            <span class="icon_box icon_file">
              <el-icon>
                <document />
              </el-icon>
            </span>
            <span>{{ item[nameKey] || '' }}</span>
          </p>
          <p>
            <span v-if="download" class="icon_box" @click.stop="goDownLoadFile(item,index)">
              <el-icon>
                <download />
              </el-icon>
            </span>
            <span v-if="remove" class="icon_box" @click.stop="delItem(item,index)">
              <el-icon>
                <delete />
              </el-icon>
            </span>
          </p>
        </div>
      </template>
      <template v-else>
        <div
          v-if="item"
          class="file_item"
          :class="{isLoading:item.status === 'active'}"
        >
          <p>
            <span class="icon_box icon_file">
              <img v-if="getFileSuffix(item) === 'pdf'" :src="imgPath('UI/icon-file/icon-file-pdf.png')">
              <img v-if="['xlsx','xls'].includes(getFileSuffix(item))" :src="imgPath('UI/icon-file/icon-file-excel.png')">
              <img v-if="['docx','doc'].includes(getFileSuffix(item))" :src="imgPath('UI/icon-file/icon-file-word.png')">
              <img v-if="['pptx','ppt'].includes(getFileSuffix(item))" :src="imgPath('UI/icon-file/icon-file-ppt.png')">
              <img v-else :src="imgPath('UI/icon-file/icon-file-normal.png')">
            </span>
            <span>{{ item[nameKey] || '' }}</span>
          </p>
          <p>
            <!-- 只有图片文件才会出现预览按钮 -->
            <span v-if="['jpg','jpeg','png','gif','bmp','webp'].includes(getFileSuffix(item))" class="icon_box">
              <el-button type="text" @click.stop="onPreviewImgFile(item,index)">预览</el-button>
              <el-image ref="imageRef" :src="item[urlKey]" :preview-src-list="bigImg"></el-image>
            </span>
            <span v-if="['pdf'].includes(getFileSuffix(item))" class="icon_box">
              <el-button type="text" @click.stop="onPreviewPdfFile(item,index)">预览</el-button>
            </span>
            <span v-if="download" class="icon_box" @click.stop="goDownLoadFile(item,index)">
              <el-button type="text">下载</el-button>
            </span>
            <span v-if="remove" class="icon_box" @click.stop="delItem(item,index)">
              <el-button type="text">删除</el-button>
            </span>
          </p>
        </div>
      </template>
    </template>
  </div>
</template>

<script lang="ts">
import { get } from 'lodash-es'
import { defineComponent, computed, ref, watch, SetupContext } from 'vue'
import { ElMessage } from 'element-plus'
// import { useVModel } from '@vueuse/core'
import downLoadFile from '@/utils/downloadFile'
import { imgPath } from '@/utils'

export default defineComponent({
  props: {
    modelValue: { type: [String, Object, Array], default: () => [] },
    download: {
      type: Boolean,
      default: true
    },
    remove: {
      type: Boolean,
      default: false
    },
    // 文件类型
    fileType: {
      type: String,
      default: 'file'
    },
    domain: {
      type: String,
      default: ''
    },
    // 数据值key
    valueConfig: {
      type: Object,
      default: () => {
        return {
          name: 'originalFilename',
          url: 'fileUrl'
        }
      }
    }
  },
  emits: ['update:modelValue', 'del','cover'],
  setup (props: any, ctx: SetupContext) {
    const nameKey = computed(() =>
      get(props || {}, 'valueConfig.name', 'originalFilename')
    )
    const urlKey = computed(() =>
      get(props || {}, 'valueConfig.url', 'fileUrl')
    )
    let { VITE_FILE_DOMAIN } = import.meta.env
    const bigImg = computed(() => {
      const imgList: any = []
      fileList.value.forEach((item: any) => {
        if (item[urlKey.value] && ['jpg','jpeg','png','gif','bmp','webp'].includes(getFileSuffix(item)) ) {
          imgList.push(VITE_FILE_DOMAIN + item[urlKey.value])
        }
      })
      return imgList
    })
    // const fileList=useVModel(props, 'modelValue', ctx.emit)
    const fileList:any = ref([])
    const initData = () => {
      if (props.modelValue) {
        fileList.value = []
        let list = props.modelValue
        if (list && typeof list === 'string') {
          try {
            list = JSON.parse(list)
          } catch (error) {}
        }
        list = Array.isArray(list) ? list : [list]
        list.map((item: any) => {
          let itemObj: any = {}
          if (typeof item === 'string' || typeof item === 'number') {
            itemObj[nameKey.value] = String(item)
            itemObj[urlKey.value] =  String(item)
          } else {
            itemObj = item
          }
          if (itemObj[urlKey.value].indexOf('/') === 0) {
            itemObj[urlKey.value] = (props.domain || '') + itemObj[urlKey.value]
          }
          fileList.value.push(itemObj)
        })
      }
    }
    watch(
      () => {
        return props.modelValue
      },
      () => {
        initData()
      },
      { deep: true }
    )
    initData()

    const goDownLoadFile = (data: any, index: number) => {
      let { VITE_FILE_DOMAIN } = import.meta.env
      let fileUrl = data && data[urlKey.value] ? data[urlKey.value] : ''
      const fileName = data && data[nameKey.value] ? data[nameKey.value] : ''
      if (!fileUrl) {
        ElMessage.error('未找到文件路径')
        return false
      }
      downLoadFile(VITE_FILE_DOMAIN + fileUrl, fileName)
    }
    const delItem = (item: any, index: number) => {
      fileList.value.splice(index, 1)
      changeFiles()
      ctx.emit('del', fileList.value)
    }

    const imageRef = ref<any>(null)
    function onPreviewImgFile(item: any, index: number) {
      imageRef.value[0].showPreview()  // 调用预览方法
    }
    const onPreviewPdfFile = (item: any, index: number) => {
      window.open(VITE_FILE_DOMAIN + item[urlKey.value], '_blank')
    }
    const coverItem = (item: any, index: number) => {
      item.cover = true
      ctx.emit('cover', {
        file:item,
        index
      })
      ElMessage.info('操作成功')
    }

    // 获取文件的后缀
    const getFileSuffix = (item: any) => {
      const url = item[urlKey.value]
      const suffix = url.split('.').pop()
      return suffix
    }

    const changeFiles = () => {
      ctx.emit('update:modelValue', fileList.value)
    }
    return {
      nameKey,
      urlKey,
      fileList,
      bigImg,
      isLoading: true,
      goDownLoadFile,
      delItem,
      coverItem,
      changeFiles,
      imgPath,
      getFileSuffix,
      onPreviewImgFile,
      onPreviewPdfFile,
      imageRef
    }
  }
})
</script>

<style lang="scss" scoped>
.file_list {
  padding: 0;
  margin: 0;
  background: rgba(101,112,128,.8);
  .file_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px ;
    font-size: 14px;
    color: #333;
    line-height: 24px;
    background: rgba(255,255,255,0.8);
    border: 1px solid #fff;
    position: relative;
    padding:6px 20px;
    & + .file_item {
      margin-top: 10px;
    }

    .icon {
      font-size: 14px;
      fill: #565d64;
      color: #565d64;
      line-height: 20px;
    }
    .icon_file {
      cursor: unset !important;
      margin-right: 5px;
      img{
        width: auto;
        height: 20px;
      }
    }
    ::v-deep .icon_box {
      width: 24px;
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 14px;
      & + .icon_box {
        margin-left: 10px;
      }
      .el-icon {
        svg {
          width: 14px;
          height: 14px;
        }
      }
    }
    p {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .uploadStatus {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      font-size: 14px;
      // color: #fff;
      text-align: center;
      line-height: 20px;
      height: 0;
      top: unset;
      background: transparent;
      cursor: pointer;
      &.isLoading {
        cursor: not-allowed;
        height: 100%;
        top: 0;
        background: rgba($color: #000000, $alpha: 0.1);
      }
      p {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      ::v-deep .el-progress {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -6px;
        .el-progress-bar__outer {
          border-radius: 0;
        }
        .el-progress-bar__outer {
          border-radius: 0;
          height: 4px !important;
          .el-progress-bar__inner {
            border-radius: 0;
          }
        }
      }
    }
  }
  &.img_list {
    display: inline-block;
    vertical-align: top;
    .img_item {
      display: inline-block;
      vertical-align: top;
      margin-right: 10px;

      width: 160px;
      height: 120px;
      border: 1px solid #cbcbcb;

      position: relative;
      .img_box {
        width: 100%;
        height: 100%;
        background: #f1f2f3;
        ::v-deep .el-image {
          width: 100%;
          height: 100%;
        }
      }
      .error_tips {
        display: block;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        color: #c7c7c7;
        line-height: 24px;
        white-space: nowrap;
        text-align: center;
        cursor: pointer;
      }
      .uploadProgress {
        position: absolute;
        left: 0;
        top: 0;
        width: 160px;
        height: 120px;
        padding: 5px;
        box-sizing: border-box;
        background: #ffffff;
        ::v-deep .el-progress {
          width: 100%;
          height: 100%;
          .el-progress-circle {
            width: 100% !important;
            height: 100% !important;
            svg{
              width: 100% !important;
            height: 100% !important;
            }
          }
          .el-progress__text {
            font-size: 14px !important;
          }
        }
      }
      .img_opt_shadow {
        position: absolute;
        left: 0;
        right: 0;
        height: 32px;
        bottom: 0;
        width: 100%;
        background: rgba(3,102,241,0.85);
        text-align: center;
        font-size: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        display: none;
        .icon_btn {
          display: inline-block;
          vertical-align: top;
          color: #fff;
          position: relative;
          cursor: pointer;
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 24px;
          &~.icon_btn{
            margin-left: 20px;
            position: relative;
            &::after{
              content: '';
              width: 1px;
              height: 12px;
              background: white;
              opacity: 1;
              position: absolute;
              top: 50%;
              left: -10px;
              margin-top: -6px;
            }
          }
          ::v-deep .el-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            svg {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.file_item{
  .icon{
    width: 20px;
  }
}
</style>
