import { useState, useEffect } from 'react'
import { Check, X, Clock } from 'lucide-react'

function formatToday() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

export default function AttendanceControls({
  backendUrl,
  drivers,
  selectedDriverId,
  onSelectDriver,
  date,
  onChangeDate,
  onMarked
}) {
  const [status, setStatus] = useState('present')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setStatus('present')
    setNotes('')
  }, [selectedDriverId, date])

  const handleMark = async (e) => {
    e.preventDefault()
    if (!selectedDriverId) {
      alert('Select a driver first')
      return
    }
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver_id: selectedDriverId, date, status, notes })
      })
      if (!res.ok) throw new Error('Failed to mark attendance')
      await res.json()
      onMarked && onMarked()
    } catch (err) {
      console.error(err)
      alert('Could not mark attendance')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleMark} className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="font-semibold text-gray-800 mb-3">Mark attendance</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
        <select
          value={selectedDriverId || ''}
          onChange={(e) => onSelectDriver(e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select driver</option>
          {drivers.map(d => (
            <option key={d.id} value={d.id}>{d.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          max={formatToday()}
          onChange={(e) => onChangeDate(e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="late">Late</option>
        </select>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Notes (optional)"
          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 text-white font-medium px-4 py-2 hover:bg-green-700 disabled:opacity-50"
        >
          {status === 'present' && <Check className="w-4 h-4" />}
          {status === 'absent' && <X className="w-4 h-4" />}
          {status === 'late' && <Clock className="w-4 h-4" />}
          <span>{loading ? 'Saving...' : 'Save'}</span>
        </button>
      </div>
    </form>
  )
}
