import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";

export default function Dashboard({
  auth,
  studentsCount,
  activitiesCount,
  usersCount,
  recentStudents,
  recentActivities,
  recentUsers,
}) {
  return (
    <AuthenticatedLayout user={auth}>
      <Head title="Admin Dashboard" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-6">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Students
                </h3>
                <p className="text-2xl font-bold text-gray-800">{studentsCount}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Activities
                </h3>
                <p className="text-2xl font-bold text-gray-800">{activitiesCount}</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-medium text-gray-900">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-gray-800">{usersCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Recent Students
            </h2>
            {recentStudents.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentStudents.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{student.student_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(student.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No recent students.</p>
            )}
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-6">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Recent Activities
            </h2>
            {recentActivities.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivities.map((activity) => (
                    <tr key={activity.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{activity.activityName}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(activity.activityDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No recent activities.</p>
            )}
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h2 className="font-semibold text-xl text-gray-800 leading-tight mb-4">
              Recent Users
            </h2>
            {recentUsers.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{new Date(user.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-gray-500">No recent users.</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
