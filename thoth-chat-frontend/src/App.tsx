import React from 'react';
import './App.css';

import { ChatDashboard } from './components/ChatDashboard/ChatDashboard';
import { SignUpForm } from './components/SignUpForm/SignUpForm';
import { LoginPageForm } from './components/LoginPageForm/LoginPageForm';

import io from 'socket.io-client';
const socket = io('http://localhost:5000');

const App: React.FC = () => {

  const [conversationId, setConversationId ] = React.useState(0)
  const [currentUserDetails, setCurrentUserDetails] = React.useState({
    "company_id": 0 ,
    "email": '',
    "id": 0,
    "name":''
  })
  const[pageIndex, setPageIndex] = React.useState(0)

  const retriveConversationID = (id:number) => {
    setConversationId(id)
  }

  console.log(conversationId)
  
  const fetchCurrentUserDetails = (userDetail:any) => {
    setCurrentUserDetails(userDetail)
  }

  if(currentUserDetails.email.length > 0){
    console.log(currentUserDetails) 
  }
  
  const pageIndexToggle = (index:number) => {
    setPageIndex(index)
  }

  const togglePages = () => {
    switch(pageIndex){
      case 0 : 
        return <SignUpForm pageIndexToggle={pageIndexToggle} />;
      case 1:
        return <LoginPageForm fetchCurrentUserDetails={fetchCurrentUserDetails} pageIndexToggle={pageIndexToggle} />;
      case 2:
        return currentUserDetails.email.length > 0 ? <ChatDashboard retriveConversationID={retriveConversationID} conversationId={conversationId} currentUserDetails={currentUserDetails} socket={socket} /> 
            : <div><p>wrong Email or password</p></div>; 
    }
  }

  return (
    <div className="App">
      {togglePages()}
    </div>
  );
}

export default App;
