import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditClient from '../../../components/Client/cardEditClient';


export default function EditClient(){
    return(
        <div>
            <SideMenu />
            <div className="editClientBody">
                <div className="editClientInternalBody">
                    <CardEditClient title='Editar Dados do Cliente' valueBtn='Enviar' valueBtn2='Voltar'/>
                </div>
            </div>
        </div>
    );
}