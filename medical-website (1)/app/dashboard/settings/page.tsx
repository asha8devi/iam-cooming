"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEvents, type Event } from "../../contexts/EventContext"

export default function SettingsPage() {
  const { events, addEvent, editEvent, deleteEvent } = useEvents()
  const [newEvent, setNewEvent] = useState<Omit<Event, "id">>({ date: "", doctorName: "", place: "" })
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)

  const handleAddOrUpdateEvent = () => {
    if (editingEvent) {
      editEvent(editingEvent.id, newEvent)
      setEditingEvent(null)
    } else {
      addEvent(newEvent)
    }
    setNewEvent({ date: "", doctorName: "", place: "" })
  }

  const handleEditClick = (event: Event) => {
    setEditingEvent(event)
    setNewEvent({ date: event.date, doctorName: event.doctorName, place: event.place })
  }

  const handleDeleteClick = (id: number) => {
    deleteEvent(id)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Home Page Booking Table</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          placeholder="Date"
        />
        <Input
          type="text"
          value={newEvent.doctorName}
          onChange={(e) => setNewEvent({ ...newEvent, doctorName: e.target.value })}
          placeholder="Doctor Name"
        />
        <Input
          type="text"
          value={newEvent.place}
          onChange={(e) => setNewEvent({ ...newEvent, place: e.target.value })}
          placeholder="Place"
        />
        <Button onClick={handleAddOrUpdateEvent}>{editingEvent ? "Update Event" : "Add Event"}</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Doctor Name</TableHead>
              <TableHead>Place</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.doctorName}</TableCell>
                <TableCell>{event.place}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(event)}>
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDeleteClick(event.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

