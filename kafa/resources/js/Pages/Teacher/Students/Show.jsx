import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Modal from '@/Components/Modal';

export default function Show({ auth, student, results }) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        grade: '',
        feedback: '',
    });

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('teacher.students.results.store', student.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Profile of ${student.student_name}`} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                            Profile of {student.student_name}
                        </h2>
                        <div className="mb-4">
                            <h3 className="font-semibold text-lg text-gray-800 leading-tight">Results</h3>
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
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {results.length > 0 ? (
                                            results.map((result) => (
                                                <tr key={result.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{result.feedback}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                                                    No results found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h3 className="font-semibold text-lg text-gray-800 leading-tight mb-4">Add New Result</h3>
                            <PrimaryButton onClick={openModal}>Add Result</PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={isOpen} onClose={closeModal}>
            <form onSubmit={submit}>
                    <div className="mb-4">
                        <InputLabel htmlFor="subject" value="Subject" />
                        <TextInput
                            id="subject"
                            name="subject"
                            value={data.subject}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('subject', e.target.value)}
                            required
                        />
                        <InputError message={errors.subject} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="grade" value="Grade" />
                        <TextInput
                            id="grade"
                            name="grade"
                            value={data.grade}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('grade', e.target.value)}
                            required
                        />
                        <InputError message={errors.grade} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <InputLabel htmlFor="feedback" value="Feedback" />
                        <TextInput
                            id="feedback"
                            name="feedback"
                            value={data.feedback}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('feedback', e.target.value)}
                        />
                        <InputError message={errors.feedback} className="mt-2" />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Add Result
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
