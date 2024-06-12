import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, students, upcomingActivities }) {
  const [openStudentId, setOpenStudentId] = useState(null);
  const [openActivityId, setOpenActivityId] = useState(null);

  const toggleStudent = (studentId) => {
    setOpenStudentId(openStudentId === studentId ? null : studentId);
  };

  const toggleActivity = (activityId) => {
    setOpenActivityId(openActivityId === activityId ? null : activityId);
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Parent Dashboard" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Student Results
            </h2>
            {students.length > 0 ? (
              students.map((student) => (
                <div key={student.id} className="mb-4">
                  <div
                    onClick={() => toggleStudent(student.id)}
                    className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-medium text-gray-900">
                      {student.student_name}
                    </h3>
                  </div>
                  {openStudentId === student.id && (
                    <div className="mt-2">
                      {student.results.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
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
                            {student.results.map((result) => (
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
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-gray-500">No results found.</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No students found.</p>
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
                  <li key={activity.id} className="py-4">
                    <div
                      onClick={() => toggleActivity(activity.id)}
                      className="cursor-pointer bg-gray-100 p-4 rounded-lg shadow-md flex justify-between items-center"
                    >
                      <div>
                        <svg
                          className="h-6 w-6 text-blue-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-6 8h.01M12 14h.01M16 14h.01M12 18h.01M16 18h.01M8 18h.01M4 18h.01M4 14h.01M4 10h.01M4 6h.01M8 14h.01M4 4h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z"
                          />
                        </svg>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.activityName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(activity.activityDate).toLocaleDateString()}{" "}
                          at {activity.activityTime}
                        </p>
                        <p className="text-sm text-gray-500">
                          {activity.activityLocation}
                        </p>
                      </div>
                      <div>
                        {openActivityId === activity.id ? (
                          <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                    {openActivityId === activity.id && (
                      <div className="mt-2 p-4 bg-gray-50 rounded-lg shadow-inner">
                        <p className="text-sm text-gray-900">
                          <strong>Description:</strong>{" "}
                          {activity.activityDescription}
                        </p>
                        <p className="text-sm text-gray-900">
                          <strong>Tentative:</strong>{" "}
                          {activity.activityTentative}
                        </p>
                      </div>
                    )}
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
