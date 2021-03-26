import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';

//import styles
import './style.css'

//importing components
import Button from '../../Generic/button/index'
import SmallInputSearch from '../../Generic/smallInputSearch';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';
import ArrowUp from '../../Generic/arrowUp';

const CardTableService = () => {

    const [listServices, updateListServices] = useState([]);

    const [services, setServices] = useState(listServices);

    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        ListActiveServices()
    }, [])

    //variavel responsavel pela navegação
    const history = useHistory();

    //variavel responsavel pelo filtro
    const [filter, setFilter] = useState('');

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let SkusFilter = listServices.filter((sku: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0) {
                return listServices;
            }
            else {
                // Retorna todos os users com nomes semelhantes ao filtro digitado
                return sku.nameSkuSproduct.toLowerCase().includes(filter.toLowerCase());
            }
        })

        setServices(SkusFilter);
    }, [filter])

    const ListActiveServices = () => {
        setIsLoading(true)
        fetch('http://localhost5000/api/ServiceProduct/Active', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setServices(data);
                updateListServices(data);
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações de serviço');
                console.error(err)
                setIsLoading(false)
            });
    }

    const VerifyBool = (bool: boolean) => {
        if (bool === false) {
            return 'Não'
        }
        else {
            return 'Sim'
        }
    }

    //função necessaria para pegar o id do serviço para atualiza-lo
    const PushToEditService = (id: any) => {
        history.push(`/editService/${id}`)
    }

    const InactiveService = (id: any) => {
        setIsLoading(true)
        fetch('http://localhost5000/api/ServiceProduct/Inactivate/' + id, {
            method: 'PUT',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('Serviço/Produto inativado com sucesso')
                setIsReload(true);
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar inativar serviço');
                console.error(err)
                setIsLoading(false)
            });
    }

    return (
        <div>
            <div className="cardTableServiceBody">
                <ArrowUp/>
                <div className="cardTableServiceTables">
                    <div className='cardTableServiceTopOptions'>
                        <div className="cardTableServiceInput">
                            <SmallInputSearch cssType='smallSearchInputHollow' namePlaceHolder='Pesquisar Serviço' onChange={e => setFilter(e.target.value)} value={filter} />
                        </div>

                        <div className="cardTabelServiceButton">
                            <Link to='/viewInactivatedServices'>
                                <button className='cardTableServiceUniqueBtn'>Serviços inativados</button>
                            </Link>

                            <Link to='dashBoard'><Button value='Voltar' typeBtn='filledButton' /></Link>
                        </div>
                    </div>

                    <table className='cardTableServiceCustomization'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>SKU</th>
                                <th>Faturado pelo fornecedor</th>
                                <th>Fornecedor</th>
                                <th>Editar serviço</th>
                                <th>Inativar serviço</th>
                            </tr>
                            <hr />
                        </thead>
                        <tbody>
                            {
                                services.map((item: any) => {
                                    return (
                                        <div>
                                            <tr>
                                                <div className="cardTableServiceTd">
                                                    <td>{item.nameSkuSproduct}</td>
                                                    <td className='td_lineUnique'>{item.skuSproduct}</td>
                                                    <td className='td_line'>{VerifyBool(item.supplierBillingSproduct)}</td>
                                                    <td className='td_lineNameSupplier'>{item.idCategoryNavigation.nameCategory}</td>
                                                    <td onClick={() => PushToEditService(item.idSproduct)} className='td_buttonEdit'><Button value='Editar' typeBtn='hollowButton' /></td>
                                                    <td onClick={() => InactiveService(item.idSproduct)} className='td_buttonsInative'><Button value='Inativar' typeBtn='hollowButton' /></td>
                                                </div>
                                            </tr>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
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

export default CardTableService;