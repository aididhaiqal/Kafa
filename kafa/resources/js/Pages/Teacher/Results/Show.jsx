import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Show({ auth, result }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Result Details" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Result Details</h2>
                        <div>
                            <p><strong>Student Name:</strong> {result.student.student_name}</p>
                            <p><strong>Subject:</strong> {result.subject}</p>
                            <p><strong>Grade:</strong> {result.grade}</p>
                            <p><strong>Feedback:</strong> {result.feedback}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
