import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import { Menu } from 'antd';
import {  AppstoreOutlined,LogoutOutlined, SettingOutlined,UserOutlined,UserAddOutlined } from '@ant-design/icons';
import firebase from 'firebase'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
const { SubMenu,Item } = Menu;

const Header = ()=>{
const [current,setCurrent]=useState('home');
let dispatch =useDispatch();
let history =useHistory();
let {user} =useSelector((state)=>({...state}));
const handleClick =(e)=>{
    setCurrent(e.key);
}
const logout =()=>{
firebase.auth().signOut();
dispatch({
  type:'LOGOUT',
  payload:null
});
history.push('/login');
}

    return (
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Item key="home" icon={<AppstoreOutlined/>}>
            <Link to ="/"> Home</Link>
        </Item>
        {!user && (
            <Item key="register" icon={<UserAddOutlined/>} className="float-right">
                <Link to ="/register"> Register</Link>
            </Item>
        )}
        {!user && (
           <Item key="login" icon={<UserOutlined/>} className="float-right">
               <Link to ="/login">Login</Link>
           </Item>
        )}
       {user && (
        <SubMenu icon={<SettingOutlined />}
            title={user.email && user.email.split('@')[0]} 
            className="float-right">
            <Item key="setting:3">Option 3</Item>
            <Item key="setting:4">Option 4</Item>
            <Item icon={<LogoutOutlined/>} onClick={logout}>Logout</Item>
        </SubMenu>
        )}
      </Menu>
    );
  }    

export default Header;
 

  

