import React from 'react'
import './styles.css'
import userImage from '../../assets/images/userImage.png'
import receiverImage from '../../assets/images/receiverImage.png'
import $ from 'jquery'

interface MessagePanelInterface {
    message: {
        "content": string;
        "conversation_id": number;
        "sender_id": number;
        "time_stamp": string;
        "attachment_path":string;
    }[],
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    },
    replySuggestion: string[],
    handleChange: (value: string) => void
}

export const MessagePanel:React.FC<MessagePanelInterface> = (props:MessagePanelInterface) => {
    
    //The below 2 function are used to auto scroll down to the last message whenever the MessagePanel component is rendered
    const getMessages = () => {
        var div = $("#messages");
        div.scrollTop(div.prop('scrollHeight'));
    }
    
    $(function() {
        getMessages();
    });
    
    return (
        <div className="MessagePannel" id="messages">
            <article className="message">
                
                {props.message.length === 0 ? <h2>Welcome...</h2> : 
                        props.message.map((msg,index) => (
                    <article key={index}>
                        {/* if condition to sort the received message between the sender and the receiver */}
                        {msg.sender_id === props.currentUserDetails.id ? 
                            <article className="container">
                                <p></p>
                                <article className='messageFieldOfCurrentUser'>
                                   <article className="currentUserImageAndMessage">
                                    <p >{msg.content} </p>
                                        <img src={userImage} alt="Avatar" className="rightSideImage" />
                                   </article>
                                    <span className="time-left">{msg.time_stamp}</span> 
                                </article>
                            </article>
                            :
                            <article className="container darker">
                                <article className="receivedMessageField">
                                    <img src={receiverImage} alt="Avatar" className="leftSideDate" />
                                    <article>
                                        <p >{msg.content}</p>
                                        <span className="time-left">{msg.time_stamp}</span>                            
                                    </article>
                                </article>
                            </article>
                        }    
                    </article>        
                ))}
            </article>
            <article className='suggestionBox'>
                {props.replySuggestion.map((message, index) => (
                    <button className='suggestionMessagesButton' key ={index} onClick={() => props.handleChange(message)}>{message}</button>
                ))}
            </article>
        </div>
    )
}




                    