import React from "react";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";

export default function PaymentForm({ payment = {}, parents = [], submitLabel, route }) {
  const { data, setData, post, put, processing, errors } = useForm({
    parent_id: payment.parent_id || "",
    payment_method: payment.payment_method || "",
    amount: payment.amount || "",
    status: payment.status || "pending",
  });

  const submit = (e) => {
    e.preventDefault();
    payment.id ? put(route) : post(route);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <InputLabel htmlFor="parent_id" value="Parent" />
        <SelectInput
          id="parent_id"
          name="parent_id"
          value={data.parent_id}
          className="mt-1 block w-full"
          onChange={(e) => setData("parent_id", e.target.value)}
          required
        >
          <option value="">Select Parent</option>
          {parents.map((parent) => (
            <option key={parent.id} value={parent.id}>
              {parent.name}
            </option>
          ))}
        </SelectInput>
        <InputError message={errors.parent_id} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="payment_method" value="Payment Method" />
        <TextInput
          id="payment_method"
          name="payment_method"
          value={data.payment_method}
          className="mt-1 block w-full"
          autoComplete="payment_method"
          isFocused={true}
          onChange={(e) => setData("payment_method", e.target.value)}
          required
        />
        <InputError message={errors.payment_method} className="mt-2" />
      </div>

      <div>
        <InputLabel htmlFor="amount" value="Amount" />
        <TextInput
          id="amount"
          name="amount"
          value={data.amount}
          className="mt-1 block w-full"
          type="number"
          step="0.01"
          onChange={(e) => setData("amount", e.target.value)}
          required
        />
        <InputError message={errors.amount} className="mt-2" />
      </div>

      <div>
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

      <div className="flex items-center justify-end">
        <PrimaryButton className="ml-4" disabled={processing}>
          {submitLabel}
        </PrimaryButton>
      </div>
    </form>
  );
}
