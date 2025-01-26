"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

export type Event = {
  id: number
  date: string
  doctorName: string
  place: string
}

export type Booking = {
  id: number
  eventId: number
  patientName: string
  patientAge: number
  patientGender: "M" | "F"
  patientMobile: string
  patientEmail: string
}

type EventContextType = {
  events: Event[]
  doctors: string[]
  bookings: Booking[]
  addEvent: (event: Omit<Event, "id">) => void
  editEvent: (id: number, updatedEvent: Omit<Event, "id">) => void
  deleteEvent: (id: number) => void
  addDoctor: (doctorName: string) => void
  addBooking: (booking: Omit<Booking, "id">) => void
}

const EventContext = createContext<EventContextType | undefined>(undefined)

export const useEvents = () => {
  const context = useContext(EventContext)
  if (!context) {
    throw new Error("useEvents must be used within an EventProvider")
  }
  return context
}

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [doctors, setDoctors] = useState<string[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    const storedEvents = localStorage.getItem("events")
    const storedDoctors = localStorage.getItem("doctors")
    const storedBookings = localStorage.getItem("bookings")
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents))
    }
    if (storedDoctors) {
      setDoctors(JSON.parse(storedDoctors))
    }
    if (storedBookings) {
      setBookings(JSON.parse(storedBookings))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events))
    localStorage.setItem("doctors", JSON.stringify(doctors))
    localStorage.setItem("bookings", JSON.stringify(bookings))
  }, [events, doctors, bookings])

  const addEvent = (event: Omit<Event, "id">) => {
    const newEvent = {
      ...event,
      id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
    }
    setEvents([...events, newEvent])
    addDoctor(event.doctorName)
  }

  const editEvent = (id: number, updatedEvent: Omit<Event, "id">) => {
    setEvents(events.map((event) => (event.id === id ? { ...updatedEvent, id } : event)))
    addDoctor(updatedEvent.doctorName)
  }

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const addDoctor = (doctorName: string) => {
    if (!doctors.includes(doctorName)) {
      setDoctors([...doctors, doctorName])
    }
  }

  const addBooking = (booking: Omit<Booking, "id">) => {
    const newBooking = {
      ...booking,
      id: bookings.length > 0 ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
    }
    setBookings([...bookings, newBooking])
  }

  return (
    <EventContext.Provider
      value={{ events, doctors, bookings, addEvent, editEvent, deleteEvent, addDoctor, addBooking }}
    >
      {children}
    </EventContext.Provider>
  )
}

