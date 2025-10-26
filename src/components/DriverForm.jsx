import { useState } from 'react'
import { Plus } from 'lucide-react'

export default function DriverForm({ onCreated, backendUrl }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseNo, setLicenseNo] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setLoading(true)
    try {
      const res = await fetch(`${backendUrl}/drivers`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, license_no: licenseNo })
      })
      if (!res.ok) throw new Error('Failed to create driver')
      await res.json()
      setName('')
      setPhone('')
      setLicenseNo('')
      onCreated && onCreated()
    } catch (err) {
      console.error(err)
      alert('Could not create driver')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border shadow-sm p-4">
      <h2 className="font-semibold text-gray-800 mb-3">Add a driver</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <input
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <input
          className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="License number"
          value={licenseNo}
          onChange={(e) => setLicenseNo(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 text-white font-medium px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          <span>{loading ? 'Saving...' : 'Add Driver'}</span>
        </button>
      </div>
    </form>
  )
}
