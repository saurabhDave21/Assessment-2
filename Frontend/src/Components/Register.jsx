import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import axios from 'axios';
const Register = ({ setUser }) => {

    return (
        <div className="min-h-screen flex items-start justify-center pt-12">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800">
                    Create Account
                </h1>

                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        role: 'Staff',
                        phone: '',
                        city: '',
                        country: ''
                    }}
                    validate={values => {
                        const errors = {};
                        const requiredFields = ['name', 'email', 'password', 'role', 'phone', 'city', 'country'];

                        requiredFields.forEach(field => {
                            if (!values[field]) {
                                errors[field] = 'Required';
                            }
                        });

                        if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }
                        if (values.password && !/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(values.password)) {
                            errors.password ='Password must be at least 8 characters, include one uppercase letter, and one special character';
                        }


                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting,resetForm }) => {
                        try {
                            const res = await axios.post("/api/users/register", values);
                            localStorage.setItem('token', res.data.token);
                            setUser(res.data)
                            resetForm();
                        } catch (error) {
                            console.error('Submission Error:', error);
                        } finally {
                            setSubmitting(false);
                        }
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <Field type="text" name="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <Field type="email" name="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field type="password" name="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                                <Field as="select" name="role" className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option value="Staff">Staff</option>
                                    <option value="Admin">Admin</option>
                                </Field>
                                <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <Field type="text" name="phone" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="phone" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* City */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <Field type="text" name="city" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="city" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Country */}
                            <div className="md:col-span-2">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                <Field type="text" name="country" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <ErrorMessage name="country" component="div" className="mt-1 text-sm text-red-600" />
                            </div>

                            {/* Submit Button */}
                            <div className="md:col-span-2 pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isSubmitting
                                        ? 'bg-gray-500 cursor-not-allowed'
                                        : 'bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 transition duration-150'
                                        }`}
                                >
                                    {isSubmitting ? 'Registering...' : 'Register'}
                                </button>
                                <div>
                                    <p className='text-center mt-2'>Alredy Have Account?<span className='text-zinc-500 underline ml-[2px] hover:no-underline'><Link to="/login ">Login</Link></span></p>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Register;