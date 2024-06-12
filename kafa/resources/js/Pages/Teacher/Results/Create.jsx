import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import SelectInput from '@/Components/SelectInput';

export default function CreateModal({ auth, student }) {
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        student_id: student.id,
        subject: '',
        grade: '',
        feedback: '',
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('teacher.results.store',), {
            onSuccess: (page) => {
                const newResult = page.props.results.find(r => r.id === data.student_id);
                onResultAdded(newResult);
                setSuccessMessage('Result added successfully.');
                closeModal();
            }
        });
    };

    return (
        <>
            <button onClick={openModal} className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block">
                Add New Result
            </button>

            <Modal show={isOpen} onClose={closeModal}>
                <Head title="Teacher - Add Result" />
                <form onSubmit={submit}>
                    <input type="hidden" name="student_id" value={student.id} />

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
                        <SelectInput
                            id="grade"
                            name="grade"
                            value={data.grade}
                            className="mt-1 block w-full"
                            onChange={(e) => setData('grade', e.target.value)}
                            required
                        >
                            <option value="">Select Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                            <option value="E">E</option>
                            <option value="F">F</option>
                        </SelectInput>
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
            </Modal>
        </>
    );
}
