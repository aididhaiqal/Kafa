import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function Dashboard({ auth, recentResults, upcomingActivities }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleGenerateReport = (e) => {
    e.preventDefault();
    window.location.href = route("teacher.report", {
      start_date: startDate,
      end_date: endDate,
    });
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Teacher Dashboard" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Generate Student Performance Report
            </h2>
            <form onSubmit={handleGenerateReport} className="flex items-center space-x-4">
              <div>
                <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  id="start_date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="end_date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mt-6">
                <PrimaryButton type="submit">Generate Report</PrimaryButton>
              </div>
            </form>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Recent Student Performance
            </h2>
            {recentResults.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
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
                  {recentResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{result.student_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.grade}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{result.feedback}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No recent student performance data available.</p>
            )}
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Upcoming Activities
            </h2>
            {upcomingActivities.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {upcomingActivities.map((activity) => (
                  <li key={activity.id} className="py-4 flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{activity.name}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleDateString()} at {activity.time}
                      </p>
                      <p className="text-sm text-gray-500">{activity.location}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No upcoming activities.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
