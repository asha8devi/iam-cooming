import { Button } from "@/components/ui/button"

export default function ActionButtons() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center space-x-4">
        <Button variant="outline">Free Camp</Button>
        <Button variant="outline">Visit Doctor</Button>
        <Button variant="outline">Clinic</Button>
      </div>
    </div>
  )
}

