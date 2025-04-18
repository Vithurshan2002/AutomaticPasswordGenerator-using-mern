import React from 'react';
import './password.css';
import { useState } from 'react';

const Password = () => {

    const [passlength, setpasslength] = useState(8);
    const [uppercase, setuppercase] = useState(true);
    const [lowercase, setlowercase] = useState(true);
    const [symbol, setsymbol] = useState(true);
    const [number, setnumber] = useState(true);
    const [password, setpassword] = useState("");

    const [message, setmessage] = useState(true);
    const [time, setTime] = useState(30);

    const Generate = () => {
        let pass = "";
        if (uppercase) { pass += "ABCDEFGHIJKLMNOPQRSTUVWXYZ" }
        if (lowercase) { pass += "abcdefghijklmnopqrstuvwxyz" }
        if (number) { pass += "1234567890" }
        if (symbol) { pass += "!@#$%^&*()~" }
        let answer = ''
        /*   console.log(pass); */
        for (let x = 0; x < passlength; x++) {
            let randomindex = Math.floor(Math.random() * pass.length);
            answer += pass[randomindex];
        }
        setpassword(answer);

    }

    const Copy = () => {
        navigator.clipboard.writeText(password);
        alert("Coppied Successfully")
        setmessage(true);
        setpassword('');
    }

    const timeRunning = () => {
        setmessage(false);
        setTime(30);
        const interval = setInterval(() => {
            setTime((pre) => {
                if (pre <= 1) {
                    clearInterval(interval);
                    setmessage(true);
                    setpassword('');
                    return 0;

                }
                return pre - 1;
            });
        }, 1000);
    };



    return (
        <>
            <div className="maincontainer">
                <div className="subcontainer">
                    <h1>AUTOMATIC STRONG PASSWORD GENERATOR</h1>
                    <label for='html' className='password'>Password Length:</label>
                    <input type="number" className='pass' value={passlength} onChange={(e) => { setpasslength(e.target.value) }} />
                    <div className="section">
                        <div>
                            <input type="checkbox" checked={uppercase} onChange={(e) => { setuppercase(e.target.checked) }} />
                            <label for='html'>Include Uppercase</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={lowercase} onChange={(e) => { setlowercase(e.target.checked) }} />
                            <label for='html'>Include Lowercase</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={number} onChange={(e) => { setnumber(e.target.checked) }} />
                            <label for='html'>Include Numbers</label>
                        </div>
                        <div>
                            <input type="checkbox" checked={symbol} onChange={(e) => { setsymbol(e.target.checked) }} />
                            <label for='html'>Include Symbols</label>
                        </div>

                    </div>
                    <button className='btn1' onClick={() => { Generate(); timeRunning(); }}>Generate Password</button>
                    <div className="copy">
                        <input type="text" value={password} readOnly />
                        <button onClick={Copy}>Copy</button>
                    </div>
                    <div className='mess'>
                        {!message && <p>Copy the password : <span className='time'>{time} Sec</span></p>}
                    </div>



                </div>
            </div>

        </>
    )
}

export default Password;
