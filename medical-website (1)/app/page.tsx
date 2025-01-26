import { Suspense } from "react"
import Header from "./components/header"
import ImageSlider from "./components/image-slider"
import ActionButtons from "./components/action-buttons"
import EventBooking from "./components/event-booking"
import Footer from "./components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <ImageSlider />
        <ActionButtons />
        <Suspense fallback={<div>Loading...</div>}>
          <EventBooking />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

