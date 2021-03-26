import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditHiredService from '../../../components/HiredService/cardEditHiredService';

export default function EditHiredService(){
    return(
        <div>
            <SideMenu/>
            <div className="editHiredServiceBody">
                <div className="editHiredServiceInternalBody">
                    <CardEditHiredService/>
                </div>
            </div>
        </div>
    )
}