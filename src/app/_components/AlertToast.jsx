import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';


const AlertToast = ({message, showToast, setShowToast}) =>{

    useEffect(()=>{
        console.log(message);
        if(message){
            const timer = setTimeout(()=>{
                console.log(showToast)
                setShowToast(false)
            }, 2000)

            return () => clearTimeout(timer)
        }
    }, [showToast])

    return (

        <ToastContainer
            className="p-3"
            position='top-center'
            style={{ zIndex: 1, marginTop:"5rem" }}
        >
            <Toast show={showToast}>
                <Toast.Body style={{color:"black", textAlign:"center", backgroundColor:"white", borderRadius:'8px'}}>
                    {message}
                </Toast.Body>
            </Toast>
        </ToastContainer>

      );
    
}

export {AlertToast};