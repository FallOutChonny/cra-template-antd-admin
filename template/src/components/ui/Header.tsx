import { Layout, Menu } from 'antd'
import cx from 'classnames'
import styled from 'styled-components'
import CaretDownOutlined from '@ant-design/icons/CaretDownOutlined'

type Props = {
  prefix?: string | React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export default function Header({ prefix, className, ...props }: Props) {
  return (
    <Layout.Header
      className={cx(
        'flex items-center justify-between px-24 bg-white',
        className
      )}
      {...props}>
      {prefix ? prefix : <div />}
      <div className="inline-flex items-center">
        <StyledMenu
          mode="horizontal"
          getPopupContainer={triggerNode => triggerNode.parentNode as any}>
          <Menu.SubMenu
            popupOffset={[0, -10]}
            className="app-header__user-menu"
            title={
              <User>
                <span>{'Login User'}</span>
                <CaretDownOutlined className="icon-caret-down" />
              </User>
            }>
            <Menu.Item key="SignOut">登出</Menu.Item>
          </Menu.SubMenu>
        </StyledMenu>
      </div>
    </Layout.Header>
  )
}

const StyledMenu = styled(Menu)`
  &.ant-menu-horizontal:not(.ant-menu-dark) {
    > .ant-menu-submenu:hover,
    > .ant-menu-submenu-selected {
      color: inherit !important;
    }

    > .ant-menu-submenu:hover:after,
    > .ant-menu-submenu-selected:after {
      border-bottom: none !important;
    }
  }

  .app-header__user-menu .ant-menu-vertical.ant-menu-sub {
    min-width: 100px;
  }
`

const User = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: normal;

  .icon-caret-down {
    position: relative;
    top: 1px;
    margin-left: 8px !important;
    margin-right: 10px !important;
    font-size: 14px !important;
  }
`
