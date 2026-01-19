import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkNumber } from '@/utils/validator'

// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '搜索标签', key: 'searchTag', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '排序', key: 'sort', type: 'select', options: [
      { label: '执行时间倒序', value: 'lastExecuteTime_DESC' },
      { label: '执行时间正序', value: 'lastExecuteTime_ASC' },
    ],
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
  { label: '多选框', type: 'selection', key: 'checkbox-group', width: '100px' },
  { label: '序号', type: 'index', key: 'index', width: '100px' },
  { label: '文本字段', key: 'y1', },
  { label: '字典字段', key: 'chooseType12Name', transform: '12.dist' },
  { label: '时间字段', key: 'y3', transform: '{y}-{m}-{d}' },
  { label: '插槽字段', key: 'y4', type: 'slot', slotName: 'y4' },
  {
    label: '函数字段',
    key: 'y5',
    transform: (data: any) => {
      return data == 0 ? '否' : '是'
    }
  },
  {
    label: '弹窗操作事件',
    key: 'dialogAction',
    type: 'slot',
    slotName: 'dialogAction',
    width: '400px',
  },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '210px',
  },
]


export const formFields = [
  {
    label: '文本显示字数限制', key: 'y1', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入标题,限30字内',
    },
  },
  {
    label: '不显示label', key: 'y91', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true, labelWidth: 0 },
    },
  },
  {
    label: '数字类型输入框', key: 'y2', type: 'input',
    props: {
      clearable: true,
      gridItem: { span: 24 },
      min: 0,
      type: 'number',
      'suffix': '㎡',
      formItem: { required: true, },
      rules: [
        { validator: checkNumber, trigger: 'blur' }
      ]
    },
  },
  {
    label: '时间范围选择器', key: 'y3', type: 'datePicker', props: {
      'value-format': 'x',
      clearable: true,
      type: 'datetimerange',
      formItem: { required: true, },
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      gridItem: { span: 24 }
    }
  },
  {
    label: '单选框', key: 'y4', type: 'radio-group', options: [
      { label: '单选框1', value: true },
      { label: '单选框2', value: false },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '多选框', value: '', key: 'key1', type: 'checkbox-group', options: [
      { value: 1, label: '多选框1' },
      { value: 2, label: '多选框2' },
    ] as any, props: {
      formItem: { required: true, }
    },
  },
  {
    label: '选择器', key: 'y5', type: 'select', options: get(dictData, 'dict_sys_user_sex.list', []), props: {
      clearable: true,
      formItem: { required: true, }
    },
  },
  {
    label: '级联选择器(暂未开发)', key: 'y6', slotName: 'cascader', type: 'slot', options: [
      { name: '选项1', id: 1, childList: [{ name: '选项1-1', id: '1-1' }] },
      { name: '选项2', id: 2 }
    ],
    props: {
      clearable: true,
      formItem: { required: true, },
      gridItem: { span: 24 },
      props: {
        checkStrictly: true,
        value: 'id',
        label: 'name',
        children: 'childList',
        emitPath: false
      }
    }
  },
  {
    label: '富文本编辑器', key: 'content', type: 'slot', slotName: 'richText', options: [
    ] as any,
    props: {
      clearable: true,
      formItem: { required: false, }
    },
  },
  {
    label: '附件上传', key: 'fileUrl', type: 'slot', slotName: 'upload',
    props: {
      formItem: { required: true, },
      size: 10 * 1024,
      limit: 1,
      isShowTip: true,
      tips: '支持JPG/PNG，建议800*600，最多上传5张，单张限10M内',
      acceptType: ['pdf', 'png', 'jpg', 'jpeg'],
      listType: 'picture-card'
    },
  },

  {
    label: '插槽字段', key: 'y9', slotName: 'slotName', type: 'slot',
    props: {}
  },

  {
    label: 'label插槽', key: 'y10', type: 'input',
    props: {}
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



export const parseHistoryTableColumns = [
  // { label: '藏宝阁链接', key: 'cbgH5Url', },
  // { label: '装备描述', key: 'equipDesc', type: 'slot', slotName: 'equipDesc' },
  { label: '商品名称', key: 'equipName', },
  { label: '装备等级', key: 'equipLevel', },
  {
    label: '服务器名称', key: 'serverName', transform: (data: any, row) => {
      // 服务器名称
      return row.areaName + '-' + row.serverName
    }
  },
  {
    label: '装备价格', key: 'price', transform: (data: any, row) => {
      // 价格分转元
      return (data ? (data / 100).toFixed(2) : '') + '元'
    }
  },
  { label: '上架时间', key: 'sellingTime', transform: '{y}-{m}-{d} {h}:{i}:{s}' },
  { label: '过期时间', key: 'expireTime', transform: '{y}-{m}-{d} {h}:{i}:{s}' },
  { label: '解析时间', key: 'createTime', transform: '{y}-{m}-{d} {h}:{i}:{s}' },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '210px',
  },
]

export const SearchTableColumn: FieldItem[] = [
  { label: '搜索标签', key: 'searchTag' },
  { label: '搜索描述', key: 'description', width: '500px' },
  { label: '关联数量(件)', key: 'equipmentCount', width: '150px' ,type:'slot',slotName:'equipmentCount'},
  { label: '执行次数(次)', key: 'useCount', width: '150px' },
  { label: '最近执行时间', key: 'lastExecuteTime', transform: '{y}-{m}-{d} {h}:{i}:{s}' },
  // { label: '创建人', key: 'createdByName', width: '100px' },
  // { label: '创建时间', key: 'createTime', transform: '{y}-{m}-{d}' },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '210px',
  },
]