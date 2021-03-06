import React, { useRef, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../Spinner';



function SignIn() {
  const { setLogged, loading, setLoading } = useAuth();
  const [error, setError] = useState('');

  const emailRef = useRef();
  const passwordRef = useRef();

  function handleSignIn(e) {
    setLoading(true);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const user = { email: email, password: password }

    fetch('https://eyafi.pythonanywhere.com/account/token/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        if (data.access) {

          setLogged({ refresh: data.refresh, access: data.access });
          localStorage.setItem("refresh", data.refresh);
          localStorage.setItem("access", data.access);
        } else {
          setError("ভুল হয়েছে");
        }
      });

    e.preventDefault();
  }

  return (
    <div className="bg-gray-50">

      {/* Nikah Basic Header */}
      <Header></Header>

      {/* login body */}
      <div className="container mx-auto">

        {/* login form */}
        <div className="bg-white lg:w-1/3 md:w-1/2 sm:w-full p-3 mx-auto">

          <h5 className="text-red-600 text-center text-3xl py-3 tarunya">প্রবেশ পাতা</h5>

          <div className="text-center bg-red-900 my-3 rounded-md text-white">
            <span className='m-3'>{error}</span>
          </div>

          <form autoComplete="off" onSubmit={handleSignIn}>

            <div className="p-3 my-3">
              <label htmlFor="email" className="font-semibold"><FontAwesomeIcon icon="at" /> ইমেইল</label>
              <input type="email" ref={emailRef} className="border w-full p-3 my-3 rounded" name="email" />
            </div>

            <div className="p-3 my-3">
              <label htmlFor="password" className="font-semibold">
                <FontAwesomeIcon icon="key" /> পাসওয়ার্ড
              </label>
              <input type="password" ref={passwordRef} className=" border w-full p-3 my-3" name="password" />
            </div>

            {loading ?
              <Spinner></Spinner>
              :
              <div className="text-center p-3 m-3">
                <button type="submit" className="bg-red-600 text-white shadow p-3 rounded-md">প্রবেশ</button>
              </div>
            }



          </form>

          <div className="text-center">
            <p>পাসওয়ার্ড ভুলে গেছেন?
              <Link to="/recovery">
                <span className="text-red-600 font-semibold"> পুনরুদ্ধার করুন</span>
              </Link>
            </p>
          </div>

          <div className="p-1 m-3 text-center">
            <p className="w3-center">অ্যাকাউন্ট নেই?
              <Link to="/signup"><span className="text-red-600 font-semibold"> নতুন অ্যাকাউন্ট</span></Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SignIn;