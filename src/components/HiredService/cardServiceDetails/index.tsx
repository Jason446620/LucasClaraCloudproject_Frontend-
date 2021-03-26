import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

//import components
import StandardBtn from '../../Generic/button';
import ModalWarning from '../../Generic/modalWarning';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//importing images
import imgActive from '../../../assets/images/play-w.png';
import imgInactive from '../../../assets/images/stop-w.png';
import { parseJwt } from '../../../services/auth';
import { duration } from '@material-ui/core';
import { AddMaskMoney } from '../../../utils/stringFormater';
import { parse } from 'url';


export default function CardServiceDetails() {

    let params: any = useParams();

    //informações de serviço contratado e contrato
    const [activeStatus, setActiveStatus] = useState(false);
    const [idHsproduct, setIdHsproduct] = useState(0);
    const [nameSku, setNameSku] = useState('');
    const [startDate, setStartDate] = useState('');
    const [paymentType, setPaymentType] = useState('');
    const [supplierBilling, setSupplierBilling] = useState(false);
    const [sku, setSku] = useState('');
    const [contractDuration, setContractDuration] = useState(0);
    const [currency, setCurrency] = useState('');
    const [licenseAmount, setLicenseAmount] = useState(0);
    const [renewalDate, setRenewalDate] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [price, setPrice] = useState(0);

    //Status de serviço
    const [activeService, setActiveService] = useState(false);

    //Status de contrato
    const [activeContract, setActiveContract] = useState(false);

    //Status de cliente
    const [activeClient, setActiveClient] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        ListHiredServiceById();
    }, [activeStatus])

    const ChangeStatus = (id: number, active: boolean) => {
        if (active === true) {
            fetch('http://localhost5000/api/HiredServiceProduct/inactivate/' + id, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Serviço contratado inativado com sucesso')
                    setActiveStatus(false)
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setIsReload(true)
                    setModalTitle('Houve um erro ao inativar serviço');
                    console.error(err)
                });

        }
        else {
            if (activeService !== false) {
                if (activeContract !== false) {
                    if (activeClient !== false) {
                        fetch('http://localhost:5000/api/HiredServiceProduct/activate/' + id, {
                            method: 'PUT',
                            headers: {
                                authorization: 'Bearer ' + localStorage.getItem('token-pic')
                            }
                        })
                            .then(data => {
                                setIsModalWarningVisible(true);
                                
                                if (data.status === 204) {
                                    setActiveStatus(true);
                                    setModalTitle('Serviço contratado ativado com sucesso!');
                                }
                                else if (data.status === 202) {
                                    setModalTitle('Não é possível alterar o status do serviço contratado!');
                                    setWarning('A data de renovação já expirou.');
                                    setActiveStatus(false);
                                }
                            })
                            .catch(err => {
                                setIsModalWarningVisible(true);
                                setIsReload(true);
                                setModalTitle('Houve um erro ao ativar serviço contratado!');
                                console.error(err);
                            });
                    }
                    else {
                        setIsModalWarningVisible(true);
                        setModalTitle('Não é possível alterar o status do serviço contratado')
                        setWarning('O cliente está inativo. Ative o cliente novamente para poder ativar este serviço contratado')
                    }
                }
                else {
                    setIsModalWarningVisible(true);
                    setModalTitle('Não é possível alterar o status do serviço contratado')
                    setWarning('O contrato está inativo. Ative o contrato novamente para poder ativar este serviço contratado')
                }
            }
            else {
                setIsModalWarningVisible(true);
                setModalTitle('Não é possível alterar o status do serviço contratado')
                setWarning('O sku está inativo. Ative o sku novamente para poder ativar este serviço contratado')
            }
        }
    }

    const ListHiredServiceById = () => {
        fetch('http://localhost5000/api/HiredServiceProduct/' + params.idh, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setIdHsproduct(data.idHsproduct)
                setActiveStatus(data.activeHsproduct);
                setNameSku(data.idSproductNavigation.nameSkuSproduct);
                FormaterStartDate(data.idCcontractNavigation.startDateCcontract);
                setPaymentType(data.paymentTypeHsproduct);
                setSupplierBilling(data.idSproductNavigation.supplierBillingSproduct);
                setSku(data.idSproductNavigation.skuSproduct);
                setContractDuration(data.contractDurationHsproduct);
                setCurrency(data.currencyHsprodutc);
                setLicenseAmount(data.licenseAmountHsprodutc);
                FormaterRenewalDate(data.renewalDateHsproduct);
                setPrice(data.priceHsproduct);
                setNameCategory(data.idSproductNavigation.idCategoryNavigation.nameCategory);

                setActiveService(data.idSproductNavigation.activeSproduct);
                setActiveContract(data.idCcontractNavigation.activeCcontract);
                setActiveClient(data.idCcontractNavigation.idClientNavigation.activeClient)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do serviço contratado');
                console.error(err)
            });
    }

    const StatusContract = (status: boolean) => {
        if (status === true) {
            return (
                <div>
                    <div className="cardServiceDetail-statusContTrue">
                        <p>Contrato Ativo</p>
                        <img src={imgActive} />
                    </div>
                </div>

            );
        }

        else {
            return (
                <div>
                    <div className="cardServiceDetail-statusContFalse">
                        <p>Contrato Inativo</p>
                        <img src={imgInactive} />
                    </div>
                </div>
            );
        }
    }

    const AdminPermissions = () => {
        if (parseJwt().Role == 'Administrator') {
            return (
                <div>
                    <div className="cardServiceDetail-editButtons">
                        <div className="permissionButton">
                            <Link to={`/editHiredService/${params.id}/${params.idh}`}>
                                <StandardBtn value='Editar' typeBtn='hollowhite' />
                            </Link>
                        </div>

                        <form className="permissionsButton" onSubmit={e => {
                            e.preventDefault();
                            ChangeStatus(idHsproduct, activeStatus);
                        }}>
                            <StandardBtn value={activeStatus === false ? 'Ativar' : 'Inativar'} typeBtn='hollowhite' />
                        </form>
                    </div>
                </div>
            );
        }
    }

    const FormaterRenewalDate = (item: any) => {
        setRenewalDate(new Date(item).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
    }

    const FormaterStartDate = (item: any) => {
        setStartDate(new Date(item).toLocaleDateString('pt-BR', { timeZone: 'UTC' }));
    }

    const CalculateTotalValue = (unitaryValue: any, paymentType: any, duration: number, licenseAmount: number ) => {
        var totalValue: number;

        parseFloat(unitaryValue);

        if (paymentType === 'Parcelado' || paymentType === 'Mensal') {
            totalValue = unitaryValue * licenseAmount * duration
        }
        else {
            totalValue = unitaryValue * licenseAmount
        }

        return(
            <p>Valor Total: {AddMaskMoney(totalValue.toString())}</p>
        );
    }

    return (
        <div>
            <div className='cardServiceDetailsCorpoExternal'>
                <div className="cardServiceDetailsCorpoInternal">
                    <div className="cardServiceDetailInformations">
                        <div className='title'>
                            <h1>Informações do Serviço</h1>
                        </div>

                        {StatusContract(activeStatus)}

                        {AdminPermissions()}

                        <Link to={`/clientDetail/${params.id}`} >
                            <StandardBtn value='Voltar' typeBtn='hollowhite' />
                        </Link>
                    </div>

                    <div className="cardServiceDetailsTables">

                        <h2 className="cardServiceDetailsTable-nameService">{nameSku}</h2>

                        <div className="cardServiceDetailTableAll">

                            <div className="cardServiceDetailsTableLeft">
                                <p>SKU: {sku}</p>

                                <p>Data de início: {startDate}</p>

                                <p>Tipo de pagamento: {paymentType}</p>

                                <p>Quantidade de licenças: {licenseAmount}</p>
                            </div>

                            <div className="cardServiceDetailsTableCenter">
                                <p>Fornecedor: {nameCategory}</p>

                                <p>Duração: {contractDuration}</p>

                                <p>Moeda: {currency}</p>

                                {CalculateTotalValue(price, paymentType, contractDuration, licenseAmount)}
                            </div>

                            <div className="cardServiceDetailsTableRight">
                                <p>Faturamento pelo fornecedor: {supplierBilling === false ? 'Não' : 'Sim'}</p>

                                <p>Data de renovação: {renewalDate}</p>

                                <p>Valor unitário: {AddMaskMoney(price.toString())}</p>
                            </div>
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

        </div>
    );
}