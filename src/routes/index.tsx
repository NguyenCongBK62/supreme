import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const ShutoffBlock = lazy(() => import('../views/pages/ShutoffBlock/ShutoffBlock'))
const TopPage = lazy(() => import('../views/pages/TopPage'))
const NotFoundPage = lazy(() => import('../views/pages/NotFoundPage'))

const routes = [
  {
    index: true,
    path: '/',
    element: <TopPage />,
    name: 'Home',
  },
  {
    path: '/ShutoffBlock',
    element: <ShutoffBlock />,
    name: 'ShutoffBlock',
  },
  {
    path: '/topPage',
    element: <TopPage />,
    name: 'TopPage',
  },
  {
    path: '*',
    element: <NotFoundPage />,
    name: 'NotFoundPage',
  },
]

const Routers = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {routes.map((route: any) => (
              <Route key={route.name} {...route} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Routers
