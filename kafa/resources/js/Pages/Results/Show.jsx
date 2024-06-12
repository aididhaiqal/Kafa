import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, router } from "@inertiajs/react";

export default function Show({
  auth,
  student,
  results,
  start_date,
  end_date,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { data, setData, get, errors } = useForm({
    start_date: start_date || "",
    end_date: end_date || "",
  });

  const submit = (e) => {
    e.preventDefault();
    get(route("results.show", student.id));
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this result?")) {
      router.delete(route("teacher.results.destroy", id));
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Results" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Student Report
            </h2>
            <p>
              <strong>Student Name:</strong> {student.student_name}
            </p>
            <div className="flex items-center mt-4 space-x-4">
              <form onSubmit={submit} className="flex items-center space-x-4">
                <div>
                  <InputLabel htmlFor="start_date" value="Start Date" />
                  <TextInput
                    id="start_date"
                    name="start_date"
                    type="date"
                    value={data.start_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("start_date", e.target.value)}
                  />
                  <InputError message={errors.start_date} className="mt-2" />
                </div>
                <div>
                  <InputLabel htmlFor="end_date" value="End Date" />
                  <TextInput
                    id="end_date"
                    name="end_date"
                    type="date"
                    value={data.end_date}
                    className="mt-1 block w-full"
                    onChange={(e) => setData("end_date", e.target.value)}
                  />
                  <InputError message={errors.end_date} className="mt-2" />
                </div>
                <div className="mt-6">
                  <PrimaryButton type="submit">
                    Filter
                  </PrimaryButton>
                </div>
              </form>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold text-lg text-gray-800 leading-tight">
                Results
              </h3>
              <table className="min-w-full divide-y divide-gray-200 mt-2">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feedback
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentResults.length > 0 ? (
                    currentResults.map((result) => (
                      <tr key={result.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {result.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {result.grade}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {result.feedback}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 whitespace-nowrap text-center text-gray-500"
                      >
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <div className="mt-4 flex justify-center">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={`px-4 py-2 border ${
                      currentPage === index + 1
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
