import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

//import styles
import './style.css';
import '../../assets/styles/global.css';

//import components
import SideMenu from '../../components/Generic/sideMenu';
import CardListingClient from '../../components/Client/cardListingClient';
import CardListingContract from '../../components/Contract/cardListingContract';
import ResponsiveBtn from '../../components/Generic/responsiveButton';
import { parseJwt } from '../../services/auth';
import StandardBtn from '../../components/Generic/button';
import ModalWarning from '../../components/Generic/modalWarning';
import ArrowUp from '../../components/Generic/arrowUp';
import Loading from '../../components/Generic/loading';

export default function ClientDetail() {

    const [contracts, setContracts] = useState([]);
    const [startDateCcontract, setStartDateCcontract] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [nameClient, setNameClient] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [status, setStatus] = useState(false);
    const [idClient, setIdClient] = useState(0);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    // Variáveis que receberão valores de acordo com a quantidade de contratos que um cliente possui
    // Número total de contratos que o cliente possui
    var contractedServices: number = 0;
    // Número de contratos ativos 
    var numberActiveContracts: number = 0;
    // Número de contratos inativos 
    var numberInactiveContracts: number = 0;

    let params: any = useParams();

    useEffect(() => {
        ListContractByClient();
        ListClientById();
    }, [contracts])

    const ListClientById = () => {


        fetch('http://localhost5000/api/Client/' + params.id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setNameClient(data.nameClient);
                setIdClient(data.idClient);
                setCnpj(data.cnpjClient);
                setStatus(data.activeClient);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informções do cliente');

                console.error(err)
            });
    }

    const ListContractByClient = () => {


        fetch('http://localhost5000/api/ClientContract/byClient/' + params.id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
            
        })
            .then(response => response.json())
            .then(data => {
                setContracts(data);
                console.log(data)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setModalTitle('Houve um erro ao tentar obter as informções do contrato');

                console.error(err)
            });
    }

    const VerifyContract = () => {
        if (contracts.length !== 0) {
            return (
                contracts.map((item: any) => {
                    return (
                        <CardListingContract idClient={idClient} idContract={item.idCcontract} idOpp={item.idOpportunityCcontract}
                            oppType={item.opportunityTypeCcontract} phase={item.phaseCcontract}
                            startDate={item.startDateCcontract} contStatus={item.activeCcontract} activeClient={status} />
                    );
                })
            )
        }

        else {
            if (parseJwt().Role === 'Administrator') {

                return (
                    <>
                        <div className="clientDetailNoList">
                            <h1>{nameClient} não possui nenhum contrato</h1>
                            <h2>Deseja cadastrar um contrato?</h2>
                            <Link to={`/registerContract/${idClient}`}>
                                <StandardBtn value='Cadastrar' typeBtn='filledButton' />
                            </Link>
                        </div>
                    </>
                );
            }
            else {
                return (
                    <>
                        <div className="clientDetailNoList">
                            <h1>{nameClient} não possui nenhum contrato</h1>
                        </div>
                    </>
                );
            }
        }
    }

    const RegisterNewContract = () => {
        if (parseJwt().Role === 'Administrator' && contracts.length !== 0) {
            return (
                <>
                    <Link to={`/registerContract/${params.id}`}>
                        <ResponsiveBtn value='Cadastrar contrato' typeBtn='filledResponsiveButton' />
                    </Link>
                </>
            )
        }
    }

    // const FormaterStartDate = (item: any) =>{
    //     setStartDateCcontract(new Date(item).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
    // }

    contracts.map((contract: any) => {
        // Verifica se algum contrato possui o mesmo idClient que o cliente atual do foreach
        contractedServices++;

        if (contract.activeCcontract === true) {
            numberActiveContracts++;
        }

        if (contract.activeCcontract === false) {
            numberInactiveContracts++;
        }

    })

    return (
        <div>
            <SideMenu />
            <div className="clientDetailBody">
                <ArrowUp/>
                <div className="clientDetailInternalBody">
                    <div className="clientDetailContracts">
                        <div className="listingClientAllInformations">
                            <CardListingClient nameClient={nameClient} idClient={idClient} cnpjClient={cnpj} activeClient={status} numContracts={contractedServices} numActive={numberActiveContracts} numInactive={numberInactiveContracts} />
                            <div className="ListingClientButton">
                                {RegisterNewContract()}
                            </div>
                            <Link to='/viewClient' className="ListingClientButton">
                                <ResponsiveBtn value='Voltar' typeBtn='filledResponsiveButton' />
                            </Link>
                        </div>

                        <div className="listingClientMidleCard">
                            {VerifyContract()}
                        </div>
                    </div>
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
    )
}