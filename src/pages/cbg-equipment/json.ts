import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkNumber } from '@/utils/validator'
import { equipStatusEnum } from '@/enums/cbgEnum'

// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: 'eid', key: 'eids', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '服务器', key: 'serverName', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '装备名称', key: 'equipName', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '装备类型', key: 'kindid', type: 'select', options: [
      { label: '全部', value: '' },
      { label: '上古玉魄阳', value: '88' },
      { label: '上古玉魄阴', value: '89' },
    ],
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    }
  },
  {
    label: '装备描述', key: 'sumupTitle', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '藏宝阁状态', key: 'status', type: 'select', options: [
      { label: '全部', value: '' },
      // { label: equipStatusEnum[1], value: '1' },
      { label: equipStatusEnum[2], value: '2' },
      // { label: equipStatusEnum[3], value: '3' },
      { label: equipStatusEnum[4], value: '4' },
      // { label: equipStatusEnum[5], value: '5' },
      { label: equipStatusEnum[6], value: '6' },
    ],
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    }
  },
  {
    label: '标签选择', key: 'bySearchTag', type: 'select', options: get(dictData, 'dict_cbg_tag.list', []),
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      filterable: true,
    }
  },
  {
    label: '排序', key: 'sort', type: 'select', options: [
      { label: '上架时间倒序', value: 'firstOnsaleTime_DESC' },
      { label: '上架时间正序', value: 'firstOnsaleTime_ASC' },
      { label: '入库时间倒序', value: 'createTime_DESC' },
      { label: '入库时间正序', value: 'createTime_ASC' },
      { label: '更新时间倒序', value: 'updateTime_DESC' },
      { label: '更新时间正序', value: 'updateTime_ASC' },
      { label: '价格正序', value: 'price_ASC' },
      { label: '价格倒序', value: 'price_DESC' },
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

  { label: '图标', key: 'icon', type: 'slot', slotName: 'icon', width: '80px' },
  {
    label: '服务器', key: 'serverName', transform: (data: any, row) => {
      // 服务器名称
      return row.serverName
    },
    width: '120px'
  },
  // { label: '藏宝阁链接', key: 'cbgH5Url', },
  // { label: '装备描述', key: 'equipDesc', type: 'slot', slotName: 'equipDesc' },
  {
    label: '商品名称', key: 'equipName', width: '120px', transform: (data: any, row) => {
      if (['88', '89'].includes(row.kindid)) {
        return row.equipName
      } else {
        return row.equipName + ' - ' + row.equipLevel + '级'
      }
      // 商品名称
    }
  },
  { label: '装备描述', key: 'sumupTitle', type: 'slot', slotName: 'sumupTitle', width: '400px' },
  {
    label: '装备价格', key: 'price', transform: (data: any, row) => {
      // 价格分转元
      return data ? (data / 100).toFixed(2) : '' + '元'
    },
    width: '120px'
  },
  { label: '上架/出售时间', key: 'sellingTime', transform: '{y}-{m}-{d}', type: 'slot', slotName: 'sellingTime', width: '300px' },

  {
    label: '关联标签', key: 'bySearchTag', transform: 'cbg_tag.list', width: '200px'
  },
  // { label: '入库时间', key: 'createTime', transform: '{y}-{m}-{d}' },
  // { label: '过期时间', key: 'expireTime', transform: '{y}-{m}-{d}' },
  {
    label: '状态', key: 'status', type: 'slot', slotName: 'status', width: '120px'
  },
  {
    label: '操作',
    key: 'action',
    type: 'slot',
    slotName: 'action',
    width: '250px',

  },
]
