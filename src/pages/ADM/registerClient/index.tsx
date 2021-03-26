import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import CardRegisterClient from '../../../components/Client/cardRegisterClient';
import SideMenu from '../../../components/Generic/sideMenu';

export default function RegisterClient() {
    return (
        <div>
            <SideMenu/>
            <div className="RegisterClientBody">
                <div className="RegisterClientInternalBody">
                    <CardRegisterClient title='Cadastrar Cliente' valueBtn='Enviar' valueBtn2='Voltar'/>
                </div>
            </div>
        </div>
    )
}