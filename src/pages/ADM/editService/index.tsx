import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditService from '../../../components/Service/cardEditService';

export default function EditService(){
    return(
        <div>
            <SideMenu/>
            <div className="editServiceBody">
                <div className="editServiceInternalBody">
                    <CardEditService title='Atualizar Serviço' nameButton='Enviar'/>
                </div>
            </div>
        </div>
    )
}