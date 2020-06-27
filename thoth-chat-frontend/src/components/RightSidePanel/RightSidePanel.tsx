import * as React from 'react'
import './styles.css'
import { MessagePanel } from  '../MessagePanel/MessagePanel'
import { RightSidePanelHeader } from '../RightSidePanelHeader/RightSidePanelHeader'

import attachment from '../../assets/images/attachment.png'


interface RightSidePanelInterface {
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    },
    conversationId: number,
    socket: SocketIOClient.Socket
}

export const RightSidePanel:React.FC<RightSidePanelInterface> = (props:RightSidePanelInterface) => {
    
    const [textMessage, setTextMessage] = React.useState('')
    const [replySuggestion, setReplySuggestions] = React.useState<string[]>([]);
    const [dropDownItemId, setDropDownItemId] = React.useState<number>();
    const [isAttachmentReady, setIsAttachmentReady] = React.useState(false);
    const [isThereAnyAttachment, setisThereAnyAttachment] = React.useState(false);
    const [messageData, setMessageData] = React.useState<{
        content: string;
        conversation_id: number;
        sender_id: number;
        time_stamp: string;
        attachment_path:string;
    }[]>([])

    const[files, setFiles] = React.useState();
    const [fileContent, setFileContent] = React.useState({});

    React.useEffect(() => {
        fetch(`http://localhost:5000/conversation/${props.conversationId}`)
          .then(response => response.json())
          .then(response => {
              props.socket.emit('leave')
              props.socket.emit('join',JSON.stringify({"room_id":props.conversationId}))
              console.log(response)
            setMessageData(response)
          })
          .catch(error => console.log(error));
        
    }, [props.conversationId]);
    
    React.useEffect(() =>{
        if(messageData.length > 1) {
            messageSuggestion(messageData[messageData.length - 1].content)
          }else {
              messageSuggestion(' ')
          }
    },[messageData.length])

    // socket.on('received-message',function(data:any) {
    //     let newMessage = [...messageData]
    //     newMessage.push(data)
    //     //messageSuggestion(data.content)
    //     console.log(data)
    //     setMessageData(newMessage)
    //     //socket.off('chat')
    // });

    React.useEffect(() => {
        props.socket.on('chat',function(data:any) {
            console.log(data);
            setMessageData(data)
        });
    },[]);
    
    function handleChange(value:string) {
        setTextMessage(value)
    };

    const uploadFile = (event:any) => {
        
        setFiles(event.target.files[0].name)
        let reader = new FileReader();
        setisThereAnyAttachment(true)

        reader.onload = (event:any) => {
            console.log('naveen');
            console.log(event.target.result);
            setFileContent(event.target.result);
            setIsAttachmentReady(true)
        };

        reader.onerror = (event:any) => {
            console.log("Error" + event.target.error.code)
        };
        console.log('========================')
        console.log(event.target.files[0]);
        console.log('========================')

        reader.readAsArrayBuffer(event.target.files[0]);
    }

    function sendMessage(e:any) {
        console.log(files)
        if(isThereAnyAttachment && isAttachmentReady ){
            props.socket.emit('upload_attachments',{
                file:files,
                contents:fileContent,
                sender_id:props.currentUserDetails.id,
                conversation_id:props.conversationId,
                caption:'sent'
            })
        }else if(isThereAnyAttachment){
            prompt('Attachment is bein uploaded');
            setisThereAnyAttachment(false);
        }else {
            props.socket.emit('chat',JSON.stringify({"sender_id":props.currentUserDetails.id,"content":textMessage,"conversation_id":props.conversationId}));
            setTextMessage('');
            
        }
    };

    const setDropDownItemIdFunction = (id:number) => {
        setDropDownItemId(id);
    }
    //=============================================================================

    const suggestions = require('../../suggestions.json');

    const getIntent = (inputChatMessage:string) => {
        const payload = {
            q: inputChatMessage
        };

        return new Promise((resolve, reject) => {
            fetch('http://localhost:8000/parse',{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Accept":"application/json"
                },
                body:JSON.stringify(payload)
            })
            .then((response) => response.json())
            .then(response => {console.log(response.intent.name)
                resolve(response.intent.name)    
            })
            .catch((err:any) => {
                console.log('Error: ', err);
                reject('Error occured');
            });
        });
    };
    
    // min, max both inclusive
    const getRandomInt = ((min:any, max:any) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    });

    const getSuggestion = (intent:any, number:any) => {
        const suggestionsArrayLength = suggestions[intent][number].length;
        const randomIndex = getRandomInt(0, suggestionsArrayLength - 1);
        return suggestions[intent][number][randomIndex];
    };

    const getSuggestionsArray = (intent:any) => {
        const suggestionsArray = [];
        suggestionsArray.push(getSuggestion(intent, 'first'));
        suggestionsArray.push(getSuggestion(intent, 'second'));
        suggestionsArray.push(getSuggestion(intent, 'third'));
        return suggestionsArray;
    };

    const messageSuggestion = (message:string) => {
        getIntent(message).then((intent) => {
            let replySuggestions = [...getSuggestionsArray(intent)]
            setReplySuggestions(replySuggestions)
        }).catch((e) => {
        });
    };
//========================================================================
    return (
        <div className="rightSidePanel">
            <RightSidePanelHeader setDropDownItemId={setDropDownItemIdFunction} />
            <MessagePanel message={messageData} currentUserDetails={props.currentUserDetails} 
                    replySuggestion={replySuggestion} handleChange={handleChange} />
            <article className= " inputArea ">
                <input type="text" value={textMessage} autoFocus={true} placeholder="Type Message..." 
                                id= "userMessage" onChange={(e) =>handleChange(e.target.value)} />
                <label className="attachmentIcon">
                    <input type="file" onChange={(e) => uploadFile(e)} />
                    <img src={attachment} className="icon1" alt="attachment"/>
                </label>
                <input type="submit" id="sendbutton" onClick={(e) => sendMessage(e)} value="Send" />
            </article>
        </div>
    )
}
