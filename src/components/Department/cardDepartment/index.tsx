import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

//Importing CSS
import './style.css';

//Importing Components
import StandardBtn from '../../Generic/button';
import StandardInput from '../../Generic/input';
import ModalWarning from '../../Generic/modalWarning';

//import images
import Department from '../../../assets/images/department.png';
import Loading from '../../Generic/loading';

interface CardDepartmentProps {
    title: string;
}

const CardDepartment: React.FC<CardDepartmentProps> = ({ title, ...rest }) => {


    let history = useHistory();

    const Back = () => {
        history.push('/dashboard');
    }

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //informações necessárias para cadastrar departamento
    const [nameDp, setNameDp] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const RegisterDepartment = () => {
        const form = {
            nameDp: nameDp
        }
        console.log(form)

        setIsLoading(true)
        fetch('http://localhost5000/api/Department', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                setModalURL('/viewDepartments')
                setIsModalWarningVisible(true)
                setModalTitle('Departamento cadastrado com sucesso!')
                setNameDp('');
                setIsLoading(false)
            })
            .then(() => {
                setModalURL('/viewDepartments')
            })

            .catch(err => {
                setIsModalWarningVisible(true)
                setModalTitle('Erro no cadastro do departamento')
                console.error(err)
                setIsLoading(false)
            });

    }

    return (
        <div>
            <div className="cardDepartmentBody">
                <div className='cardDepartmentTitle'>
                    <h2>{title}</h2>
                    <img src={Department} width='110px' height='105px' />
                </div>
                <form onSubmit={event => {
                    event.preventDefault();
                    RegisterDepartment();
                }}>
                    <div className="cardDepartmentInput">
                        <div className='alignInputs'>
                            <label htmlFor="" className='standardLabel'>Nome do departamento:</label>
                            <StandardInput MinLengh='2' MaxLengh='70' required namePlaceholder='Nome do departamento' type='text' onChange={e => setNameDp(e.target.value)} />
                        </div>
                    </div>
                    <div className="cardDepartmentButton">
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