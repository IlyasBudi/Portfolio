'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Project } from '@/types'; // tambahkan ini di atas

export default function ProjectContent({ project, images }: { project: Project, images: string[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState<string | null>(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {images.map((img, idx) => (
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
              alt={`${project.title} ${images.length > 1 ? `Image ${idx + 1}` : ''}`}
              width={600}
              height={400}
              className="object-cover w-full h-auto"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>

      {isOpen && currentImg && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative max-w-5xl w-full p-4">
            <Image
              src={currentImg}
              alt="Zoomed"
              width={1600}
              height={900}
              className="w-full h-auto rounded-lg"
            />
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold"
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
