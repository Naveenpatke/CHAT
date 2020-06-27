import React from 'react'

import './styles.css'

interface SignUpFormInterface {
    pageIndexToggle: (index: number) => void
}

export const SignUpForm:React.FC<SignUpFormInterface> = (props:SignUpFormInterface) => {
    const [companyName, setCompanyName ] = React.useState('')
    const [userName, setUserName ] = React.useState('')
    const [email, setEmail ] = React.useState('')
    const [password, setPassword ] = React.useState('')
    const [confirmPassword, setConfirmPassword ] = React.useState('')

    function companyNameHandleChange(event:string) {
        setCompanyName(event)
    }

    function userNameHandleChange(event:string) {
        setUserName(event)
    }

    function emailHandleChange(event:string) {
        setEmail(event)
    }

    function passwordHandleChange(event:string) {
        setPassword(event)
    }

    function confirmPasswordHandleChange(event:string) {
        setConfirmPassword(event)
    }

    function handleSubmit(event:any) {
        console.log(companyName)
        console.log(userName)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        props.pageIndexToggle(1)
        event.preventDefault();
        submit()
        setCompanyName('')
        setUserName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
    }

    const submit = () => {
        let url="http://localhost:5000/user_register"
        let data = {
            username : userName,
            email : email,
            password : password,
            company_name : companyName
        }
        fetch(url,{
          method: 'POST',
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
           body:JSON.stringify(data)})
           .then(response => console.log(response))
    }

    return (
        <div className="authenticationPage">
            <article className="authenticationFormCardAlign">
                <h1>SignUp</h1>
                <form className="authenticationCard" onSubmit={handleSubmit}>
                    <article>
                        <label>Company Name:</label>
                        <input type="text" value={companyName} name="companyName" placeholder="Company Name" onChange={(e) => companyNameHandleChange(e.target.value)} />
                    </article>
                    <article>
                        <label>UserName:</label>
                        <input type="text" value={userName} name="userName" placeholder="UserName" onChange={(e) => userNameHandleChange(e.target.value)} />
                    </article>
                    <article>
                        <label>Email:</label>
                        <input type="text" value={email} name="email" placeholder="Email" onChange={(e) => emailHandleChange(e.target.value)} />
                    </article>
                    <article>
                        <label>Password:</label>
                        <input type="password" value={password} name="password" placeholder="Password" onChange={(e) => passwordHandleChange(e.target.value)} />
                    </article>
                    <article>
                        <label>Confirm Password:</label>
                        <input type="password" value={confirmPassword} name="confirmPassword" placeholder="Confirm Password" onChange={(e) => confirmPasswordHandleChange(e.target.value)} />
                    </article>
                    <input type="submit" value="SignUp" />
                </form>
                <article>
                    <hr/>
                    <p>Already have a account then, <button onClick={() => props.pageIndexToggle(1)}>Login</button></p>
                </article>
            </article>
        </div>
    )
}
