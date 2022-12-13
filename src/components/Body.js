import React, {useState} from 'react';

import "../styles/Body.css";
import logo from '../images/mass-emailer-logo.png'

const Body = () => {
    const [base64, setBase64] = useState('');
    const [userMessage, setUserMessage] = useState('');
    const [sendToEmail, setSendToEmail] = useState([]);

    const onChange = (e) => {
        const files = e.target.files;
        const file = files[0];
        getBase64(file)
    }

    const onTextChange = (e) => {
        const inputMessage = e.target.value;
        setUserMessage(inputMessage);
        console.log(userMessage)
    }

    const onEmailChange = (e) => {
        const receiverEmail = e.target.value;
        let receiverEmailArray = receiverEmail.split(', ');
        console.log(receiverEmailArray)
        setSendToEmail(receiverEmailArray)
        console.log(sendToEmail)

    }

    const onLoad = (fileString) => {
        setBase64(fileString)
    }

    const getBase64 = (file) => {
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            onLoad(reader.result)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('https://yus2gvnsgk.execute-api.us-east-1.amazonaws.com/sendEmail', {
            mode: "no-cors",
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senderName: "MassEmailerService@gmail.com",
                senderEmail: sendToEmail,
                message: userMessage,
                base64Data: base64,
                date: new Date(),
                fileName: "TEST_FILE_NAME",
            })
        })
    }
    return (
        <div className='body'>
            <div className='title'>
            </div>
            <div className='container'>
                <h3 className='subtitle'>Send out emails and attachments</h3>
                <form>
                    <input className='file-input' type='file' accept='application/pdf' onChange={onChange} />
                    <br></br>
                    <input placeholder='Enter email to send to' onChange={onEmailChange}></input>
                    <textarea className='input-field' rows="2" cols="40" placeholder="Enter a message" onChange={onTextChange}></textarea>
                </form>
                <button className='button' onClick={handleSubmit}>SEND TO LAMBDA</button>
            </div>
        </div>
    );
};

export default Body;