import React from 'react'
import { useHistory } from 'react-router-dom'

//importing icons
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'

export const SidebarDataCollaborator = [
    {
        title: 'Home',
        path: '/home',
        icon: <AiIcons.AiFillHome/>,
        className: 'nav-text'
    },

    {
        title: 'Listar Clientes',
        path: '/viewClient',
        icon: <FaIcons.FaThList/>,
        className: 'nav-text'
    },

    {
        title: 'Editar Perfil',
        path: '/editUser',
        icon: <RiIcons.RiSettings5Fill/>,
        className: 'nav-text'
    },
]