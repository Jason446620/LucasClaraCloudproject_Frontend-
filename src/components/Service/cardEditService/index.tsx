import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

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

const CardEditService: React.FC<cardRegisterServiceProps> = ({ title, nameButton }) => {

    useEffect(() => {
        ListProviders()
        GetServiceById()
    }, [])

    let params: any = useParams();

    //variavel responsavel pela navegação
    const history = useHistory();

    //função responvel por voltar para a pagina viewServices
    const Back = () => {
        history.push('/viewServices')
    }

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

    //Informações de um Select estático que esta recebe um valor bool 
    const list = [
        { bool: 'true', name: 'Sim' },
        { bool: 'false', name: 'Não' },
    ];

    //informações necessária para atualizar o serviço
    const [skuSproduct, setSkuSproduct] = useState('');
    const [nameSkuSproduct, setNameSkuSproduct] = useState('');
    const [supplierBillingSproduct, setSupplierBillingSproduct] = useState('0');
    const [idCategory, setIdCategory] = useState('0');
    const [activeSproduct, setActiveSproduct] = useState(false)

    const UpdateService = () => {
        const form = {
            nameSkuSproduct: nameSkuSproduct,
            skuSproduct: skuSproduct,
            supplierBillingSproduct: supplierBillingSproduct,
            idCategory: idCategory,
            activeSproduct: activeSproduct
        }
        console.log(form)

        if (idCategory != '0') {
            setIsLoading(true)
            fetch('http://localhost5000/api/ServiceProduct/' + params.id, {
                method: 'PUT',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalURL('/viewServices');
                    setModalTitle('Serviço atualizado com sucesso!')
                    setIsLoading(false)
                })
                .then(() => {
                    setNameSkuSproduct('');
                    setSkuSproduct('');
                    setSupplierBillingSproduct('');
                    setIdCategory('0');
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setIsReload(true)
                    setModalTitle('Houve um erro ao atualizar o serviço');
                    console.error(err)
                    setIsLoading(false)
                });
        }
        else {
            alert('Por Favor, Selecione o fornecedor deste Serviço/Produto!')
        }
    }

    //Funcionalidade responsavel por pegar o id na url para atualizar um departamento
    const GetServiceById = () => {
        fetch('http://localhost5000/api/ServiceProduct/' + params.id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setNameSkuSproduct(data.nameSkuSproduct);
                setSkuSproduct(data.skuSproduct);
                setSupplierBillingSproduct(data.supplierBillingSproduct);
                setIdCategory(data.idCategory);
                setActiveSproduct(data.activeSproduct)
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
            <div className="cardEditRegisterServiceCorpo">
                <h2>{title}</h2>
                <div className="cardEditRegisterServiceImg">
                    <img src={Product} width='100px' height='100px' />
                </div>

                <form onSubmit={event => {
                    event.preventDefault();
                    UpdateService();
                }}>
                    <div className="cardEditRegisterServiceInput">
                        <div className='cardEditHiredServiceInputSeparatorLeft'>
                            <div className='cardEditRegisterServiceInputSeparator'>
                                <label htmlFor="" className='standardLabel'>Nome do serviço:</label>
                                <StandardInput required MinLengh='2' MaxLengh='255' namePlaceholder='Nome do serviço' value={nameSkuSproduct} onChange={e => setNameSkuSproduct(e.target.value)} />
                            </div>

                            <label htmlFor="" className='standardLabel'>Faturado pelo fornedor:</label>
                            <div className='cardEditRegisterServiceInputSeparator'>
                                <select className='StandardSelect' value={supplierBillingSproduct} onChange={e => setSupplierBillingSproduct(e.target.value)}>
                                    <option selected value="0" disabled>Faturado pelo fornedor ?</option>
                                    {list.map((item: any) => {
                                        return <option value={item.bool}>{item.name}</option>
                                    }
                                    )}
                                </select>
                            </div>
                        </div>

                        <div className='cardEditHiredServiceInputSeparatorLeft'>
                            <div className='cardEditRegisterServiceInputSeparator'>
                                <div className="InputUpper">
                                    <label htmlFor="" className='standardLabel'>Código do sku:</label>
                                    <StandardInput required MinLengh='3' MaxLengh='65' namePlaceholder='Código do sku' value={skuSproduct} onChange={e => setSkuSproduct(e.target.value)} />
                                </div>
                            </div>

                            <label htmlFor="" className='standardLabel'>Selecione o fornecedor:</label>
                            <div className='cardEditRegisterServiceInputSeparator'>
                                <select className='StandardSelect' onChange={e => setIdCategory(e.target.value)} value={idCategory}>
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

                    <div className="cardEditRegisterServiceButton">
                        <div className="cardEditRegisterServiceButtonSeparator">
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

export default CardEditService;