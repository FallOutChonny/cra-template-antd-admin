import { EditOutlined } from '@ant-design/icons'
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

const Edit = ({ ...props }: AntdIconProps) => {
  return <EditOutlined {...props as any} />
}

export default Edit
