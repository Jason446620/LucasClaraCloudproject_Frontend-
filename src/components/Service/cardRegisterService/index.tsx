import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//import components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import images
import Product from '../../../assets/images/product.png';
import Loading from '../../Generic/loading';


interface cardRegisterServiceProps {
    title: string;
    nameButton: string;
}

const CardRegisterService: React.FC<cardRegisterServiceProps> = ({ title, nameButton }) => {

    useEffect(() => {
        ListProviders()
    }, [])

    //função responvel por voltar para a pagina viewServices
    const Back = () => {
        history.push('/dashboard')
    }

    //variavel responsavel pela navegação
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    //Informações necessarias para listar os fornecedores
    const [provider, setProvider] = useState('0')
    const [providers, setProviders] = useState([]);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //Função responsavel por listar todos os fornecedores
    const ListProviders = () => {
        fetch('http://localhost5000/api/Category', {
            method: 'GET',
            headers: {

                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setProviders(data);
                console.log(data)
            })
            .catch(err => console.error(err));
    }

    //Informações de um Select estático que esta recebe um valor bool 
    const list = [
        { bool: 'true', name: 'Sim' },
        { bool: 'false', name: 'Não' },
    ];

    //Informações para cadastrar um serviço
    const [skuSproduct, setSkuSproduct] = useState('');
    const [nameSkuSproduct, setNameSkuSproduct] = useState('');
    const [supplierBillingSproduct, setSupplierBillingSproduct] = useState('0');
    const [activeSproduct, setActiveSproduct] = useState(true);
    const [idCategory, setIdCategory] = useState(0);



    const RegisterService = () => {
        const form = {
            skuSproduct: skuSproduct,
            nameSkuSproduct: nameSkuSproduct,
            supplierBillingSproduct: supplierBillingSproduct,
            activeSproduct: activeSproduct,
            idCategory: parseInt(provider)
        }
        console.log(form)

        if (supplierBillingSproduct != '0') {
            if (form.idCategory != 0) {

                setIsLoading(true)
                fetch('http://localhost5000/api/ServiceProduct', {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token-pic')
                    }
                })
                    .then(() => {
                        setIsModalWarningVisible(true);
                        setModalURL('/viewServices');
                        setModalTitle('Serviço/Produto cadastrado com sucesso!')
                        setSkuSproduct('');
                        setNameSkuSproduct('');
                        setSupplierBillingSproduct('');
                        setIdCategory(0);
                        setIsLoading(false)
                    })
                    .catch(err => {
                        setIsModalWarningVisible(true);
                        setIsReload(true)
                        setModalTitle('Houve um erro ao atualizar o serviço contratado');
                        console.error(err)
                        setIsLoading(false)
                    });
            }
            else {
                setIsModalWarningVisible(true);
                setModalTitle('Por favor, Informe quem é o fornecedor desse Serviço/Produto!')
            }
        }
        else {
            setIsModalWarningVisible(true);
            setModalTitle('Por favor, Informe se o Serviço/Produto é faturado pelo fornecedor!')
        }
    }

    return (
        <div>
            <div className="cardRegisterServiceCorpo">
                <h2>{title}</h2>
                <div className="cardRegisterServiceImg">
                    <img src={Product} width='100px' height='100px' />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    RegisterService();
                }}>
                    <div className="cardRegisterServiceInput">
                        <div className='cardNewHiredServiceInputSeparatorLeft'>
                            <div className='cardRegisterServiceInputSeparator'>
                                <label htmlFor="" className='standardLabel'>Nome do serviço:</label>
                                <StandardInput required MinLengh='2' MaxLengh='255' namePlaceholder='Nome do serviço' value={nameSkuSproduct} onChange={e => setNameSkuSproduct(e.target.value)} />
                            </div>

                            <label htmlFor="" className='standardLabel'>Faturado pelo fornedor:</label>
                            <div className='cardRegisterServiceInputSeparator'>

                                <select className='StandardSelect' value={supplierBillingSproduct} onChange={e => setSupplierBillingSproduct(e.target.value)}>
                                    <option selected value="0" disabled>Faturado pelo fornedor</option>
                                    {list.map((item: any) => {
                                        return <option value={item.bool}>{item.name}</option>
                                    }
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className='cardNewHiredServiceInputSeparatorRight'>
                            <label htmlFor="" className='standardLabel'>Código do sku:</label>
                            <div className='cardRegisterServiceInputSeparator'>
                                <div className="InputUpper">
                                    <StandardInput required MinLengh='3' MaxLengh='65' namePlaceholder='Código do sku' value={skuSproduct} onChange={e => setSkuSproduct(e.target.value)} />
                                </div>
                            </div>

                            <label htmlFor="" className='standardLabel'>Selecione o fornecedor:</label>
                            <div className='cardRegisterServiceInputSeparator'>
                                <select className='StandardSelect' onChange={e => setProvider(e.target.value)} value={provider}>
                                    <option selected disabled value="0">Selecione o fornecedor:</option>
                                    {
                                        providers.map((item: any) => {
                                            return <option value={item.idCategory}>{item.nameCategory}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="cardRegisterServiceButton">
                        <div className="cardRegisterServiceButtonSeparator">
                            <StandardBtn value={nameButton} typeBtn='filledButton' />
                        </div>
                        <div>
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
            {
                isLoading &&
                <Loading />
            }
        </div>
    )
}

export default CardRegisterService;