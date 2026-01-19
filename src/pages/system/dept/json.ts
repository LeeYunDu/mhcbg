import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkNumber } from '@/utils/validator'

// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '角色名称', key: 'roleName', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      placeholder: '请输入内容',
    },
  },
  {
    label: '权限字符', key: 'roleKey', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    }
  },
  {
    label: '角色状态', key: 'status', type: 'select', options: [
      { label: '正常', value: '0' },
      { label: '停用', value: '1' },
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
  { label: '角色名称', key: 'roleName', },
  { label: '权限字符', key: 'roleKey', },
  { label: '排序', key: 'roleSort', props: { sortable: true } },
  {
    label: '角色状态', key: 'status', transform: (value: any) => {
      return value == '0' ? '正常' : '停用'
    }
  },
  { label: '创建时间', key: 'createTime', },
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
    label: '角色名称', key: 'roleName', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入角色名称,限30字内',
    },
  },
  {
    label: '权限字符', key: 'roleKey', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
    },
  },
  {
    label: '角色排序', key: 'roleSort', type: 'input',
    props: {
      clearable: true,
      gridItem: { span: 24 },
      min: 0,
      type: 'number',
      formItem: { required: true, },
      rules: [
        { validator: checkNumber, trigger: 'blur' }
      ]
    },
  },

  {
    label: '状态 ', key: 'status', type: 'radio-group', options: [
      { label: '正常', value: '0' },
      { label: '停用', value: '1' },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },
  {
    label: '菜单权限', key: 'menuIds', slotName: 'menuIds', type: 'slot',
    props: {}
  },
  {
    label: '备注', key: 'remark', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: false },
      type: 'textarea',
      rows: 4,
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
