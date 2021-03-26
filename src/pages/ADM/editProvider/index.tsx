import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditProvider from '../../../components/Provider/cardEditProvider';

export default function EditProvider(){
    return(
        <div>
            <SideMenu/>
            <div className="editProviderBody">
                <div className="editProviderInternalBody">
                    <CardEditProvider title='Atualizar Fornecedor' />
                </div>
            </div>
        </div>
    )
}