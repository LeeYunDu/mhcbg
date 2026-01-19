<template>
  <div class="images-component">
    <div v-for="(item,index) in useDate" :key="index" class="image-item">
      <el-image
        style="width: 100px; height: 100px"
        :src="item.fileUrl"
        fit="contain"
        z-index="9999"
        :lazy="true"
        :preview-teleported="true"
        :preview-src-list="useDate.map(e=>e.fileUrl)"
      />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { get, isArray, isString } from 'lodash-es'


let props = defineProps({
  data:{
    type:Array||String,
    default:()=>[]
  },
})

const { VITE_FILE_DOMAIN }  = import.meta.env

let useDate = computed(()=>{
  if(isArray(props.data)){
    return props.data
  }
  if(isString(props.data)){
    try {
      let arr = JSON.parse(props.data)
      arr.map(e=>{
        e.fileUrl = VITE_FILE_DOMAIN + e.fileUrl
      })
      return arr
    } catch (error) {
      console.log(error)
      return []
    }

  }
  return []
})


function onPreview(index){
  // showImagePreview({
  //   images: useDate.value.map(e=>e.fileUrl),
  //   startPosition: index,
  // })
}

</script>


<style lang="scss" scoped>
.images-component{
  position: relative;
  z-index: 9999;
}
</style>
