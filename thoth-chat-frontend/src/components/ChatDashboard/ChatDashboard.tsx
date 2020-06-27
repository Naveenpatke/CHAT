import React from 'react'

import './styles.css'

import { SideBar } from '../SideBar/SideBar'
import { RightSidePanel } from '../RightSidePanel/RightSidePanel'
import { AddNewGroup } from '../AddNewGroup/AddNewGroup'
import { Profile } from '../Profile/Profile'

import { conversationDetails } from '../../constants/constants'

interface ChatDashboardInterface {
    retriveConversationID: (id: number) => void,
    conversationId: number,
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    },
    socket: SocketIOClient.Socket
}

export const ChatDashboard:React.FC<ChatDashboardInterface> = (props:ChatDashboardInterface) => {

    const [ dropdownSelectedItemId , setDropDownSelectedItemId ] = React.useState(0)
    const [userList, setUserList ] = React.useState([])
    const [counter, ] = React.useState(0)

    const setDropDownItemId = (index:number) => {
        setDropDownSelectedItemId(index)
    }

    const toggleSideBar = () => {
        switch (dropdownSelectedItemId) {
            case 0 :
                return <SideBar conversationDetails={conversationDetails} 
                            retriveConversationID={props.retriveConversationID} currentUserDetails={props.currentUserDetails} 
                                    conversationId={props.conversationId} setDropDownItemId={setDropDownItemId} />;
            case 1 : return <AddNewGroup setDropDownItemId={setDropDownItemId} userList = {userList} currentUserDetails={props.currentUserDetails} />;
            case 2 : return <Profile setDropDownItemId={setDropDownItemId} currentUserDetails={props.currentUserDetails} />
            default : return <div>Hi</div>;
        }
    }

    React.useEffect(() => {
        fetch('http://localhost:5000/users-list')
            .then(response => response.json())
            .then(response => {
                setUserList(response)
            })
            .catch(error => console.log(error))
    },[counter])

    return (
        <div className="chatDashBoard">
            {toggleSideBar()}
            <RightSidePanel conversationId={props.conversationId} currentUserDetails={props.currentUserDetails} socket={props.socket}/>  
        </div>
    )
}
