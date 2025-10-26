import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import DriverForm from './components/DriverForm'
import AttendanceControls from './components/AttendanceControls'
import AttendanceTable from './components/AttendanceTable'
import SummaryCards from './components/SummaryCards'

function formatToday() {
  const d = new Date()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${d.getFullYear()}-${m}-${day}`
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:8000` : '')

export default function App() {
  const [drivers, setDrivers] = useState([])
  const [selectedDriverId, setSelectedDriverId] = useState('')
  const [date, setDate] = useState(formatToday())
  const [records, setRecords] = useState([])
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(false)

  const driversById = useMemo(() => Object.fromEntries(drivers.map(d => [d.id, d])), [drivers])

  const loadDrivers = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/drivers`)
      const data = await res.json()
      setDrivers(data)
      if (!selectedDriverId && data.length > 0) setSelectedDriverId(data[0].id)
    } catch (e) {
      console.error(e)
    }
  }

  const loadRecords = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (date) params.set('date', date)
      if (selectedDriverId) params.set('driver_id', selectedDriverId)
      const res = await fetch(`${BACKEND_URL}/attendance?${params.toString()}`)
      const data = await res.json()
      setRecords(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const loadSummary = async () => {
    if (!selectedDriverId) { setSummary(null); return }
    try {
      const res = await fetch(`${BACKEND_URL}/attendance/summary?driver_id=${selectedDriverId}`)
      const data = await res.json()
      setSummary(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadDrivers()
  }, [])

  useEffect(() => {
    loadRecords()
    loadSummary()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDriverId, date])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-4">
            <AttendanceControls
              backendUrl={BACKEND_URL}
              drivers={drivers}
              selectedDriverId={selectedDriverId}
              onSelectDriver={setSelectedDriverId}
              date={date}
              onChangeDate={setDate}
              onMarked={() => { loadRecords(); loadSummary(); }}
            />
            <AttendanceTable records={records} driversById={driversById} />
          </div>
          <div className="space-y-4">
            <DriverForm backendUrl={BACKEND_URL} onCreated={loadDrivers} />
            <SummaryCards summary={summary} />
          </div>
        </div>

        {loading && (
          <div className="fixed bottom-4 right-4 bg-white/90 border rounded-lg px-4 py-2 shadow-md text-sm text-gray-700">Loading...</div>
        )}
      </div>
    </div>
  )
}
