import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { parseJwt } from '../../../services/auth';

//importing icons
import * as FaIcons from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';

//importing components
import ModalWarning from '../modalWarning';

//importing nav items array
import { SidebarDataCollaborator } from './sidebarData';
import { SidebarDataAdm } from './sidebarDataAdm';

//importing css
import './style.css';

//importing images
import imgUser from '../../../assets/images/user-white.png';
import imgClara from '../../../assets/images/clara-icon-white.png'

//importing react icons
import * as BiIcons from 'react-icons/bi'

function SideMenu() {
    let history = useHistory();

    //Menu useState, to determine if the menu is closed or not
    const [sidebar, setSidebar] = useState(false);

    //Function that changes the value of the siderbar useState
    const showSidebar = () => setSidebar(!sidebar);

    const [name, setName] = useState('');

    const token = localStorage.getItem('token-pic');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //Variavel responsavel por pegar as informações do usuário
    let tokenDecode: any = parseJwt();

    const logout = () => {
        localStorage.removeItem('token-pic');
        history.push('/');
    }

    const idUser = parseJwt().Id;

    useEffect(() => {
        ListUserById(idUser);
    }, []);

    const ListUserById = (id: number) => {
        fetch('http://localhost5000/api/InternalUser/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setName(data.nameIuser)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro no menu');
                setWarning('Erro ao tentar obter as informações do usuário logado')
                console.error(err)
            });
    }

    const VerifyUserType = () => {
        if (token === undefined || token === null) {
            history.push('/login');
        }
        else {
            if (parseJwt().Role === 'Collaborator') {
                return SidebarDataCollaborator.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })
            }
            else {
                return SidebarDataAdm.map((item, index) => {
                    return (
                        <li key={index} className={item.className}>
                            <Link to={item.path}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    );
                })
            }
        }
    }

    //função responvel por voltar para a pagina home ou dashboard
    const HeaderAuthentication = () => {
        if (parseJwt().Role === 'Administrator') {
            return (
                <Link to='/dashboard'>
                    <img src={imgClara} width='50px' />
                </Link>
            );
        }
        else {
            return (
                <Link to='/home'>
                    <img src={imgClara} width='50px' />
                </Link>
            );
        }
    }

    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className="navbar">
                    <div className='menu-bars'>
                        <FaIcons.FaBars onClick={showSidebar} className='menu-icon' />
                        {HeaderAuthentication()}
                    </div>
                </div>
            </IconContext.Provider>
            <div className={sidebar ? 'outside-menu active' : 'outside-menu'} onClick={showSidebar}>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={showSidebar}>
                        <div className="nav-title">
                            <img src={imgUser} width='90px' />
                            <p>{name}</p>
                        </div>
                        {VerifyUserType()}
                        <li key='Sair' className='nav-text' onClick={(event) => {
                            event.preventDefault();
                            logout();
                        }}>
                            <a>
                                <BiIcons.BiLogOut />
                                <span>Sair</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            {
                isModalWarningVisible &&
                <ModalWarning title={modalTitle}
                    description={warning}
                    id='modal'
                    onClose={() => setIsModalWarningVisible(false)}
                    url={modalURL}
                    isReload={isReload} />
            }
        </>
    )
}

export default SideMenu;
