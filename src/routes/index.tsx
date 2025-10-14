import { Route, Routes } from 'react-router-dom'

// eslint-disable-next-line import/order
import { NotFound } from '../pages/NotFound'
import { AuthRoutes } from './auth.routes'
import { PublicRoutes } from './public.routes'
export function AppRoutes() {
  return (
    <Routes>
      {PublicRoutes}
      {AuthRoutes}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
