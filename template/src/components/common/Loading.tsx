import { Row, Col } from 'antd'
import { RowProps } from 'antd/lib/row'
import Loading3QuartersOutlined from '@ant-design/icons/Loading3QuartersOutlined'

const Loading = (props: RowProps) => {
  return (
    <Row justify="center" {...props}>
      <Col>
        <Loading3QuartersOutlined spin />
      </Col>
    </Row>
  )
}

export default Loading
