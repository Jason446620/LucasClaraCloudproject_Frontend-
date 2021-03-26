import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardProvider from '../../../components/Provider/cardProvider';

export default function RegisterProvider(){
    return(
        <div>
            <SideMenu/>
            <div className="registerProviderBody">
                <div className="registerProviderInternalBody">
                    <CardProvider title='Cadastrar Fornecedor' />
                </div>
            </div>
        </div>
    )
}