import { Layout, Menu } from 'antd'
import { SiderProps } from 'antd/lib/layout/Sider'
import { useHistory } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import { publicUrl } from '@utils/env'
import { routes, RouteProps } from '@lib/routes'

interface Props extends SiderProps {}

function SiderComponent(props: Props) {
  const history = useHistory()

  const handleTo = (pathname?: string) => () => {
    if (pathname) {
      history.push(pathname)
    }
  }

  const renderMenuItem = (route: RouteProps) => {
    return (
      <Menu.Item
        key={route.key}
        disabled={route.disabled}
        icon={route.Icon ? <route.Icon /> : null}
        onClick={handleTo(route.url)}>
        {route.title}
      </Menu.Item>
    )
  }

  return (
    <Sider {...props}>
      <Logo onClick={handleTo('/')}>
        <img
          width={32}
          src={`${publicUrl}/logo192.png`}
          alt="logo"
          className="mr-8"
        />
        <div className="text-white font-medium">CRA antd admin</div>
      </Logo>
      <Menu theme="dark" mode="inline">
        {routes.map(route =>
          !route.children ? (
            renderMenuItem(route)
          ) : (
            <Menu.SubMenu
              key={route.key}
              icon={<route.Icon />}
              title={route.title}>
              {route.children.map(c => renderMenuItem(c))}
            </Menu.SubMenu>
          )
        )}
      </Menu>
    </Sider>
  )
}

const Sider = styled(Layout.Sider)`
  &.ant-layout-sider {
    height: 100vh;
    position: fixed;
    left: 0;
    overflow: auto;
  }
`

const logoSpin = keyframes` {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`

const Logo = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #2b2f3a;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    img {
      animation: ${logoSpin} infinite 20s linear;
    }
  }
`

SiderComponent.displayName = 'Sider'

export default SiderComponent
