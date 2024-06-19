import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function CreateResult({ auth, students }) {
    const { data, setData, post, processing, errors } = useForm({
        student_id: '',
        subject: '',
        grade: '',
        feedback: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('teacher.results.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Teacher - Add Result" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="student_id" value="Student" />
                    <SelectInput
                        id="student_id"
                        name="student_id"
                        value={data.student_id}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('student_id', e.target.value)}
                        required
                    >
                        <option value="">Select a student</option>
                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.student_name}
                            </option>
                        ))}
                    </SelectInput>
                    <InputError message={errors.student_id} className="mt-2" />
                </div>

                <div className="mt-4">
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

                <div className="mt-4">
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

                <div className="mt-4">
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

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Add Result
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
