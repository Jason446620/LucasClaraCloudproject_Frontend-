import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//Import Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';

//import style
import './style.css';
import '../../../assets/styles/global.css';

//import images
import stepsOne from '../../../assets/images/steps-one.png';

import ModalConfirm from '../../Generic/modalConfirm';

interface cardRegisterContractProps {
    nameClient: string;
}

const CardRegisterContract: React.FC<cardRegisterContractProps> = ({ nameClient }) => {

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

    const [idOpportunity, setIdOpportunity] = useState('');

    const [date, setDate] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [modalSecondURL, setModalSecondURL] = useState('');
    const [isReload, setIsReload] = useState(false);

    const RegisterContract = () => {
        const form = {
            idOpportunityCcontract: idOpportunity,
            startDateCcontract: date,
            phaseCcontract: currentState,
            opportunityTypeCcontract: opportunityType,
            idClient: params.id
        }
        console.log(form)

        localStorage.setItem('formContractData', JSON.stringify(form));

        setIsModalConfirmVisible(true);
        setModalTitle('Deseja prosseguir para a próxima etapa?');
        setModalURL(`/hiredService/${params.id}`);
    }

    return (
        <div>
            <form className="cardRegisterContractCorpo" onSubmit={event => {
                event.preventDefault();
                RegisterContract();
            }}>

                <div className='cardRegisterContractStep'>
                    <div className="stepOne2">
                        <img src={stepsOne} width='200px' height='50px' />
                    </div>
                </div>
                <div className="informations">
                    <div className="informationOne">
                        <p>Informações gerais</p>
                    </div>
                    <div className="informationTwo">
                        <p>Informações do serviço</p>
                    </div>
                </div>

                <h3>{nameClient}</h3>
                <h2>Cadastrar Contrato</h2>
                {console.log(isModalConfirmVisible)}

                <div className="cardRegisterContractInput">

                    <div className='cardRegisterContractInputSeparatorLeft'>
                        <div className='cardRegisterContractInputUnique1'>
                            <label htmlFor="" className='standardLabel'>Código da oportunidade:</label>
                            <StandardInput type='number' MinLengh='5' MaxLengh='80' namePlaceholder='Código da oportunidade' onChange={e => setIdOpportunity(e.target.value)} value={idOpportunity} required />
                        </div>

                        <div className='cardRegisterContractInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Data de início:</label>
                            <StandardInput type='date' MinLengh='0' MaxLengh='80' namePlaceholder='Data de início: ' onChange={e => setDate(e.target.value)} value={date} required />
                        </div>

                    </div>

                    <div className="cardRegisterContractInputSeparatorRight">
                    <label htmlFor="" className='standardLabel'>Fase atual:</label>
                        <div className='cardRegisterContractInputSeparator'>
                            <select className='StandardSelect' onChange={e => setCurrentState(e.target.value)} value={currentState} required>
                                <option selected value="0" disabled>Fase atual:</option>
                                {listCurrentState.map((item: any) => {
                                    return <option value={item.state}>{item.name}</option>
                                }
                                )}
                            </select>
                        </div>
                        
                        <label htmlFor="" className='standardLabel'>Tipo de oportunidade:</label>
                        <div className='cardRegisterContractInputTypeContract'>
                            <select className='StandardSelect' onChange={e => setOpportunityType(e.target.value)} value={opportunityType} required>
                                <option selected value="0" disabled>Tipo de oportunidade:</option>
                                {listOpportunityType.map((item: any) => {
                                    return <option value={item.name}>{item.name}</option>
                                }
                                )}
                            </select>
                            {/* <p>Contrato+</p> */}
                        </div>

                    </div>

                </div>

                <div className="cardRegisterContractButton">
                    <div className="cardRegisterContractButtonSeparator">
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
                isModalConfirmVisible &&
                <ModalConfirm title={modalTitle}
                    description={warning}
                    id='modal'
                    onClose={() => setIsModalConfirmVisible(false)}
                    url={modalURL}
                    urlTwo={modalSecondURL}
                    isReload={isReload}
                    isRemain={true} />
            }
        </div>
    );
}

export default CardRegisterContract;