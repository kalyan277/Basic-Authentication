import React, { Fragment,useEffect } from 'react';
import {Switch,Route} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import Header from './components/nav/Header';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RegisterComplete from './pages/auth/RegisterComplete';
import Home from './pages/Home';
import {auth} from './firebase'
import {useDispatch} from 'react-redux';
import ForgotPassword from './pages/auth/ForgotPassword';

const App=()=> {
  const dispatch =useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user)=>{
      if(user){
        const idTokenResult =await user.getIdTokenResult()
        dispatch({
          type:'LOGGED_IN_USER',
          payload:{
            email:user.email,
            token:idTokenResult.token,
          },
        });
      }
    })
    return () => unsubscribe
  }, [])
  return (
    <Fragment>
      <Header/>
       <ToastContainer/>
       <Switch>
        <Route path ='/' exact component={Home}/>
        <Route path ='/login' component={Login}/>
        <Route path ='/register' exact component={Register}/>
        <Route path ='/register/complete' component={RegisterComplete}/>
         <Route path ='/forgot/password' component={ForgotPassword}/>
      </Switch>
    </Fragment>
  
  );
}

export default App;
