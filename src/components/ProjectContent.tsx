'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { Project } from '@/types'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

export default function ProjectContent({ project, images }: { project: Project, images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const thumbsRef = useRef<HTMLDivElement | null>(null)

  const goPrev = () => setCurrentIndex((i) => (i - 1 + images.length) % images.length)
  const goNext = () => setCurrentIndex((i) => (i + 1) % images.length)

  const scrollThumbs = (dir: 'left' | 'right') => {
    const el = thumbsRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
  }

  if (!images?.length) return null

  return (
    <>
      {/* Gambar besar */}
      <div className="relative mb-4 rounded-xl overflow-hidden">
        <Image
          src={images[currentIndex]}
          alt={`${project.title} - image ${currentIndex + 1}`}
          width={1920}
          height={1080}
          className="w-full h-auto object-cover cursor-zoom-in"
          priority
          onClick={() => setIsOpen(true)}
        />

        {/* Panah kiri/kanan di gambar besar */}
        <button
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-700 hover:scale-110 transition"
          onClick={goPrev}
        >
          <ChevronLeft size={40} />
        </button>
        <button
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-700 hover:scale-110 transition"
          onClick={goNext}
        >
          <ChevronRight size={40} />
        </button>
      </div>

      {/* Baris thumbnail dengan slider yang scrollbar-nya di-hide */}
      {images.length > 1 && (
        <div className="relative">
          {/* Tombol geser kiri/kanan */}
          {/* <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 text-gray-200 hover:text-white px-1"
            onClick={() => scrollThumbs('left')}
          >
            <ChevronLeft size={28} />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 text-gray-200 hover:text-white px-1"
            onClick={() => scrollThumbs('right')}
          >
            <ChevronRight size={28} />
          </button> */}

          <div
            ref={thumbsRef}
            className="flex gap-3 overflow-x-auto pb-2 scroll-smooth snap-x hide-scrollbar"
          >
            {images.map((img, idx) => {
              const active = idx === currentIndex
              return (
                <button
                  key={img}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border 
                    ${active ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-300 dark:border-gray-600'}
                  `}
                >
                  <Image
                    src={img}
                    alt={`${project.title} thumbnail ${idx + 1}`}
                    fill
                    className={`object-cover ${active ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    sizes="128px"
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Modal zoom */}
      {isOpen && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    onClick={() => setIsOpen(false)}
  >
    <div
      className="relative max-w-6xl w-full p-4 flex flex-col items-center"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Area gambar dengan ukuran konsisten */}
      <div className="relative w-full max-w-5xl h-[80vh] bg-black rounded-lg overflow-hidden flex items-center justify-center">
        {/* Tombol kiri */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 hover:scale-110 transition"
          onClick={goPrev}
        >
          <ChevronLeft size={40} />
        </button>

        {/* Tombol kanan */}
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 hover:scale-110 transition"
          onClick={goNext}
        >
          <ChevronRight size={40} />
        </button>

        {/* Gambar */}
        <Image
          src={images[currentIndex]}
          alt="Zoomed"
          fill
          className="object-contain"
          sizes="(min-width: 1024px) 1024px, 100vw"
          priority
        />
      </div>

      {/* Tombol close */}
      <button
        className="absolute top-6 right-6 text-slate-500 hover:scale-110 transition"
        onClick={() => setIsOpen(false)}
      >
        <X size={32} />
      </button>
          </div>
        </div>
      )}
    </>
  )
}
