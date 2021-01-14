import React from 'react'

 const Home = () =>{
     console.log(process.env.REACT_APP_FIREBASE_API_KEY);
    return (
        <div>
         <p>Home Page</p>   
        </div>
    )
}

export default Home;