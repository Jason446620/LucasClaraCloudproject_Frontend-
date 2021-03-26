import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//importing components
import SideMenu from '../../../components/Generic/sideMenu'

//importing css
import './style.css'
import '../../../assets/styles/global.css'

//importing images
import imgDashboard from '../../../assets/images/painel.png';
import imgFinder from '../../../assets/images/finder.png';
import imgCompany from '../../../assets/images/construcao.png';
import imgSupplier from '../../../assets/images/supla.png';
import imgService from '../../../assets/images/prancheta.png';
import imgProduct from '../../../assets/images/product.png';
import imgUser from '../../../assets/images/user.png';
import imgApprove from '../../../assets/images/verifica.png';
import imgDepartment from '../../../assets/images/department.png'
import imgAddDep from '../../../assets/images/addDep.png'
import imgAddSupplier from '../../../assets/images/addsupla.png'

//importing components
import CardButton from '../../../components/Generic/cardButton';

export default function Dashboard() {
    // Lista de clientes    
    const [clients, setClients] = useState([]);

    useEffect(() => {
        ListClients()
    }, [])


    // Função que gera uma lista com todos os clientes
    const ListClients = () => {
        // Fetch que faz a comunicação com a API através da URI
        fetch('http://localhost5000/api/Client', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token-pic')
            }
        })
            .then(response => response.json())
            // Promise que atribui valor ao Use State (clients)
            .then(data => {
                setClients(data);
            })
            .catch(err => console.error(err));
    }
    var count: number = 0;

    return (
        <>
            <SideMenu />

            <div className="dashboard-container">
                <div className="dashboard-background">
                    <div className="dashboard-title">
                        <img src={imgDashboard} alt="Imagem do painel do admin." />
                        <h1>Dashboard</h1>
                    </div>

                    <div className="dashboard-count">
                        <h2>Total de clientes: 
                        {
                                clients.map(() => {
                                    count++;
                                })
                        }
                        </h2>
                        <h2>{count}</h2>
                    </div>
                </div>

                <div className="dashboard-cards-container">

                    <div className="dashboard-card">
                        <Link to='/viewUsers'><CardButton title='Visualizar usuários' img={imgUser} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/viewClient'><CardButton title='Visualizar clientes' img={imgFinder} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/viewServices'><CardButton title='Visualizar serviços' img={imgProduct} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/viewDepartments'>
                            <CardButton title='Visualizar departamentos' img={imgDepartment} />
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/viewProviders'>
                            <CardButton title='Visualizar fornecedores' img={imgSupplier} />
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/approveUsers'><CardButton title='Aprovar usuários' img={imgApprove} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/registerClient'><CardButton title='Cadastrar novo cliente' img={imgCompany} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/registerService'><CardButton title='Cadastrar novo serviço' img={imgService} /></Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/registerDepartment'>
                            <CardButton title='Cadastrar novo departamento' img={imgAddDep} />
                        </Link>
                    </div>

                    <div className="dashboard-card">
                        <Link to='/registerProvider'>
                            <CardButton title='Cadastrar novo fornecedor' img={imgAddSupplier} />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}