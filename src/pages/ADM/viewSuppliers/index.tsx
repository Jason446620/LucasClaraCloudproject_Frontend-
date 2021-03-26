import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableSupplier from '../../../components/Provider/cardTableProvider';
import ArrowUp from '../../../components/Generic/arrowUp';


export default function ViewSuppliers(){
    return(
        <div>
            <SideMenu />
            <div className="viewSupplierBody">
                <ArrowUp/>
                <div className="viewSupplierInternalBody">
                    <CardTableSupplier/>
                </div>
            </div>
        </div>
    );
}