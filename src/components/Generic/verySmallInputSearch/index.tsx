import React, { InputHTMLAttributes } from 'react';
import './style.css';

interface VerySmallInputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
    namePlaceHolder: string;
    cssType: string;
}

const VerySmallInputSearch: React.FC<VerySmallInputSearchProps> = ({ cssType, namePlaceHolder, ...rest }) => {
    return (
        <div>
            <input className={cssType} type='text' placeholder={namePlaceHolder} {...rest}/>
        </div>
    );
}

export default VerySmallInputSearch;