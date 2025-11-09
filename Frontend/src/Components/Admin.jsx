import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { set } from "mongoose";
const Admin = ({ setUser }) => {
    const countries = [
        { code: 'IN', name: 'India', emoji: '🇮🇳' },
        { code: 'US', name: 'United States', emoji: '🇺🇸' },
        { code: 'GB', name: 'United Kingdom', emoji: '🇬🇧' },
        { code: 'CA', name: 'Canada', emoji: '🇨🇦' },
        { code: 'AU', name: 'Australia', emoji: '🇦🇺' },
        { code: 'DE', name: 'Germany', emoji: '🇩🇪' },
        { code: 'FR', name: 'France', emoji: '🇫🇷' },
        { code: 'JP', name: 'Japan', emoji: '🇯🇵' },
        { code: 'BR', name: 'Brazil', emoji: '🇧🇷' },
        { code: 'ZA', name: 'South Africa', emoji: '🇿🇦' }
    ];
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [filterd, setFilterd] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userCount, setUserCount] = useState({ total: 0, admin: 0, staff: 0 });
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/users/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = response.data || [];
                setUsers(userData);
                setFilterd(userData);
                // compute counts
                const stats = userData.reduce((acc, u) => {
                    acc.total += 1;
                    const r = (u.role || '').toString().trim().toLowerCase();
                    if (r === 'admin') acc.admin += 1;
                    if (r === 'staff') acc.staff += 1;
                    return acc;
                }, { total: 0, admin: 0, staff: 0 });
                setUserCount(stats);
                setLoading(false);
            } catch (err) {
                console.error('Error details:', err.response?.data || err.message); // Debug log
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    if (loading) {
        return (
            <Loading />
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-xl text-red-600">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                        <p className="text-gray-600 mt-2">Managing {userCount.total} users ({userCount.admin} admins, {userCount.staff} staff members)</p>
                    </div>
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            if (typeof setUser === 'function') setUser(null);
                            navigate('/login');
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                        <p className="text-3xl font-bold text-gray-800 mt-2">{userCount.total}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm font-medium">Admin Users</h3>
                        <p className="text-3xl font-bold text-green-600 mt-2">{userCount.admin}</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-gray-500 text-sm font-medium">Staff Users</h3>
                        <p className="text-3xl font-bold text-blue-600 mt-2">{userCount.staff}</p>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">User Management</h2>
                            <div className="grid grid-cols-2 grid-rows-1 gap-10">
                                <input
                                    type="text"
                                    placeholder="Name or Email to Search"
                                    className="border-2 border-gray w-full rounded"
                                    value={search}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setSearch(value);
                                        const replica = users.filter((user) => {
                                            return user.name.toLowerCase().includes(value.toLowerCase()) || user.email.toLowerCase().includes(value.toLowerCase())
                                        })

                                        setFilterd(replica);
                                    }}
                                />
                                <select
                                    id="country"
                                    name="country"
                                    value={selectedCountry || ''}
                                    onChange={(e) => {
                                        const countryValue = e.target.value;
                                        setSelectedCountry(countryValue);
                                        const filteredByCountry = users.filter((u) => {
                                            if (!countryValue) return true;
                                            return (u.country || '').toString().toLowerCase() === countryValue.toString().toLowerCase();
                                        });
                                        const textFiltered = filteredByCountry.filter((user) => {
                                            if (!search) return true;
                                            return user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase());
                                        });
                                        setFilterd(textFiltered);
                                    }}
                                    className="appearance-none w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                >
                                    <option value="" disabled>
                                        Select a country
                                    </option>
                                    {countries.map((c) => (
                                        <option key={c.code} value={c.name}>
                                            {`${c.emoji} ${c.name}`}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filterd.map((user, index) => (
                                        <tr key={user._id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                                                        <span className="text-sm font-medium text-gray-600">
                                                            {user.name?.[0]?.toUpperCase() || '?'}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                        <div className="text-sm text-gray-500">{user.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{user.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role.toLowerCase() === 'admin'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-blue-100 text-blue-800'
                                                    }`}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">{user.city}</div>
                                                <div className="text-sm text-gray-500">{user.country}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500">
                                                    <div>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>
                                                    <div className="text-xs text-gray-400">
                                                        {new Date(user.createdAt).toLocaleTimeString()}
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
