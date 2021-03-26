import React from 'react'

//import components
import CardEditUser from '../../components/User/cardEditUser';

//importing css
import './style.css';
import '../../assets/styles/global.css';
import SideMenu from '../../components/Generic/sideMenu';

function EditUser() {
    return (
        <>
            <SideMenu/>
            <div className="edit-user-background">
                <CardEditUser title='Edite Suas Informações'/>
            </div>
        </>
    )
}

export default EditUser;
