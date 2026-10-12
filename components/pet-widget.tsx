'use client'

import Image from 'next/image'
import { motion } from 'motion/react'

export function PetWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="hidden sm:flex absolute bottom-10 right-8 z-20 flex-col items-end gap-2 select-none"
    >
      {/* Welcome message */}
      <div className="border border-border bg-card/90 backdrop-blur-sm px-4 py-2 max-w-[200px] text-right">
        <p className="font-mono text-[11px] text-muted-foreground leading-relaxed">
          Welcome to{' '}
          <span className="text-primary font-semibold">Luis&apos;s</span>{' '}
          portfolio
        </p>
      </div>

      {/* Image frame */}
      <div className="animate-float border border-border bg-card/90 backdrop-blur-sm p-1 hover:border-primary transition-colors duration-300">
        <div className="relative w-48 h-48 overflow-hidden">
          <Image
            src="/mascota/03_pose3.webp"
            alt="mascota"
            fill
            sizes="192px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </motion.div>
  )
}
