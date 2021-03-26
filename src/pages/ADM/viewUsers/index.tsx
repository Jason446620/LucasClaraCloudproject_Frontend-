import React, { useEffect, useState } from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableUser from '../../../components/User/cardTableUser';
import ArrowUp from '../../../components/Generic/arrowUp';

export default function ViewUsers(){
    return(
        <div>
            <SideMenu/>
            <div className="viewUserBody">
                <ArrowUp/>
                <div className="viewUserInternalBody">
                    <CardTableUser/>
                </div>
            </div>
        </div>
    );
}