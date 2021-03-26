import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

//import styles
import './style.css'

//importing components
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';

//import utils
import { addMask } from '../../../utils/stringFormater';
import { convertTypeAcquisitionFromJson } from 'typescript';

interface CardTableClientProps {
    filterName: string;
    filterByService: any;
}

// Função geral que implementa as funcionalidades e o visual
function CardTableClient(props: CardTableClientProps) {

    // Listas usadas para atribuir os dados
    // Lista de todos clientes    
    const [clients, setClients] = useState([]);

    // Lista de contratos
    const [contracts, setContracts] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false);

    var listStorage = [
        {
            name: 'Novos Clientes',
            value: localStorage.getItem('newClient')
        },

        {
            name: 'Clientes Google',
            value: localStorage.getItem('clientGoogle'),
        },

        {
            name: 'Clientes Microsoft',
            value: localStorage.getItem('clientMicrosoft'),
        },

        {
            name: 'Clientes Freshworks',
            value: localStorage.getItem('clientFreshworks'),
        },

        {
            name: 'Serviços Clara Cloud',
            value: localStorage.getItem('clientBest'),
        },

        {
            name: 'Clientes Zoom',
            value: localStorage.getItem('clientZoom'),
        },

        {
            name: 'Clientes Kaspersky',
            value: localStorage.getItem('clientKaspersky'),
        },

        {
            name: 'Clientes 2brightSparks',
            value: localStorage.getItem('client2brightSparks'),
        },

        {
            name: 'Clientes Ativos',
            value: localStorage.getItem('clientActive'),
        },

        {
            name: 'Clientes Inativos',
            value: localStorage.getItem('clientInactive'),
        },

        {
            name: 'Clientes Renovação 30 dias',
            value: localStorage.getItem('renewal30'),
        },

        {
            name: 'Clientes Renovação 60 dias',
            value: localStorage.getItem('renewal60'),
        }
    ];

    // Assim que a página carrega, as funções dentro dele são executadas
    useEffect(() => {
        FilteredByHomeListClients()
        GetContracts()
    }, [])

    useEffect(() => {
        if (props.filterByService != 0) {
            FilterListClient();
        }
        else {
            FilteredByHomeListClients();
            GetContracts()
        }
    }, [props.filterByService])


    const FilterListClient = () => {
        setIsLoading(true)

        if (localStorage.getItem('skugoogle') !== '0' && localStorage.getItem('skugoogle') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('skumicrosoft') !== '0' && localStorage.getItem('skumicrosoft') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('skufresh') !== '0' && localStorage.getItem('skufresh') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('skuclara') !== '0' && localStorage.getItem('skuclara') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('skuzoom') !== '0' && localStorage.getItem('skuzoom') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('skukaspersky') !== '0' && localStorage.getItem('skukaspersky') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else if (localStorage.getItem('sku2brightSparks') !== '0' && localStorage.getItem('sku2brightSparks') !== undefined) {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client/filterByService/' + props.filterByService, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

    }

    // Função que gera uma lista com todos os clientes
    const FilteredByHomeListClients = () => {

        setIsLoading(true)

        var listBooleanFilters: boolean[] = [];

        listStorage.map((string: any) => {
            var boolean;

            if (string.value === 'true')
                boolean = true;

            else
                boolean = false;

            listBooleanFilters.push(boolean)
        });

        var filterNew = listBooleanFilters[0];
        var filterGoogle = listBooleanFilters[1];
        var filterMicrosoft = listBooleanFilters[2];
        var filterFresh = listBooleanFilters[3];
        var filterClara = listBooleanFilters[4];
        var filterZoom = listBooleanFilters[5];
        var filterKaspersky = listBooleanFilters[6];
        var filter2brightSparks = listBooleanFilters[7];
        var filterActive = listBooleanFilters[8];
        var filterInactive = listBooleanFilters[9];
        var filterThirtyDays = listBooleanFilters[10];
        var filterSixtyDays = listBooleanFilters[11];

        if (filterNew === true ||
            filterGoogle === true ||
            filterMicrosoft === true ||
            filterFresh === true ||
            filterClara === true ||
            filterZoom === true ||
            filterKaspersky === true ||
            filter2brightSparks === true ||
            filterActive === true ||
            filterInactive === true ||
            filterThirtyDays === true ||
            filterSixtyDays === true) {

            var urlRequest = `http://localhost5000/api/Client/filterMutiple/${filterNew}/${filterGoogle}/${filterMicrosoft}/${filterFresh}/${filterClara}/${filterZoom}/${filterKaspersky}/${filter2brightSparks}/${filterActive}/${filterInactive}/${filterThirtyDays}/${filterSixtyDays}`;

            fetch(urlRequest, {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }

        else {
            // Fetch que faz a comunicação com a API através da URI
            fetch('http://localhost5000/api/Client', {
                method: 'GET',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(response => response.json())
                // Promise que atribui valor ao Use State (clients)
                .then(data => {
                    setClients(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsModalWarningVisible(true)
                    setModalTitle('Erro ao listar os clientes')
                    setWarning(`Houve um erro no sistema.`)
                    console.error(err)
                });
        }
    }


    // Função que gera uma lista com todos os contratos
    const GetContracts = () => {
        // Fetch que faz a comunicação com a API através da URI
        fetch('http://localhost5000/api/ClientContract', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                // Promise que atribui valor ao Use State (contracts)
                setContracts(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true)
                setModalTitle('Erro ao listar os clientes')
                setWarning(`Houve um erro no sistema.`)
                console.error(err)
            });
    }

    const filterClients = clients.filter((client: any) => props.filterName === '' ||
        props.filterName === undefined ||
        client.nameClient.toLowerCase().includes(props.filterName.toLowerCase()));

    const IdentifyActiveFilter = () => {

        let activeFilters: string[] = [];

        listStorage.map((item: any) => {
            if (item.value === 'true') {
                activeFilters.push(item.name)
            }
        });

        if (activeFilters.length !== 0) {
            activeFilters.map((item: any) => {
                return (
                    <p className='cardTableClientFilterWarning'>{activeFilters.length > 1 ? 'Filtros Ativos ' : 'Filtro Ativo '}
                    {item}</p>
                );
            });
        }

        // if (localStorage.getItem('newClient') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Novos Clientes Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientBest') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Clientes Clara Cloud Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientFreshworks') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Clientes Freshworks Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('renewal60') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Renovação em 60 dias Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientInactive') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Clientes Inativos Ativo</p>
        //     );
        // }
        // else if (localStorage.getItem('renewal30') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Renovação em 30 dias Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientActive') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro Clientes Ativos Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientMicrosoft') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Clientes Microsoft Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('clientGoogle') === "true") {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Clientes Google Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('skugoogle') !== "0" && localStorage.getItem('skugoogle') !== null) {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Serviços Google Ativo</p>
        //     );
        // }

        // else if (localStorage.getItem('skumicrosoft') !== "0" && localStorage.getItem('skumicrosoft') !== null) {
        //     return (
        //         <p className='cardTableClientFilterWarning'>Filtro de Serviços Microsoft Ativo</p>
        //     );
        // }
    }

    return (
        <div>
            <div className={"cardTableClientBody"}>
                {IdentifyActiveFilter()}
                <div className="cardTableClientTables">
                    <table className='cardTableClientCustomization'>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>CNPJ</th>
                                <th className='cardTableClientTableNumberContracts'>Contratos</th>
                                <th>Status</th>
                            </tr>
                            <hr />
                        </thead>

                        {
                            // Foreach que percorre toda a lista de cliente e retorna as informações em uma tabela
                            filterClients.map((client: any) => {
                                // Variáveis que receberão valores de acordo com a quantidade de contratos que um cliente possui

                                // Número total de contratos que o cliente possui
                                var contractedServices: number = 0;

                                // Foreach que percorre a lista de contratos
                                contracts.map((contract: any) => {
                                    // Verifica se algum contrato possui o mesmo idClient que o cliente atual do foreach
                                    if (contract.idClient === client.idClient) {
                                        contractedServices++;
                                    }
                                })
                                return (
                                    <tbody>
                                        <tr>
                                            <Link to={`/clientDetail/${client.idClient}`}>
                                                <td>{client.nameClient}</td>
                                                <td>{addMask(client.cnpjClient)}</td>
                                                <td className='cardTableClientTableNumberContracts'>{contractedServices}</td>
                                                <td>{client.activeClient === true ? 'Ativo' : 'Inativo'}</td>

                                            </Link>
                                        </tr>
                                        <hr />
                                    </tbody>
                                )
                            })
                        }
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

export default CardTableClient;