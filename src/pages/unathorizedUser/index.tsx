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

    const BackToHome = () => {
        if (parseJwt() !== undefined || null) {
            if (parseJwt().Role === 'Collaborator') {
                history.push('/home');
            }
            else if (parseJwt().Role === 'Administrator') {
                history.push('/dashboard');
            }
        }
        else {
            history.push('/');
        }
    }

    return (
        <>
            <div className="unathorizedUser-container">
                <div className="unathorizedUser-content">
                    <img src={imgClara} />
                    <h1>Você não possui permissão para acessar essa página!</h1>

                    <form className="unathorizedUser-btn-box" onClick={(event) => {
                        event.preventDefault();
                        BackToHome();
                    }}>
                        <ResponsiveBtn value='Voltar' typeBtn='hollowhiteResponsive' />
                    </form>
                </div>
            </div>
        </>
    );

}