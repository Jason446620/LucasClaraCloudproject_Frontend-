import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

//import styles
import './style.css'

//importing components
import Button from '../../Generic/button/index'
import SmallInputSearch from '../../Generic/smallInputSearch';
import ModalWarning from '../../Generic/modalWarning';
import VerySmallInputSearch from '../../Generic/verySmallInputSearch';
import Loading from '../../Generic/loading';

export default function CardTableSupplier() {

    //Responsavel pelo ciclo de vida do componente
    useEffect(() => {
        ListProviders()
    }, [])

    const [filter, setFilter] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let ProviderFilter = listSuppliers.filter((provider: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0)
                return listSuppliers;

            // Retorna todos os users com nomes semelhantes ao filtro digitado
            return provider.nameCategory.toLowerCase().includes(filter.toLowerCase());
        })

        setSuppliers(ProviderFilter);
    }, [filter])

    const history = useHistory();

    //Informação necessaria para listar os fornecedores 
    const [listSuppliers, updateListSuppliers] = useState([]);
    const [suppliers, setSuppliers] = useState(listSuppliers);
    const [idCategory, setIdCategory] = useState(0);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const ListProviders = () => {
        setIsLoading(true)
        fetch('http://localhost5000/api/Category', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSuppliers(data);
                updateListSuppliers(data);
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informções dos fornecedores');
                console.error(err)
                setIsLoading(false)
            });
    }

    //Função responsavel por pegar o id do fornecedor
    const PushToEditProvider = (id: any) => {
        history.push(`/editProvider?id=${id}`)
    }

    return (
        <div>
            <div className="cardTableSupplierBody">
                <div className="cardTableSupplierTables">
                    <div className='cardTableSupplierTopOptions'>

                        <div className="cardTableSupplierInput">
                            <VerySmallInputSearch cssType='verySmallSearchInputHollow' namePlaceHolder='Pesquisar fornecedor' onChange={e => setFilter(e.currentTarget.value)} value={filter} />
                        </div>

                        <div className="cardTabelSupplierButton">
                            <Link to='/dashboard'><Button value='Voltar' typeBtn='filledButton' /></Link>
                        </div>
                    </div>

                    <table className='cardTableSupplierCustomization'>
                        <thead>
                            <tr>
                                <th>Nome do fornecedor</th>
                                <th>Editar fornecedor</th>
                            </tr>
                            <hr />
                        </thead>
                        <tbody>
                            {
                                suppliers.map((item: any) => {
                                    return (
                                        <div>
                                            <tr>
                                                <div className="cardTableSupplierTd">
                                                    <td>{item.nameCategory}</td>
                                                    <td onClick={() => PushToEditProvider(item.idCategory)} className='supplierTd_buttonEdit'><Button value='Editar' typeBtn='hollowButton' /></td>
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

