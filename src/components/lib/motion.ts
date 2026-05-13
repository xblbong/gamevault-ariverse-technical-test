import type { Variants, Transition } from 'framer-motion'

export const easings = {
  outExpo:  [0.16, 1, 0.3, 1]    as const, // Snappy, premium feel
  outBack:  [0.34, 1.56, 0.64, 1] as const, // Springy, playful (hover cards)
  inOut:    [0.4, 0, 0.2, 1]      as const, // Standard Material-style
  spring:   [0.175, 0.885, 0.32, 1.275] as const, // Bouncy
} as const
 
/* ================================================================
   PAGE TRANSITIONS
   Gunakan di setiap page.tsx untuk transisi antar halaman.
 
   Usage:
     <motion.main
       variants={pageVariants}
       initial="initial"
       animate="animate"
       exit="exit"
     >
   ================================================================ */
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 16,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: easings.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.2,
      ease: easings.inOut,
    },
  },
}
 
/* ================================================================
   STAGGER CONTAINER — Game Grid parent
   Triggers staggerChildren so each GameCard enters one after another.
 
   Usage:
     <motion.div variants={staggerContainer} initial="initial" animate="animate">
       {games.map(game => (
         <motion.div key={game.id} variants={cardVariants}>
           <GameCard game={game} />
         </motion.div>
       ))}
     </motion.div>
   ================================================================ */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.06,  // Delay between each GameCard
      delayChildren:   0.1,   // Delay before first card appears
    },
  },
}
 
/* ================================================================
   CARD ITEM VARIANTS — Each GameCard in stagger grid
   Pair with staggerContainer on the parent element.
   ================================================================ */
export const cardVariants: Variants = {
  initial: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: easings.outExpo,
    },
  },
}
 
/* ================================================================
   CARD HOVER — GameCard hover state
   Use with motion.div whileHover / initial="rest" / whileHover="hover"
 
   Usage:
     <motion.div
       variants={cardHoverVariants}
       initial="rest"
       whileHover="hover"
       whileTap={{ scale: 0.98 }}
     >
   ================================================================ */
export const cardHoverVariants = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -4,
    transition: {
      duration: 0.25,
      ease: easings.outBack,
    },
  },
}
 
/* ================================================================
   FADE IN — Element yang masuk tanpa pergerakan vertikal
   ================================================================ */
export const fadeInVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: easings.inOut },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
}
 
/* ================================================================
   FADE UP — Subtle entry dari bawah (default untuk sebagian besar elemen)
   ================================================================ */
export const fadeUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: easings.outExpo,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.2 },
  },
}
 
/* ================================================================
   SCALE IN — Muncul dengan efek pop (modal, dropdown, badge)
   ================================================================ */
export const scaleInVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.92,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: easings.outBack,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
}
 
/* ================================================================
   SLIDE IN FROM LEFT — FilterPanel mobile drawer
   ================================================================ */
export const slideInLeft: Variants = {
  initial: { x: '-100%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: easings.outExpo },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.25, ease: easings.inOut },
  },
}
 
/* ================================================================
   HERO BANNER CONTENT — Stagger untuk elemen teks di hero
   Gunakan heroContainerVariants di parent, heroItemVariants di tiap child.
 
   Usage:
     <motion.div variants={heroContainerVariants} initial="initial" animate="animate">
       <motion.span variants={heroItemVariants}>Genre Badge</motion.span>
       <motion.h1 variants={heroItemVariants}>Game Title</motion.h1>
       <motion.p variants={heroItemVariants}>Description</motion.p>
       <motion.div variants={heroItemVariants}>CTA Buttons</motion.div>
     </motion.div>
   ================================================================ */
export const heroContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren:   0.25,
    },
  },
}
 
export const heroItemVariants: Variants = {
  initial: { opacity: 0, x: -30 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easings.outExpo,
    },
  },
}
 
/* ================================================================
   WISHLIST BUTTON — Toggle add/remove animation
   ================================================================ */
export const wishlistButtonVariants = {
  idle: { scale: 1 },
  tap: { scale: 0.85 },
  added: {
    scale: [1, 1.25, 0.95, 1.05, 1],
    transition: {
      duration: 0.4,
      ease: easings.outBack,
      times: [0, 0.4, 0.6, 0.8, 1],
    },
  },
}
 
/* ================================================================
   TOAST NOTIFICATION — Muncul dari bawah
   ================================================================ */
export const toastVariants: Variants = {
  initial: { opacity: 0, y: 60, scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: easings.outBack },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: { duration: 0.2, ease: easings.inOut },
  },
}
 
/* ================================================================
   INFINITE SCROLL TRIGGER — Fade in as new items load
   ================================================================ */
export const infiniteItemVariants: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: easings.outExpo },
  },
}
 
/* ================================================================
   SCREENSHOT LIGHTBOX THUMBNAIL
   ================================================================ */
export const thumbnailVariants = {
  rest: { scale: 1, opacity: 0.75 },
  hover: {
    scale: 1.04,
    opacity: 1,
    transition: { duration: 0.2, ease: easings.outBack },
  },
  active: {
    scale: 1,
    opacity: 1,
    outline: '2px solid #7c3aed',
  },
}
 
/* ================================================================
   FILTER PANEL — Expand/collapse animation
   ================================================================ */
export const filterPanelVariants: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: easings.inOut },
  },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.3, ease: easings.outExpo },
  },
}
 
/* ================================================================
   NAVBAR SCROLL — Sesuaikan opacity navbar saat scroll
   Gunakan bersama useScroll dari framer-motion atau manual scroll event
   ================================================================ */
export const navbarScrollTransition: Transition = {
  duration: 0.2,
  ease: easings.inOut,
}
 
/* ================================================================
   EMPTY STATE — Animasi untuk empty wishlist / no results
   ================================================================ */
export const emptyStateVariants: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easings.outBack,
      delay: 0.1,
    },
  },
}