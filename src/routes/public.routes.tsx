import { Route } from 'react-router-dom'

import RedirectIfAuthenticated from '../guards/RedirectIfAuthenticated'
import { About } from '../pages/publicPages/About'
import { Contact } from '../pages/publicPages/Contact'
import { Home } from '../pages/publicPages/Home'
import { LoginPage } from '../pages/publicPages/Login'
import { Photos } from '../pages/publicPages/Photos'
import { Schedule } from '../pages/publicPages/Schedule'

export const PublicRoutes = (
  <>
    <Route path="/" element={<Home />} />

    <Route path="/about" element={<About />} />

    <Route path="/photos" element={<Photos />} />

    <Route path="/schedule" element={<Schedule />} />

    <Route path="/contact" element={<Contact />} />

    <Route element={<RedirectIfAuthenticated to="/dashboard" />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  </>
)
