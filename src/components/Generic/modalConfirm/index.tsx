import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//Import Components
import StandardBtn from '../button';

//import image
import imgClose from '../../../assets/images/not.png';

//import style
import './style.css'

interface ModalConfirmProps {
    title: string;
    description: string;
    id: string;
    onClose: any;
    url: string;
    urlTwo: string;
    isReload: boolean;
    isRemain?: boolean;
    isRegisterSecondTime?: boolean;
}

const ModalConfirm: React.FC<ModalConfirmProps> = (props) => {

    const handleOutsideClick = (e: any) => {
        if (props.url !== '') {
            if (e.target.id === props.id) props.onClose();
        }
    };

    const handleFirstButton = () => {
        if (props.isRegisterSecondTime === true) {
            return (
                <div onClick={(window.location.reload) && props.onClose}>
                    <StandardBtn value='Sim' typeBtn='filledButton' />
                </div>
            );
        }
        else {
            return (
                <Link to={props.url}>
                    <StandardBtn value='Sim' typeBtn='filledButton' />
                </Link>
            );
        }
    }

    const handleSecondButton = () => {
        if (props.isRegisterSecondTime === true) {
            return (
                <Link to={props.urlTwo}>
                    <StandardBtn value='Não' typeBtn='filledButton' />
                </Link>
            );
        }
        else {
            return (
                <div onClick={props.onClose}>
                    <StandardBtn value='Não' typeBtn='filledButton' />
                </div>
            );
        }
    }

    const handleNavigation = () => {
        return (
            <div className='modalConfirmBtn'>

                {handleFirstButton()}

                {handleSecondButton()}

            </div>
        );
    }

    return (
        <div id={props.id} className="modalConfirmOutside" onClick={handleOutsideClick}>
            <div className="modalConfirmBody">

                <div className="modalConfirmContent">
                    <h1>{props.title}</h1>
                    <hr />
                    <p>{props.description}</p>

                    {handleNavigation()}
                </div>
            </div>
        </div>
    );
}

export default ModalConfirm;