import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ViewStudents({ auth, students }) {
    const { confirmDelete } = usePage().props;

    const handleDelete = (id) => {
        if (confirmDelete) {
            if (window.confirm('Are you sure you want to delete this student?')) {
                Inertia.delete(route('admin.students.destroy', id));
            }
        } else {
            Inertia.delete(route('admin.students.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - View Students" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">All Student Registrations</h2>
                        <div className="flex justify-center">
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Home Address</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {students.length > 0 ? (
                                            students.map((student) => (
                                                <tr key={student.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.student_name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.home_address}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.phone_number}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{student.parent.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={route('admin.students.edit', student.id)} className="text-indigo-600 hover:text-indigo-900">
                                                            Edit
                                                        </Link>
                                                        <button onClick={() => handleDelete(student.id)} className="text-red-600 hover:text-red-900 ml-4">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No students found.
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
