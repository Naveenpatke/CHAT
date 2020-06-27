import React from 'react'
import './styles.css'

interface ConversationListInterface {
    conversationDetails: {
        "conversation_id": number;
        "conversation_name": string;
    }[],
    retriveConversationID: (id: number) => void,
    currentUserId: number,
    conversationId: number
}

export const ConversationList:React.FC<ConversationListInterface> = (props:ConversationListInterface) => {
    const [conversationList, setConversationList] = React.useState(props.conversationDetails)
    
    React.useEffect(() => {
        fetch(`http://localhost:5000/list-rooms/${props.currentUserId}`)
          .then(response => response.json())
          .then(response => {
            setConversationList(response);
             console.log(response)
          })
          .catch(error => console.log(error));
      }, [props.currentUserId]);

    const conversationId = (index:number) => {
        props.retriveConversationID(index)    
    }
    
    return (
        <div className=' ConversationList'>
            {conversationList.length === 0? <h2>Welcome...</h2>: conversationList.map((region,index) => (
                <h3 className='sessionName' key={index} onClick={() => conversationId(region.conversation_id)}>{region.conversation_name}</h3>
            ))}
        </div>
    )
}
