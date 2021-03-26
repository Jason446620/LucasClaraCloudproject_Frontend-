import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


//Importing CSS
import './style.css';

//Importing Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import Provider from '../../../assets/images/supla.png';
import Loading from '../../Generic/loading';

interface CardProviderProps {
    title: string;
}

const CardEditProvider: React.FC<CardProviderProps> = ({ title, ...rest }) => {

    //Responsável por fazer o ciclo de vida da página
    useEffect(() => {
        GetProviderById()
    }, [])

    //variavel responsavel pela navegação 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);


    //Informações necessárias para a atualização de um Fornecedor
    const [nameCategory, setNameCategory] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const UpdateProvider = () => {
        const form = {
            nameCategory: nameCategory
        }
        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Category/' + idProvider, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => {
                setIsModalWarningVisible(true)
                setModalTitle('Fornecedor atualizado com sucesso!')
                setModalURL('/viewProviders')
                setIsLoading(false)
            })
            .then(() => {
                setNameCategory('');
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o serviço contratado');
                console.error(err)
                setIsLoading(false)
            });
    }

    //Essas três variveis abaixo são responsaveis por adquirir as informações passadas na url
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const idProvider = urlParams.get('id');

    //Funcionalidade responsavel por pegar o id na url para atualizar um departamento
    const GetProviderById = () => {
        fetch('http://localhost5000/api/Category/' + idProvider, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setNameCategory(data.nameCategory);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o serviço contratado');
                console.error(err)
            });
    }

    const Back = () => {
        history.push('/viewProviders')
    }

    return (
        <div>
            <div className="cardEditProviderBody">
                <div className='cardEditProviderTitle'>
                    <h2>{title}</h2>
                    <img src={Provider} width='100px' height='100px' />
                </div>
                <form onSubmit={event => {
                    event.preventDefault();
                    UpdateProvider();
                }}>
                    <div className="cardEditProviderInput">

                        <div className='alignInputs'>
                            <label htmlFor="" className='standardLabel'>Nome do fornecedor:</label>
                            <StandardInput MinLengh='2' MaxLengh='50' required namePlaceholder='Nome do fornecedor' type='text' value={nameCategory} onChange={e => setNameCategory(e.target.value)} />
                        </div>

                    </div>
                    <div className="cardEditProviderButton">
                        <StandardBtn value='Enviar' typeBtn='filledButton' />
                        <form onClick={event => {
                            event.preventDefault();
                            Back();
                        }}>
                            <StandardBtn value='Voltar' typeBtn='hollowButton' />
                        </form>
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

export default CardEditProvider;