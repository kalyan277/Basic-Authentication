import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
import { Button } from 'antd';
import {useSelector} from 'react-redux'
 const Register = ({history}) =>{
    const [email,setEmail]=useState('');
    const {user} = useSelector(state =>({...state}))
    useEffect(() => {
    if(user && user.token){
        history.push("/")
        }
    }, [user])
     const handleSubmit =async(e)=>{
         e.preventDefault();
         const config={
             url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
             handleCodeInApp:true
         }
         try {
            await auth.sendSignInLinkToEmail(email,config)
            toast.success(`Email is Sent to ${email}.
            Click the link to complete your registration.`);
            //Save User Email In Local Storage
            window.localStorage.setItem('emailForRegistration',email)
            setEmail("");
         } catch (error) {
             toast.error(error.message)
         }
       
  
     }
     const registerForm =()=>(
     <form onSubmit={handleSubmit}>
         <input type ="email" className="form-control"
         value ={email} 
         onChange={e=>setEmail(e.target.value)} 
         placeholder="Your Email"
         autoFocus/>
         <br />
            <Button 
         type="primary" className="mb-3"
         block shape="round"
         onClick={handleSubmit}
         size="large"
         disabled={!email}
         >Register
         </Button>
     </form>
     );
     
    return (
        <div className="container p-5">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h4>Register</h4>
                {registerForm()}
              </div>
          </div>
        </div>
    )
}

export default Register;
