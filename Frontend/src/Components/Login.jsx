// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
const Login = ({setUser}) => {
    const navigate = useNavigate();
    return (
    
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        
        
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
            <h1 className="text-3xl font-bold text-center text-gray-800">
                Login
            </h1>
            
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                        errors.email = 'Email is required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                
                    try {
                        const res = await axios.post("/api/users/login", values);
                        localStorage.setItem('token', res.data.token);
                        console.log(res.data);
                        setUser(res.data)
                            if (res.data.role.toLowerCase() === 'admin') {
                                navigate('/admin');
                            } else {
                                navigate('/');
                            }
                    } catch (error) {
                        console.error('Login Failed:', error);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        
                        {/* Email Field Group */}
                        <div>
                            <label 
                                htmlFor="email" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>
                            <Field 
                                type="email" 
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="off"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                            />
                            <ErrorMessage 
                                name="email" 
                                component="div" 
                                className="mt-1 text-sm text-red-600"
                            />
                        </div>
                        
                        {/* Password Field Group */}
                        <div>
                            <label 
                                htmlFor="password" 
                                className="block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>
                            <Field 
                                type="password" 
                                name="password"
                                placeholder="••••••••"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150"
                            />
                            <ErrorMessage 
                                name="password" 
                                component="div" 
                                className="mt-1 text-sm text-red-600"
                            />
                        </div>
                        
                       
                        <button 
                            type="submit" 
                            disabled={isSubmitting}
                            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                                isSubmitting 
                                    ? 'bg-gray-500 cursor-not-allowed' 
                                    : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150'
                            }`}
                        >
                            {isSubmitting ? 'Logging in...' : 'Log In'}
                        </button>
                        <div>
                            <p className='text-center mt-2'>Create Account?<span className='text-zinc-500 underline ml-[2px] hover:no-underline'><Link to="/register ">Signup</Link></span></p>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </div>
    
) };
export default Login;