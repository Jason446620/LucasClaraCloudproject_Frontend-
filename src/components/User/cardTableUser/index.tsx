import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//import styles
import './style.css'

//importing components
import Button from '../../Generic/button/index'
import SmallInputSearch from '../../Generic/smallInputSearch';
import ResponsiveBtn from '../../Generic/responsiveButton';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';
import ModalConfirm from '../../Generic/modalConfirm';
import ModalAction from '../../Generic/modalAction';
import { parseJwt } from '../../../services/auth';

interface cardTableUserProps {
    valueBtn?: any,
    valueBtn2?: any
}
const CardTableUser: React.FC<cardTableUserProps> = ({ valueBtn, valueBtn2 }) => {

    const [users, updateUsers] = useState([]);

    const [listUsers, setUsers] = useState(users);

    const [filter, setFilter] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    const [error, updateError] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [isModalActionVisible, setIsModalActionVisible] = useState(false);
    const [isModalActionVisibleInactive, setIsModalActionVisibleInactive] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        ListUsers();
    }, [])

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let UsersFilter = users.filter((user: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0) {
                return users;
            }
            else {
                // Retorna todos os users com nomes semelhantes ao filtro digitado
                return user.nameIuser.toLowerCase().includes(filter.toLowerCase());
            }
        })

        setUsers(UsersFilter);
    }, [filter])

    const ListUsers = () => {
        fetch('http://localhost5000/api/InternalUser/Active', {
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
                console.error(err.message);
                setIsLoading(false);
            });
    }

    const InacivatedUser = (id: any) => {
        setIsLoading(true)
        if (parseJwt().Id != id) {
            fetch('http://localhost5000/api/InternalUser/Inactivate/' + id, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Usuário inativado com sucesso!');
                    setWarning('O usuário não possui mais acesso a plataforma!');
                    setIsLoading(false);
                    setIsReload(true)
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setIsReload(true)
                    setModalTitle('Houve um erro ao tentar alterar o status deste usuário');
                    console.error(err)
                    setIsLoading(false);
                });
        }
        else {
            setIsModalWarningVisible(true)
            setModalTitle('Não é possível inativar este usuário')
            setWarning('Este usuário está atualmente logado. Para inativá-lo, entre com outra conta administradora')
            setIsLoading(false)
        }
    }

    const VerifyUserType = (userType: string) => {
        if (userType === 'Administrator') {
            valueBtn = 'Admin.';
        }
        else {
            valueBtn = 'Colab.';
        }
    }

    const VerifyStatus = (statusUser: boolean) => {
        if (statusUser === false) {
            valueBtn2 = 'Ativar';
        }
        else {
            valueBtn2 = 'Inativar'
        }
    }

    const BecomeAdministratorUser = (id: any, userType: any) => {
        setIsLoading(true)

        if (parseJwt().Id != id) {

            if (userType === '"Collaborator"') {
                fetch('http://localhost5000/api/InternalUser/BecomeAdm/' + id, {
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token-pic')
                    }
                })
                    .then(() => {
                        setIsModalWarningVisible(true)
                        setModalTitle('Alteração completa')
                        setWarning('A função do Usuário foi alterada com sucesso, agora ele é um administrador!')
                        setIsLoading(false)
                        setIsReload(true)
                    })
                    .catch(err => {
                        setIsModalWarningVisible(true);
                        setIsReload(true)
                        setModalTitle('Houve um erro ao tentar alterar o status deste usuário');
                        console.error(err)
                        setIsLoading(false);
                    });
            }
            else {
                fetch('http://localhost5000/api/InternalUser/BecomeCollab/' + id, {
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token-pic')
                    }
                })
                    .then(() => {
                        setIsModalWarningVisible(true)
                        setModalTitle('Alteração completa')
                        setWarning('A função do Usuário foi alterada com sucesso, agora ele é um colaborador!')
                        setIsLoading(false)
                        setIsReload(true)
                    })
                    .catch(err => {
                        setIsModalWarningVisible(true);
                        setIsReload(true)
                        setModalTitle('Houve um erro ao tentar alterar o status deste usuário');
                        console.error(err)
                        setIsLoading(false);
                    });
            }
        }
    }


    const ShowModal = (id: any, role: string) => {
        localStorage.setItem('idUser', JSON.stringify(id));
        localStorage.setItem('roleUser', JSON.stringify(role));
        if (parseJwt().Id == id) {
            setIsModalWarningVisible(true)
            setModalTitle('Não é possível alterar a função deste usuário')
            setWarning('Este usuário está atualmente logado. Para mudar a função dele entre com outra conta administradora')
            setIsLoading(false)
        }
        else {
            setIsModalActionVisible(true);
            setModalTitle('Deseja Alterar a função desde usuário?');
            setWarning(`Este usuário é um ${role === 'Administrator' ? 'Adminstrador' : 'Colaborador'},
            deseja alterar sua função para ${role === 'Administrator' ? 'Colaborador' : 'Administrador'}?`)
        }
    }

    const ShowModalInactive = (id: any, role: string) => {
        localStorage.setItem('idUser', JSON.stringify(id));
        localStorage.setItem('roleUser', JSON.stringify(role));
        if (parseJwt().Id == id) {
            setIsModalWarningVisible(true)
            setModalTitle('Não é possível inativar este usuário')
            setWarning('Este usuário está atualmente logado. Para inativá-lo entre com outra conta administradora')
            setIsLoading(false)
        }
        else {
            setIsModalActionVisibleInactive(true);
            setModalTitle('Tem certeza que deseja inativar este usuário?');
            setWarning('Após inativar este usuário ele não possuíra mais acesso a plataforma!')
        }
    }

    const RenderUsers = () => {
        return (
            <tbody>
                {
                    listUsers.map((item: any) => {
                        return (
                            <div className="cardTableUserTd-align">
                                <div className="cardTableUserTd">
                                    <td>{item.nameIuser}</td>
                                    <td>{item.surnameIuser}</td>
                                    <td>{item.idDpNavigation.nameDp}</td>
                                    <td>{item.emailIuser}</td>
                                    {VerifyUserType(item.idUtypeNavigation.nameUtype)}
                                    <td className='td-button' onClick={() => ShowModal(item.idIuser, item.idUtypeNavigation.nameUtype)}><ResponsiveBtn value={valueBtn} typeBtn='hollowButton' /></td>
                                    {VerifyStatus(item.activeIuser)}
                                    <td className='td-button' onClick={() => ShowModalInactive(item.idIuser, item.idUtypeNavigation.nameUtype)}><ResponsiveBtn value={valueBtn2} typeBtn='hollowButton' /></td>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                }
            </tbody>
        )
    }

    return (
        <div>
            <div className="cardTableUserBody">
                <div className="cardTableUserTables">
                    <div className='cardTableUserTopOptions'>
                        <div className="cardTableUserInput">
                            <SmallInputSearch cssType='smallSearchInputHollow' namePlaceHolder='Pesquisar usuário' onChange={e => setFilter(e.currentTarget.value)} value={filter} />
                            <h1>{error}</h1>
                        </div>

                        <div className="cardTabelUserButton">
                            <Link to='/approveUsers'>
                                <button className='cardTableUserUniqueBtn'>Usuários inativados</button>
                            </Link>
                            <Link to='/dashboard'><Button value='Voltar' typeBtn='filledButton' /></Link>
                        </div>
                    </div>

                    <table className='cardTableUserCustomization'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Sobrenome</th>
                                <th>Departamento</th>
                                <th>Email</th>
                                <th>Função</th>
                                <th>Alterar status</th>
                            </tr>
                            <hr />
                        </thead>

                        {RenderUsers()}
                    </table>
                </div>
            </div>
            {
                isModalActionVisible &&
                <ModalAction title={modalTitle}
                    description={warning}
                    id='modal'
                    action={() => BecomeAdministratorUser(localStorage.getItem('idUser'), localStorage.getItem('roleUser'))}
                    onClose={() => setIsModalActionVisible(false)}
                    isReload={isReload} />
            }
            {
                isModalActionVisibleInactive &&
                <ModalAction title={modalTitle}
                    description={warning}
                    id='modal'
                    action={() => InacivatedUser(localStorage.getItem('idUser'))}
                    onClose={() => setIsModalActionVisibleInactive(false)}
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

export default CardTableUser;