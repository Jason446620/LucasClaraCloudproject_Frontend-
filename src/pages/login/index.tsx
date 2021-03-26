import React from 'react'

//importing images
import background from '../../assets/images/background-login.png';
import claraIcon from '../../assets/images/clara-icon-blue.png';

//importing css
import './style.css'
import '../../assets/styles/global.css';

//importing components
import CardLogin from '../../components/Generic/cardLogin';

function Login() {
    return (
        <>
            <div className="login-background">
                <div className="login-form">
                    <div className="login-card">
                        <CardLogin />
                    </div>
                </div>

                <div className="login-icon">
                    <img src={claraIcon} />
                </div>
            </div>
        </>
    )
}

export default Login;
