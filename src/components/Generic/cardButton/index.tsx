import React from 'react';
import './style.scss';
import '../../../assets/styles/global.css';

interface CardButtonProps {
    title: string;
    img: any;
}

const CardButton: React.FC<CardButtonProps> = ({ title, img, ...rest }) => {
    return (
        <div>
            <div className='cardButton-style'>
                <img src={img} alt='Imagem do filtro' />
                <p>{title}</p>
            </div>
        </div>
    );
}

export default CardButton;