import { EventProvider } from "./contexts/EventContext"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <EventProvider>{children}</EventProvider>
      </body>
    </html>
  )
}

