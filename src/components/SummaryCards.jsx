export default function SummaryCards({ summary }) {
  const items = [
    { key: 'present', label: 'Present', color: 'bg-green-100 text-green-700' },
    { key: 'absent', label: 'Absent', color: 'bg-red-100 text-red-700' },
    { key: 'late', label: 'Late', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'total_days', label: 'Total Days', color: 'bg-blue-100 text-blue-700' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {items.map((it) => (
        <div key={it.key} className={`rounded-xl border shadow-sm p-4 bg-white`}>
          <div className="text-sm text-gray-600">{it.label}</div>
          <div className={`inline-flex mt-2 px-3 py-1 rounded-md font-semibold ${it.color}`}>
            {summary ? summary[it.key] ?? 0 : 0}
          </div>
        </div>
      ))}
    </div>
  )
}
