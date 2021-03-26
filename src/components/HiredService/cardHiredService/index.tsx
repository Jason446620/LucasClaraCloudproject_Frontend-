import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//import libary
import NumberFormat from 'react-number-format';


//Import Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';

//import style
import './style.css';
import '../../../assets/styles/global.css';

//importing utils
import { AddMaskMoney, FormaterMoney } from '../../../utils/stringFormater';

//import images
import stepsTwo from '../../../assets/images/steps-two.png';
import ModalConfirm from '../../Generic/modalConfirm';


interface cardRegisterContractProps {
    nameClient: string;
}

const CardRegisterContract: React.FC<cardRegisterContractProps> = ({ nameClient }) => {

    let params: any = useParams();

    const history = useHistory();

    const [idContract, setIdContract] = useState(0);

    const [isSecondRegister, setIsSecondRegister] = useState(false);

    const [idSku, setIdSku] = useState('0');
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

    const [contractDuration, setContractDuration] = useState('');
    const [licenseAmount, setLicenseAmount] = useState('');
    const [price, setPrice] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [modalSecondURL, setModalSecondURL] = useState('');
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
            .catch(err => console.error(err));
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

    const RegisterContractAndHiredService = () => {

        fetch('http://localhost5000/api/ClientContract', {
            method: 'POST',
            body: localStorage.getItem('formContractData'),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(dataIdContract => {

                setIdContract(dataIdContract);

                const form = {
                    idSproduct: idSku,
                    contractDurationHsproduct: contractDuration,
                    licenseAmountHsprodutc: licenseAmount,
                    currencyHsprodutc: currency,
                    priceHsproduct: FormaterMoney(price),
                    paymentTypeHsproduct: paymentType,
                    idCcontract: dataIdContract,
                    activeHsproduct: true
                }

                console.log(form)

                fetch('http://localhost5000/api/HiredServiceProduct', {
                    method: 'POST',
                    body: JSON.stringify(form),
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: 'Bearer ' + localStorage.getItem('token-pic')
                    }
                })
                    .then(() => {
                        // alert('Contrato cadastrado com sucesso!');
                        setIsModalWarningVisible(true);
                        setIsReload(true);
                        setModalSecondURL(`/clientDetail/${params.id}`);
                        setModalTitle('Deseja cadastrar mais um serviço para este contrato?')

                        localStorage.removeItem('formContractData')
                        setIsSecondRegister(true);
                        setIdContract(dataIdContract);
                        setContractDuration('');
                        setCurrency('0');
                        setIdSku('0');
                        setLicenseAmount('');
                        setPaymentType('0');
                        setPrice('');
                    })
                    .catch(err => console.error(err));

            })
            .catch(err => console.error(err));
    }

    const RegisterNewHiredService = () => {
        const form = {
            idSproduct: idSku,
            contractDurationHsproduct: contractDuration,
            licenseAmountHsprodutc: licenseAmount,
            currencyHsprodutc: currency,
            priceHsproduct: FormaterMoney(price),
            paymentTypeHsproduct: paymentType,
            idCcontract: idContract,
            activeHsproduct: true
        }

        console.log(form)

        fetch('http://localhost5000/api/HiredServiceProduct', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setIsModalWarningVisible(true);
                setModalSecondURL(`/clientDetail/${params.id}`);
                setModalTitle('Deseja cadastrar mais um serviço para este contrato?')

                localStorage.removeItem('formContractData')
                setIsSecondRegister(true);
                setContractDuration('');
                setCurrency('0');
                setIdSku('0');
                setLicenseAmount('');
                setPaymentType('0');
                setPrice('');
            })
            .catch(err => console.error(err));
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
            <form className="cardHiredServiceCorpo" onSubmit={event => {
                event.preventDefault();
                if (isSecondRegister === false) {
                    RegisterContractAndHiredService();
                }
                else {
                    RegisterNewHiredService();
                }
            }}>

                <div className='cardHiredServiceStep'>
                    <div className="stepOne1">
                        <img src={stepsTwo} width='200px' height='50px' />
                    </div>
                </div>
                <div className="HiredServiceInformations">
                    <div className="HiredServiceInformationOne">
                        <p>Informações gerais</p>
                    </div>
                    <div className="HiredServiceInformationTwo">
                        <p>Informações do serviço</p>
                    </div>
                </div>

                <h3>{nameClient}</h3>
                <h2>Cadastre um Serviço</h2>

                <div className="cardHiredServiceInput">

                    <div className='cardHiredServiceInputSeparatorLeft'>
                        <label htmlFor="" className='standardLabel'>Selecione o sku do serviço:</label>
                        <div className='cardHiredServiceInputSeparator'>
                            <select className='StandardSelect' onChange={e => setIdSku(e.target.value)} value={idSku} required>
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


                        <div className='cardHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Quantidade de licenças:</label>
                            <StandardInput type='number' MinLengh='1' MaxLengh='50' namePlaceholder='Quantidade de licenças' onChange={e => setLicenseAmount(e.target.value)} value={licenseAmount} required />
                        </div>

                        <label htmlFor="" className='standardLabel'>Moeda:</label>
                        <div className='cardHiredServiceInputSeparator'>
                            <select className='StandardSelect' onChange={e => setCurrency(e.target.value)} value={currency}>
                                <option selected value="0" disabled>Moeda:</option>
                                {currencyList.map((item: any) => {
                                    return <option value={item.option}>{item.option}</option>
                                }
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="cardHiredServiceInputSeparatorRight">
                        <label htmlFor="" className='standardLabel'>Tipo de pagamento:</label>
                        <div className='cardHiredServiceInputSeparator'>
                            <select className='StandardSelect' onChange={e => setPaymentType(e.target.value)} value={paymentType} required>
                                <option selected value="0" disabled>Tipo de pagamento:</option>
                                {listPaymentType.map((item: any) => {
                                    return <option value={item.state}>{item.name}</option>
                                }
                                )}
                            </select>
                        </div>
                        <div className='cardHiredServiceInputSeparator'>
                            <label htmlFor="" className='standardLabel'>Duração do contrato:</label>
                            <StandardInput type='text' MinLengh='1' MaxLengh='5' namePlaceholder='Duração do contrato (Meses)' onChange={e => setContractDuration(e.target.value)} value={contractDuration} required />
                        </div>

                        <div className='cardHiredServiceInputSeparator'>
                            {VerifyCurrency(currency)}
                        </div>
                    </div>
                </div>

                <div className="cardHiredServiceButton">
                    <div className="cardHiredServiceButtonSeparator">
                        <StandardBtn value='Enviar' typeBtn='filledButton' />
                    </div>
                    <form onClick={event => {
                        event.preventDefault();
                        history.push(`/registerContract/${params.id}`)
                    }}>
                        <StandardBtn value='Voltar' typeBtn='hollowButton' />
                    </form>
                </div>
            </form>
            {
                isModalWarningVisible &&
                <ModalConfirm title={modalTitle}
                    description={warning}
                    id='modal'
                    onClose={() => setIsModalWarningVisible(false)}
                    url={modalURL}
                    urlTwo={modalSecondURL}
                    isReload={isReload}
                    isRegisterSecondTime={true} />
            }
        </div>
    );
}
export default CardRegisterContract;