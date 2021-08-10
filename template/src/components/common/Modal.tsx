import React from 'react'
import { Spin, Modal } from 'antd'
import { ModalProps as AntModalProps } from 'antd/lib/modal'

export interface ModalProps extends AntModalProps {
  loadingData?: boolean
  children?: React.ReactNode
}

export default function ModalComponent({
  loadingData = false,
  children,
  ...props
}: ModalProps) {
  return (
    <Modal maskClosable={false} keyboard={false} {...props}>
      <Spin spinning={loadingData}>{children}</Spin>
    </Modal>
  )
}

ModalComponent.confirm = Modal.confirm
ModalComponent.error = Modal.error
ModalComponent.success = Modal.success
ModalComponent.info = Modal.info

ModalComponent.displayName = 'Modal'
