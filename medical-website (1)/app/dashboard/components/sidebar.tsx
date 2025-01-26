"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LayoutDashboard, Users, Settings, UserSquare2, UserSquare, LogOut, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useEvents } from "../../contexts/EventContext"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Organizer", href: "/dashboard/organizer", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Staff", href: "/dashboard/staff", icon: UserSquare },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { doctors } = useEvents()

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userType")
    router.push("/")
  }

  return (
    <div className="flex min-h-0 w-64 flex-col bg-white border-r">
      <div className="p-4">
        <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium",
                isActive ? "bg-gray-100 text-blue-600" : "text-gray-700 hover:bg-gray-50 hover:text-blue-600",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </Link>
          )
        })}

        {/* Doctors List */}
        <div className="mt-4">
          <h3 className="px-3 text-sm font-semibold text-gray-500">Doctors</h3>
          <div className="mt-1 space-y-1">
            {doctors.map((doctor, index) => (
              <Link
                key={index}
                href={`/dashboard/doctors/${encodeURIComponent(doctor)}`}
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                <UserSquare2 className="mr-3 h-5 w-5 shrink-0" />
                {doctor}
              </Link>
            ))}
          </div>
        </div>
      </nav>
      <div className="border-t p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          Sign out
        </button>
      </div>
    </div>
  )
}

