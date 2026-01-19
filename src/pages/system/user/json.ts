import { FieldItem, FormMode } from '@/typings/items'
import { get } from 'lodash-es'
import store from '@/store'
const dictData = store.getters.dictData
import { checkLinkWay, checkMobile, checkNumber } from '@/utils/validator'


// 表单查询字段配置
export const tableQueryFormFields: FormMode[] = [
  {
    label: '用户昵称', key: 'user', type: 'input',
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
    },
  },
  {
    label: '所属部门', key: 'deptId', type: 'select', options: get(dictData, 'dict_sys_dept.list', []),
    props: {
      gridItem: { span: 4 },
      formItem: { required: false },
      clearable: true,
      filterable: true
    }
  },
  {
    label: '用户状态', key: 'status', type: 'select', options: [
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
    label: '手机号码', key: 'phonenumber', type: 'input',
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
  { label: '用户名', key: 'user', },
  { label: '用户昵称', key: 'userName', },
  { label: '角色', key: 'roleIds' },
  { label: '部门', key: 'deptId', transform: 'sys_dept.list' },
  { label: '手机号', key: 'cellphone' },
  {
    label: '状态', key: 'status', transform: (value: any) => {
      return value == '0' ? '正常' : '停用'
    }
  },
  { label: '创建时间', key: 'createTime', props: { sortable: true } },
  { label: '备注', key: 'remark' },
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
    label: '账户名称', key: 'user', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入用户名称,限30字内',
    },
  },
  {
    label: '用户密码', key: 'password', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
    },
  },
  {
    label: '用户性别', key: 'sex', type: 'radio-group', options: [
      { label: '不限', value: 0 },
      { label: '男', value: 1 },
      { label: '女', value: 2 },
    ],
    props: {
      formItem: { required: false, }
    },
    child: { type: 'radio' }
  },
  {
    label: '用户昵称', key: 'userName', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 30,
      'show-word-limit': true,
      placeholder: '请输入用户昵称,限30字内',
    },
  },
  // {
  //   label: '所属部门', key: 'deptId', type: 'select', options: [], props: {
  //     clearable: true,
  //     formItem: { required: false, },
  //     filterable: true,
  //     gridItem: { span: 24 },
  //   },
  // },
  {
    label: '用户角色', key: 'roleIds', type: 'select', options: [], props: {
      clearable: true,
      multiple: true,
      filterable: true,
      formItem: { required: false, }
    },
  },
  {
    label: '手机号码', key: 'cellphone', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: true },
      clearable: true,
      maxlength: 11,
      'show-word-limit': true,
      placeholder: '请输入手机号码,限11字内',
      rules: [
        { validator: checkMobile, trigger: 'blur' }
      ]
    },
  },
  {
    label: '状态', key: 'status', type: 'radio-group', options: [
      { label: '正常', value: 0 },
      { label: '停用', value: 1 },
    ],
    props: {
      formItem: { required: true, }
    },
    child: { type: 'radio' }
  },


  {
    label: '备注', key: 'remark', type: 'input',
    props: {
      gridItem: { span: 24 },
      formItem: { required: false, }
    },
  },
]


export const addFormOptions = {
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
