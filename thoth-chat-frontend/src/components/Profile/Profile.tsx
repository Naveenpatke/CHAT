import React from 'react'

import "./styles.css"
import userImage from '../../assets/images/userImage.png'
import edit from '../../assets/images/edit.png'
import done from '../../assets/images/done.png'

interface ProfileInterface {
    setDropDownItemId: (index: number) => void,
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    }
}

export const Profile:React.FC<ProfileInterface> = (props:ProfileInterface) => {
    const[updatedUsername, setUpdatedUsername ]= React.useState(props.currentUserDetails.name)
    const[updatedEmail, setUpdatedEmail] = React.useState(props.currentUserDetails.email)
    const[usernameToggle, setUsernameToggle] = React.useState(0)
    const[emailToggle, setEmaiToggle] = React.useState(0)

    const updateProfileDetails = () => {
        console.log('updated successfully')
    }

    const nameHandleChange = (event:string) => {
        setUpdatedUsername(event)
    }

    const emailHandleChange = (event:any) => {
        setUpdatedEmail(event)
    }

    const editUsername = (value:number) => {
        setUsernameToggle(value)
    }

    return (
        <div className="profilePage">
            <article className="profilePageHeader">
                <button onClick={() => props.setDropDownItemId(0)}>back</button>
                <h3>Profile</h3>
                <button onClick={() => updateProfileDetails()}>Update</button>
            </article>
            <img className='profilePic' src={userImage} alt="profile" />
            <article className="detailsCard">
                <label>Name:</label>
                {
                    usernameToggle === 0 ?<article className='icon'><h3>{updatedUsername}</h3><img src={edit} onClick={() => editUsername(1)} alt="edit" className="editIcon"/></article>
                    : <article className="icon"><input type="text" value={updatedUsername} name="name" placeholder={props.currentUserDetails.name} onChange={(e) => nameHandleChange(e.target.value)} /><img src={done} onClick={() => editUsername(0)} alt="edit" className="editIcon"/></article>
                }
            </article>
            <article className="detailsCard">
                <label>Email:</label>
                {
                    emailToggle === 0 ?<article className="icon"><h3>{updatedEmail}</h3><img src={edit} onClick={() => setEmaiToggle(1)} alt="edit" className="editIcon"/></article>
                    : <article className="icon"><input type="text" value={updatedEmail} name="email" placeholder={props.currentUserDetails.email} onChange={(e) => emailHandleChange(e.target.value)} /><img src={done} onClick={() => setEmaiToggle(0)} alt="edit" className="editIcon"/></article>
                }
            </article>
        </div>
    )
}
