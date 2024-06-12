import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function Create({ auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    activityName: "",
    activityDescription: "",
    activityDate: "",
    activityTime: "",
    activityLocation: "",
    activityTentative: "",
    status: "planned",
    details: "",
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.activities.store"));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
      >
        Add New Activity
      </button>

      <Modal show={isOpen} onClose={closeModal}>
        <Head title="Admin - Add Activity" />
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="activityName" value="Activity Name" />
            <TextInput
              id="activityName"
              name="activityName"
              value={data.activityName}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityName", e.target.value)}
              required
            />
            <InputError message={errors.activityName} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="activityDescription" value="Description" />
            <TextInput
              id="activityDescription"
              name="activityDescription"
              value={data.activityDescription}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityDescription", e.target.value)}
              required
            />
            <InputError message={errors.activityDescription} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="activityDate" value="Date" />
            <TextInput
              id="activityDate"
              type="date"
              name="activityDate"
              value={data.activityDate}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityDate", e.target.value)}
              required
            />
            <InputError message={errors.activityDate} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="activityTime" value="Time" />
            <TextInput
              id="activityTime"
              type="time"
              name="activityTime"
              value={data.activityTime}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityTime", e.target.value)}
              required
            />
            <InputError message={errors.activityTime} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="activityLocation" value="Location" />
            <TextInput
              id="activityLocation"
              name="activityLocation"
              value={data.activityLocation}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityLocation", e.target.value)}
              required
            />
            <InputError message={errors.activityLocation} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="activityTentative" value="Tentative" />
            <TextInput
              id="activityTentative"
              name="activityTentative"
              value={data.activityTentative}
              className="mt-1 block w-full"
              onChange={(e) => setData("activityTentative", e.target.value)}
              required
            />
            <InputError message={errors.activityTentative} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="status" value="Status" />
            <TextInput
              id="status"
              name="status"
              value={data.status}
              className="mt-1 block w-full"
              onChange={(e) => setData("status", e.target.value)}
              required
            />
            <InputError message={errors.status} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="details" value="Details" />
            <TextInput
              id="details"
              name="details"
              value={data.details}
              className="mt-1 block w-full"
              onChange={(e) => setData("details", e.target.value)}
            />
            <InputError message={errors.details} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ms-4" disabled={processing}>
              Add Activity
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
