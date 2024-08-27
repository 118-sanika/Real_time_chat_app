import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../component/Input/Input';
import Button from '../../component/Button';

const Form = ({ isSignInPage = true }) => {
    const [data, setData] = useState({
        ...(!isSignInPage && {
            fullName: ''
        }),
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleSignIn = () => {
        // Perform your sign-in logic (e.g., API call to authenticate the user)
        // For the sake of this example, we'll just set a dummy token
        localStorage.setItem('user:token', 'sample-token');
        // Redirect the user to the dashboard or any protected route
        navigate('/');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignInPage) {
            handleSignIn();
        } else {
            // Handle sign-up logic
            // On successful sign-up, you might want to set the token and redirect as well
            localStorage.setItem('user:token', 'sample-token');
            navigate('/');
        }
    };

    return (
        <div className="bg-light h-screen flex items-center justify-center">
            <div className="bg-white w-[600px] h-[700px] shadow-lg rounded-lg flex flex-col justify-center items-center">
                <div className="text-4xl font-extrabold">Welcome {isSignInPage && 'Back'}</div>
                <div className="text-xl font-light">
                    {isSignInPage ? 'Sign in to get explored' : 'Sign Up to get started'}
                </div>
                <form className="flex flex-col items-center w-full" onSubmit={handleSubmit}>
                    {!isSignInPage && (
                        <Input
                            label="Full Name"
                            name="name"
                            placeholder="Enter Your Full name"
                            className="mb-6"
                            value={data.fullName}
                            onChange={(e) => setData({ ...data, fullName: e.target.value })}
                        />
                    )}
                    <Input
                        label="Email address"
                        type="email"
                        name="email"
                        placeholder="Enter Your Email"
                        className="mb-6"
                        value={data.email}
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        className="mb-14"
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                    <div className="flex justify-center w-full">
                        <Button
                            label={isSignInPage ? 'Sign in' : 'Sign Up'}
                            type="submit"
                            className="w-1/2 mb-2"
                        />
                    </div>
                </form>
                <div>
                    {isSignInPage ? "Didn't have an account?" : "Already have an account?"}
                    <span
                        className="text-primary cursor-pointer underline"
                        onClick={() => navigate(isSignInPage ? '/users/sign_up' : '/users/sign_in')}
                    >
                        {isSignInPage ? 'Sign up' : 'Sign in'}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Form;
