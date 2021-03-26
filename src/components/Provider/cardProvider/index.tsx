import React, { useState } from 'react';

//Importing CSS
import './style.css';

//Importing Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import Provider from '../../../assets/images/supla.png';
import { useHistory } from 'react-router-dom';
import Loading from '../../Generic/loading';

interface CardProviderProps {
    title: string;
}

const CardProvider: React.FC<CardProviderProps> = ({ title, ...rest }) => {

    //variavel responsavel pela navegação 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);


    //função responsavel por retornar ao dashboard
    const Back = () => {
        history.push('/dashboard')
    }
    
    //Informações necessárias para o cadastro de um Fornecedor
    const [nameCategory, setNameCategory] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const RegisterProvider = () => {
        const form = {
            nameCategory: nameCategory
        }
        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Category', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('Fornecedor cadastrado com sucesso!');
                setNameCategory('');
                setModalURL('/viewProviders')
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao cadastrar o fornecedor');
                console.error(err)
                setIsLoading(false)
            });
    }

    return (
        <div>
            <div className="cardProviderBody">
                <div className='cardProviderTitle'>
                    <h2>{title}</h2>
                    <img src={Provider} width='100px' height='100px' />
                </div>
                <form onSubmit={event => {
                    event.preventDefault();
                    RegisterProvider();
                }}>
                    <div className="cardProviderInput">

                        <div className='alignInputs'>
                            <label htmlFor="" className='standardLabel'>Nome do fornecedor:</label>
                            <StandardInput MinLengh='2' MaxLengh='100' required namePlaceholder='Nome do fornecedor' type='text' onChange={e => setNameCategory(e.target.value)} />
                        </div>

                    </div>
                    <div className="cardProviderButton">
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

export default CardProvider;