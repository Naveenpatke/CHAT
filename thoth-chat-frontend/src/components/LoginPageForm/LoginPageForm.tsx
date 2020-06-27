import React from 'react'

interface LoginPageFormInterface {
    fetchCurrentUserDetails: (userDetail: any) => void,
    pageIndexToggle: (index: number) => void
}


export const LoginPageForm:React.FC<LoginPageFormInterface> = (props:LoginPageFormInterface) => {
    const [email, setEmail ] = React.useState('')
    const [password, setPassword ] = React.useState('')
    
    const emailHandleChange = (event:string) => {
        setEmail(event)
    }

    const passwordHandleChange = (event:string) => {
        setPassword(event)
    }

    const handleSubmit = (event:any) => {
        event.preventDefault();
        loginSubmit()     
        props.pageIndexToggle(2)
        setEmail('')
        setPassword('')
    }


    const loginSubmit = () => {
        let url="http://127.0.0.1:5000/user_login"
        let data = {
            email : email,
            password : password
        }
        fetch(url,{
          method: 'POST',
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
           body:JSON.stringify(data)})
           .then(response => response.json())
           .then(response => {
               console.log(response)
               props.fetchCurrentUserDetails(response)
           })
           .catch(error => console.log(error))
    }
      
    return (
        <div className="authenticationPage">
            <article className="authenticationFormCardAlign">
                <h1>Login</h1>
                <form className="authenticationCard" onSubmit={handleSubmit}>
                    <article>
                        <label>Email:</label>
                        <input type="text" value={email} name="email" id="email" placeholder="Email" onChange={(e) => emailHandleChange(e.target.value)} />
                    </article>
                    <article>
                        <label>Password:</label>
                        <input type="password" value={password} name="Password" placeholder="password" onChange={(e) => passwordHandleChange(e.target.value)} />   
                    </article>
                    <input type="submit" value="Login" />
                </form>
                <article>
                    <hr />
                    <p>If you dont have a account then, <button onClick={() => props.pageIndexToggle(0)} >SignUp</button></p>
                </article>
            </article>
        </div>
    )
}
