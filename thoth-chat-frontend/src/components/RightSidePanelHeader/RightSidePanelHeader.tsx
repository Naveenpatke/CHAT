import React from 'react'

import './styles.css'
import { DropDown } from '../DropDown/DropDown'

import userImage  from '../../assets/images/userImage.png'
import { RightSidePanelDropDownDetails } from '../../constants/constants'

interface RightSidePanelHeaderInterface {
    setDropDownItemId: (index: number) => void
}

export const RightSidePanelHeader:React.FC<RightSidePanelHeaderInterface> = (props:RightSidePanelHeaderInterface) => {
    return (
        <div className=' profileHeaderStyling '>
            <img src={userImage} alt="profilePic" className="image" />
            <h3>room</h3>
            <DropDown setDropDownItemId={props.setDropDownItemId} dropDownItems={RightSidePanelDropDownDetails}/>
        </div>
    )
}
