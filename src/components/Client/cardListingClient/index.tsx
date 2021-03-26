import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

//import styles
import './style.css';
import '../../../assets/styles/global.css';

//importing images
import imgCompany from '../../../assets/images/construcao.png'

//import components
import StandardBtn from '../../Generic/button';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';

//import parseJwt
import { parseJwt } from '../../../services/auth';

//import utils
import { addMask } from '../../../utils/stringFormater';

interface CardListingClientProps {
    idClient: number;
    nameClient: string;
    cnpjClient: string;
    activeClient: boolean;
    numContracts: number;
    numActive: number;
    numInactive: number;
}


const CardListingClient: React.FC<CardListingClientProps> = ({ idClient, nameClient, cnpjClient, activeClient, numContracts, numActive, numInactive, ...rest }) => {

    //variavel responsavel pela navegação
    const history = useHistory();

    //UseState que indica quando a página esta carregando (quando ele está true, chama o componente Loading)
    const [isLoading, setIsLoading] = useState(false);

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    let params: any = useParams();

    const AdminPermissions = () => {
        if (parseJwt().Role == 'Administrator') {
            return (
                <div>
                    <div className="cardListingClient-editButtons">
                        <div className="permissionButton">
                            <form onClick={event => {
                                event.preventDefault();
                                history.push(`/editClient/${params.id}`)
                            }}>
                                <StandardBtn value='Editar' typeBtn='hollowButton' />
                            </form>
                        </div>

                        <form className="permissionsButton" onSubmit={e => {
                            e.preventDefault();
                            ChangeStatus(params.id, activeClient);
                            setIsLoading(true)
                        }}>
                            <StandardBtn value={activeClient === false ? 'Ativar' : 'Inativar'} typeBtn='hollowButton' />
                        </form>
                    </div>
                </div>
            );
        }
    }

    const ChangeStatus = (id: number, active: boolean) => {
        if (active === true) {
            fetch('http://localhost5000/api/Client/Inactivate/' + id, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Cliente inativado com sucesso');
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Houve um erro ao inativar o cliente');
                    console.error(err);
                    setIsLoading(false);
                });
        }
        else {
            fetch('http://localhost5000/api/Client/Activate/' + id, {
                method: 'PUT',
                headers: {
                    authorization: 'Bearer ' + localStorage.getItem('token-pic')
                }
            })
                .then(() => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Cliente ativado com sucesso');
                    setIsLoading(false);
                })
                .catch(err => {
                    setIsModalWarningVisible(true);
                    setModalTitle('Houve um erro ao ativar o cliente');
                    console.error(err);
                    setIsLoading(false);
                });
        }
    }

    return (
        <div>
            <div className='cardListingClient-style'>
                <div className="cardListingClientHeader">
                    <img src={imgCompany} alt='Imagem do cliente' />
                    <h1>{nameClient}</h1>
                    <p>CNPJ: {addMask(cnpjClient)}</p>
                    <p>{activeClient === true ? 'Ativo' : 'Inativo'}</p>

                    <div className="cardListingClientHeader-Info">
                        <p>Total de contratos: {numContracts}</p>
                        <p>Contratos ativos: {numActive}</p>
                        <p>Contratos inativos: {numInactive}</p>
                    </div>

                    {AdminPermissions()}
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

            {
                isLoading &&
                <Loading />
            }
        </div>
    );
}

export default CardListingClient;