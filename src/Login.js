import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 
// import { auth } from './firebase';
import {getAuth,  createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";

const Login = () => {
    const navigate = useNavigate(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const watchEmail = (e) => {
        setEmail(e.target.value);
    };

    const register = (e) => {
        e.preventDefault();

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                if (auth) {
                    // Navigate to home page after successful registration
                    navigate('/');
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const signIN = (e) => {
        e.preventDefault();

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((auth) => {
                if (auth) {
                    // Navigate to home page after successful registration
                    navigate('/');
                }
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <div className="login flex h-screen flex-col items-center">
            <Link to="/">
                <img
                    className="login__logo w-24 object-contain my-5 mx-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    alt="Amazon Logo"
                />
            </Link>

            <div className="login__container w-80 h-fit flex flex-col border-2 border-gray-400 border-solid p-5">
                <h1 className="font-medium mb-5">Sign-in</h1>

                <form>
                    <h5 className="mb-1">E-mail</h5>
                    <input
                        type="text"
                        className="h-8 mb-3 bg-white w-full"
                        value={email}
                        onChange={watchEmail}
                    />

                    <h5 className="mb-1">Password</h5>
                    <input
                        type="password"
                        className="h-8 mb-3 bg-white w-full"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="login__signInButton bg-buttonBg w-full rounded-sm border-boderColor border-2 border-solid mt-3 h-8"
                        onClick={signIN}
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-4 text-xs">
                    By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button
                    className="login__registerButton w-full rounded-sm h-8 border-solid mt-3 border-gray-500 border-2"
                    onClick={register}
                >
                    Create your Amazon Account
                </button>
            </div>
        </div>
    );
};

export default Login;
