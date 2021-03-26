import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//import components
import CardHiredService from '../../../components/HiredService/cardHiredService';
import SideMenu from '../../../components/Generic/sideMenu';
import ModalWarning from '../../../components/Generic/modalWarning';

export default function HiredService() {

    let params: any = useParams();

    const [nameClient, setNameClient] = useState('');

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    useEffect(() => {
        ListClientById();
    }, [])

    const ListClientById = () => {
        fetch('http://localhost5000/api/Client/' + params.id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setNameClient(data.nameClient);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar obter o nome do cliente');
                console.error(err)
            });
    }

    return (
        <div>
            <SideMenu />
            <div className="hiredServiceBody">
                <div className="hiredServiceInternalBody">
                    <CardHiredService nameClient={nameClient} />
                </div>
            </div>
            {
                isModalWarningVisible &&
                <ModalWarning title={modalTitle}
                    description={warning}
                    id='modal'
                    onClose={() => setIsModalWarningVisible(false)}
                    url={modalURL}
                    isReload={isReload} />
            }
        </div>
    )
}