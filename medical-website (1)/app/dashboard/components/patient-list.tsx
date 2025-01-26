"use client"

import { useState } from "react"
import { useEvents } from "../../contexts/EventContext"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Trash, FileText, Printer } from "lucide-react"

type BookingStatus = "Pending" | "Completed"

export function PatientList({ doctorName }: { doctorName?: string }) {
  const { events, bookings } = useEvents()
  const [statuses, setStatuses] = useState<Record<number, BookingStatus>>({})

  const filteredBookings = doctorName
    ? bookings.filter((booking) => {
        const event = events.find((e) => e.id === booking.eventId)
        return event && event.doctorName === doctorName
      })
    : bookings

  const toggleStatus = (bookingId: number) => {
    setStatuses((prevStatuses) => ({
      ...prevStatuses,
      [bookingId]: prevStatuses[bookingId] === "Completed" ? "Pending" : "Completed",
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Patient List {doctorName ? `for ${doctorName}` : ""}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Trash className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <FileText className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Printer className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="rounded-lg border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>S.no.</TableHead>
              <TableHead>User</TableHead>
              <TableHead>M/F</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Mobile</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking, index) => {
              const event = events.find((e) => e.id === booking.eventId)
              const status = statuses[booking.id] || "Pending"
              return (
                <TableRow key={booking.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{booking.patientName}</TableCell>
                  <TableCell>{booking.patientGender}</TableCell>
                  <TableCell>{booking.patientAge}</TableCell>
                  <TableCell>{booking.patientMobile}</TableCell>
                  <TableCell>{booking.patientEmail}</TableCell>
                  <TableCell>{event?.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch checked={status === "Completed"} onCheckedChange={() => toggleStatus(booking.id)} />
                      <Badge variant={status === "Completed" ? "default" : "secondary"}>{status}</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

