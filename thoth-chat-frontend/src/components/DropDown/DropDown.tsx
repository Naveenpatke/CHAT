import * as React from 'react';
import './styles.css';

interface DropDownInterface {
    setDropDownItemId: (index: number) => void,
    dropDownItems: {
        label: string;
        value: string;
    }[]
}
export const DropDown:React.FC<DropDownInterface> = (props:DropDownInterface) => {
    
    return (
        <div className="dropdown">
            <button className="dropbtn">:</button>
            <div className="dropdown-content">
                {props.dropDownItems.map((dropdown, index) => (
                     <button className="dropDownButton" key={index} onClick={() => props.setDropDownItemId(index+1)}>{dropdown.label}</button>
                ))}
            </div>
        </div>
    ) 
}


