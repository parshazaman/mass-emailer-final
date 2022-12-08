import React, {useState} from 'react';

import "../styles/Body.css";

const Body = () => {
    const [base64, setBase64] = useState('');
    const [userMessage, setUserMessage] = useState('');

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
                senderName: "ivanjohnmorales@gmail.com",
                senderEmail: ["yexovi9626@edinel.com", "ivanjohnmorales@gmail.com"],
                message: userMessage,
                base64Data: base64,
                date: new Date(),
                fileName: "TEST_FILE_NAME",
            })
        })
    }
    return (
        <div className='body'>
            <div className='container'>
                <h1>EMAILER</h1>
                <h3>Send out emails and attachments</h3>
                <form>
                    <input type='file' accept='application/pdf' onChange={onChange} />
                    <br></br>
                    <input type='text' onChange={onTextChange} />
                </form>
                <button className='button' onClick={handleSubmit}>SEND TO LAMBDA</button>
            </div>
        </div>
    );
};

export default Body;