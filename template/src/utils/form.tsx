import React from 'react'
import { Form } from 'antd'

export const createFormItemLayout = (
  label: number = 3,
  wrapper: number = 21
) => ({
  labelCol: {
    xs: { span: label },
    sm: { span: label },
  },
  wrapperCol: {
    xs: { span: wrapper },
    sm: { span: wrapper },
  },
})

export const thosandSeprartor = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, '') : value) as React.ReactText,
}

export const currency = {
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  },
  parser: (value: string | undefined) =>
    (value ? value.replace(/\$\s?|(,*)/g, '') : value) as React.ReactText,
}

export const percent = {
  min: 0,
  max: 100,
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `${value}%`
  },
  parser: (value: string | undefined) =>
    (value ? value.replace('%', '') : value) as React.ReactText,
}

export const watt = {
  // min: 0,
  max: 100,
  formatter: (value: number | string | undefined) => {
    if (!value) {
      return value as string
    }
    return `${value}W`
  },
  parser: (value: string | undefined) =>
    (value ? value.replace('W', '') : value) as React.ReactText,
}

export let rules = {
  required: { required: true, message: '此欄位必填' },
  number: {
    type: 'number',
    message: '請填寫數字',
    transform(value: any) {
      if (!value) {
        return value
      }
      return Number(value)
    },
  },
  email: {
    required: true,
    message: '必填欄位, 並請輸入正確的 email 格式',
    pattern: new RegExp(/^.{8,128}$/),
  },
  account: {
    required: true,
    message: '欄位長度為8~128字元,特殊符號-,_',
    pattern: new RegExp(/^.{8,128}$/),
  },
  password: {
    required: true,
    message: '密碼長度為6~128字元',
    pattern: new RegExp(/^.{6,128}$/),
  },
  min: (limit: number) => ({
    validator: (_: any, value: any, callback: any) => {
      if (value < limit) {
        callback(`不可低於 ${limit}`)
      } else {
        callback()
      }
    },
  }),
  max: (limit: number) => ({
    validator: (_: any, value: any, callback: any) => {
      if (limit === 0) {
        return callback('最大數量為0')
      }

      if (value > limit) {
        callback(`不可大於 ${limit}`)
      } else {
        callback()
      }
    },
  }),
}

type UseFormProps = {
  field?: string
  initialValue?: any
}

export function useForm({ field, initialValue }: UseFormProps = {}) {
  let wrapper = field
    ? (node: React.ReactNode) => (
        <Form.Item noStyle name={field} initialValue={initialValue}>
          {node}
        </Form.Item>
      )
    : (node: React.ReactNode) => node

  return wrapper
}
