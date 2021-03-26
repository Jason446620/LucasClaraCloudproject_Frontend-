import React, { useState } from 'react';
import './style.scss';
import '../../../assets/styles/global.css';

interface CardFilterProps {
    title: string;
    img: any;
}

const CardFilter: React.FC<CardFilterProps> = ({ title, img, ...rest }) => {

    const [click, setclick] = useState(false);

    const showClick = () => setclick(!click);

    return (
        <div>
            <div className={!click ? 'hollowFilter' : 'hollowFilter active'} onClick={showClick}>
                <img src={img} alt='Imagem do filtro'/>
                <p>{title}</p>
            </div>
        </div>
    );
}

export default CardFilter;