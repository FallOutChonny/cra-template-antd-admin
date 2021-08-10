import React from 'react'
import { Row, Col, Table, Input } from 'antd'
import { ColumnProps, TablePaginationConfig } from 'antd/lib/table'
import { FilterValue, SorterResult } from 'antd/lib/table/interface'
import Layout from '@components/Layout'
import useModal from '@hooks/useModal'
import IconEdit from '@icons/Edit'
import {
  useUsers,
  useQueryUser,
  useCreateUser,
  useUpdateUser,
  User,
} from './queries'
import UserModal from './UserModal'

export default function Home() {
  const [query, setQuery] = React.useState<{ [key: string]: any }>({
    _page: 1,
    _limit: 10,
  })

  const { data, isFetching, refetch } = useUsers({
    variables: query,
  })

  const editModal = useModal<User>({
    content: data,
    onOpen: item => {
      if (item) {
        user.refetch(item)
      }
    },
  })

  const user = useQueryUser()

  const mutationOpts = {
    onSuccess: () => {
      refetch()
      editModal.close()
    },
  }

  const [creating, handleAdd] = useCreateUser(mutationOpts)
  const [updating, handleUpdate] = useUpdateUser(mutationOpts)

  const handleOk = (values: Partial<User>) => {
    const handler = values.id ? handleUpdate : handleAdd
    handler(values)
  }

  const handleSearch = (value: string) => {
    setQuery(prev => ({ ...prev, q: value }))
  }

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, FilterValue | null>,
    sorter: SorterResult<User>
  ) => {
    setQuery(prev => ({
      ...prev,
      _page: pagination.current,
      _limit: pagination.pageSize,
      _sort: sorter.column ? sorter.field : null,
      _order: sorter.order
        ? { ascend: 'asc', descend: 'desc' }[sorter.order]
        : null,
    }))
  }

  const columns: ColumnProps<User>[] = [
    {
      title: '姓名',
      ellipsis: true,
      sorter: true,
      dataIndex: 'name',
    },
    {
      title: '帐号',
      ellipsis: true,
      sorter: true,
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      ellipsis: true,
      sorter: true,
      dataIndex: 'email',
    },
    {
      title: '电话',
      ellipsis: true,
      sorter: true,
      dataIndex: 'phone',
    },
    {
      title: '住址',
      ellipsis: true,
      sorter: true,
      dataIndex: 'address',
      render: (_, { address }) => `${address.city}, ${address.street}`,
    },
    {
      title: '公司',
      sorter: true,
      dataIndex: ['company', 'name'],
    },
    {
      title: '操作',
      dataIndex: 'x',
      width: 80,
      render: (v, r) => (
        <IconEdit
          data-id={r.id}
          onClick={editModal.toggle}
          className="cursor-pointer text-lg"
        />
      ),
    },
  ]

  return (
    <>
      {editModal.visible && (
        <UserModal
          item={user.data}
          loadingData={user.isFetching}
          onCancel={editModal.close}
          confirmLoading={creating || updating}
          onOk={handleOk}
        />
      )}
      <Layout path={[{ name: '列表范例' }]}>
        <Row className="mb-16">
          <Col span={24} className="flex items-center justify-between">
            <div className="text-gray-500">
              查询笔数共 {data?.length ?? 0} 笔
            </div>
            <Input.Search
              placeholder="Please enter"
              className="w-280"
              onSearch={handleSearch}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={data}
              loading={isFetching}
              onChange={handleTableChange as any}
            />
          </Col>
        </Row>
      </Layout>
    </>
  )
}
