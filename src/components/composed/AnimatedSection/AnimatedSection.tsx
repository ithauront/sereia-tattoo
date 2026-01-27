import { motion } from 'framer-motion'

import { ANIMATED_SECTION_POSITION_SLIDE } from '../../../utils/magicNumbers'

type AnimatedInfoSectionProps = {
  image: string
  imageAlt?: string
  text: string
  slideFrom?: 'left' | 'right'
}

export function AnimatedSection({
  image,
  imageAlt = 'section info image',
  text,
  slideFrom = 'left',
}: AnimatedInfoSectionProps) {
  const isLeft = slideFrom === 'left'

  return (
    <motion.div
      initial={{
        x: isLeft ? -ANIMATED_SECTION_POSITION_SLIDE : ANIMATED_SECTION_POSITION_SLIDE,
        opacity: 0,
      }}
      whileInView={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      viewport={{
        once: false,
        amount: 0.3,
      }}
      className="
            flex flex-col lg:flex-row
            gap-6
            px-4 sm:px-6 lg:px-8 py-8
            mx-auto my-6
            w-full max-w-5xl
            bg-white/10 backdrop-blur-md
            rounded-2xl shadow-xl border border-white/20
            "
    >
      {isLeft ? (
        <>
          <img
            src={image}
            alt={imageAlt}
            className="w-full sm:w-80 lg:w-96
                         h-60           
                         rounded-xl
                         object-cover
                         shrink-0
                         sm:mx-auto lg:mx-0"
          />
          <p className="text-sm leading-relaxed text-slate-900 text-justify">{text}</p>
        </>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-slate-900 text-justify">{text}</p>
          <img
            src={image}
            alt={imageAlt}
            className="w-full sm:w-80 lg:w-96
                         h-60           
                         rounded-xl
                         object-cover
                         shrink-0
                         sm:mx-auto lg:mx-0"
          />
        </>
      )}
    </motion.div>
  )
}
