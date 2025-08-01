'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '@/types'; // tambahkan ini di atas

export default function ProjectContent({ project, images }: { project: Project, images: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState<string | null>(null)

  return (
    <>
  {/* Gambar utama (pertama) */}
  {images.length > 0 && (
    <div
      className="relative mb-6 border-2 border-transparent hover:border-green-500 rounded-xl overflow-hidden cursor-zoom-in"
      onClick={() => {
        setIsOpen(true)
        setCurrentImg(images[0])
      }}
    >
      <Image
        src={images[0]}
        alt={`${project.title} Main Image`}
        width={1200}
        height={800}
        className="object-cover w-full h-auto rounded-xl"
        priority
      />
    </div>
  )}

  {/* Gambar-gambar kecil di bawah */}
  {images.length > 1 && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {images.slice(1).map((img, idx) => (
        <div
          key={img}
          className="relative border-2 border-transparent hover:border-green-500 rounded-xl overflow-hidden cursor-zoom-in"
          onClick={() => {
            setIsOpen(true)
            setCurrentImg(img)
          }}
        >
          <Image
            src={img}
            alt={`${project.title} Thumbnail ${idx + 2}`}
            width={300}
            height={200}
            className="object-cover w-full h-32 md:h-40 rounded-xl"
          />
        </div>
      ))}
    </div>
  )}

  {/* Zoom View */}
  {isOpen && currentImg && (
    <div
    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
    onClick={() => setIsOpen(false)}
  >
    <div className="relative max-w-5xl w-full p-4">
      {/* Tombol panah kiri tanpa background */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-4xl font-bold z-10 hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation()
          const currentIndex = images.indexOf(currentImg)
          const prevIndex = (currentIndex - 1 + images.length) % images.length
          setCurrentImg(images[prevIndex])
        }}
      >
        &#8592;
      </button>

      {/* Tombol panah kanan tanpa background */}
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-700 text-4xl font-bold z-10 hover:scale-110 transition"
        onClick={(e) => {
          e.stopPropagation()
          const currentIndex = images.indexOf(currentImg)
          const nextIndex = (currentIndex + 1) % images.length
          setCurrentImg(images[nextIndex])
        }}
      >
        &#8594;
      </button>

      {/* Gambar besar */}
      <Image
        src={currentImg}
        alt="Zoomed"
        width={1600}
        height={900}
        className="w-full h-auto rounded-lg"
      />
        <button
          className="absolute top-4 right-4 text-slate-700 text-3xl font-bold"
          onClick={(e) => {
            e.stopPropagation()
            setIsOpen(false)
          }}
        >
          &times;
        </button>
      </div>
    </div>
  )}
</>
  )
}
