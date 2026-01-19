import JSZip from 'jszip'
import FileSaver from 'file-saver'
import { ElMessage, ElLoading } from 'element-plus'

const getFile: any = (fileUrl: any) => {
  if (!fileUrl) {
    return false
  }
  return new Promise((resolve: any, reject: any) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', fileUrl, true)
    xhr.responseType = 'blob'
    // xhr.responseType = 'arraybuffer'
    xhr.send()
    xhr.onload = e => {
      if (!e) {
        ElMessage.error('文件加载失败')
        reject()
        return
      }
      if (xhr.status === 200) {
        // var urlObject = window.URL.createObjectURL(xhr.response)
        // console.log(urlObject)
        resolve(xhr.response)
      } else {
        ElMessage.error('文件加载失败')
        reject()
      }
    }
    xhr.onerror = () => {
      ElMessage.error('文件加载失败')
      reject()
    }
  })
}
const getFileName: any = (fileUrl: any) => {
  const arrName = fileUrl.split('/')
  const fileName = arrName[arrName.length - 1]
  return fileName
}
const downLoadOne: any = async (fileUrl: any, fileName: any) => {
  const loading = ElLoading.service({
    text: '资源下载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  })
  try {
    const fileData: any = await getFile(fileUrl)
    let dataName = fileName
    const linkFileName = getFileName(fileUrl)
    if (!dataName) {
      dataName = linkFileName
    } else {
      if (dataName.indexOf('.') === -1 && linkFileName.indexOf('.') !== -1) {
        const linkNameArr = linkFileName.split('.')
        dataName = dataName + '.' + linkNameArr[linkNameArr.length - 1]
      }
    }
    console.log('linkFileName', linkFileName, dataName)
    loading.close()
    FileSaver.saveAs(fileData, dataName).on('progress', function (event:any) {
      // 获取保存进度
      const progress = event.loaded / event.total
      console.log('保存进度：', progress)
    })
  } catch (error) {
    loading.close()
  }
}
const downLoadZip: any = (array: any, zipName: any) => {
  if (zipName && zipName.indexOf('.') !== -1) {
    zipName = zipName + '.zip'
  }
  const loading = ElLoading.service({
    text: '资源下载中...',
    background: 'rgba(0, 0, 0, 0.8)'
  })
  const data = array
  const zip = new JSZip()
  const cache: any = {}
  const promises: any = []
  data.forEach((item: any) => {
    const promise = getFile(item).then((data: any) => {
      // 下载文件, 并存成ArrayBuffer对象
      const fileName = getFileName(item)
      zip.file(fileName, data, { binary: true })
      cache[fileName] = data
    })
    promises.push(promise)
  })
  Promise.all(promises).then(() => {
    loading.close()
    zip.generateAsync({ type: 'blob' }).then((content: any) => { // 生成二进制流
      FileSaver.saveAs(content, zipName)
    })
  }).catch(() => {
    loading.close()
  })
}
const downLoadFile = (data: any, fileName: any) => {
  if (!data) {
    return
  }
  if (typeof data === 'string') {
    downLoadOne(data, fileName)
  } else {
    downLoadZip(data, fileName)
  }
}
export default downLoadFile
