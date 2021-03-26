import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//importing css
import './style.css';
import '../../assets/styles/global.css';

//importing images
import claraIcon from '../../assets/images/clara-icon-blue.png';
import imgNew from '../../assets/images/new-icon.png';
import imgClara from '../../assets/images/clara-icon-without.png';
import imgActive from '../../assets/images/play.png';
import imgInactive from '../../assets/images/stop.png';
import imgGoogle from '../../assets/images/google-img.png';
import imgMicrosoft from '../../assets/images/microsoft-img.png';
import imgZoom from '../../assets/images/zoom-logo.png';
import imgKaspersky from '../../assets/images/kaspersky-logo.png';
import img2brightSparks from '../../assets/images/2brightSparks-logo.png';
import imgFresh from '../../assets/images/fresh-img.png';
import imgRenewal30 from '../../assets/images/certificado30.png';
import imgRenewal60 from '../../assets/images/certificado60.png';

//importing components
import InputSearch from '../../components/Generic/inputSearch';
import CardFilter from '../../components/Generic/cardFilter';
import ResponsiveBtn from '../../components/Generic/responsiveButton';
import StandardBtn from '../../components/Generic/button';
import SideMenu from '../../components/Generic/sideMenu';


function Home() {

    const [searched, setSearched] = useState('');

    //useState para os filtros
    const [newClient, setNewClient] = useState(false);
    const [clientGoogle, setClientGoogle] = useState(false);
    const [clientMicrosoft, setClientMicrosoft] = useState(false);
    const [clientFreshworks, setClientFreshworks] = useState(false);
    const [clientBest, setClientBest] = useState(false);
    const [clientActive, setClientActive] = useState(false);
    const [clientInactive, setClientInactive] = useState(false);
    const [renewal30, setRenewal30] = useState(false);
    const [renewal60, setRenewal60] = useState(false);
    const [clientZoom, setClientZoom] = useState(false);
    const [clientKaspersky, setClientKaspersky] = useState(false);
    const [client2brightSparks, setClient2brightSparks] = useState(false);

    let history = useHistory();

    const Click = (state: any, value: any) => state(!value);

    return (
        <>
            <SideMenu />

            <div className="home-all-container">

                <div className='home-search-container'>
                    <img className='home-img-icon' src={claraIcon} />
                    <form className="home-search-form" onSubmit={e => {
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
                        localStorage.removeItem('clientZoom');
                        localStorage.removeItem('clientKaspersky');
                        localStorage.removeItem('client2brightSparks');
                        history.push(`/viewClient/${searched}`);
                    }}>
                        <InputSearch cssType='searchInput' namePlaceHolder='Pesquisar cliente' onChange={e => setSearched(e.target.value)} value={searched} />
                        <StandardBtn value='Buscar' typeBtn='filledButton' />
                    </form>
                </div>

                <form className="home-filters-container active" onSubmit={e => {
                    e.preventDefault();
                    localStorage.setItem('newClient', JSON.stringify(newClient));
                    localStorage.setItem('clientGoogle', JSON.stringify(clientGoogle));
                    localStorage.setItem('clientMicrosoft', JSON.stringify(clientMicrosoft));
                    localStorage.setItem('clientFreshworks', JSON.stringify(clientFreshworks));
                    localStorage.setItem('clientBest', JSON.stringify(clientBest));
                    localStorage.setItem('clientZoom', JSON.stringify(clientZoom));
                    localStorage.setItem('clientKaspersky', JSON.stringify(clientKaspersky));
                    localStorage.setItem('client2brightSparks', JSON.stringify(client2brightSparks));
                    localStorage.setItem('clientActive', JSON.stringify(clientActive));
                    localStorage.setItem('clientInactive', JSON.stringify(clientInactive));
                    localStorage.setItem('renewal30', JSON.stringify(renewal30));
                    localStorage.setItem('renewal60', JSON.stringify(renewal60));
                    history.push('/viewClient');
                }}>
                    <div className="home-filters-container-first-row">
                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setNewClient, newClient);
                        }}>
                            <CardFilter title='Filtrar Novos Clientes' img={imgNew} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setRenewal30, renewal30);
                        }}>
                            <CardFilter title='Filtrar Renovações 30 dias' img={imgRenewal30} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setRenewal60, renewal60);
                        }}>
                            <CardFilter title='Filtrar Renovações 60 dias' img={imgRenewal60} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientActive, clientActive);
                        }}>
                            <CardFilter title='Filtrar Clientes Ativos' img={imgActive} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientInactive, clientInactive);
                        }}>
                            <CardFilter title='Filtrar Clientes Inativos' img={imgInactive} />
                        </div>
                    </div>

                    <div className="home-filters-container-second-row">
                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientBest, clientBest);
                        }}>
                            <CardFilter title='Filtrar Clientes Clara Cloud' img={imgClara} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientGoogle, clientGoogle);
                        }}>
                            <CardFilter title='Filtrar Clientes Google' img={imgGoogle} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientMicrosoft, clientMicrosoft);
                        }}>
                            <CardFilter title='Filtrar Clientes Microsoft' img={imgMicrosoft} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientFreshworks, clientFreshworks);
                        }}>
                            <CardFilter title='Filtrar Clientes Freshworks' img={imgFresh} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientZoom, clientZoom);
                        }}>
                            <CardFilter title='Filtrar Clientes Zoom' img={imgZoom} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClientKaspersky, clientKaspersky);
                        }}>
                            <CardFilter title='Filtrar Clientes Kaspersky' img={imgKaspersky} />
                        </div>

                        <div className="home-card-filter" onClick={e => {
                            e.preventDefault();
                            Click(setClient2brightSparks, client2brightSparks);
                        }}>
                            <CardFilter title='Filtrar Clientes 2brightSparks' img={img2brightSparks} />
                        </div>

                    </div>

                    <div className="home-btn">
                        <ResponsiveBtn value='Listar Clientes' typeBtn='filledResponsiveButton' />
                    </div>
                </form>

            </div>
        </>
    )
}

export default Home;
