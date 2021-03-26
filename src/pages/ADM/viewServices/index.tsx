import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableService from '../../../components/Service/cardTableService';

//document.body.style.zoom = "200%"

export default function ViewServices(){
    return(
        <div>
            <SideMenu />
            <div className="viewServiceBody">
                <div className="viewServiceInternalBody">
                    <CardTableService />
                </div>
            </div>
        </div>
    );
}