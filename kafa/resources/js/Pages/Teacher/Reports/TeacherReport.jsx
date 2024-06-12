import React from 'react';
import { Head } from "@inertiajs/react";
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function TeacherReport({ auth, results, start_date, end_date }) {
    const studentNames = Object.keys(results).map(key => results[key][0].student.student_name);
    const subjects = [...new Set(Object.keys(results).flatMap(key => results[key].map(r => r.subject)))];

    const data = {
        labels: studentNames,
        datasets: subjects.map(subject => ({
            label: subject,
            data: Object.keys(results).map(key => {
                const subjectResult = results[key].find(r => r.subject === subject);
                return subjectResult ? subjectResult.grade : 0;
            }),
            backgroundColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
            borderWidth: 1,
        })),
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Teacher Report" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                            Teacher Performance Report
                        </h2>
                        <p><strong>Period:</strong> {start_date} to {end_date}</p>
                        <div className="mt-4">
                            <Bar data={data} options={options} />
                        </div>
                        <div className="mt-4">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {Object.keys(results).length > 0 ? (
                                        Object.keys(results).map(studentId => (
                                            results[studentId].map(result => (
                                                <tr key={result.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.student.student_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.feedback}</td>
                                                </tr>
                                            ))
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                No results found for the specified period.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-4">
                            <PrimaryButton onClick={() => window.print()}>Print Report</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
