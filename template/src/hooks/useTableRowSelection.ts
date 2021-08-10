import React from 'react'

type Props<T> = {
  defaultRowKeys?: number[] | string[]
  defaultRows?: T[]
  multiple?: boolean
  limit?: number
}

export default function useRowSelection<T = any>(props: Props<T> = {}) {
  const {
    limit,
    defaultRowKeys = [],
    defaultRows = [],
    multiple = true,
  } = props

  const [selectedRowKeys, setSelectedRowKeys] = React.useState<
    string[] | number[]
  >(defaultRowKeys)

  const [selectedRows, setSelectedRows] = React.useState<T[]>(defaultRows)

  const onSelectChange = (rowKeys: React.Key[], rows: T[]) => {
    if (!!limit && rowKeys.length > limit) {
      return
    }

    setSelectedRowKeys(
      multiple ? rowKeys : ([rowKeys[rowKeys.length - 1]] as any)
    )

    setSelectedRows(prev =>
      multiple
        ? rows.filter((x: any) => rowKeys.includes(x.id))
        : [rows[rows.length - 1]]
    )
  }

  const isDeletable = React.useMemo(
    () => selectedRowKeys.length > 0,
    [selectedRowKeys]
  )

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return {
    rowSelection,
    isDeletable,
    selectedRowKeys,
    selectedRows,
    selectedRowCount: selectedRowKeys.length,
    clearSelection: () => {
      setSelectedRowKeys([])
      setSelectedRows([])
    },
  }
}
