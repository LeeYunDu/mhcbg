import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData


// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '问卷名称', key: 'questionTitle', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      placeholder: '请输入内容',
    },
  },

  {
    label: '', type: 'slot', slotName: 'button', key: '', props: {
      gridItem: { span: 4 },
      formItem: {
        labelWidth: 0
      }
    }
  }
]

// 表单配置
export const tableQueryFormOptions = {
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 6 }
  }
}



export const tableColumn: FieldItem[] = [
  { label: '问卷名称', key: 'questionTitle', },
  { label: '问卷介绍', key: 'description', type: 'slot', slotName: 'description' },
  // { label: '创建人', key: 'createdByName' },
  // { label: '创建时间', key: 'createTime', transform: '{y}-{m}-{d}', width: '200px' },
  // {
  //   label: '状态', key: 'status', type: 'slot', slotName: 'status', width: '200px'
  // },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
  },
]
// (0 单选题 1 多选题 2 图片 3 视频  4 描述  5 判断题)
export const questionTypeOptions = [
  { label: '单选题', value: '0' },
  { label: '多选题', value: '1' },
  { label: '图片', value: '2' },
  { label: '视频', value: '3' },
  { label: '描述题', value: '4' },
  { label: '判断题', value: '5' },
].map(e => {
  e.value = Number(e.value)
  return e
})

export const questionDesignQueryFormFields: FormMode[] = [
  {
    label: '关联问卷', key: 'questionnaireId', type: 'slot', slotName: 'questionnaireId', options: [],
    props: {
      gridItem: { span: 6 },
      clearable: true,
      placeholder: '请选择关联问卷',
    },
  },
  {
    label: '问题维度', key: 'scoringDimension', type: 'select', options: get(dictData, 'dict_question_item_type.list', []),
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    }
  },
  {
    label: '', type: 'slot', slotName: 'button', key: '', props: {
      gridItem: { span: 4 },
      formItem: {
        labelWidth: 0
      }
    }
  }
]


export const questionTableColumn: FieldItem[] = [
  { label: '题目名称', key: 'title', },
  {
    label: '题目类型', key: 'type', transform: 'question_option_type.list'
  },
  {
    label: '问题维度', key: 'scoringDimension', transform: 'question_item_type.list'
  },
  {
    label: '是否必答', key: 'required', type: 'slot', slotName: 'required'
  },
  // { label: '排序', key: 'sortOrder' },
  { label: '关联问卷', key: 'questionnaireTitle' },
  { label: '创建人', key: 'createdByName' },
  { label: '创建时间', key: 'createTime', transform: '{y}-{m}-{d}' },
  {
    label: '状态', key: 'status', type: 'slot', slotName: 'status'
  },

  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
  },
]



export const questionAnswerQueryFormFields: FormMode[] = [
  {
    label: '关联问卷', key: 'questionnaireId', type: 'slot', slotName: 'questionnaireId', options: [],
    props: {
      gridItem: { span: 6 },
      clearable: true,
      placeholder: '请选择关联问卷',
    },
  },
  // 答卷人
  {
    label: '答卷人', key: 'answerUserName', type: 'input',
    props: {
      gridItem: { span: 6 },
      formItem: { required: false },
      clearable: true,
      placeholder: '请输入答卷人',
    },
  },
  {
    label: '', type: 'slot', slotName: 'button', key: '', props: {
      gridItem: { span: 4 },
      formItem: {
        labelWidth: 0
      }
    }
  }
]

export const questionnaireAnswerTableColumn: FieldItem[] = [
  { label: '问卷名称', key: 'questionnaireTitle', },
  { label: '问卷填写人', key: 'answerUserName', },
  { label: '填写时间', key: 'createTime', transform: '{y}-{m}-{d} {h}:{i}:{s}' },
  // {
  //   label: '状态', key: 'answerStatus', type: 'slot', slotName: 'status'
  // },

  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
  },
]

export const formFields = [
  {
    label: '问卷名称', key: 'questionTitle', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 100,
      'show-word-limit': true,
      placeholder: '请输入问卷名称,限100字内',
    },
  },
  {
    label: '问卷评分标准', key: 'scoringSystem', type: 'select', options: get(dictData, 'dict_questionnaire_score_system.list', []),
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
    },
  },
  {
    label: '问卷介绍', key: 'description', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 300,
      type: 'textarea',
      rows: 4,
      'show-word-limit': true,
      placeholder: '请输入问卷介绍,限300字内',
    },
  },
  // {
  //   label: '问卷配置', key: 'settings', slotName: 'settings', type: 'slot',
  //   props: {}
  // },
  {
    label: '问卷状态', key: 'status', type: 'radio-group', options: [
      { label: '启用', value: 1 },
      { label: '停用', value: 0 },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },

]



export const questionFormFields = [
  // 关联问题
  {
    label: '关联问卷', key: 'questionnaireId', type: 'slot', slotName: 'questionnaireId', options: [],
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      placeholder: '请选择关联问卷',
    },
  },

  {
    label: '问题名称', key: 'title', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 100,
      'show-word-limit': true,
      placeholder: '请输入问题名称,限100字内',
    },
  },
  {
    label: '问题类型', key: 'type', type: 'radio-group', options: get(dictData, 'dict_question_option_type.list', []),
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },

  // 问卷维度 scoringDimension
  {
    label: '问题维度', key: 'scoringDimension', type: 'select', options: get(dictData, 'dict_question_item_type.list', []),
    props: {
      formItem: { required: false, }
    },
  },


  {
    label: '问题选项', key: 'optionsIds', slotName: 'optionsIds', type: 'slot',
    props: {}
  },
  {
    label: '是否必答', key: 'required', type: 'radio-group', options: [
      { label: '是', value: 1 },
      { label: '否', value: 0 },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  // {
  //   label: '问题分值', key: 'value', type: 'input',
  //   props: {
  //     gridItem: { span: 24 },
  //     formItem: { required: true },
  //     clearable: true,
  //     type: 'number',
  //     placeholder: '请输入问题分值',
  //   },
  // },

  // {
  //   label: '排序', key: 'sortOrder', type: 'input',
  //   props: {
  //     gridItem: { span: 24 },
  //     formItem: { required: true },
  //     clearable: true,
  //     type: 'number',
  //   },
  // },

  // {
  //   label: '问题配置', key: 'config', slotName: 'config', type: 'slot',
  //   props: {
  //     gridItem: { span: 24 },
  //     formItem: { required: false },
  //   }
  // },
]

export const addFormOptions = {
  labels: formFields,
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}


export const questionAddFormOptions = {
  labels: questionFormFields,
  props: {
    inline: true,
    labelWidth: 'auto',
    labelPosition: 'right',
    rules: [],
    'validate-on-rule-change': false,
    ruleTrigger: 'change'
  },
  options: {
    gridItem: { span: 24 }
  }
}
