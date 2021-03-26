import React from 'react'
import CardUser from '../../components/User/cardUser'

//importing css
import './style.css';
import '../../assets/styles/global.css';

function RegisterUser() {
    return (
        <>
            <div className="register-user-background">
                <CardUser title='Cadastre-se'/>
            </div>
        </>
    )
}

export default RegisterUser;
