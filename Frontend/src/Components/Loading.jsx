import React from 'react'

const Loading = () => {
  return (
     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
                <div className="w-full max-w-7xl">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="animate-pulse">
                            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                                <div className="h-20 bg-gray-200 rounded"></div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></th>
                                            <th className="px-6 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></th>
                                            <th className="px-6 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></th>
                                            <th className="px-6 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></th>
                                            <th className="px-6 py-3"><div className="h-4 bg-gray-200 rounded w-20"></div></th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {Array.from({ length: 6 }).map((_, i) => (
                                            <tr key={i}>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center">
                                                        <div className="h-10 w-10 rounded-full bg-gray-200 mr-3"></div>
                                                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                                                <td className="px-6 py-4"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default Loading