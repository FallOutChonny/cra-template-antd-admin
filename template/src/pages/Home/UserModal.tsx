import React from 'react'
import { Form, Input } from 'antd'
import Modal from '@components/Modal'
import type { ModalProps } from '@components/Modal'
import { rules, createFormItemLayout } from '@utils/form'
import { User } from './queries'

interface IProps extends Omit<ModalProps, 'onOk'> {
  item?: User
  onOk?: (data: Partial<User>) => void
}

const formItemLayout = createFormItemLayout(4, 18)

export default function UserModal({
  onOk,
  onCancel,
  loadingData,
  item,
  ...props
}: IProps) {
  const [form] = Form.useForm()

  React.useEffect(() => {
    form.setFieldsValue(item)
  }, [JSON.stringify(item)]) // eslint-disable-line

  const handleOk = () => {
    form.validateFields().then(values => {
      if (onOk) {
        onOk({ ...item, ...values })
      }
    })
  }

  return (
    <Modal
      visible
      title="用戶資料"
      maskClosable={false}
      keyboard={false}
      loadingData={loadingData}
      onCancel={onCancel}
      onOk={handleOk}
      {...props}>
      <Form form={form} layout="horizontal">
        <Form.Item
          {...formItemLayout}
          name="name"
          label="姓名"
          rules={[rules.required]}>
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="username"
          label="帳號"
          rules={[rules.required]}>
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="email"
          label="信箱"
          rules={[rules.required]}>
          <Input />
        </Form.Item>
        <Form.Item {...formItemLayout} name="website" label="個人網站">
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          name="phone"
          label="電話"
          rules={[rules.required]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
