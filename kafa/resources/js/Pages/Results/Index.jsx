import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ auth, results }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Student Results" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">Student Results</h2>
                        <div className="flex justify-center">
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {results.length > 0 ? (
                                            results.map((result) => (
                                                <tr key={result.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.student.student_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.feedback}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={route('results.show', result.student_id)} className="text-indigo-600 hover:text-indigo-900">
                                                            View Details
                                                        </Link>
                                                        <Link href={route('results.report', result.student_id)} className="text-indigo-600 hover:text-indigo-900 ml-4">
                                                            Generate Report
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No results found.
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
