import React from 'react'

import './styles.css'
import { SearchUsers } from '../SearchUsers/SearchUsers'
interface AddNewGroupInterface {
    setDropDownItemId: (index: number) => void,
    userList: {
        "company_name": number;
        "id": number;
        "user_mail": string;
        "user_name": string;
    }[],
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    }
}

export const AddNewGroup:React.FC<AddNewGroupInterface> = (props:AddNewGroupInterface) => {
    
    const[selectedUserList, setSelectedUserList ] = React.useState<number[]>([])
    const[groupName, setGroupName ] = React.useState('')
    const [onsubmit, setOnSubmit ] = React.useState(0)

    function removeUserAmongTheSelectedParticipants(index:number){
        let newList = [...selectedUserList]
        let indexId = newList.indexOf(index)
        newList.splice(indexId, 1)
        setSelectedUserList(newList)
    }

    function selectUsers(userId:number) {
        let newList = [...selectedUserList]
        if(newList.indexOf(userId) === -1 ) {
            newList.push(userId)
            setSelectedUserList(newList)
        }
    }

    function handleGroupName(event:string) {
        setGroupName(event)
    }

    function createGroup() {
        selectedUserList.push(props.currentUserDetails.id)
        console.log(groupName)
        console.log(selectedUserList)
        setOnSubmit(1)
        let groupDetails = {
            room_name : groupName,
            user_ids : selectedUserList
        }
        fetch("http://localhost:5000/create_room",{
            method: 'POST',
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body:JSON.stringify(groupDetails)})
            .then(response => console.log(response))

    }


    return (
        <div className="AddNewGroupSideBar">
            <article className="AddGroupPageHeader">
                <button onClick={() => props.setDropDownItemId(0)}>back</button>
                <h3>Add Group Details</h3>
                <button onClick={() => createGroup()}>Create</button>
            </article>
            {
                onsubmit === 0 ? 
                    <article className="groupDetailsForm">
                        <label className="labelTag">Enter Group Name:</label>
                        <input type="text" name="groupName" placeholder="Enter Group Name" onChange={(e) => handleGroupName(e.target.value)} />
                        < SearchUsers userList={props.userList} selectUsers={selectUsers} 
                            removeUserAmongTheSelectedParticipants={removeUserAmongTheSelectedParticipants} selectedUserList={selectedUserList}
                            currentUserDetails={props.currentUserDetails} />
                    </article>
                    :
                    <article>
                        <h1>Group Created successfully</h1>
                    </article>
            }
        </div>
    )
}
