import { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function EditParent({ auth, parent }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, put, processing, errors, reset } = useForm({
    name: parent.name,
    email: parent.email,
  });

  useEffect(() => {
    return () => {
      reset("name", "email");
    };
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    put(route("admin.parents.update", parent.id));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
      >
        Edit
      </button>

      <Modal show={isOpen} onClose={closeModal}>
        <Head title="Admin - Edit Parent" />
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="name" value="Name" />
            <TextInput
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData("name", e.target.value)}
              required
            />
            <InputError message={errors.name} className="mt-2" />
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
              onChange={(e) => setData("email", e.target.value)}
              required
            />
            <InputError message={errors.email} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ms-4" disabled={processing}>
              Update
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
