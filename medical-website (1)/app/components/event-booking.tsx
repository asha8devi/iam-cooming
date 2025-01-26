"use client"

import { useState } from "react"
import { useEvents } from "../contexts/EventContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function EventBooking() {
  const { events, addBooking } = useEvents()
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [bookingForm, setBookingForm] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "M",
    patientMobile: "",
    patientEmail: "",
  })

  const handleBookEvent = (eventId: number) => {
    setSelectedEvent(eventId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedEvent) {
      addBooking({
        eventId: selectedEvent,
        patientName: bookingForm.patientName,
        patientAge: Number.parseInt(bookingForm.patientAge),
        patientGender: bookingForm.patientGender as "M" | "F",
        patientMobile: bookingForm.patientMobile,
        patientEmail: bookingForm.patientEmail,
      })
      setSelectedEvent(null)
      setBookingForm({
        patientName: "",
        patientAge: "",
        patientGender: "M",
        patientMobile: "",
        patientEmail: "",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Event Booking</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Doctor Name</TableHead>
            <TableHead>Place</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event.id}>
              <TableCell>{event.date}</TableCell>
              <TableCell>{event.doctorName}</TableCell>
              <TableCell>{event.place}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => handleBookEvent(event.id)}>
                      Book Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Book Appointment</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="patientName">Name</Label>
                        <Input
                          id="patientName"
                          name="patientName"
                          value={bookingForm.patientName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientAge">Age</Label>
                        <Input
                          id="patientAge"
                          name="patientAge"
                          type="number"
                          value={bookingForm.patientAge}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label>Gender</Label>
                        <RadioGroup
                          name="patientGender"
                          value={bookingForm.patientGender}
                          onValueChange={(value) => setBookingForm({ ...bookingForm, patientGender: value })}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="M" id="male" />
                            <Label htmlFor="male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="F" id="female" />
                            <Label htmlFor="female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div>
                        <Label htmlFor="patientMobile">Mobile</Label>
                        <Input
                          id="patientMobile"
                          name="patientMobile"
                          value={bookingForm.patientMobile}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="patientEmail">Email</Label>
                        <Input
                          id="patientEmail"
                          name="patientEmail"
                          type="email"
                          value={bookingForm.patientEmail}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <Button type="submit">Book Appointment</Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

