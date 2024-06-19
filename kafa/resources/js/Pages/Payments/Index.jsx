import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";

export default function Index({ auth, payments }) {
  const { flash } = usePage().props;

  return (
    <AuthenticatedLayout user={auth}>
      <Head title="Payments" />

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Manage Payments
            </h2>

            {flash?.success && (
              <div className="mb-4 text-sm text-green-600">{flash.success}</div>
            )}

            {auth.user.role !== 'parent' && (
              <Link
                href={route("payments.create")}
                className="text-indigo-600 hover:text-indigo-900 mb-4 inline-block"
              >
                Add New Payment
              </Link>
            )}

            {payments.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {auth.user.role !== 'parent' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Parent
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Method
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      {auth.user.role !== 'parent' && (
                        <td className="px-6 py-4 whitespace-nowrap">{payment.parent.name}</td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">{payment.payment_method}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.amount}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{payment.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {auth.user.role !== 'parent' && (
                          <>
                            <Link
                              href={route("payments.edit", payment.id)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </Link>
                            <Link
                              href={route("payments.destroy", payment.id)}
                              method="delete"
                              as="button"
                              className="text-red-600 hover:text-red-900 ml-4"
                            >
                              Delete
                            </Link>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No payments found.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
