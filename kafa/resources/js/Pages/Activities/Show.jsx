import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, activity }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Activity Details" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">{activity.activityName}</h2>
                        <div>
                            <p><strong>Description:</strong> {activity.activityDescription}</p>
                            <p><strong>Date:</strong> {activity.activityDate}</p>
                            <p><strong>Time:</strong> {activity.activityTime}</p>
                            <p><strong>Location:</strong> {activity.activityLocation}</p>
                            <p><strong>Tentative:</strong> {activity.activityTentative}</p>
                            <p><strong>Status:</strong> {activity.status}</p>
                            <p><strong>Details:</strong> {activity.details}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
