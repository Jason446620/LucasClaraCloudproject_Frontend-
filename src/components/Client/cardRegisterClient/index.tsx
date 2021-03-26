import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Import Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import StandardUser from '../../../assets/images/user.png';

//import style
import './style.css';
import '../../../assets/styles/global.css';

//import utils
import { FormaterCnpj } from '../../../utils/stringFormater';
import Loading from '../../Generic/loading';

interface cardRegisterClientProps {
    title: string,
    valueBtn: any,
    valueBtn2: any,
}

const CardRegisterClient: React.FC<cardRegisterClientProps> = ({ title, valueBtn, valueBtn2 }) => {

    //variavel responsavel pela navegação 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    //função responsavel por retornar ao dashboard
    const Back = () => {
        history.push('/dashboard')
    }
    //informações necessarias para cadastrar um cliente
    const [nameClient, setNameClient] = useState('');
    const [cnpjClient, setCnpjClient] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //função responsavel por efetuar o cadastro do cliente
    const RegisterClient = () => {
        const form = {
            nameClient: nameClient,
            cnpjClient: FormaterCnpj(cnpjClient)
        }

        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Client', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalURL('/dashboard');
                setModalTitle('Cliente cadastrado com sucesso!')
                setNameClient('');
                setCnpjClient('');
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao cadastrar o cliente');
                console.error(err)
                setIsLoading(false)
            });
    }

    return (
        <div>
            <div className="cardRegisterClientCorpo">
                <h2>{title}</h2>

                <div className="cardRegisterClientImg">
                    <img src={StandardUser} width='100px' height='100' />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    RegisterClient();
                }}>
                    <div className="cardRegisterClientInput">
                        <div className='cardRegisterClientInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Nome da empresa:</label>
                            <StandardInput required MinLengh='3' MaxLengh='70' namePlaceholder='Nome da empresa' value={nameClient} onChange={e => setNameClient(e.target.value)} />
                        </div>
                        <div className='cardRegisterClientInputSeparator'>
                        <label htmlFor="" className='standardLabel'>CNPJ:</label>
                            <StandardInput required MinLengh='14' MaxLengh='18' namePlaceholder='CNPJ' value={cnpjClient} onChange={e => setCnpjClient(e.target.value)} />
                        </div>
                    </div>

                    <div className="cardRegisterClientButton">
                        <div className="cardRegisterClientButtonSeparator">
                            <StandardBtn value={valueBtn} typeBtn='filledButton' />
                        </div>
                        <div>
                            <form onClick={event => {
                                event.preventDefault();
                                Back();
                            }}>
                                <StandardBtn value={valueBtn2} typeBtn='hollowButton' />
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
            {
                isLoading &&
                <Loading />
            }
        </div>
    );
}

export default CardRegisterClient;