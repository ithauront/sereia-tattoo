import { Route } from 'react-router-dom'

import RequireAuth from '../guards/RequireAuth'
import { AdminArea } from '../pages/AdminArea'

export const AuthRoutes = (
  <Route element={<RequireAuth redirectTo="/login" />}>
    <Route path="/admin" element={<AdminArea />} />
  </Route>
)
