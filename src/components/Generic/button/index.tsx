import React, {ButtonHTMLAttributes} from 'react';

//import style
import './style.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    value: string;
    typeBtn: string;
}

const StandardBtn:React.FC<ButtonProps> = ({value, typeBtn}) =>{
    return(
        <div>
           <input className={typeBtn} type='submit' value={value}/>           
        </div>
    );
}

export default StandardBtn;