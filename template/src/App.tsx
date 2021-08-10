import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Layout } from 'antd'
import ErrorBoundary from '@components/ErrorBoundary'
import Exception from '@components/Exception'
import Sider from '@components/Sider'
import Loading from '@components/Loading'
import Home from '@pages/Home'
import { routes, RouteProps } from '@lib/routes'

function App() {
  const renderRoute = (route: RouteProps) => {
    if (!route.Component || !route.url) {
      return null
    }

    return (
      <Route
        key={route.key}
        exact={route.exact}
        component={route.Component}
        path={route.url}
      />
    )
  }

  const _routes = routes
    .map(r => (r.children ? r.children.map(renderRoute) : renderRoute(r)))
    .reduce((result: any[], route) => {
      if (!route) {
        return result
      }
      if (Array.isArray(route)) {
        return [...result, ...route.filter(Boolean)]
      }

      result.push(route)

      return result
    }, [])

  return (
    <ErrorBoundary>
      <Layout>
        <Sider />
        <Layout className="ml-200">
          <Layout.Content>
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/" component={Home} />
                {_routes}
                <Route component={Exception} />
              </Switch>
            </Suspense>
          </Layout.Content>
        </Layout>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
