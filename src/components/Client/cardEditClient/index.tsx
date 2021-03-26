import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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

const CardEditClient: React.FC<cardRegisterClientProps> = ({ title, valueBtn, valueBtn2 }) => {

    //Responsável por fazer o ciclo de vida da página
    useEffect(() => {
        GetClientById()
    }, [])

    //variavel responsavel pela navegação 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false);

    let params: any = useParams();

    //informações necessarias para cadastrar um cliente
    const [nameClient, setNameClient] = useState('');
    const [cnpjClient, setCnpjClient] = useState('');

    const UpdateClient = () => {
        const form = {
            nameClient: nameClient,
            cnpjClient: FormaterCnpj(cnpjClient)
        }
        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Client/' + params.id, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setNameClient('');
                setCnpjClient('');
            })
            .then(() => {
                setIsModalWarningVisible(true)
                setModalURL(`/clientDetail/${params.id}`)
                setModalTitle('Cliente atualizado com sucesso')
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true)
                setModalTitle('Erro ao atualizar o cliente')
                setWarning(`Houve um erro no sistema.`)
                console.error(err)
                setIsLoading(false)
            });
    }

    //Funcionalidade responsavel por pegar o id na url para atualizar um departamento
    const GetClientById = () => {
        fetch('http://localhost5000/api/Client/' + params.id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setNameClient(data.nameClient);
                setCnpjClient(data.cnpjClient);
            })
            .catch(err => {
                setIsModalWarningVisible(true)
                setModalTitle('Erro ao obter as informações do cliente')
                console.error(err)
            });
    }

    const handleCnpj = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.maxLength = 18;
        let value = e.currentTarget.value;
        value = value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
        e.currentTarget.value = value;
    }

    return (
        <div>
            <div className="cardEditClientCorpo">
                <h2>{title}</h2>

                <div className="cardEditClientImg">
                    <img src={StandardUser} width='100px' height='100' />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    UpdateClient();
                }}>
                    <div className="cardEditClientInput">
                        <div className='cardEditClientInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Nome da empresa:</label>
                            <StandardInput required MinLengh='3' MaxLengh='70' namePlaceholder='Nome da empresa' value={nameClient} onChange={e => setNameClient(e.target.value)} />
                        </div>
                        <div className='cardEditClientInputSeparator'>
                            <label htmlFor="" className='standardLabel'>CNPJ:</label>
                            <input id='cnpj' required minLength={14} maxLength={14} placeholder='CNPJ' onClick={handleCnpj} value={cnpjClient} onChange={e => setCnpjClient(e.target.value)} />
                        </div>
                    </div>

                    <div className="cardEditClientButton">
                        <div className="cardEditClientButtonSeparator">
                            <StandardBtn value={valueBtn} typeBtn='filledButton' />
                        </div>
                        <div>
                            <form onClick={event => {
                                event.preventDefault();
                                history.push(`/clientDetail/${params.id}`)
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

export default CardEditClient;