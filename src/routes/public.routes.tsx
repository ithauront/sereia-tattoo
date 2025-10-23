import { Route } from 'react-router-dom'

import RedirectIfAuthenticated from '../guards/RedirectIfAuthenticated'
import { Home } from '../pages/Home'
import { LoginPage } from '../pages/Login'
import { Photos } from '../pages/Photos'

export const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/photos" element={<Photos />} />

    <Route element={<RedirectIfAuthenticated to="/admin" />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </>
)
