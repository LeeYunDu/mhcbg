import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkNumber } from '@/utils/validator'

// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '字典名称', key: 'name', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      placeholder: '请输入内容',
    },
  },
  {
    label: '字典类型', key: 'name', type: 'input',
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
  { label: '', key: '', type: 'expand', width: '80px' },
  { label: '字典名称', key: 'name', width: '300px' },
  { label: '字典类型', key: 'code', },
  // { label: '创建时间', key: 'createTime', },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '300px',
  },
]

export const dictItemColumn: FieldItem[] = [
  { label: '字典名称', key: 'name', width: '300px' },
  { label: '字典类型', key: 'code', },
  // { label: '创建时间', key: 'createTime', },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '300px',
  },
]


export const formFields = [
  {
    label: '字典名称', key: 'name', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
    },
  },
  {
    label: '字典类型', key: 'code', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
    },
  },
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


export const addDictChildFormFields = [
  {
    label: '字典类型', key: 'dictType', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      disabled: true,
    },
  },
  {
    label: '字典项名称', key: 'label', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      placeholder: '请输入字典项名称,限30字内',
    },
  },
  {
    label: '字典项键值', key: 'value', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      placeholder: '请输入字典项键值,限30字内',
    },
  },
  {
    label: '排序', key: 'sortOrder', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      type: 'number',
      min: 0,
      max: 9999,
      placeholder: '请输入排序,限4位数内',
    },
  },

]


export const addDictChildFormOptions = {
  labels: addDictChildFormFields,
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

