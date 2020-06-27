import React from 'react'
import './styles.css'
import $ from 'jquery'

interface SearchUsersInterface {
    userList: {
        "company_name": number;
        "id": number;
        "user_mail": string;
        "user_name": string;
    }[],
    selectUsers: (index: number) => void,
    removeUserAmongTheSelectedParticipants: (index: number) => void,
    selectedUserList: number[],
    currentUserDetails: {
        company_id: number;
        email: string;
        id: number;
        name: string;
    }
}

export const SearchUsers:React.FC<SearchUsersInterface> = (props:SearchUsersInterface) => {
    const[userFilter, setUserFilter] = React.useState([...props.userList])

    const searchUserNameForTheGivenUserID = (userId:number):string => {
        let username:string = 'null'
        props.userList.map((userDetail,index):string => {
            if(userDetail.id === userId) {
                username = userDetail.user_name
            }       
            return 'null' 
        })
        return username
    }

    //The below 2 function are used to auto scroll down to the last userName in the Selected participants woindow
    const scrollToLastUserName = () => {
        var div = $("#userNames");
        div.scrollTop(div.prop('scrollHeight'));
    }
    
    $(function() {
        scrollToLastUserName();
    });

    const searchUsers = (event:any) => {
        setUserFilter(props.userList.filter(function(item){
           return item.user_name.toLowerCase().search(event) !== -1
        }))
    }

    return (
        <div className="SearchUserPanel">
            <h3 className="headerName">Selected Participants</h3>
            <article className="selectedUsersListPanel" id="userNames">
                {props.selectedUserList.map((user,index) => (
                    <article key={index} >
                        <button className="userNameCard">{searchUserNameForTheGivenUserID(user)}<span onClick={() => props.removeUserAmongTheSelectedParticipants(user)} >X</span></button>
                    </article>
                ))}
            </article>
            <h3 className="headerName">Select Participants</h3>
            <input type="text" placeholder="search" onChange={(e) => searchUsers(e.target.value)}/>
            <article className="usersListPanel">       
                {userFilter.map((user,index) => (
                    <article key={index} >
                        {user.user_name !== props.currentUserDetails.name 
                            ? <button className="userNameCard" onClick={() => props.selectUsers(user.id)}>{user.user_name}</button>
                            : ''
                        }
                    </article>
                ))}
            </article>

        </div>
    )
}
