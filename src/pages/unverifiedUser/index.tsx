import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../../services/auth';

//importing css
import './style.css';
import '../../assets/styles/global.css';

//importing components
import ResponsiveBtn from '../../components/Generic/responsiveButton';

//importing images
import imgClara from '../../assets/images/clara-icon-white.png';


export default function UnverifiedUser() {

    let history = useHistory();

    const logout = () => {
        localStorage.removeItem('token-pic');
        history.push('/');
    }

    return (
        <>
            <div className="unverifiedUser-container">
                <div className="unverifiedUser-content">
                    <img src={imgClara} />
                    <h1>Sua conta está atualmente inativa!</h1>
                    <h2>Informe seu gestor ou aguarde a sua conta ser aprovada.</h2>

                    <form className="unverifiedUser-btn-box" onClick={(event) => {
                        event.preventDefault();
                        logout();
                    }}>
                        <ResponsiveBtn value='Sair' typeBtn='hollowhiteResponsive' />
                    </form>
                </div>
            </div>
        </>
    );

}