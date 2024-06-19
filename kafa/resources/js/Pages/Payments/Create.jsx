import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import PaymentForm from "@/Components/PaymentForm";

export default function Create({ auth }) {
  return (
    <AuthenticatedLayout user={auth}>
      <Head title="Create Payment" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Create Payment
            </h2>
            <PaymentForm submitLabel="Create Payment" route={route("payments.store")} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
