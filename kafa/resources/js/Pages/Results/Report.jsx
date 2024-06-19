import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Report({ auth, student, results, start_date, end_date }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Report for ${student.name}`} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                            Report for {student.student_name} from {start_date} to {end_date}
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Subject
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Feedback
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {results.length > 0 ? (
                                        results.map((result) => (
                                            <tr key={result.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{result.feedback}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{new Date(result.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
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
        </AuthenticatedLayout>
    );
}
