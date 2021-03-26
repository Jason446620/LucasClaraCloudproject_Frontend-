import React, { useState, useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { useParams } from 'react-router-dom';

//import styles
import './style.css';
import '../../assets/styles/global.css';

//import images
import Plus from '../../assets/images/plusBranco.png';

//import components
import CardTableClient from '../../components/Client/cardTableClient';
import SideMenu from '../../components/Generic/sideMenu';
import InputSearch from '../../components/Generic/inputSearch';
import StandardBtn from '../../components/Generic/button';
import ResponsiveBtn from '../../components/Generic/responsiveButton';
import ModalWarning from '../../components/Generic/modalWarning';
import ArrowUp from '../../components/Generic/arrowUp';

export default function ListingClient() {

    useEffect(() => {
        ListSkusGoogle();
        ListSkusMicrosoft();
        ListSkusFreshworks();
        ListSkusClaraCloud();
        ListSkusZoom();
        ListSkusKaspersky();
        ListSkus2brightSparks();
        setFilterName(params.name)
    }, [])

    localStorage.removeItem('skugoogle');
    localStorage.removeItem('skumicrosoft');
    localStorage.removeItem('skufresh');
    localStorage.removeItem('skuclara');

    const [sku, setSku] = useState('0');

    const [skusGoogle, setSkusGoogle] = useState([]);

    const [skusMicrosoft, setSkusMicrosoft] = useState([]);

    const [skusFreshworks, setSkusFreshworks] = useState([]);

    const [skusClaraCloud, setSkusClaraCloud] = useState([]);

    const [skusZoom, setSkusZoom] = useState([]);

    const [skusKaspersky, setSkusKaspersky] = useState([]);

    const [skus2brightSparks, setSkus2brightSparks] = useState([]);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false);

    let params: any = useParams();

    const [filterName, setFilterName] = useState('');

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

    const RenderList = () => {
        return (
            <CardTableClient filterName={filterName} filterByService={sku} />
        );
    }

    return (
        <div>
            <SideMenu />
            <div className="listingClientBody">
                <ArrowUp />
                <div className="listingClientInternalBody">
                    <div className="listingClientSearch">
                        <InputSearch namePlaceHolder='Pesquisar clientes' cssType='searchInputHollow' onChange={e => setFilterName(e.target.value)} value={filterName} />
                    </div>

                    <h2>Filtros</h2>
                    <div className="listingClientInputAndSelect">
                        <div className="listingClientSelectCenterTop">
                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skugoogle', JSON.stringify(sku))
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('skukaspersky')
                                localStorage.removeItem('sku2brightSparks')
                            }}>
                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Google:</option>
                                    {
                                        skusGoogle.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skumicrosoft', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('skukaspersky')
                                localStorage.removeItem('sku2brightSparks')
                            }}>
                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Microsoft:</option>
                                    {
                                        skusMicrosoft.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skufresh', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('skukaspersky')
                                localStorage.removeItem('sku2brightSparks')
                            }}>
                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Freshworks:</option>
                                    {
                                        skusFreshworks.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="listingClientSelectCenterBottom">
                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skuclara', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('skukaspersky')
                                localStorage.removeItem('sku2brightSparks')
                            }}>
                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Clara Cloud:</option>
                                    {
                                        skusClaraCloud.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skuzoom', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skukaspersky')
                                localStorage.removeItem('sku2brightSparks')}}>

                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Zoom:</option>
                                    {
                                        skusZoom.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('skukaspersky', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('sku2brightSparks')}}>

                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços Kaspersky:</option>
                                    {
                                        skusKaspersky.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className='listingClientInputSeparator' onClick={e => {
                                e.preventDefault();
                                localStorage.setItem('sku2brightSparks', JSON.stringify(sku))
                                localStorage.removeItem('skugoogle')
                                localStorage.removeItem('skumicrosoft')
                                localStorage.removeItem('skufresh')
                                localStorage.removeItem('skuclara')
                                localStorage.removeItem('skuzoom')
                                localStorage.removeItem('skukaspersky')}}>

                                <select className='StandardSelectCustom' onChange={e => setSku(e.target.value)} value={sku}>
                                    <option selected value="0">Serviços 2brightSparks:</option>
                                    {
                                        skus2brightSparks.map((item: any) => {
                                            return <option value={item.idSproduct}>{item.skuSproduct}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="listingClientButtons">
                            <div className="litleBall">
                                <img src={Plus} alt="" width='15' height='15' />
                            </div>

                            <form className="listingClientButton" onClick={e => {
                                e.preventDefault();
                                localStorage.removeItem('newClient');
                                localStorage.removeItem('clientGoogle');
                                localStorage.removeItem('clientMicrosoft');
                                localStorage.removeItem('clientFreshworks');
                                localStorage.removeItem('clientBest');
                                localStorage.removeItem('clientActive');
                                localStorage.removeItem('clientInactive');
                                localStorage.removeItem('renewal30');
                                localStorage.removeItem('renewal60');
                                localStorage.removeItem('skugoogle');
                                localStorage.removeItem('skumicrosoft');
                                localStorage.removeItem('skufresh');
                                localStorage.removeItem('skuclara');
                                localStorage.removeItem('skuzoom');
                                localStorage.removeItem('skukaspersky');
                                localStorage.removeItem('sku2brightSparks');
                                window.location.reload();
                            }}>
                                <ResponsiveBtn value='Limpar Filtros' typeBtn='filledResponsiveButton' />
                            </form>
                        </div>
                    </div>

                    {RenderList()}

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