"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const images = [
  { src: "/placeholder.svg?height=400&width=800&text=Slide1", alt: "Medical equipment 1" },
  { src: "/placeholder.svg?height=400&width=800&text=Slide2", alt: "Medical equipment 2" },
  { src: "/placeholder.svg?height=400&width=800&text=Slide3", alt: "Medical equipment 3" },
]

export default function ImageSlider() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-[400px]">
      {images.map((image, index) => (
        <Image
          key={image.src}
          src={image.src || "/placeholder.svg"}
          alt={image.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  )
}

