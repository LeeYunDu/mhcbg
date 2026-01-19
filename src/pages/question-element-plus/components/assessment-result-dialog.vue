<template>
  <SimpleDialog
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    width="70%"
    body-padding="0"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="assessment-result-container">
      <!-- 总体评估 -->
      <div class="result-section">
        <h2 class="section-title">评估结果</h2>
        <div class="overall-assessment">
          <el-card class="assessment-card" shadow="hover">
            <div class="overall-content">
              {{ overallAssessment }}
            </div>
          </el-card>
        </div>
      </div>

      <!-- 优势与需关注 -->
      <div class="result-section">
        <h2 class="section-title">评估详情</h2>
        <el-row :gutter="20">
          <!-- 优势方面 -->
          <el-col :span="12">
            <el-card class="detail-card advantage-card" shadow="hover">
              <div class="card-header">
                <el-icon class="card-icon"><Check /></el-icon>
                <h3 class="card-title">积极面</h3>
              </div>
              <el-divider style="margin: 12px 0;"></el-divider>
              <div class="custom-list">
                <div v-for="(item, index) in advantages" :key="index" class="custom-list-item">
                  <span class="list-bullet">•</span>
                  <span class="list-content">{{ item }}</span>
                </div>
              </div>
            </el-card>
          </el-col>

          <!-- 需关注方面 -->
          <el-col :span="12">
            <el-card class="detail-card attention-card" shadow="hover">
              <div class="card-header">
                <el-icon class="card-icon"><Warning /></el-icon>
                <h3 class="card-title">需关注方面</h3>
              </div>
              <el-divider style="margin: 12px 0;"></el-divider>
              <div class="custom-list">
                <div v-for="(item, index) in attentions" :key="index" class="custom-list-item">
                  <span class="list-bullet">•</span>
                  <span class="list-content">{{ item }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 维度得分 -->
      <div class="result-section">
        <h2 class="section-title">问卷分析</h2>
        <el-card class="detail-card" shadow="hover">
          <div class="custom-list">
            <div v-for="(item, index) in dimensions" :key="index" class="custom-list-item">
              <span class="list-bullet">•</span>
              <span class="list-content">{{ item }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 初步建议 -->
      <div class="result-section">
        <h2 class="section-title">初步建议</h2>
        <el-card class="detail-card suggestion-card" shadow="hover">
          <div class="custom-list">
            <div v-for="(item, index) in suggestions" :key="index" class="custom-list-item">
              <span class="suggestion-number">{{ index + 1 }}.</span>
              <span class="suggestion-content">{{ item }}</span>
            </div>
          </div>
        </el-card>
      </div>

      <!-- 结论 -->
      <div class="result-section">
        <h2 class="section-title">结论</h2>
        <el-card class="detail-card conclusion-card" shadow="hover">
          <div class="conclusion-content">
            {{ conclusion }}
          </div>
        </el-card>
      </div>
    </div>
  </SimpleDialog>
</template>

<script setup lang="ts">
import SimpleDialog from '@/components/simple-components/simple-dialog/simple-dialog.vue'
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { get } from 'lodash-es'
import { Check, Warning } from '@element-plus/icons-vue'

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
  title: '问卷测评结果',
  data: {},
  mockData: `根据这份 Conners 量表评估数据，该儿童的心理健康状况总体在正常范围内，但存在一些需要关注的信号。
评估结果分析：
优势方面：
• 45个条目选择"无"（0分），占总题数的94%
• 核心行为问题（打架、偷窃、破坏、欺凌等）均无表现

• 学习困难、多动冲动、焦虑等主要维度得分极低

需关注方面：
• 3个条目选择"稍有"：大便问题、被他人欺骗感、家庭中被欺骗感

• 2个条目选择"稍有"：自夸吹牛、睡眠问题

• 1个条目选择"稍有"：饮食问题

维度得分（按1分=稍有计算）：
1. 心身问题维度：涉及题目较多（大便、睡眠、饮食等），轻微表现值得关注
2. 情绪问题：有"被欺骗感"的表述，可能反映情感敏感
3. 品行与多动维度：均在正常范围

初步建议：

1. 当前评估未达到临床异常阈值（因子分＞1.5），属于正常范围
2. 关注儿童的躯体不适表达（大便、睡眠、饮食等问题），可能反映潜在压力
3. 留意儿童的情感体验，特别是"被欺骗感"背后的心理需求
4. 建议3-6个月后复查，观察趋势变化
5. 日常生活中给予更多情感支持，建立安全感

结论：总体心理健康状况良好，但存在轻微的心身症状和情感敏感，建议家长给予温和关注，无需过度干预。`
})

