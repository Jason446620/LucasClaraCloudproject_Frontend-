import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardDepartment from '../../../components/Department/cardDepartment';

export default function RegisterDepartment(){
    return(
        <div>
            <SideMenu/>
            <div className="registerDepartmentBody">
                <div className="registerDepartmentInternalBody">
                    <CardDepartment title='Cadastrar Departamento' />
                </div>
            </div>
        </div>
    )
}