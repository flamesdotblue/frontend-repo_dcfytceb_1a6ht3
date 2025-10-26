import { Calendar, User } from 'lucide-react'

export default function Header() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Driver Attendance</h1>
        <p className="text-gray-600 mt-1">Simple daily tracking for your drivers</p>
      </div>
      <div className="hidden sm:flex items-center gap-3 text-gray-700 bg-white border rounded-lg px-3 py-2 shadow-sm">
        <User className="w-4 h-4" />
        <span className="text-sm font-medium">Manage drivers</span>
        <span className="w-px h-4 bg-gray-200" />
        <Calendar className="w-4 h-4" />
        <span className="text-sm font-medium">Mark attendance</span>
      </div>
    </div>
  )
}
