import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import NumberFormat from 'react-number-format';

//Import Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';

//import style
import './style.css';
import '../../../assets/styles/global.css';
import { FormaterMoney } from '../../../utils/stringFormater';

function CardRegisterContract() {

    let params: any = useParams();

    const history = useHistory();

    const [idSku, setIdSku] = useState('0')
    const [skus, setSkus] = useState([]);

    const [paymentType, setPaymentType] = useState('0');
    const listPaymentType = [
        { type: 'Parcelado', name: 'Parcelado' },
        { type: 'Á vista', name: 'Á Vista' },
        { type: 'mensal', name: 'Mensal' },
    ];

    const [currency, setCurrency] = useState('0');
    const currencyList = [
        { option: 'BRL', name: 'BRL' },
        { option: 'USD', name: 'USD' },
    ];
    const [supplierBilling, setSupplierBilling] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [contractDuration, setContractDuration] = useState('');
    const [licenseAmount, setLicenseAmount] = useState('');
    const [renewalDate, setRenewalDate] = useState('');
    const [nameCategory, setNameCategory] = useState('');
    const [price, setPrice] = useState('');

    const [idContract, setIdContract] = useState('');

    //UseState que indica quando a página esta carregando (quando ele está true, chama o componente Loading)
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    const [skuGoogle, setSkuGoogle] = useState('0')
    const [skusGoogle, setSkusGoogle] = useState([]);

    const [skuMicrosft, setSkuMicrosoft] = useState('0')
    const [skusMicrosoft, setSkusMicrosoft] = useState([]);

    const [skuFreshworks, setSkuFreshworks] = useState('0')
    const [skusFreshworks, setSkusFreshworks] = useState([]);

    const [skuClaraCloud, setSkuClaraCloud] = useState('0')
    const [skusClaraCloud, setSkusClaraCloud] = useState([]);

    const [skuZoom, setSkuZoom] = useState('0')
    const [skusZoom, setSkusZoom] = useState([]);

    const [skuKaspersky, setSkuKaspersky] = useState('0')
    const [skusKaspersky, setSkusKaspersky] = useState([]);

    const [sku2brightSparks, setSku2brightSparks] = useState('0')
    const [skus2brightSparks, setSkus2brightSparks] = useState([]);

    useEffect(() => {
        ListSkus();
        ListHiredServiceById();
        ListSkusGoogle();
        ListSkusMicrosoft();
        ListSkusClaraCloud();
        ListSkusFreshworks();
        ListSkus2brightSparks();
        ListSkusKaspersky();
        ListSkusZoom();
    }, [])

    const ListSkus = () => {
        fetch('http://localhost5000/api/ServiceProduct', {
            method: 'GET',
            headers: {

                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkus(data);
                console.log(data)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do serviço/produto');
                console.error(err)
            });
    }

    const ListSkusGoogle = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 1, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusGoogle(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Google');
                console.error(err)
            });
    }

    const ListSkusMicrosoft = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 2, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusMicrosoft(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Microsoft');
                console.error(err)
            });
    }

    const ListSkusFreshworks = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 3, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusFreshworks(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Freshworks');
                console.error(err)
            });
    }

    const ListSkusClaraCloud = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 4, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusClaraCloud(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Clara Cloud');
                console.error(err)
            });
    }

    const ListSkusZoom = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 5, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusZoom(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Zoom');
                console.error(err)
            });
    }

    const ListSkusKaspersky = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 6, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkusKaspersky(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços Kaspersky');
                console.error(err)
            });
    }

    const ListSkus2brightSparks = () => {
        fetch('http://localhost5000/api/ServiceProduct/Category/' + 7, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setSkus2brightSparks(data);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter as informações dos serviços 2brightSparks');
                console.error(err)
            });
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
                setIdSku(data.idSproduct);
                setStartDate(data.idCcontractNavigation.StartDateCcontract);
                setPaymentType(data.paymentTypeHsproduct);
                setSupplierBilling(data.idSproductNavigation.supplierBillingSproduct);
                setContractDuration(data.contractDurationHsproduct);
                setCurrency(data.currencyHsprodutc);
                setLicenseAmount(data.licenseAmountHsprodutc);
                VerifyDate(data.renewalDateHsproduct);
                setPrice(data.priceHsproduct);
                setNameCategory(data.idSproductNavigation.idCategoryNavigation.nameCategory);
                setIdContract(data.idCcontract)
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do serviço contratado');
                console.error(err)
            });
    }

    const UpdateHiredService = () => {
        const form = {
            idSproduct: idSku,
            contractDurationHsproduct: contractDuration,
            licenseAmountHsprodutc: licenseAmount,
            renewalDateHsproduct: renewalDate,
            currencyHsprodutc: currency,
            priceHsproduct: FormaterMoney(price),
            paymentTypeHsproduct: paymentType,
            idCcontract: idContract
        }
        console.log(form)

        fetch('http://localhost5000/api/HiredServiceProduct/' + params.idh, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalURL(`/serviceDetail/${params.id}/${params.idh}`);
                setModalTitle('Serviço contratado atualizado com sucesso!');
                setIsLoading(false);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao atualizar o serviço contratado');
                console.error(err)
                setIsLoading(false);
            });
    }

    const VerifyDate = (item: any) => {
        setRenewalDate((item).replace('T00:00:00', ''));
    }

    function CurrencyFormatterBRL(value: any) {
        if (!Number(value)) return "";

        const amount = new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL"
        }).format(value / 100);

        return `${amount}`;
    }

    function CurrencyFormatterUSD(value: any) {
        if (!Number(value)) return "";

        const amount = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(value / 100);

        return `${amount}`;
    }

    const VerifyCurrency = (currencyType: any) => {
        if (currencyType === 'BRL') {
            return (
                <>
                    <label htmlFor="" className='standardLabel'>Valor unitário:</label>
                    <NumberFormat className='cardEditHiredServiceInputSeparator-numberFormat' placeholder='Valor unitário' format={CurrencyFormatterBRL} onChange={e => setPrice(e.target.value)} value={price} />
                </>
            );
        }
        else {
            return (
                <>
                    <label htmlFor="" className='standardLabel'>Valor unitário:</label>
                    <NumberFormat className='cardEditHiredServiceInputSeparator-numberFormat' placeholder='Valor unitário' format={CurrencyFormatterUSD} onChange={e => setPrice(e.target.value)} value={price} />
                </>
            );
        }
    }

    return (
        <div>
            <form className="cardEditHiredServiceCorpo" onSubmit={event => {
                event.preventDefault();
                UpdateHiredService();
                setIsLoading(true);
            }}>

                <h2>Atualizar Serviço Contratado</h2>

                <div className="cardEditHiredServiceInput">

                    <div className='cardEditHiredServiceSeparatorLeft'>
                        <div className='cardEditHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Selecione o sku do Serviço:</label>
                            <select className='StandardSelect' onChange={e => setIdSku(e.target.value)} value={idSku}>
                                <optgroup label='Google'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusGoogle.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='Microsoft'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusMicrosoft.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='Freshworks'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusFreshworks.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='Clara Cloud'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusClaraCloud.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='Zoom'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusZoom.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='Kaspersky'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skusKaspersky.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>

                                <optgroup label='2brightSparks'>
                                    <option selected disabled value="0">Selecione o sku do serviço:</option>
                                    {
                                        skus2brightSparks.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </optgroup>
                            </select>
                        </div>

                        <div className='cardEditHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Moeda:</label>

                            <select className='StandardSelect' onChange={e => setCurrency(e.target.value)} value={currency}>
                                <option selected value="0" disabled>Moeda:</option>
                                {currencyList.map((item: any) => {
                                    return <option value={item.option}>{item.option}</option>
                                }
                                )}
                            </select>
                        </div>

                        <div className='cardEditHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Quantidade de licenças:</label>
                            <StandardInput type='number' MinLengh='1' MaxLengh='50' namePlaceholder='Quantidade de licenças' onChange={e => setLicenseAmount(e.target.value)} value={licenseAmount} />
                        </div>
                    </div>



                    <div className="cardEditHiredServiceInputSeparatorRight">
                        <div className='cardEditHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Tipo de pagamento:</label>
                            <select className='StandardSelect' onChange={e => setPaymentType(e.target.value)} value={paymentType}>
                                <option selected value="0" disabled>Tipo de pagamento:</option>
                                {listPaymentType.map((item: any) => {
                                    return <option value={item.state}>{item.name}</option>
                                }
                                )}
                            </select>
                        </div>
                        <div className='cardEditHiredServiceInputUnique'>
                            <label htmlFor="" className='standardLabel'>Duração do contrato:</label>
                            <StandardInput type='text' MinLengh='1' MaxLengh='5' namePlaceholder='Duração do contrato (Meses)' onChange={e => setContractDuration(e.target.value)} value={contractDuration} />
                        </div>
                        <div className='cardEditHiredServiceInputSeparator'>
                            {VerifyCurrency(currency)}
                            {/* <StandardInput type='text' MinLengh='2' MaxLengh='70' namePlaceholder='Valor Unitário' onChange={e => setPrice(e.target.value)} value={price} /> */}
                        </div>
                    </div>
                </div>

                <div className="cardEditHiredServiceButton">
                    <div className="cardEditHiredServiceButtonSeparator">
                        <StandardBtn value='Enviar' typeBtn='filledButton' />
                    </div>
                    <form onClick={event => {
                        event.preventDefault();
                        history.push(`/serviceDetail/${params.id}/${params.idh}`)
                    }}>
                        <StandardBtn value='Voltar' typeBtn='hollowButton' />
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
export default CardRegisterContract;