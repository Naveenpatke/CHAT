import * as React from 'react'
import { ProfileHeader } from '../ProfileHeader/ProfileHeader'
import { ConversationList } from '../ConversationList/ConversationList'
import './styles.css';

interface SideBarInterface {
    conversationDetails: {
        "conversation_id": number;
        "conversation_name": string;
    }[],
    retriveConversationID: (id: number) => void,
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    },
    conversationId: number,
    setDropDownItemId: (index: number) => void
}

export const SideBar:React.FC<SideBarInterface> = (props:SideBarInterface) => {
    return (
        <article className= " sideBar " >
            < ProfileHeader currentUserDetails={props.currentUserDetails} setDropDownItemId={props.setDropDownItemId} />
            < ConversationList conversationDetails={props.conversationDetails} retriveConversationID={props.retriveConversationID} currentUserId={props.currentUserDetails.id} conversationId={props.conversationId}/>          
        </article>
    )
}
