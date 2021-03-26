import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

//Importing CSS
import './style.css';

//Importing Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import Department from '../../../assets/images/department.png';

//import parseJwt
import { parseJwt } from '../../../services/auth';
import Loading from '../../Generic/loading';

interface CardDepartmentProps {
    title: string;
}

const CardDepartment: React.FC<CardDepartmentProps> = ({ title, ...rest }) => {

    //Responsável por fazer o ciclo de vida da página
    useEffect(() => {
        GetDepartmentById()
    }, [])

    //variavel responsavel pela navegação 
    const history = useHistory();

    const [isLoading, setIsLoading] = useState(false);

    //Função responsavel por voltar a pagina de visualizar departamentos
    const Back = () => {
        history.push('/viewDepartments')
    }

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //informações necessárias para cadastrar e atualizar departamento
    const [nameDp, setNameDp] = useState('');
    const [idDp, setIdDp] = useState(0);

    const UpdateDepartment = () => {
        const form = {
            nameDp: nameDp
        }
        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Department/' + idDepartment, {
            method: 'PUT',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(() => {
                setNameDp('');
                setIsModalWarningVisible(true)
                setModalTitle('Departamento atualizado com sucesso!');
                setModalURL('/viewDepartments');
                setIsLoading(false)
            })
            .catch(err => {
                setIsModalWarningVisible(true)
                setModalTitle('Ocorreu um erro ao atualizar o departamento!');
                console.error(err);
                setIsLoading(false)
            });
    }

    //Essas três variveis abaixo são responsaveis por adquirir as informações passadas na url
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);

    const idDepartment = urlParams.get('id');

    //Funcionalidade responsavel por pegar o id na url para atualizar um departamento
    const GetDepartmentById = () => {
        fetch('http://localhost5000/api/Department/' + idDepartment, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(resp => resp.json())
            .then(data => {
                setNameDp(data.nameDp);
                setIdDp(data.idDp);
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao obter as informações do departamento');
                console.error(err)
            });
    }


    return (
        <div>
            <div className="cardEditDepartmentBody">
                <div className='cardEditDepartmentTitle'>
                    <h2>{title}</h2>
                    <img src={Department} width='110px' height='105px' />
                </div>
                <form onSubmit={event => {
                    event.preventDefault();
                    UpdateDepartment();
                }}>
                    <div className="cardEditDepartmentInput">
                        <div className='alignInputs'>
                            <label htmlFor="" className='standardLabel'>Nome do departamento:</label>
                            <StandardInput MinLengh='2' MaxLengh='70' required namePlaceholder='Nome do departamento' type='text' value={nameDp} onChange={e => setNameDp(e.target.value)} />
                        </div>
                    </div>
                    <div className="cardEditDepartmentButton">
                        <StandardBtn value='Enviar' typeBtn='filledButton' />
                        <form onClick={event => {
                            event.preventDefault();
                            Back();
                        }}>
                            <StandardBtn value='Voltar' typeBtn='hollowButton' />
                        </form>
                    </div>
                </form>
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

export default CardDepartment;