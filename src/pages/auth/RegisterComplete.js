import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
 const RegisterComplete = ({history}) =>{
     const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');
      useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'))
      },[])
     const handleSubmit =async(e)=>{
       e.preventDefault();
       if(!email || !password){
           toast.error("Email And Password Is Required");
           return;
       }
       if(password.length < 6){
           toast.error("Password Must Be At Least Character Long");
           return;
       }
       try {
           const result =await auth.signInWithEmailLink(
               email,
               window.location.href
           )
           if(result.user.emailVerified){
               window.localStorage.removeItem("emailForRegistration")
               let user =auth.currentUser
               await user.updatePassword(password);
               const idTokenResult =await user.getIdTokenResult();
               history.push('/')
            }
       } catch (error) {
           toast.error(error.message)
       }
     }
     const completeRegistrationForm =()=>(
     <form onSubmit={handleSubmit}>
         <input type ="email" className="form-control"
         value ={email} 
         onChange={e=>setEmail(e.target.value)} 
         autoFocus disabled/>
          <input type ="password" className="form-control"
         value ={password} 
         onChange={e=>setPassword(e.target.value)} 
         autoFocus/>
         <button type="submit" className="btn btn-raised">Register</button>
     </form>
     );
     
    return (
        <div className="container p-5">
          <div className="row">
              <div className="col-md-6 offset-md-3">
                  <h4>Complete Registration </h4>
                {completeRegistrationForm()}
              </div>
          </div>
        </div>
    )
}

export default RegisterComplete;
