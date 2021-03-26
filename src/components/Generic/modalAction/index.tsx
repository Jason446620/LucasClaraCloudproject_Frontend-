import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//Import Components
import StandardBtn from '../button';

//import image
import imgClose from '../../../assets/images/not.png';

//import style
import './style.css'

interface ModalActionProps {
    title: string;
    description: string;
    id: string;
    onClose: any;
    action: any;
    isReload: boolean;
    isRemain?: boolean;
}

const ModalAction: React.FC<ModalActionProps> = (props) => {

    return (
        <div id={props.id} className="modalConfirmOutside">
            <div className="modalConfirmBody">

                <div className="modalConfirmContent">
                    <h1>{props.title}</h1>
                    <hr />
                    <p>{props.description}</p>

                    <div className="modalConfirmBtn">
                        <div onClick={props.action}>
                            <StandardBtn value='Sim' typeBtn='filledButton' />
                        </div>

                        <div onClick={props.onClose}>
                            <StandardBtn value='Não' typeBtn='filledButton' />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ModalAction;