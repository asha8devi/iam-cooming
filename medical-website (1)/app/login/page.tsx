"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const [mobileNo, setMobileNo] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // This is a mock authentication - in a real app, you would verify with your backend
    if (mobileNo === "1234567890" && password === "1234") {
      // Mock organizer login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "organizer")
      router.push("/") // Redirect to home page instead of dashboard
    } else if (mobileNo === "9876543210" && password === "1234") {
      // Mock doctor login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "doctor")
      router.push("/") // Redirect to home page instead of dashboard
    } else if (mobileNo === "5555555555" && password === "1234") {
      // Mock clinic login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "clinic")
      router.push("/") // Redirect to home page instead of dashboard
    } else if (mobileNo === "1111111111" && password === "1234") {
      // Mock patient login
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("userType", "patient")
      router.push("/") // Patients go to home page
    } else {
      setError("Invalid mobile number or password")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Log In</h1>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="mobileNo">Mobile Number (User ID)</Label>
            <Input
              id="mobileNo"
              type="tel"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
              placeholder="Enter your mobile number"
            />
          </div>
          <div>
            <Label htmlFor="password">Password (4 numbers)</Label>
            <Input
              id="password"
              type="password"
              pattern="\d{4}"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter 4-digit password"
            />
          </div>
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h2 className="font-semibold mb-2">Test Accounts:</h2>
          <ul className="space-y-2 text-sm">
            <li>Organizer: 1234567890 (pwd: 1234)</li>
            <li>Doctor: 9876543210 (pwd: 1234)</li>
            <li>Clinic: 5555555555 (pwd: 1234)</li>
            <li>Patient: 1111111111 (pwd: 1234)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

