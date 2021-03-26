import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { parseJwt } from '../../../services/auth';

//importing css
import './style.css';
import '../../../assets/styles/global.css';

//importing images
import imgActive from '../../../assets/images/play-w.png';
import imgInactive from '../../../assets/images/stop-w.png';

//importing components
import CardListingService from '../../HiredService/cardListingService';
import ModalWarning from '../../Generic/modalWarning';
import StandardBtn from '../../Generic/button';
import Loading from '../../Generic/loading';

interface CardListingContractProps {
    idClient: any;
    idContract: number;
    idOpp: string;
    oppType: string;
    phase: boolean;
    startDate: any;
    contStatus: boolean;
    activeClient: boolean;
}

const CardListingContract: React.FC<CardListingContractProps> = ({ idClient, idContract, idOpp, oppType, phase, startDate, contStatus, activeClient, ...rest }) => {

    const [hiredServices, setHiredServices] = useState([]);

    //UseState que indica quando a página esta carregando (quando ele está true, chama o componente Loading)
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const history = useHistory();

    //função responsavel por adicionar a mascara nos compos date
    const DateMask = (item: any) => {
        return (new Date(item).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
    }

    useEffect(() => {
        ListHiredService();
    }, [hiredServices])

    const ListHiredService = () => {        
        fetch('http://localhost5000/api/HiredServiceProduct/contract/' + idContract, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setHiredServices(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao buscar as informações do contrato');
                console.error(err)
            });
    }

    const ChangeStatus = (id: number, active: boolean) => {
        if (active === true) {
            fetch('http://localhost5000/ClientContract/inactivate/' + id, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Contrato inativado com sucesso!')
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setIsReload(true)
                    setModalTitle('Houve um erro ao inativar contrato');
                    setIsLoading(false);
                    console.error(err.message);
                });
        }
        else {
            if (activeClient !== false) {
                fetch('http://localhost5000/ClientContract/activate/' + id, {
                    method: 'PUT',
                    headers: {
                        authorization: 'Bearer ' + localStorage.getItem('token-pic')
                    }
                })
                    .then(data => {
                        setIsModalWarningVisible(true);
                        setIsLoading(false);
                        if (data.status === 204) {
                            setModalTitle('Contrato ativado com sucesso!');
                        }
                        else if (data.status === 202) {
                            setModalTitle('Houve um erro ao ativar contrato!');
                            setWarning('As datas de renovação dos serviços contratados já expiraram.')
                        }
                        
                    })
                    .catch(err => {
                        setIsModalWarningVisible(true);
                        setIsReload(true)
                        setModalTitle('Houve um erro ao ativar contrato!');
                        setIsLoading(false);
                        console.error(err.message)
                    });
            }
            else {
                setIsLoading(false);
                setIsModalWarningVisible(true);
                setModalTitle('Não foi possível ativar o contrato');
                setWarning('O cliente está inativo. Ative o cliente para poder ativar este contrato');
            }
        }
    }

    const AdminPermissions = (idClient: any) => {
        if (parseJwt().Role == 'Administrator') {
            return (
                <div>
                    <div className="cardListingClient-editButtons">
                        <form className="permissionButton" onSubmit={e => {
                            e.preventDefault();
                            history.push(`/editContract/${idClient}/${idContract}`)
                        }}>
                            <StandardBtn value='Editar' typeBtn='hollowhite' />
                        </form>

                        <form className="permissionsButton" onSubmit={e => {
                            e.preventDefault();
                            ChangeStatus(idContract, contStatus);
                            setIsLoading(false);
                        }}>
                            <StandardBtn value={contStatus === false ? 'Ativar' : 'Inativar'} typeBtn='hollowhite' />
                        </form>
                    </div>
                </div>
            );
        }
    }

    const StatusContract = (status: boolean) => {
        if (status === true) {
            return (
                <div>
                    <div className="cardListingContract-statusContTrue">
                        <p>Contrato ativo</p>
                        <img src={imgActive} />
                    </div>
                </div>

            );
        }

        else {
            return (
                <div>
                    <div className="cardListingContract-statusContFalse">
                        <p>Contrato inativo</p>
                        <img src={imgInactive} />
                    </div>
                </div>
            );
        }
    }

    const VerifyHiredServices = () => {
        if (hiredServices.length !== 0) {
            return (
                hiredServices.map((item: any) => {
                    return (
                        <>
                            <Link to={`/serviceDetail/${idClient}/${item.idHsproduct}`}>
                                <CardListingService nameService={item.idSproductNavigation.nameSkuSproduct}
                                    nameSupplier={item.idSproductNavigation.idCategoryNavigation.nameCategory}
                                    sku={item.idSproductNavigation.skuSproduct}
                                    serviceDuration={item.contractDurationHsproduct}
                                    licenseQuantity={item.licenseAmountHsprodutc}
                                    supplierBilled={item.idSproductNavigation.supplierBillingSproduct}
                                    dateEnd={DateMask(item.renewalDateHsproduct)}
                                    serviceStatus={item.activeHsproduct} />
                            </Link>
                        </>
                    );
                }));
        }
        else {
            if (parseJwt().Role === 'Administrator') {
                return (
                    <div className="cardListingContractNoList">
                        <h1>Este contrato não possui nenhum serviço</h1>
                        <h2>Deseja cadastrar um serviço?</h2>
                        <Link to={`/registerNewHiredService/${idClient}/${idContract}`}>
                            <StandardBtn value='Cadastrar' typeBtn='hollowhite' />
                        </Link>
                    </div>
                );
            }
            else {
                return (
                    <div className="cardListingContractNoList">
                        <h1>Este contrato não possui nenhum serviço</h1>
                    </div>
                );
            }
        }
    }

    const RegisterNewHiredService = () => {
        if (parseJwt().Role === 'Administrator' && hiredServices.length !== 0) {
            return (
                <>
                    <div className='cardListingContractRegisterNew'>
                        <h1>
                            Cadastrar um Novo Serviço
                        </h1>
                        <Link to={`/registerNewHiredService/${idClient}/${idContract}`}>
                            <StandardBtn value='Cadastrar' typeBtn='hollowhite' />
                        </Link>
                    </div>
                </>
            )
        }
    }

    return (
        <>
            <div className='cardListingContract-style'>
                <div className="cardListingContractHeader">
                    <h1>Informações do contrato</h1>
                    {StatusContract(contStatus)}
                    {AdminPermissions(idClient)}
                </div>

                <div className="cardListingContractHeader-Info">
                    <p>Id da oportunidade: {idOpp}</p>
                    <p>Tipo de oportunidade: {oppType} </p>
                    <p>Fase do contrato: {phase === true ? 'Ganho' : 'Perdido'}</p>
                    <p>Data de início: {DateMask(startDate)}</p>
                </div>

                <hr />

                <h2>Serviços Contratados</h2>

                <div className="cardListingContract-cardService">
                    {/* Metodo que verifica se o contrato possui um serviço contratado
                        se ele possuir retorna o componente CardListingService
                        se não, ele retorna uma mensagem que indica que este contrato
                        não possui nenhum serviço contratado */}
                    {VerifyHiredServices()}

                    {/* Metodo que retorna um botao se usuário for admin. para que
                        ele possa cadastrar mais um contrato para aquele cliente */}
                    {RegisterNewHiredService()}
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
        </>
    );
}

export default CardListingContract;