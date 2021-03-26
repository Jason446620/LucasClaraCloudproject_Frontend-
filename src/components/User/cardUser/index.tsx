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

const CardUser: React.FC<CardUserProps> = ({ title, ...rest }) => {

    //Responsável por fazer o ciclo de vida da página
    useEffect(() => {
        ListDepartments()
        ListEmailUsers()
    }, [])

    //variavel responsavel pela navegação
    let history = useHistory();

    //Função responsavel por retornar o usuario para a tela de login
    const Back = () => {
        history.push('/')
    }

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const [userEmails, setUserEmails] = useState([]);

    //Informações para cadastrar um usuário
    const [nameIuser, setNameIuser] = useState('');
    const [surNameIuser, setSurNameIuser] = useState('');
    const [emailIuser, setEmailIuser] = useState('');
    const [passwordIuser, setPasswordIuser] = useState('');
    const [confirmPasswordIuser, setConfirmPasswordIuser] = useState('');
    const [idUtype, setIdUtype] = useState(2);
    const [idDp, setIdDp] = useState(0);

    const RegisterUser = () => {
        const form = {
            nameIuser: nameIuser,
            surNameIuser: surNameIuser,
            emailIuser: emailIuser,
            passwordIuser: passwordIuser,
            idUtype: idUtype,
            idDp: department
        }
        console.log(form)

        let emails: any = [];

        userEmails.map((email: any) => {
            if (email.emailIuser === emailIuser) {
                emails.push(email.emailIuser)
            }
        })

        if (confirmPasswordIuser === passwordIuser) {
            if (form.idDp != '0') {
                if (emails.length === 0) {
                    if (emailIuser.includes('claracloud.com.br') === true) {
                        fetch('http://localhost5000/api/InternalUser', {
                            method: 'POST',
                            body: JSON.stringify(form),
                            headers: {
                                'Content-Type': 'application/json',
                                authorization: 'Bearer ' + localStorage.getItem('token-pic')
                            }
                        })
                            .then(() => {
                                setNameIuser('');
                                setSurNameIuser('');
                                setEmailIuser('');
                                setPasswordIuser('');
                                setConfirmPasswordIuser('');
                                setIdUtype(2);
                                setIdDp(0);

                                setModalURL('/')
                                setIsModalWarningVisible(true)
                                setModalTitle('Cadastrado realizado com sucesso!')
                                setWarning('Sua conta será verificada por um administrador. A confirmação do mesmo será informada através de seu email cadastrado')
                            })

                            .catch(err => {
                                setIsModalWarningVisible(true)
                                setModalTitle('Erro ao efetuar o cadastro!')
                                setWarning(`Houve um erro no sistema.`)
                                console.error(err)
                            });
                    }
                    else {
                        setIsModalWarningVisible(true);
                        setModalTitle('Email Inválido.');
                        setWarning('O email deve incluir o endereço da clara cloud, como o exemplo a seguir: exemplo@claracloud.com.br');
                    }
                }
                else {
                    setIsModalWarningVisible(true)
                    setWarning('Este endereço de email já esta em uso.')
                    setModalTitle('Erro ao efetuar o cadastro!')
                }
            }
            else {
                setIsModalWarningVisible(true)
                setWarning('Por Favor, selecione um departamento.');
                setModalTitle('Erro ao efetuar o cadastro!')
            }
        }
        else {
            setIsModalWarningVisible(true)
            setWarning('As senhas informadas não estão iguais.');
            setModalTitle('Erro ao efetuar o cadastro!')
        }
    };

    //Informações para listar os departamentos disponíveis no sistema
    const [department, setDepartment] = useState('0')
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
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos departamentos');
                console.error(err)
            });
    }



    const ListEmailUsers = () => {
        fetch('http://localhost5000/api/InternalUser', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())

            .then(data => {
                setUserEmails(data)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos usuários');
                console.error(err)
            });
    }

    return (
        <div>
            <div className="cardUserBody">
                <div className='cardUserTitle'>
                    <h2>{title}</h2>

                    <img src={imgUser} />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    RegisterUser();
                }}>
                    <div className="cardUserInput">
                        <div className="cardUserInputLeft">
                            <div className='alignInputs'>
                                <label htmlFor="" className='standardLabel'>Nome:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' required namePlaceholder='Nome' type='text' value={nameIuser} onChange={e => setNameIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label htmlFor="" className='standardLabel'>Sobrenome:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' required namePlaceholder='Sobrenome' type='text' value={surNameIuser} onChange={e => setSurNameIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label htmlFor="" className='standardLabel'>Email:</label>
                                <StandardInput MinLengh='2' MaxLengh='70' required namePlaceholder='Email' type='email' value={emailIuser} onChange={e => setEmailIuser(e.target.value)} />
                            </div>
                        </div>

                        <div className="cardUserInputRight">

                            <label htmlFor="" className='standardLabel'>Selecione o departamento:</label>
                            <div className='alignInputs'>
                                <select className='StandardSelect' onChange={e => setDepartment(e.target.value)} value={department}>
                                    <option selected aria-required="true" disabled value="0">Selecione o departamento</option>
                                    {
                                        departments.map((item: any) => {
                                            return <option value={item.idDp}>{item.nameDp}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='alignInputs'>
                                <label htmlFor="" className='standardLabel'>Senha:</label>
                                <StandardInput MinLengh='8' MaxLengh='70' required namePlaceholder='Senha' type='password' value={passwordIuser} onChange={e => setPasswordIuser(e.target.value)} />
                            </div>

                            <div className='alignInputs'>
                                <label htmlFor="" className='standardLabel'>Confirmar Senha:</label>
                                <StandardInput MinLengh='8' MaxLengh='70' required namePlaceholder='Confirmar senha' type='password' value={confirmPasswordIuser} onChange={e => setConfirmPasswordIuser(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="cardUserButton">
                        <div className="cardUserButtonSeparator">
                            <StandardBtn value='Enviar' typeBtn='filledButton' />
                        </div>
                        <div className="cardUserButtonSeparator">
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

export default CardUser;