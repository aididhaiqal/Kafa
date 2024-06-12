import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import Edit from '@/Pages/Profile/Edit';

export default function ViewParents({ auth, parents }) {
    const { confirmDelete } = usePage().props;

    const handleDelete = (id) => {
        if (confirmDelete) {
            if (window.confirm('Are you sure you want to delete this parent?')) {
                Inertia.delete(route('admin.parents.destroy', id));
            }
        } else {
            Inertia.delete(route('admin.parents.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Admin - View Parents" />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">All Parent Profiles</h2>
                        <div className="flex justify-center">
                            <div className="overflow-x-auto w-full">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {parents.length > 0 ? (
                                            parents.map((parent) => (
                                                <tr key={parent.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{parent.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{parent.email}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Edit parent={parent} />
                                                        <button onClick={() => handleDelete(parent.id)} className="text-red-600 hover:text-red-900 ml-4">
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No parents found.
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
