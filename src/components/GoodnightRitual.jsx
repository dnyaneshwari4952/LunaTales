import { useEffect, useMemo, useRef, useState } from 'react'

const GoodnightRitual = ({ onStartRitual }) => {
  const [ritualType, setRitualType] = useState('lullaby')
  const [isActive, setIsActive] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState(5)
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  const audioRef = useRef(null)
  const timerRef = useRef(null)

  // Create or reuse lullaby audio element
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/10/02/audio_2d5f0b6a4b.mp3?filename=lullaby-121934.mp3')
      audio.loop = true
      audio.volume = 0.4
      audioRef.current = audio
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const stopAll = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsActive(false)
    setRemainingSeconds(0)
  }

  const startTimer = (seconds) => {
    setRemainingSeconds(seconds)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          stopAll()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleStartRitual = async () => {
    setIsActive(true)
    onStartRitual(ritualType)
    const totalSeconds = Math.max(1, Math.floor(durationMinutes * 60))
    startTimer(totalSeconds)

    if (ritualType === 'lullaby' && audioRef.current) {
      try {
        await audioRef.current.play()
      } catch (e) {
        // Autoplay may fail without user gesture; keep active and show timer
      }
    }
  }

  // Autoplay lullaby when switching into lullaby while active
  useEffect(() => {
    if (isActive) {
      if (ritualType === 'lullaby') {
        audioRef.current?.play().catch(() => {})
      } else {
        audioRef.current?.pause()
        if (audioRef.current) audioRef.current.currentTime = 0
      }
    }
  }, [ritualType, isActive])
  
  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">🌙</span>
        Magical Goodnight Ritual
      </h2>
      
      <div className="space-y-6">
        {/* Breathing Moon Animation */}
        {isActive && ritualType === 'breathing' && (
          <div className="text-center py-8">
            <div className="breathing-moon mb-6"></div>
            <div className="text-magical-lavender-200 font-body text-lg animate-pulse">
              Breathe in... 🌬️<br />
              Breathe out... 🌙
            </div>
            <div className="mt-4">
              {Array.from({ length: 4 }, (_, i) => (
                <span key={i} className="musical-note" style={{
                  left: `${20 + i * 20}%`,
                  top: `${50 + Math.sin(i) * 10}%`
                }}>🎵</span>
              ))}
            </div>
          </div>
        )}
        
        {/* Ritual Selection */
        }
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🌟 Choose Your Ritual
          </label>
          <select
            className="select-magical w-full text-lg"
            value={ritualType}
            onChange={(e) => setRitualType(e.target.value)}
          >
            <option value="lullaby">🎵 Soft Magical Lullaby</option>
            <option value="breathing">🌙 Calming Breathing Exercise</option>
            <option value="stars">⭐ Count the Twinkling Stars</option>
          </select>
        </div>

        {/* Timer Control */}
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            ⏱️ Set Duration (minutes)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            step="1"
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="select-magical w-full text-lg"
          />
          {isActive && (
            <div className="mt-2 text-magical-purple-300 font-body">
              Remaining: {Math.floor(remainingSeconds / 60)}:{String(remainingSeconds % 60).padStart(2,'0')}
            </div>
          )}
        </div>
        
        {/* Ritual Description */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 rounded-xl border border-purple-400/30">
          <div className="text-magical-lavender-200 font-body text-sm">
            {ritualType === 'lullaby' && (
              <>
                <span className="text-star-gold-400 font-fairy">🎵 Soft Lullaby:</span><br />
                A gentle, magical melody to soothe your little one to sleep ✨
              </>
            )}
            {ritualType === 'breathing' && (
              <>
                <span className="text-star-gold-400 font-fairy">🌙 Breathing Exercise:</span><br />
                Follow the glowing moon as it breathes - perfect for relaxation 🌬️
              </>
            )}
            {ritualType === 'stars' && (
              <>
                <span className="text-star-gold-400 font-fairy">⭐ Count the Stars:</span><br />
                Count twinkling stars together for a peaceful bedtime routine ✨
              </>
            )}
          </div>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleStartRitual}
            className="button-primary w-full text-lg py-4"
            disabled={isActive}
          >
            {isActive ? '✨ Ritual Active... ✨' : '🌟 Start Magical Ritual 🌟'}
          </button>
          {isActive && (
            <button
              onClick={stopAll}
              className="button-primary w-40 text-lg py-4"
            >
              Stop
            </button>
          )}
        </div>
        
        {isActive && (
          <div className="text-center text-magical-purple-300 font-body text-sm">
            💫 Your magical ritual is now active! 💫
          </div>
        )}
      </div>
    </div>
  )
}

export default GoodnightRitual
