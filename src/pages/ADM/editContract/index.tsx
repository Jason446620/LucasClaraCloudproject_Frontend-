import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditContract from '../../../components/Contract/cardEditContract';

export default function EditContract(){

    return(
        <div>
            <SideMenu/>
            <div className="editContractBody">
                <div className="editContractInternalBody">
                    <CardEditContract/>
                </div>
            </div>
        </div>
    )
}