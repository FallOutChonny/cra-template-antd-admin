import { Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Header from '@components/Header'

type Props = {
  children?: any
  style?: React.CSSProperties
  className?: string
  path?: { name: string; url?: string }[]
}

export function PageLayout({ path, ...props }: Props) {
  let prefix
  if (path) {
    prefix = (
      <Breadcrumb>
        <Breadcrumb.Item key="/">
          <Link to="/">首页</Link>
        </Breadcrumb.Item>
        {path.map(x => (
          <Breadcrumb.Item key={x.name}>
            {x.url ? <Link to={x.url}>{x.name}</Link> : x.name}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    )
  }

  return (
    <>
      <Header prefix={prefix} />
      <Layout {...props} />
    </>
  )
}

const Layout = styled.div`
  margin: 24px;
  padding: 24px;
  border-radius: 4px;
  background-color: #ffffff;
  min-height: calc(100vh - 112px);
`

PageLayout.displayName = 'Layout'

export default PageLayout
