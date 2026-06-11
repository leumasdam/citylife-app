/* ODLOŽENÁ ALTERNATÍVA — splash "scan cyklus".
   Reticle sa zamkne na logo, coral beam prejde cez logo, logo sa rozžiari,
   tagline preblikne na "✦ CITY RECOGNISED". Nie je zapojená v registry —
   ak ju chceš späť, v registry2.jsx / onboarding2.jsx vymeň Splash za SplashScan. */
import { motion } from 'framer-motion'
import { StatusBar, HomeBar } from '../../phone/Phone'

const EASE = [0.22, 1, 0.36, 1]
const SCAN_CYCLE = 3.6
const scanT = { duration: SCAN_CYCLE, repeat: Infinity, ease: 'easeInOut' }

export function SplashScan() {
  return (
    <>
      <StatusBar light />
      <div className="body center screen-indigo" style={{ overflow: 'hidden', position: 'relative' }}>
        <div className="stack" style={{ alignItems: 'center', gap: 26, position: 'relative', zIndex: 2 }}>
          {/* reticle locked on the logo */}
          <motion.div style={{ position: 'relative', width: 290, padding: '36px 0', display: 'grid', placeItems: 'center' }}
            initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7, ease: EASE }}>
            <motion.div style={{ position: 'absolute', inset: 0 }}
              animate={{ scale: [1, 1.03, 1] }} transition={{ duration: SCAN_CYCLE, repeat: Infinity, ease: 'easeInOut' }}>
              {[
                { top: 0, left: 0, borderWidth: '2.5px 0 0 2.5px', borderRadius: '10px 0 0 0' },
                { top: 0, right: 0, borderWidth: '2.5px 2.5px 0 0', borderRadius: '0 10px 0 0' },
                { bottom: 0, left: 0, borderWidth: '0 0 2.5px 2.5px', borderRadius: '0 0 0 10px' },
                { bottom: 0, right: 0, borderWidth: '0 2.5px 2.5px 0', borderRadius: '0 0 10px 0' },
              ].map((s, i) => <span key={i} style={{ position: 'absolute', width: 30, height: 30, borderStyle: 'solid', borderColor: 'rgba(255,255,255,.85)', ...s }} />)}
            </motion.div>
            {/* the logo lights up as the beam passes over it */}
            <motion.img src="./brand/logo-white.png" alt="CITYLIFE"
              style={{ width: 226, filter: 'drop-shadow(0 6px 30px rgba(0,0,0,.25))' }}
              animate={{ filter: ['brightness(1)', 'brightness(1)', 'brightness(1.45) drop-shadow(0 0 24px rgba(255,255,255,.55))', 'brightness(1)', 'brightness(1)'] }}
              transition={{ ...scanT, times: [0, 0.14, 0.3, 0.5, 1] }} />
            {/* scan beam sweeps the reticle */}
            <motion.div style={{ position: 'absolute', left: 8, right: 8, height: 3, borderRadius: 3, background: 'var(--coral)', boxShadow: '0 0 16px 2px var(--coral)' }}
              animate={{ top: ['2%', '96%'], opacity: [0, 1, 1, 0] }} transition={{ ...scanT, times: [0.06, 0.14, 0.42, 0.5] }} />
          </motion.div>
          {/* tagline ⇄ confirmation, synced to each pass */}
          <div style={{ position: 'relative', height: 16 }}>
            <motion.div className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.85)', letterSpacing: '.3em', whiteSpace: 'nowrap' }}
              animate={{ opacity: [1, 1, 0, 0, 1] }} transition={{ ...scanT, times: [0, 0.5, 0.56, 0.88, 0.96] }}>
              THE CITY, SCANNABLE
            </motion.div>
            <motion.div className="mono" style={{ position: 'absolute', inset: 0, fontSize: 11, color: 'var(--acid)', letterSpacing: '.3em', textAlign: 'center', whiteSpace: 'nowrap' }}
              animate={{ opacity: [0, 0, 1, 1, 0] }} transition={{ ...scanT, times: [0, 0.5, 0.56, 0.88, 0.96] }}>
              ✦ CITY RECOGNISED
            </motion.div>
          </div>
        </div>
        <motion.div style={{ position: 'absolute', bottom: 64, left: 0, right: 0, display: 'grid', placeItems: 'center', gap: 13, zIndex: 2 }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <div style={{ width: 150, height: 4, borderRadius: 3, background: 'rgba(255,255,255,.22)', overflow: 'hidden' }}>
            <motion.div style={{ height: '100%', width: '55%', background: '#fff', borderRadius: 3 }} animate={{ x: ['-100%', '180%'] }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }} />
          </div>
          <div className="mono" style={{ fontSize: 10.5, color: 'rgba(255,255,255,.75)', letterSpacing: '.22em' }}>LOADING TONIGHT…</div>
        </motion.div>
      </div>
      <HomeBar dark />
    </>
  )
}
