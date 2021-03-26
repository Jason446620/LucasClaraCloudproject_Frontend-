import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Importing CSS
import './style.css';
import '../../../assets/styles/global.css';

//Importing Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import imgUser from '../../../assets/images/user.png';

//import parseJwt
import { parseJwt } from '../../../services/auth';

interface CardUserProps {
    title: string;
}

const CardEditUser: React.FC<CardUserProps> = ({ title, ...rest }) => {

    //Responsável por fazer o ciclo de vida da página
    useEffect(() => {
        ListDepartments()
        ListInformationsOfUser()
    }, [])

    //variavel responsavel pela navegação 
    const history = useHistory();

    //Variavel responsavel por pegar as informações do usuário
    let tokenDecode: any = parseJwt();

    //função responvel por voltar para a pagina home ou dashboard
    const Back = () => {
        if (tokenDecode.Role === 'Administrator') {
            history.push('/dashboard');
        }
        else {
            history.push('/home');
        }
    }

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //Informações para cadastrar um usuário
    const [nameIuser, setNameIuser] = useState('');
    const [surNameIuser, setSurNameIuser] = useState('');
    const [emailIuser, setEmailIuser] = useState('');
    const [passwordIuser, setPasswordIuser] = useState('');
    const [confirmPasswordIuser, setConfirmPasswordIuser] = useState('');
    const [idUtype, setIdUtype] = useState(2);
    const [idDp, setIdDp] = useState('0');

    const UpdateUser = () => {
        const form = {
            nameIuser: nameIuser,
            surNameIuser: surNameIuser,
            emailIuser: emailIuser,
            passwordIuser: passwordIuser,
            idUtype: idUtype,
            idDp: idDp,
        }
        console.log(form);

        if (confirmPasswordIuser === passwordIuser) {
            if (idDp != '0') {
                if (emailIuser.includes('claracloud.com.br') === true) {
                    fetch('http://localhost5000/api/InternalUser/' + tokenDecode.Id, {
                        method: 'PUT',
                        body: JSON.stringify(form),
                        headers: {
                            'Content-Type': 'application/json',
                            authorization: 'Bearer ' + localStorage.getItem('token-pic')
                        }
                    })
                        .then(() => {
                            setIsModalWarningVisible(true);
                            setModalTitle('Usuário atualizado com sucesso!');
                        })
                        .then(() => {
                            setNameIuser('');
                            setSurNameIuser('');
                            setEmailIuser('');
                            setPasswordIuser('');
                            setConfirmPasswordIuser('');
                            setIdUtype(2);
                            setIdDp('0');
                        })
                        .catch(err => {
                            setIsModalWarningVisible(true);
                            setIsReload(true)
                            setModalTitle('Houve um erro ao atualizar o serviço contratado');
                            console.error(err)
                        });
                }
                else {
                    setIsModalWarningVisible(true);
                    setModalTitle('Email Inválido.');
                    setWarning('O email deve incluir o endereço da clara cloud, como o exemplo a seguir: exemplo@claracloud.com.br')
                }
            }
            else {
                setIsModalWarningVisible(true);
                setModalTitle('Por Favor, selecione um departamento.');
            }
        }
        else {
            setIsModalWarningVisible(true);
            setModalTitle('Erro ao efetuar a atualização!. As senhas informadas não estavam iguais.');
        }
    };

    //Informações para listar os departamentos disponíveis no sistema
    const [department, setDepartment] = useState('0');
    const [departments, setDepartments] = useState([]);

    const ListDepartments = () => {
        fetch('http://localhost5000/api/Department', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setDepartments(data);
                console.log(data)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o serviço contratado');
                console.error(err)
            });
    }

    //informações para listar as informações do usuário que esta logado
    const ListInformationsOfUser = () => {
        fetch('http://localhost5000/api/InternalUser/' + tokenDecode.Id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setNameIuser(data.nameIuser);
                setSurNameIuser(data.surnameIuser);
                setEmailIuser(data.emailIuser);
                setIdDp(data.idDpNavigation.idDp);
                console.log(data)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o serviço contratado');
                console.error(err)
            });
    }

    return (
        <div>
            <div className="cardEditUserBody">
                <div className='cardEditUserTitle'>
                    <h2>{title}</h2>

                    <img src={imgUser} />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    UpdateUser();
                }}>

                    <div className="cardEditUserInput">
                        <div className="cardEditUserInputLeft">
                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Nome:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' namePlaceholder='Nome' type='text' value={nameIuser} onChange={e => setNameIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Sobrenome:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' namePlaceholder='Sobrenome' type='text' value={surNameIuser} onChange={e => setSurNameIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Email:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' namePlaceholder='Email' type='email' value={emailIuser} onChange={e => setEmailIuser(e.target.value)} />
                            </div>
                        </div>

                        <div className="cardEditUserRight">
                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Selecione o departamento:</label>
                                <select className='StandardSelect' onChange={e => setIdDp(e.target.value)} value={idDp}>
                                    <option selected disabled value='0'>Selecione o departamento</option>
                                    {

                                        departments.map((item: any) => {
                                            return <option value={item.idDp}>{item.nameDp}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Nova senha:</label>
                                <StandardInput MinLengh='8' MaxLengh='70' namePlaceholder='Nova senha' type='password' value={passwordIuser} onChange={e => setPasswordIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label className='cardEditUserStandardLabel'>Confirmar nova senha:</label>
                                <StandardInput MinLengh='8' MaxLengh='70' namePlaceholder='Confirmar nova senha' type='password' value={confirmPasswordIuser} onChange={e => setConfirmPasswordIuser(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="cardEditUserButton">
                        <div className="cardEditUserButtonSeparator">
                            <StandardBtn value='Enviar' typeBtn='filledButton' />
                        </div>
                        <div className="cardEditUserButtonSeparator">
                            <form onClick={event => {
                                event.preventDefault();
                                Back();
                            }}>
                                <StandardBtn value='Voltar' typeBtn='hollowButton' />
                            </form>
                        </div>
                    </div>
                </form>
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
        </div>
    );
}

export default CardEditUser;