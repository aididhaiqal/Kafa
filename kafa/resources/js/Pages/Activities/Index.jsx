import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, activities }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="KAFA Activities" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">KAFA Activities</h2>
                        <div className="flex justify-center">
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tentative</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {activities.length > 0 ? (
                                            activities.map((activity) => (
                                                <tr key={activity.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityName}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityDescription}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityDate}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityTime}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityLocation}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.activityTentative}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.status}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{activity.details}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={route('activities.show', activity.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            View Details
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No activities found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
