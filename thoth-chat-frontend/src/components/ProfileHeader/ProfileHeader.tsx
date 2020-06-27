import React from 'react'
import './styles.css'
import { DropDown } from '../DropDown/DropDown'

import userImage  from '../../assets/images/userImage.png'
import { profileDropdown } from '../../constants/constants'

interface ProfileHeaderInterface {
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    },
    setDropDownItemId: (index: number) => void
}

export const ProfileHeader:React.FC<ProfileHeaderInterface> = (props:ProfileHeaderInterface) => {
    //console.log(props.currentUserDetails.name)
    return (
        <div className=' profileHeaderStyling '>
            <img src={userImage} alt="profilePic" className="image" />
            <h3 >{props.currentUserDetails.name}</h3>
            <DropDown setDropDownItemId={props.setDropDownItemId} dropDownItems={profileDropdown}/>
        </div>
    )
}

