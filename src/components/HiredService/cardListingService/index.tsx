import React, { useState } from 'react';
import { parseJwt } from '../../../services/auth';

// importing css
import './style.css';
import '../../../assets/styles/global.css';

// importing components
import StandardBtn from '../../Generic/button';

// importing images
import imgActive from '../../../assets/images/play-w.png';
import imgInactive from '../../../assets/images/stop-w.png';
import imgService from '../../../assets/images/product.png';

interface CardListingServiceProps {
    nameService: string;
    nameSupplier: string;
    serviceDuration: number;
    sku: string;
    supplierBilled: any;
    licenseQuantity: number;
    dateEnd: any;
    serviceStatus: boolean;
}

const StatusService = (status: boolean) => {
    if (status === true) {
        return (
            <div>
                <div className="cardListingService-statusServiceTrue">
                    <p>Contrato Ativo</p>
                    <img src={imgActive} />
                </div>
            </div>

        );
    }

    else {
        return (
            <div>
                <div className="cardListingService-statusServiceFalse">
                    <p>Contrato Inativo</p>
                    <img src={imgInactive} />
                </div>
            </div>
        );
    }
}

const SupplierBilled = (status: boolean) => {
    if (status === true) {
        return (
            <p>Faturado pelo fornecedor</p>
        );
    }
    else {
        return (
            <p>Não faturado pelo fornecedor</p>
        );
    }
}



const CardListingService: React.FC<CardListingServiceProps> = ({ nameService, sku, supplierBilled, licenseQuantity, dateEnd, nameSupplier, serviceStatus, serviceDuration, ...rest }) => {
        
    return (
        <div>
            <div className='cardListingService-align'>
                <div className="cardListingService-style">
                    <div className="cardListingServiceHeader">
                        <div className="cardListingServiceHeader-info">

                            <div className="cardListingServiceHeader-title">
                                <img src={imgService} />
                                <h1>{nameService}</h1>
                            </div>

                            <div className="cardListingServiceHeader-supplier">
                                <p className='pCustomize'>{nameSupplier}</p>
                            </div>

                        </div>

                        {StatusService(serviceStatus)}

                    </div>

                    <div className="cardListingServiceBody">
                        <p>SKU: {sku}</p>
                        {SupplierBilled(supplierBilled)}
                        <p>Duração do serviço: {serviceDuration}</p>
                        <p>Data de renovação: {dateEnd}</p>
                    </div>
                </div>

                <div className="cardListingService-licenses">
                    <h2>Quantidade de licenças: </h2>
                    <h1>{licenseQuantity}</h1>
                </div>
            </div>
        </div>
    );
}

export default CardListingService;