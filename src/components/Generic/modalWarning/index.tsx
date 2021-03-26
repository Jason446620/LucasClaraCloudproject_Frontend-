import React from 'react';
import { Link, useHistory } from 'react-router-dom';

//Import Components
import StandardBtn from '../button';
import StandardInput from '../input';

//import image
import imgClose from '../../../assets/images/not.png';

//import style
import './style.css'

interface ModalWarningProps {
    title: string;
    description?: string;
    id: string;
    onClose: any;
    url: any;
    isReload: boolean;
}

const ModalWarning: React.FC<ModalWarningProps> = (props) => {

    let history = useHistory();

    const handleOutsideClick = (e: any) => {
        if (props.url !== '') {
            if (e.target.id === props.id) props.onClose();
        }
    };

    const handleNavigation = (url: any) => {
        if (props.isReload === true) {
            return (
                <form className='modalBtn' onClick={event => {
                    event.preventDefault();
                    window.location.reload();
                }}>
                    <StandardBtn value='Ok' typeBtn='filledButton' />
                </form>
            );

        }
        else {
            if (url !== '') {
                return (
                    <div className='modalBtn'>
                        <Link to={url}>
                            <StandardBtn value='Ok' typeBtn='filledButton' />
                        </Link>
                    </div>
                )
            }
            else {
                return (
                    <div className='modalBtn' onClick={props.onClose}>
                        <StandardBtn value='Ok' typeBtn='filledButton' />
                    </div>
                );
            }
        }
    }

    return (
        <div id={props.id} className="modalOutside" onClick={handleOutsideClick}>
            <div className="modalBody">
                <button className="modalClose" onClick={props.url === '' ? props.onClose : handleNavigation(props.url)}><img src={imgClose} /> </button>
                <div className="modalContent">
                    <h1>{props.title}</h1>
                    <hr />
                    <p>{props.description}</p>

                    {handleNavigation(props.url)}
                </div>
            </div>
        </div>
    );
}

export default ModalWarning;