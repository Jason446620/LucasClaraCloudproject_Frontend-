import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableInactivatedService from '../../../components/Service/cardTableInactivatedService';


export default function ViewInactivatedServices(){
    return(
        <div>
            <SideMenu />
            <div className="viewInactivatedServicesBody">
                <div className="viewInactivatedServicesInternalBody">
                    <CardTableInactivatedService />
                </div>
            </div>
        </div>
    );
}