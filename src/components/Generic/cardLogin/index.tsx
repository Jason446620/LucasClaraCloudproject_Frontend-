import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

//Import Components
import StandardBtn from '../button';
import StandardInput from '../input';
import ModalWarning from '../modalWarning';
import Loading from '../loading';

//import style
import './style.css'

//import do parseJwt
import { parseJwt } from '../../../services/auth';

export default function CardLogin() {

    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //UseState que indica quando está carregando a página
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const login = () => {
        const infoLogin = {
            emailIuser: email,
            passwordIuser: password
        };

        fetch('http://localhost5000/api/login', {
            method: 'POST',
            body: JSON.stringify(infoLogin),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(dados => {
                setIsLoading(false);
                if (dados.token != undefined) {
                    localStorage.setItem('token-pic', dados.token)

                    if (parseJwt().Role === 'Administrator') {
                        history.push('/dashboard');
                    }

                    if (parseJwt().Role === 'Collaborator') {
                        history.push('/home');
                    }
                }
                else {
                    setIsModalWarningVisible(true);
                    setIsLoading(false);
                    setModalTitle('Email ou senha inválidos')
                }
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsLoading(false);
                setModalTitle('Houve um erro ao efetuar o login');
                console.error(err)
            });
    }

    return (
        <div>
            <div className="cardLoginCorpo">
                <h2>Login</h2>
                <form className='forms' onSubmit={e => {
                    e.preventDefault();
                    setIsLoading(true);
                    login();
                }}>
                    <div className="cardLoginInput">

                        <div className='inputSeparator'>
                            <input className='inputLogin' minLength={3} maxLength={70} placeholder='Email' onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <input className='inputLogin' type='password' minLength={8} maxLength={70} placeholder='Senha' onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <div className="cardLoginButton">
                        <StandardBtn value='Entrar' typeBtn='filledButton' />

                        <Link className='registerHoover' to='/registerUser'><p>Não possui cadastro?</p></Link>
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

            {
                isLoading && 
                <Loading/>
            }
        </div>
    );
}