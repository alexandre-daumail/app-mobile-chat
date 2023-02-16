import React from 'react'

const Dashboard = React.lazy(() => import('../components/dashboard'))





const routes = [

    { path: '/', name: 'home', element: Dashboard },

]

export default routes