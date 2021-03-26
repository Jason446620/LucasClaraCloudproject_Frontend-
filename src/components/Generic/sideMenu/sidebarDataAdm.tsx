import React from 'react'

//importing icons
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'

export const SidebarDataAdm = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <RiIcons.RiDashboardFill/>,
        className: 'nav-text'
    },

    {
        title: 'Editar Perfil',
        path: '/editUser',
        icon: <RiIcons.RiSettings5Fill/>,
        className: 'nav-text'
    },
]