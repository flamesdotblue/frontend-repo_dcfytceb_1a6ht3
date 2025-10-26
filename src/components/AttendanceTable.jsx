export default function AttendanceTable({ records, driversById }) {
  return (
    <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b flex items-center justify-between">
        <h2 className="font-semibold text-gray-800">Attendance records</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="text-left px-4 py-2">Date</th>
              <th className="text-left px-4 py-2">Driver</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-center text-gray-500" colSpan={4}>No records found</td>
              </tr>
            )}
            {records.map((r) => (
              <tr key={r.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 text-gray-800">{r.date}</td>
                <td className="px-4 py-2">{driversById[r.driver_id]?.name || r.driver_id}</td>
                <td className="px-4 py-2">
                  <span className={
                    r.status === 'present' ? 'inline-flex items-center px-2 py-1 rounded-md bg-green-100 text-green-700' :
                    r.status === 'absent' ? 'inline-flex items-center px-2 py-1 rounded-md bg-red-100 text-red-700' :
                    'inline-flex items-center px-2 py-1 rounded-md bg-yellow-100 text-yellow-700'
                  }>
                    {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                  </span>
                </td>
                <td className="px-4 py-2 text-gray-700">{r.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
