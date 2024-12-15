import React from "react";

const Boton = ({value, onClick, clase, text}) => {
    return (
        <button type="button" value = {value} onClick={onClick} className={clase}>{text}</button>
    )    
}

export default Boton;