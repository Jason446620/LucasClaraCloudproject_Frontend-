import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardRegisterService from '../../../components/Service/cardRegisterService';

//import components

export default function RegisterService(){
    return(
        <div>
            <SideMenu/>
            <div className="registerServiceBody">
                <div className="registerServiceInternalBody">
                    <CardRegisterService title='Cadastrar Serviço' nameButton='Enviar'/>
                </div>
            </div>
        </div>
    )
}