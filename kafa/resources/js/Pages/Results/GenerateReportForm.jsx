import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function GenerateReportForm({ auth, student }) {
    const { data, setData, post, processing, errors } = useForm({
        start_date: '',
        end_date: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('students.report', student.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title={`Generate Report for ${student.name}`} />
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
                            Generate Report for {student.name}
                        </h2>
                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="start_date" value="Start Date" />
                                <TextInput
                                    id="start_date"
                                    name="start_date"
                                    type="date"
                                    value={data.start_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.start_date} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="end_date" value="End Date" />
                                <TextInput
                                    id="end_date"
                                    name="end_date"
                                    type="date"
                                    value={data.end_date}
                                    className="mt-1 block w-full"
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    required
                                />
                                <InputError message={errors.end_date} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Generate Report
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
