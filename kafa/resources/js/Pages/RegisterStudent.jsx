import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function RegisterStudent({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        student_name: '',
        home_address: '',
        phone_number: '',
        email: '',
    });

    useEffect(() => {
        return () => {
            reset('student_name', 'home_address', 'phone_number', 'email');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('students.store'));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Register Student" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="student_name" value="Student Name" />
                    <TextInput
                        id="student_name"
                        name="student_name"
                        value={data.student_name}
                        className="mt-1 block w-full"
                        autoComplete="student_name"
                        isFocused={true}
                        onChange={(e) => setData('student_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.student_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="home_address" value="Home Address" />
                    <TextInput
                        id="home_address"
                        name="home_address"
                        value={data.home_address}
                        className="mt-1 block w-full"
                        autoComplete="home_address"
                        onChange={(e) => setData('home_address', e.target.value)}
                        required
                    />
                    <InputError message={errors.home_address} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone_number" value="Phone Number" />
                    <TextInput
                        id="phone_number"
                        name="phone_number"
                        value={data.phone_number}
                        className="mt-1 block w-full"
                        autoComplete="phone_number"
                        onChange={(e) => setData('phone_number', e.target.value)}
                        required
                    />
                    <InputError message={errors.phone_number} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
