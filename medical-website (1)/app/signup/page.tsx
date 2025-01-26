"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type UserType = "patient" | "organizer" | "doctor" | "clinic"

export default function SignupPage() {
  const [userType, setUserType] = useState<UserType>("patient")
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    city: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", { userType, ...formData })
    // After successful signup, redirect to login page
    router.push("/login")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-6">
          <Label className="text-base font-semibold mb-2 block">I am a:</Label>
          <RadioGroup
            value={userType}
            onValueChange={(value) => setUserType(value as UserType)}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="patient" id="patient" />
              <Label htmlFor="patient">Patient</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="organizer" id="organizer" />
              <Label htmlFor="organizer">Organizer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="doctor" id="doctor" />
              <Label htmlFor="doctor">Doctor</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="clinic" id="clinic" />
              <Label htmlFor="clinic">Clinic</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">
              {userType === "patient" ? "User Name" : `${userType.charAt(0).toUpperCase() + userType.slice(1)} Name`}
            </Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          {userType === "patient" && (
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" value={formData.age} onChange={handleInputChange} required />
            </div>
          )}

          {userType !== "patient" && (
            <>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={formData.address} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="mobile">Mobile No.</Label>
            <Input id="mobile" name="mobile" type="tel" value={formData.mobile} onChange={handleInputChange} required />
          </div>

          <div>
            <Label htmlFor="email">Email ID</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div>
            <Label htmlFor="password">Set Password (4 numbers)</Label>
            <Input
              id="password"
              name="password"
              type="password"
              pattern="\d{4}"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              pattern="\d{4}"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6">
          Sign Up
        </Button>
      </form>
    </div>
  )
}

