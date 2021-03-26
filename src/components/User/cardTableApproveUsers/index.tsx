import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import styles
import './style.css'

//import components
import Button from '../../Generic/button/index'
import SmallInputSearch from '../../Generic/smallInputSearch';
import ResponsiveBtn from '../../Generic/responsiveButton';
import ModalWarning from '../../Generic/modalWarning';
import ModalAction from '../../Generic/modalAction';
import Loading from '../../Generic/loading';
import { parseJwt } from '../../../services/auth';


interface cardTableUserProps {
    valueBtn?: any,
    valueBtn2?: any
}
const CardTableApproveUser: React.FC<cardTableUserProps> = ({ valueBtn, valueBtn2 }) => {

    //UseState que indica quando a página esta carregando (quando ele está true, chama o componente Loading)
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [isModalActionVisibleApproveUsers, setIsModalActionVisibleApproveUsers] = useState(false);
    const [isModalActionVisibleRecuseUsers, setIsModalActionVisibleRecuseUsers] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const [users, updateUsers] = useState([]);

    const [listUsers, setUsers] = useState(users);

    const [filter, setFilter] = useState('');

    const [error, updateError] = useState('');


    useEffect(() => {
        ListUsers();
    }, [])

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let UsersFilter = users.filter((user: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0)
                return users;

            // Retorna todos os users com nomes semelhantes ao filtro digitado
            return user.nameIuser.toLowerCase().includes(filter.toLowerCase());
        })

        setUsers(UsersFilter);
    }, [filter])

    const ListUsers = () => {
        setIsLoading(true)
        fetch('http://localhost5000/api/InternalUser/Inactive', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                updateUsers(data);
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos usuários');
                console.error(err)
                setIsLoading(false);
            });
    }

    const ApproveUsers = (id: any) => {
        setIsLoading(true)
        fetch('http://localhost5000/api/InternalUser/Activate/' + id, {
            method: 'PUT',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('Usuário aprovado com sucesso!');
                setWarning('O usuário agora possui acesso a todas as funcionalidades de colaborador da plataforma!')
                setIsReload(true);
                setIsLoading(false);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar mudar o status do usuário');
                console.error(err)
                setIsLoading(false);
            });
    }

    const RecuseUsers = (id: any) => {
        setIsLoading(true)
        fetch('http://localhost5000/api/InternalUser/' + id, {
            method: 'DELETE',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('O Usuário foi recusado com sucesso!')
                setWarning('Todos os dados referentes a este usuário foram deletados!')
                setIsReload(true);
                setIsLoading(false);
            })
            .catch(err => {
                console.error(err.message);
                setIsLoading(false);
            });
    }

    const RenderUsers = () => {

        return (
            <tbody>

                {
                    listUsers.map((item: any) => {
                        return (

                            <div className="cardTableApproveUserTd-align">
                                <form onSubmit={event => {
                                    event.preventDefault();
                                }}>
                                    <div className="cardTableApproveUserTd">
                                        <td>{item.nameIuser}</td>
                                        <td>{item.surnameIuser}</td>
                                        <td>{item.idDpNavigation.nameDp}</td>
                                        <td>{item.emailIuser}</td>
                                        <td className='td-button' onClick={() => ShowModalApproveUsers(item.idIuser)}><ResponsiveBtn value='Aceitar' typeBtn='hollowButton' /></td>
                                        <td className='td-button' onClick={() => ShowModalRecuseUsers(item.idIuser)}><ResponsiveBtn value='Recusar' typeBtn='hollowButton' /></td>
                                    </div>
                                    <hr />
                                </form>
                            </div>
                        )
                    })
                }

            </tbody>
        )
    }

    const ShowModalApproveUsers = (id: any) => {
        localStorage.setItem('idUser', JSON.stringify(id));
        setIsModalActionVisibleApproveUsers(true);
        setModalTitle('Tem certeza que deseja Aprovar este usuário?');
        setWarning('Após aprovar este usuário ele possuíra acesso as funcinalidades de colaborador da plataforma!')
    }

    const ShowModalRecuseUsers = (id: any) => {
        localStorage.setItem('idUser', JSON.stringify(id));
        setIsModalActionVisibleRecuseUsers(true);
        setModalTitle('Tem certeza que deseja recusar este usuário?');
        setWarning('Após recusar este usuário todos os dados referente a ele serão excluídos da plataforma!')
    }

    return (
        <div>
            <div className="cardTableApproveUserBody">
                <div className="cardTableApproveUserTables">
                    <div className='cardTableApproveUserTopOptions'>
                        <div className="cardTableApproveUserInput">
                            <SmallInputSearch cssType='smallSearchInputHollow' namePlaceHolder='Pesquisar usuário' onChange={e => setFilter(e.currentTarget.value)} value={filter} />
                            <h1>{error}</h1>
                        </div>

                        <div className="cardTabelApproveUserButton">
                            <Link to='/viewUsers'>
                                <button className='cardTableApproveUserUniqueBtn'>Usuários ativados</button>
                            </Link>
                            <Link to='/dashboard'><Button value='Voltar' typeBtn='filledButton' /></Link>
                        </div>
                    </div>

                    <table className='cardTableApproveUserCustomization'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Departamento</th>
                                <th>Email</th>
                                <th>Aprovar</th>
                                <th>Recusar</th>
                            </tr>
                            <hr />
                        </thead>

                        {RenderUsers()}
                    </table>
                </div>
            </div>
            {
                isModalActionVisibleApproveUsers &&
                <ModalAction title={modalTitle}
                    description={warning}
                    id='modal'
                    action={() => ApproveUsers(localStorage.getItem('idUser'))}
                    onClose={() => setIsModalActionVisibleApproveUsers(false)}
                    isReload={isReload} />
            }
            {
                isModalActionVisibleRecuseUsers &&
                <ModalAction title={modalTitle}
                    description={warning}
                    id='modal'
                    action={() => RecuseUsers(localStorage.getItem('idUser'))}
                    onClose={() => setIsModalActionVisibleRecuseUsers(false)}
                    isReload={isReload} />
            }
            {
                isModalWarningVisible &&
                <ModalWarning title={modalTitle}
                    description={warning}
                    id='modal'
                    onClose={() => setIsModalWarningVisible(false)}
                    url={modalURL}
                    isReload={isReload} />
            }

            {
                isLoading &&
                <Loading />
            }
        </div >
    );
}

export default CardTableApproveUser;