// 总体评估
const overallAssessment = computed(() => {
  const data = state.mockData
  const match = data.match(/^(.*?)\n评估结果分析：/s)
  return match ? match[1].trim() : ''
})

// 优势方面
const advantages = computed(() => {
  const data = state.mockData
  const match = data.match(/优势方面：\n([\s\S]*?)\n\n需关注方面：/)
  if (!match) return []

  return match[1].trim().split('\n')
    .map(item => item.replace(/^•\s*/, '').trim())
    .filter(item => item)
})

// 需关注方面
const attentions = computed(() => {
  const data = state.mockData
  const match = data.match(/需关注方面：\n([\s\S]*?)\n\n维度得分/)
  if (!match) return []

  return match[1].trim().split('\n')
    .map(item => item.replace(/^•\s*/, '').trim())
    .filter(item => item)
})

// 维度得分
const dimensions = computed(() => {
  const data = state.mockData
  const match = data.match(/维度得分（按1分=稍有计算）：\n([\s\S]*?)\n\n初步建议：/)
  if (!match) return []

  return match[1].trim().split('\n')
    .map(item => item.replace(/^\d+\.\s*/, '').trim())
    .filter(item => item)
})

// 初步建议
const suggestions = computed(() => {
  const data = state.mockData
  const match = data.match(/初步建议：\n\n([\s\S]*?)\n\n结论：/)
  if (!match) return []

  return match[1].trim().split('\n')
    .map(item => item.replace(/^\d+\.\s*/, '').trim())
    .filter(item => item)
})

// 结论
const conclusion = computed(() => {
  const data = state.mockData
  const match = data.match(/结论：(.*)$/s)
  return match ? match[1].trim() : ''
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
.assessment-result-container {
  width: 100%;
  max-height: 700px;
  overflow-y: auto;
  padding: 20px;

  // 滚动条样式
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;

    &:hover {
      background: #a8a8a8;
    }
  }

  .result-section {
    margin-bottom: 32px;

    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #409eff;
      display: inline-block;
    }
  }

  // 总体评估
  .overall-assessment {
    .assessment-card {
      .overall-content {
        font-size: 16px;
        line-height: 1.8;
        color: #606266;
        text-align: justify;
      }
    }
  }

  // 评估详情卡片
  .detail-card {
    height: 100%;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 8px;

      .card-icon {
        font-size: 20px;

        :deep(.svg-icon) {
          width: 20px;
          height: 20px;
        }
      }

      .card-title {
        font-size: 16px;
        font-weight: 600;
        margin: 0;
      }
    }

    &.advantage-card {
      border-left: 4px solid #67c23a;

      .card-icon {
        color: #67c23a;
      }

      .card-title {
        color: #67c23a;
      }
    }

    &.attention-card {
      border-left: 4px solid #e6a23c;

      .card-icon {
        color: #e6a23c;
      }

      .card-title {
        color: #e6a23c;
      }
    }

    &.suggestion-card {
      border-left: 4px solid #409eff;
    }

    &.conclusion-card {
      border-left: 4px solid #909399;
    }
  }

  // 列表样式
  .custom-list {
    padding: 0;
    margin: 0;
  }

  .custom-list-item {
    padding: 8px 0;
    border: none;
    display: flex;
    align-items: flex-start;

    .list-bullet {
      color: #409eff;
      font-weight: 600;
      margin-right: 8px;
      margin-top: 6px;
      flex-shrink: 0;
    }

    .list-content {
      font-size: 14px;
      line-height: 1.6;
      color: #606266;
      flex: 1;
    }

    .suggestion-number {
      color: #409eff;
      font-weight: 600;
      margin-right: 8px;
      flex-shrink: 0;
    }

    .suggestion-content {
      font-size: 14px;
      line-height: 1.8;
      color: #606266;
      flex: 1;
    }
  }


  }

  // 结论
  .conclusion-content {
    font-size: 15px;
    line-height: 1.8;
    color: #606266;
    text-align: justify;
    font-weight: 500;
  }

</style>
