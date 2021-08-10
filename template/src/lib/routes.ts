import { uuid } from '@utils/webHelper'
import { SettingOutlined, UserOutlined } from '@ant-design/icons'
import Home from '@pages/Home'

export type RouteProps = {
  key: string
  title: string
  children?: RouteProps[]
  url: string
  Icon?: any
  Component?: any
  disabled?: boolean
  exact?: boolean
}

/**
 * 共用的前端路由，也可以改成 hooks 加上權限來過濾資料、呼叫 API 取得 routes，例如:
 *
 * function useRoutes() {
 *   const { data } = useQuery(`/routes`) // or just a route variable
 *   const { user } = useAuth()
 *
 *   // filter route data then return
 * }
 */
export let routes = [
  {
    key: uuid(),
    title: '首页',
    Icon: UserOutlined,
    url: '/',
    exact: true,
    Component: Home,
  },
  {
    key: uuid(),
    title: '用户管理',
    url: '/users',
    Icon: SettingOutlined,
  },
  {
    key: uuid(),
    title: '订单管理',
    url: '/orders',
    Icon: SettingOutlined,
  },
  {
    key: uuid(),
    title: '商品管理',
    Icon: SettingOutlined,
    children: [
      {
        key: uuid(),
        title: '商品列表',
        url: '/product-list',
      },
    ],
  },
  {
    key: uuid(),
    title: '物料管理',
    Icon: SettingOutlined,
    children: [
      {
        key: uuid(),
        title: '材料管理',
        url: '/material-list',
      },
      {
        key: uuid(),
        title: '入库管理',
        url: '/inbound',
      },
      {
        key: uuid(),
        title: '报表',
        url: '/report',
      },
    ],
  },
  {
    key: uuid(),
    title: '仓储管理',
    url: '/warehouse',
    Icon: SettingOutlined,
  },
  {
    key: uuid(),
    title: '退货管理',
    url: '/return',
    Icon: SettingOutlined,
  },
  {
    key: uuid(),
    title: '出货管理',
    url: '/outbound',
    Icon: SettingOutlined,
    disabled: true,
  },
]

export default routes
