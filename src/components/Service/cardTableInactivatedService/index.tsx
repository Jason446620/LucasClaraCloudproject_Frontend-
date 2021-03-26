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

const CardTableInactivatedService = () => {

    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const [listServices, updateListServices] = useState([]);
    const [services, setServices] = useState(listServices);

    useEffect(() => {
        ListInactiveServices()
    }, [])

    const [filter, setFilter] = useState('');

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let ServiceFilter = listServices.filter((user: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0){
                return listServices;
            }
            else{
            // Retorna todos os users com nomes semelhantes ao filtro digitado
            return user.nameSkuSproduct.toLowerCase().includes(filter.toLowerCase());
            }
        })

        setServices(ServiceFilter);
    }, [filter])   

    //variavel responsavel pela navegação
    const history = useHistory();

    const ListInactiveServices = () => {
        setIsLoading(true)
        fetch('http://localhost5000/api/ServiceProduct/Inactive', {
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
                setIsLoading(false)
                setModalTitle('Houve um erro ao tentar alterar o status deste serviço');
                console.error(err)
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

    const ActiveService = (id: any) => {
        setIsLoading(true)
        fetch('http://localhost5000/api/ServiceProduct/Activate/' + id, {
            method: 'PUT',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('Serviço/Produto ativado com sucesso')
                setIsReload(true)
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setIsLoading(false)
                setModalTitle('Houve um erro ao tentar alterar o status deste serviço');
                console.error(err)
            });
    }

    return (
        <div>
            <div className="cardTableInactivatedServiceBody">
                <ArrowUp/>
                <div className="cardTableInactivatedServiceTables">
                    <div className='cardTableInactivatedServiceTopOptions'>
                        <div className="cardTableInactivatedServiceInput">
                            <SmallInputSearch cssType='smallSearchInputHollow' namePlaceHolder='Pesquisar Serviço' onChange={e => setFilter(e.currentTarget.value)} value={filter}/>
                        </div>

                        <div className="cardTabelInactivatedServiceButton">
                            <Link to='/viewServices'><button className='cardTableServiceUniqueBtn'>Serviços ativados</button></Link>
                        </div>
                    </div>

                    <table className='cardTableInactivatedServiceCustomization'>
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
                                                <div className="cardTableInactivatedServiceTd">
                                                    <td>{item.nameSkuSproduct}</td>
                                                    <td className='td_line'>{item.skuSproduct}</td>
                                                    <td className='td_line'>{VerifyBool(item.supplierBillingSproduct)}</td>
                                                    <td className='td_lineNameSupplier'>{item.idCategoryNavigation.nameCategory}</td>
                                                    <td onClick={() => PushToEditService(item.idSproduct)} className='td_buttonEdit'><Button value='Editar' typeBtn='hollowButton' /></td>
                                                    <td onClick={() => ActiveService(item.idSproduct)} className='td_buttonsInative'><Button value='Ativar' typeBtn='hollowButton' /></td>
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

export default CardTableInactivatedService;