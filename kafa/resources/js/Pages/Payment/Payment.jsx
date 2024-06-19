import React, { useState } from "react";
import Modal from "@/Components/Modal";
import { Head, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

export default function CreatePayment({ auth }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    amount: "",
    date: "",
    paymentType: "e-wallet",
    userId: auth.user.id,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route("admin.payments.store"));
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
        Add New Payment
      </button>

      <Modal show={isOpen} onClose={closeModal}>
        <Head title="Admin - Add Payment" />
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="amount" value="Amount" />
            <TextInput
              id="amount"
              name="amount"
              value={data.amount}
              className="mt-1 block w-full"
              onChange={(e) => setData("amount", e.target.value)}
              required
            />
            <InputError message={errors.amount} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="date" value="Date" />
            <TextInput
              id="date"
              type="date"
              name="date"
              value={data.date}
              className="mt-1 block w-full"
              onChange={(e) => setData("date", e.target.value)}
              required
            />
            <InputError message={errors.date} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="paymentType" value="Payment Type" />
            <select
              id="paymentType"
              name="paymentType"
              value={data.paymentType}
              className="mt-1 block w-full"
              onChange={(e) => setData("paymentType", e.target.value)}
              required
            >
              <option value="e-wallet">E-Wallet</option>
              <option value="credit card">Credit Card</option>
            </select>
            <InputError message={errors.paymentType} className="mt-2" />
          </div>

          <div className="mt-4">
            <InputLabel htmlFor="userId" value="User ID" />
            <TextInput
              id="userId"
              name="userId"
              value={data.userId}
              className="mt-1 block w-full"
              readOnly
            />
            <InputError message={errors.userId} className="mt-2" />
          </div>

          <div className="flex items-center justify-end mt-4">
            <PrimaryButton className="ms-4" disabled={processing}>
              Add Payment
            </PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
