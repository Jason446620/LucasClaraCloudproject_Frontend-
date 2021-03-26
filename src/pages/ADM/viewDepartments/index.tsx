import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardTableDepartment from '../../../components/Department/cardTableDepartment';
import ArrowUp from '../../../components/Generic/arrowUp';


export default function ViewDepartments(){
    return(
        <div>
            <SideMenu />
            <div className="viewDepartmentBody">
                <ArrowUp/>
                <div className="viewDepartmentInternalBody">
                    <CardTableDepartment/>
                </div>
            </div>
        </div>
    );
}