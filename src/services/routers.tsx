import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

//import parseJwt
import { parseJwt } from '../services/auth';

//import caminhos das paginas
import Home from '../pages/home';
import Login from '../pages/login';
import DashBoard from '../pages/ADM/dashboard';
import ServiceDetail from '../pages/serviceDetail';
import HiredService from '../pages/ADM/hiredService';
import ClientDetail from '../pages/clientDetail';
import ViewClient from '../pages/viewClient';
import ViewDepartments from '../pages/ADM/viewDepartments';
import ViewServices from '../pages/ADM/viewServices';
import ViewSuppliers from '../pages/ADM/viewSuppliers';
import ViewInactivatedServices from '../pages/ADM/ViewInactivatedServices';
import ViewUsers from '../pages/ADM/viewUsers';
import ApproveUsers from '../pages/ADM/approveUsers';
import EditClient from '../pages/ADM/editClient';
import EditProvider from '../pages/ADM/editProvider';
import EditService from '../pages/ADM/editService';
import EditContract from '../pages/ADM/editContract';
import EditUser from '../pages/editUser';
import EditDepartment from '../pages/ADM/editDepartment';
import EditHiredService from '../pages/ADM/editHiredService';
import RegisterProvider from '../pages/ADM/registerProvider';
import RegisterService from '../pages/ADM/registerService';
import RegisterClient from '../pages/ADM/registerClient';
import RegisterUser from '../pages/registerUser';
import RegisterContract from '../pages/ADM/registerContract';
import RegisterDepartment from '../pages/ADM/registerDepartment';
import RegisterNewHiredService from '../pages/ADM/registerNewHiredService';
import UnverifiedUser from '../pages/unverifiedUser';
import UnathorizedUser from '../pages/unathorizedUser';

export default function Routers() {

    const PrivateRoute = ({ Component, ...rest }: any) => (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token-pic') !== null || localStorage.getItem('token-pic') !== undefined || parseJwt().Role == 'Collaborator' && parseJwt().ActiveUser === 'True' 
                || localStorage.getItem('token-pic') !== null || localStorage.getItem('token-pic') !== undefined || parseJwt().Role == 'Administrator' && parseJwt().ActiveUser === 'True'? (
                    <Component {...props} />
                ) : localStorage.getItem('token-pic') !== null && parseJwt().ActiveUser === 'False' ? (
                    <Redirect
                        to={{ pathname: '/unverified', state: { from: props.location } }}
                    />
                ) : (
                        <Redirect
                            to={{ pathname: '/', state: { from: props.location } }}
                        />
                    )
            }
        />
    )

    const PrivateRouteCollaborator = ({ Component, ...rest }: any) => (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token-pic') !== null && parseJwt().Role == 'Collaborator' && parseJwt().ActiveUser === 'True' ? (
                    <Component {...props} />
                ) : localStorage.getItem('token-pic') !== null && parseJwt().ActiveUser === 'False' ? (
                    <Redirect
                        to={{ pathname: '/unverified', state: { from: props.location } }}
                    />
                ) : (
                    <Redirect
                        to={{ pathname: '/unathorizedUser', state: { from: props.location } }}
                    />
                )
            }
        />
    )

    const PrivateRouteAdministrator = ({ Component, ...rest }: any) => (
        <Route
            {...rest}
            render={props =>
                localStorage.getItem('token-pic') !== null && parseJwt().Role == 'Administrator' ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{ pathname: '/unathorizedUser', state: { from: props.location } }}
                        />
                    )
            }
        />
    )
    //Exemplo de como deixar uma rota privada
    //<PrivateRoute path='/registerDepartment' component={RegisterDepartment} />

    return (
        <BrowserRouter>
            <Route path='/' exact component={Login} />
            <PrivateRouteCollaborator path='/home' Component={Home} />
            <PrivateRouteAdministrator path='/dashboard' Component={DashBoard} />
            <PrivateRoute path='/serviceDetail/:id/:idh' Component={ServiceDetail} />
            <PrivateRouteAdministrator path='/hiredService/:id' Component={HiredService} />
            <PrivateRoute path='/clientDetail/:id' Component={ClientDetail} />
            <PrivateRoute path='/viewClient/:name?' Component={ViewClient} />
            <PrivateRouteAdministrator path='/viewDepartments' Component={ViewDepartments} />
            <PrivateRouteAdministrator path='/viewServices' Component={ViewServices} />
            <PrivateRouteAdministrator path='/viewProviders' Component={ViewSuppliers} />
            <PrivateRouteAdministrator path='/viewUsers' Component={ViewUsers} />
            <PrivateRouteAdministrator path='/viewInactivatedServices' Component={ViewInactivatedServices} />
            <PrivateRouteAdministrator path='/approveUsers' Component={ApproveUsers} />
            <PrivateRouteAdministrator path='/editService/:id' Component={EditService} />
            <PrivateRoute path='/editUser' Component={EditUser} />
            <PrivateRouteAdministrator path='/editContract/:id/:idcc' Component={EditContract} />
            <PrivateRouteAdministrator path='/editDepartment' Component={EditDepartment} />
            <PrivateRouteAdministrator path='/editHiredService/:id/:idh' Component={EditHiredService} />
            <PrivateRouteAdministrator path='/editClient/:id' Component={EditClient} />
            <PrivateRouteAdministrator path='/editProvider' Component={EditProvider} />
            <PrivateRouteAdministrator path='/registerProvider' Component={RegisterProvider} />
            <PrivateRouteAdministrator path='/registerClient' Component={RegisterClient} />
            <Route path='/registerUser' component={RegisterUser} />
            <PrivateRouteAdministrator path='/registerNewHiredService/:id/:idcc' Component={RegisterNewHiredService} />
            <PrivateRouteAdministrator path='/registerContract/:id' Component={RegisterContract} />
            <PrivateRouteAdministrator path='/registerService' Component={RegisterService} />
            <PrivateRouteAdministrator path='/registerDepartment' Component={RegisterDepartment} />
            <Route path='/unverified' component={UnverifiedUser} />
            <Route path='/unathorizedUser' component={UnathorizedUser} />
        </BrowserRouter>
    );
}