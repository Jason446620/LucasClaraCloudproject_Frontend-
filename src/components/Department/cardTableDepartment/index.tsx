import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

//import styles
import './style.css'

//import components
import Button from '../../Generic/button/index'
import SmallInputSearch from '../../Generic/smallInputSearch';
import ModalWarning from '../../Generic/modalWarning';
import Loading from '../../Generic/loading';

export default function CardTableDepartment() {

    //Responsavel pelo ciclo de vida 
    useEffect(() => {
        ListDepartments();
    }, [])
    const [filter, setFilter] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    // Quando usuario digita no campo filter (altera o campo), executa o useEffect
    useEffect(() => {
        // Filter na lista de users
        let DepatmentFilter = listDepartments.filter((department: any) => {
            // Caso o filtro estiver vazio, retorna a lista inteira de users
            if (filter.length === 0)
                return listDepartments;

            // Retorna todos os users com nomes semelhantes ao filtro digitado
            return department.nameDp.toLowerCase().includes(filter.toLowerCase());
        })

        setDepartments(DepatmentFilter);
    }, [filter])

    //função responsavel por levar a pagina de editar departamentos
    const PushToEditDepartment = (id: any) => {
        history.push(`/editDepartment?id=${id}`)
    }

    //variavel responsavel pela navegação
    const history = useHistory();

    //informações necessárias para listar os departmento
    const [listDepartments, updateListDepartments] = useState([]);
    const [departments, setDepartments] = useState(listDepartments);
    const [idDepartment, setIdDepartment] = useState(0)

    //Informação necessaria para o modal ser visivel na página
    const [isModalWarningVisible, setIsModalWarningVisible] = useState(false);
    const [warning, setWarning] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalURL, setModalURL] = useState('');
    const [isReload, setIsReload] = useState(false)

    //Responsavel por listar todos os departamentos
    const ListDepartments = () => {
        setIsLoading(true)
        fetch('http://localhost5000/api/Department', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            .then(data => {
                setDepartments(data);
                updateListDepartments(data);
                setIsLoading(false)
            })
            .catch(err => console.error(err));
    }

    const DeleteDepartment = (id: any) => {
        setIsLoading(true)
        fetch('http://localhost5000/api/Department/' + id, {
            method: 'DELETE',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(Response => {
                if (Response.status === 202) {
                    setIsModalWarningVisible(true);
                    setModalTitle('Departamento excluído com sucesso');
                    setIsReload(true);
                    setIsLoading(false)
                }
                else {
                    setIsModalWarningVisible(true);
                    setModalTitle('Não foi possível excluir o departamento!');
                    setWarning('Existem usuários com este departamento. Exclua estes usuários ou mude o departamento deles')
                    setIsLoading(false)
                }
            })
            .catch(err => {
                setIsModalWarningVisible(true);
                setIsReload(true)
                setModalTitle('Houve um erro ao tentar deletar o departamento');
                console.error(err)
            });
    }

    return (
        <div>
            <div className="cardTableDepartmentBody">
                <div className="cardTableDepartmentTables">
                    <div className='cardTableDepartmentTopOptions'>
                        <div className="cardTableDepartmentInput">
                            <SmallInputSearch cssType='smallSearchInputHollow' namePlaceHolder='Pesquisar departamento' onChange={e => setFilter(e.currentTarget.value)} value={filter}/>
                        </div>

                        <div className="cardTabelDepartmentButton">
                            <Link to='/dashboard'><Button value='Voltar' typeBtn='filledButton' /></Link>
                        </div>
                    </div>

                    <table className='cardTableDepartmentCustomization'>
                        <thead>
                            <tr>
                                <th>Nome do departamento</th>
                                <th>Editar departamento</th>
                                <th>Excluir departamento</th>
                            </tr>
                            <hr />
                        </thead>
                        <tbody>
                            {
                                departments.map((item: any) => {
                                    return (
                                        <div>
                                            <tr>
                                                <div className="cardTableDepartmentTd">
                                                    <td>{item.nameDp}</td>
                                                    <td onClick={() => PushToEditDepartment(item.idDp)} className='departmentTd_buttonEdit'><Button value='Editar' typeBtn='hollowButton' /></td>
                                                    <td onClick={() => DeleteDepartment(item.idDp)} className='departmentTd_buttonsInative'><Button value='Excluir' typeBtn='hollowButton' /></td>
                                                </div>
                                            </tr>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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

