<template>
  <SimpleDrawer
    v-model="state.show"
    :title="state.title"
    :footer-show="true"
    size="70%"
    body-padding="0"
    @closed="onClosed"
    @confirm="onConfirm"
  >
    <div class="assessment-result-container">
      <!-- 基本信息 -->
      <div class="result-section">
        <h2 class="section-title">基本信息</h2>
        <el-card class="basic-info-card" shadow="hover">
          <el-descriptions :column="3" :border="false">
            <el-descriptions-item label="量表名称">{{ basicInfo.scale_name }}</el-descriptions-item>
            <el-descriptions-item label="适用年龄">{{ basicInfo.age_range }}</el-descriptions-item>
            <el-descriptions-item label="评估周期">{{ basicInfo.assessment_period }}</el-descriptions-item>
            <el-descriptions-item label="总分">
              <span class="score-value">{{ basicInfo.total_score }}</span>
            </el-descriptions-item>
            <el-descriptions-item label="临界值">{{ basicInfo.cutoff_score }}</el-descriptions-item>
            <el-descriptions-item label="风险等级">
              <el-tag :type="basicInfo.risk_level.includes('超过') ? 'danger' : 'success'">
                {{ basicInfo.risk_level }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </div>

      <!-- 关键发现 -->
      <div class="result-section">
        <h2 class="section-title">关键发现</h2>
        <el-row :gutter="20">
          <!-- 需关注方面 -->
          <el-col :span="12">
            <el-card class="detail-card attention-card" shadow="hover">
              <div class="card-header">
                <el-icon class="card-icon"><Warning /></el-icon>
                <h3 class="card-title">主要关注问题</h3>
              </div>
              <el-divider style="margin: 12px 0;"></el-divider>
              <el-list>
                <el-list-item v-for="(item, index) in attentions" :key="index" class="list-item">
                  <template #default>
                    <span class="list-bullet">•</span>
                    <span class="list-content">{{ item }}</span>
                  </template>
                </el-list-item>
              </el-list>
            </el-card>
          </el-col>

          <!-- 优势方面 -->
          <el-col :span="12">
            <el-card class="detail-card advantage-card" shadow="hover">
              <div class="card-header">
                <el-icon class="card-icon"><Check /></el-icon>
                <h3 class="card-title">相对优势</h3>
              </div>
              <el-divider style="margin: 12px 0;"></el-divider>
              <el-list>
                <el-list-item v-for="(item, index) in advantages" :key="index" class="list-item">
                  <template #default>
                    <span class="list-bullet">•</span>
                    <span class="list-content">{{ item }}</span>
                  </template>
                </el-list-item>
              </el-list>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 维度得分 -->
      <div class="result-section">
        <h2 class="section-title">维度得分</h2>
        <el-card class="dimensions-card" shadow="hover">
          <el-table :data="dimensions" stripe style="width: 100%">
            <el-table-column prop="dimension_name" label="维度名称" width="180" />
            <el-table-column prop="score" label="得分" width="80">
              <template #default="scope">
                <span class="dimension-score">{{ scope.row.score }}/{{ scope.row.max_score }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="severity" label="严重程度" width="120">
              <template #default="scope">
                <el-tag :type="getSeverityType(scope.row.severity)">
                  {{ scope.row.severity }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="items" label="具体项目">
              <template #default="scope">
                <el-collapse accordion>
                  <el-collapse-item title="查看详情">
                    <el-table :data="scope.row.items" size="small" style="width: 100%">
                      <el-table-column prop="item" label="项目" width="150" />
                      <el-table-column prop="response" label="回答" width="100" />
                      <el-table-column prop="score" label="得分" width="80" />
                      <el-table-column prop="interpretation" label="解释" />
                    </el-table>
                  </el-collapse-item>
                </el-collapse>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>

      <!-- 专业建议 -->
      <div class="result-section">
        <h2 class="section-title">专业建议</h2>
        <el-card class="suggestions-card" shadow="hover">
          <el-timeline>
            <el-timeline-item
              v-for="(recommendation, index) in professionalRecommendations"
              :key="index"
              :timestamp="recommendation.title"
              placement="top"
            >
              <el-card :border="false">
                <el-list>
                  <el-list-item v-for="(action, actionIndex) in recommendation.actions" :key="actionIndex">
                    <template #default>
                      <span class="suggestion-number">{{ actionIndex + 1 }}.</span>
                      <span class="suggestion-content">{{ action }}</span>
                    </template>
                  </el-list-item>
                </el-list>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </div>

      <!-- 免责声明 -->
      <div class="result-section">
        <h2 class="section-title">免责声明</h2>
        <el-card class="disclaimer-card" shadow="hover">
          <div class="disclaimer-content">
            {{ disclaimer }}
          </div>
        </el-card>
      </div>
    </div>
  </SimpleDrawer>
</template>

<script setup lang="ts">
import SimpleDrawer from '@/components/simple-components/simple-dialog/simple-drawer.vue'
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
  title: '测评结果详情',
  data: {},
  mockData: {
    'assessment_report': {
      'basic_info': {
        'scale_name': '儿童抑郁障碍自评量表(DSRSC)',
        'age_range': '7-13岁',
        'assessment_period': '最近两周',
        'total_score': 21,
        'cutoff_score': 15,
        'risk_level': '超过临界值，需专业评估'
      },
      'item_analysis': {
        'emotional_symptoms': {
          'dimension_name': '情绪症状维度',
          'score': 8,
          'max_score': 8,
          'severity': '显著异常',
          'items': [
            { 'item': '感到烦恼', 'response': '经常有', 'score': 2, 'interpretation': '情绪困扰明显' },
            { 'item': '感到悲哀', 'response': '经常有', 'score': 2, 'interpretation': '持续情绪低落' },
            { 'item': '总是想哭', 'response': '经常有', 'score': 2, 'interpretation': '情绪易感性高' },
            { 'item': '感到孤独', 'response': '经常有', 'score': 2, 'interpretation': '缺乏情感连接' }
          ]
        },
        'somatic_symptoms': {
          'dimension_name': '躯体症状维度',
          'score': 3,
          'max_score': 4,
          'severity': '明显异常',
          'items': [
            { 'item': '肚子痛', 'response': '经常有', 'score': 2, 'interpretation': '情绪相关的躯体不适' },
            { 'item': '做噩梦', 'response': '有时有', 'score': 1, 'interpretation': '睡眠质量受影响' }
          ]
        },
        'anhedonia': {
          'dimension_name': '兴趣减退维度',
          'score': 3,
          'max_score': 6,
          'severity': '轻度异常',
          'items': [
            { 'item': '喜欢出去玩', 'response': '有时有', 'score': 1, 'interpretation': '兴趣轻度减退' },
            { 'item': '喜欢各种事物', 'response': '有时有', 'score': 1, 'interpretation': '愉悦感降低' },
            { 'item': '容易高兴起来', 'response': '有时有', 'score': 1, 'interpretation': '积极情绪调节能力下降' }
          ]
        },
        'self_evaluation': {
          'dimension_name': '自我评价维度',
          'score': 2,
          'max_score': 4,
          'severity': '轻度异常',
          'items': [
            { 'item': '对自己有信心', 'response': '有时有', 'score': 1, 'interpretation': '自信心不足' },
            { 'item': '做事令人满意', 'response': '有时有', 'score': 1, 'interpretation': '自我满意度偏低' }
          ]
        },
        'physiological_function': {
          'dimension_name': '生理功能维度',
          'score': 3,
          'max_score': 6,
          'severity': '基本正常',
          'items': [
            { 'item': '睡得很香', 'response': '有时有', 'score': 1, 'interpretation': '睡眠质量一般' },
            { 'item': '吃东西香', 'response': '有时有', 'score': 1, 'interpretation': '食欲基本正常' },
            { 'item': '精力充沛', 'response': '有时有', 'score': 1, 'interpretation': '精力水平一般' }
          ]
        },
        'positive_emotions': {
          'dimension_name': '积极情绪维度',
          'score': 2,
          'max_score': 4,
          'severity': '轻度异常',
          'items': [
            { 'item': '盼望美好事物', 'response': '有时有', 'score': 1, 'interpretation': '希望感降低' },
            { 'item': '爱与家人交谈', 'response': '有时有', 'score': 1, 'interpretation': '家庭沟通一般' }
          ]
        }
      },
      'key_findings': {
        'primary_concerns': [
          '情绪困扰突出：持续感到烦恼、悲哀、孤独，经常想哭',
          '躯体不适：经常性肚子痛，可能与情绪问题相关',
          '兴趣减退：对日常活动兴趣下降，愉悦感降低',
          '自我评价偏低：自信心不足，做事满意度不高'
        ],
        'relative_strengths': [
          '生活意义感尚可（\'生活没意思\'选择\'没有\'）',
          '无明确的离家出走想法',
          '基本生理功能得到维持'
        ]
      },
      'professional_recommendations': [
        {
          'level': 'immediate_action',
          'title': '立即行动建议',
          'actions': [
            '建议尽快寻求专业心理咨询师或精神科医生的评估',
            '家长需密切关注孩子的情绪变化和行为表现'
          ]
        },
        {
          'level': 'family_support',
          'title': '家庭支持建议',
          'actions': [
            '创造安全、接纳的家庭环境，多倾听孩子感受',
            '避免批评指责，给予情感支持和理解',
            '鼓励孩子表达情绪，建立良好的沟通渠道'
          ]
        },
        {
          'level': 'daily_monitoring',
          'title': '日常观察要点',
          'actions': [
            '观察睡眠、饮食、学习状态的变化',
            '关注社交情况，鼓励适度参与集体活动',
            '注意安全防护，防止意外发生'
          ]
        }
      ],
      'disclaimer': '本测评仅为筛查工具，不能替代临床诊断。21分的得分提示需要专业干预，建议尽快安排专业评估以明确诊断和制定干预方案。'
    }
  }
})

// 获取评估报告数据
const assessmentReport = computed(() => state.mockData.assessment_report || {})

// 基本信息
const basicInfo = computed(() => assessmentReport.value.basic_info || {})

// 项目分析
const itemAnalysis = computed(() => assessmentReport.value.item_analysis || {})

// 关键发现
const keyFindings = computed(() => assessmentReport.value.key_findings || {})

// 专业建议
const professionalRecommendations = computed(() => assessmentReport.value.professional_recommendations || [])

// 免责声明
const disclaimer = computed(() => assessmentReport.value.disclaimer || '')

// 优势方面
const advantages = computed(() => keyFindings.value.relative_strengths || [])

// 需关注方面
const attentions = computed(() => keyFindings.value.primary_concerns || [])

// 维度得分列表
const dimensions = computed(() => {
  const analysis = itemAnalysis.value
  return Object.values(analysis).map(item => ({
    dimension_name: item.dimension_name,
    score: item.score,
    max_score: item.max_score,
    severity: item.severity,
    items: item.items
  }))
})

// 根据严重程度获取标签类型
const getSeverityType = (severity: string) => {
  switch (severity) {
    case '显著异常':
      return 'danger'
    case '明显异常':
      return 'warning'
    case '轻度异常':
      return 'info'
    case '基本正常':
      return 'success'
    default:
      return 'info'
  }
}


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

  // 基本信息卡片
  .basic-info-card {
    .el-descriptions {
      .el-descriptions-item {
        .el-descriptions-item__label {
          font-weight: 500;
          color: #606266;
        }

        .el-descriptions-item__content {
          font-weight: 600;
          color: #303133;
        }

        .score-value {
          font-size: 24px;
          color: #f56c6c;
          font-weight: 700;
        }
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
  }

  // 列表样式
  .list-item {
    padding: 8px 0;
    border: none;

    .list-bullet {
      color: #409eff;
      font-weight: 600;
      margin-right: 8px;
    }

    .list-content {
      font-size: 14px;
      line-height: 1.6;
      color: #606266;
    }
  }

  // 维度得分表格
  .dimensions-card {
    :deep(.el-table) {
      .dimension-score {
        font-weight: 600;
        color: #409eff;
      }

      .el-collapse {
        margin-top: 8px;

        .el-collapse-item {
          border: 1px solid #ebeef5;
          border-radius: 4px;

          .el-collapse-item__header {
            background-color: #fafafa;
          }

          .el-collapse-item__content {
            padding: 12px;

            .el-table {
              margin-bottom: 0;
            }
          }
        }
      }
    }
  }

  // 建议时间线
  .suggestions-card {
    :deep(.el-timeline) {
      .el-timeline-item {
        padding-bottom: 24px;

        &:last-child {
          padding-bottom: 0;
        }

        .el-timeline-item__timestamp {
          font-size: 14px;
          font-weight: 600;
          color: #303133;
          margin-bottom: 8px;
        }

        .el-card {
          box-shadow: none;

          .el-list {
            padding: 0;
          }
        }
      }
    }
  }

  // 建议列表
  .suggestion-number {
    color: #409eff;
    font-weight: 600;
    margin-right: 8px;
  }

  .suggestion-content {
    font-size: 14px;
    line-height: 1.8;
    color: #606266;
  }

  // 免责声明
  .disclaimer-card {
    background-color: #fafafa;
    border-left: 4px solid #909399;

    .disclaimer-content {
      font-size: 14px;
      line-height: 1.8;
      color: #606266;
      text-align: justify;
    }
  }
}
</style>
