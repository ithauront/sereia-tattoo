import { Route } from 'react-router-dom'

import RequireAuth from '../guards/RequireAuth'
import { Approvals } from '../pages/authPages/Approvals'
import { Dashboard } from '../pages/authPages/Dashboard'
import { Finances } from '../pages/authPages/Finances'
import { Notifications } from '../pages/authPages/Notifications'

export const AuthRoutes = (
  <>
    <Route element={<RequireAuth redirectTo="/login" />}>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/approvals" element={<Approvals />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/finances" element={<Finances />} />
    </Route>
  </>
)
