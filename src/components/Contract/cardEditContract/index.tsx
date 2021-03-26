import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Import Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';

//import style
import './style.css';
import '../../../assets/styles/global.css';
import { truncateSync } from 'fs';

export default function CardEditContract() {

    let params: any = useParams();

    const history = useHistory();

    const [currentState, setCurrentState] = useState('0');
    const listCurrentState = [
        { state: true, name: 'Ganha' },
        { state: false, name: 'Perdida' }
    ]

    const [opportunityType, setOpportunityType] = useState('0');
    const listOpportunityType = [
        { name: 'Renovação' },
        { name: 'Nova' },
        { name: 'Venda Cruzada' },
        { name: 'Venda Adicional' },
        { name: 'Upgrade' },
    ];

    const [nameClient, setNameClient] = useState('');

    const [idOpportunity, setIdOpportunity] = useState('');
    const [date, setDate] = useState('');

    //UseState que indica quando a página esta carregando (quando ele está true, chama o componente Loading)
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        ListContractByClient();
        ListClientById();
    }, [])


    const UpdateContract = () => {
        const form = {
            idOpportunityCcontract: idOpportunity,
            startDateCcontract: date,
            phaseCcontract: currentState,
            opportunityTypeCcontract: opportunityType,
        }
        console.log(form)

        fetch('http://localhost5000/api/ClientContract/' + params.idcc, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalTitle('Contrato atualizado com sucesso!');
                setModalURL(`/clientDetail/${params.id}`)
                setIsLoading(false);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o contrato');
                console.error(err)
                setIsLoading(false);
            });
    }

    const VerifyDate = (item: any) => {
        setDate((item).replace('T00:00:00', ''));
    }

    const ListContractByClient = () => {
        fetch('http://localhost5000/api/ClientContract/' + params.idcc, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setIdOpportunity(data.idOpportunityCcontract);
                VerifyDate(data.startDateCcontract);
                setCurrentState(data.phaseCcontract);
                setOpportunityType(data.opportunityTypeCcontract);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do contrato');
                console.error(err)
            });
    }

    const ListClientById = () => {
        fetch('http://localhost5000/api/Client/' + params.id , {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setNameClient(data.nameClient);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do cliente');
                console.error(err)
            });
    }


    return (
        <div>
            <form className="CardEditContractCorpo" onSubmit={event => {
                event.preventDefault();
                UpdateContract();
                setIsLoading(true);
            }}>

                <h3>Contrato de {nameClient}</h3>
                <h2>Atualizar Contrato</h2>

                <div className="CardEditContractInput" >

                    <div className='CardEditContractInputSeparatorLeft'>
                        <div className='CardEditContractInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Código da oportunidade:</label>
                            <StandardInput type='number' MinLengh='5' MaxLengh='80' namePlaceholder='Código da oportunidade' value={idOpportunity} onChange={e => setIdOpportunity(e.target.value)} />
                        </div>

                        <div className='CardEditContractInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Data de início:</label>
                            <StandardInput type='date' MinLengh='8' MaxLengh='10' namePlaceholder='Data de início: ' onChange={e => setDate(e.target.value)} value={date} />
                        </div>
                    </div>

                    <div className="CardEditContractInputSeparatorRight">

                        <label htmlFor="" className='standardLabel'>Fase atual:</label>
                        <div className='CardEditContractInputSeparator'>
                            <select className='StandardSelect' onChange={e => setCurrentState(e.target.value)} value={currentState}>
                                <option selected value="0" disabled>Fase atual:</option>
                                {listCurrentState.map((item: any) => {
                                    return <option value={item.state}>{item.name}</option>
                                }
                                )}
                            </select>
                        </div>

                        <label htmlFor="" className='standardLabel'>Tipo de oportunidade:</label>
                        <div className='CardEditContractInputSeparator'>
                            <select className='StandardSelect' onChange={e => setOpportunityType(e.target.value)} value={opportunityType}>
                                <option selected value="0" disabled>Tipo de oportunidade</option>
                                {listOpportunityType.map((item: any) => {
                                    return <option value={item.name}>{item.name}</option>
                                }
                                )}
                            </select>
                        </div>
                    </div>

                </div>

                <div className="CardEditContractButton">
                    <div className="CardEditContractButtonSeparator">
                        <StandardBtn value='Enviar' typeBtn='filledButton' />
                    </div>
                    <form onClick={event => {
                        event.preventDefault();
                        history.push(`/clientDetail/${params.id}`)
                    }}>
                        <StandardBtn value='Cancelar' typeBtn='hollowButton' />
                    </form>
                </div>
            </form>
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