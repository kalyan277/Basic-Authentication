import React,{useState,useEffect} from 'react'
import {toast} from 'react-toastify';
import { auth } from '../../firebase';
import { Button } from 'antd';
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

const ForgotPassword =({history})=>{
    const [email,setEmail]=useState('')
    const [loading,setLoading]=useState(false)
    const {user} = useSelector(state =>({...state}))
    useEffect(() => {
    if(user && user.token){
        history.push("/")
        }
    }, [user])
    const handleSubmit = async(e)=>{
        e.preventDefault();
         const config={
             url:process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
             handleCodeInApp:true
         }
         try {
            await auth.sendPasswordResetEmail(email,config)
            setEmail('');
            setLoading(false);
            toast.success("Check Your Email For Password Reset Link")
         } catch (error) {
             toast.error(error.message)
         }

    }
    return(
        <div className="container col-md-6 offset-md-3 p-5">
            {loading ? 
            (<h4 className="text-danger">Loading...</h4>):
            (<h4>Forgot Password</h4>
            )}
            <form onSubmit={handleSubmit}>
                <input type ="email" className="form-control"
                value={email}
                placeholder="Type Your Email"
                autoFocus
                onChange={(e)=> setEmail(e.target.value)}></input>
                <br/>
                <button className="btn btn-raised" disabled={!email}>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default ForgotPassword;