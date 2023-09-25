// ** React Imports
import { lazy } from 'react'

const Units = lazy(() => import('@src/views/units'))

const UnitRoutes = [
  {
    element: <Units />,
    path: '/units'
  }
]

export default UnitRoutes
