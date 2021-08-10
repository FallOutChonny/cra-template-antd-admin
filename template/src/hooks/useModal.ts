import React from 'react'

type UseModalProps<T> = {
  content?: T[]
  key?: string
  onOpen?: (item?: T) => any
}

export default function useModal<T = any>(props: UseModalProps<T> = {}) {
  const { content = [], key = 'id', onOpen } = props

  const [editModalVisible, setEditModalVisible] = React.useState(false)

  const [item, setItem] = React.useState<T | undefined>()

  const handleEditModalVisible = (evt?: React.MouseEvent<HTMLElement>) => {
    setEditModalVisible(prev => !prev)

    if (!evt) {
      return
    }

    const id = (evt.currentTarget as HTMLElement).dataset['id']
    const item: T | undefined = content?.find((x: any) => String(x[key]) === id)

    setItem(item)

    if (onOpen) {
      onOpen(item)
    }
  }

  return {
    item,
    setItem,
    visible: editModalVisible,
    toggle: handleEditModalVisible,
    open: (item?: any) => {
      setEditModalVisible(true)
      setItem(item)
    },
    close: () => setEditModalVisible(false),
  }
}
