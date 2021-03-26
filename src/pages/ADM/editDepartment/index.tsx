import React from 'react';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import SideMenu from '../../../components/Generic/sideMenu';
import CardEditDepartment from '../../../components/Department/cardEditDepartment';

export default function EditDepartment(){
    return(
        <div>
            <SideMenu/>
            <div className="editDepartmentBody">
                <div className="editDepartmentInternalBody">
                    <CardEditDepartment title='Atualizar Departamento' />
                </div>
            </div>
        </div>
    )
}