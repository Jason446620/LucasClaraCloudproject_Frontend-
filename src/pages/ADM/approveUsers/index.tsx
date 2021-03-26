import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableApproveUser from '../../../components/User/cardTableApproveUsers';
import ArrowUp from '../../../components/Generic/arrowUp';

export default function ApproveUsers(){
    return(
        <div>
            <SideMenu/>
            <div className="approveUserBody">
                <ArrowUp/>
                <div className="approveUserInternalBody">
                    <CardTableApproveUser/>
                </div>
            </div>
        </div>
    );
}