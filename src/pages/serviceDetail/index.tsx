import React, { useEffect, useState } from 'react';

//import styles
import './style.css';
import '../../assets/styles/global.css';

//import components
import CardServiceDetails from '../../components/HiredService/cardServiceDetails';
import SideMenu from '../../components/Generic/sideMenu';

export default function ServiceDetail() {
    return (
        <>
            <SideMenu />
            <div className="ServiceDetailBody">
                <div className="ServiceDetailInternalBody">
                    <CardServiceDetails />
                </div>
            </div>
        </>
    );
}