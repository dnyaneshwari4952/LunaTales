import { useEffect, useMemo, useRef, useState } from 'react'

const GoodnightRitual = ({ onStartRitual }) => {
  const [ritualType, setRitualType] = useState('lullaby')
  const [isActive, setIsActive] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState(5)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const [elapsedCount, setElapsedCount] = useState(0)
  const [stars, setStars] = useState([])
  const [playbackError, setPlaybackError] = useState('')

  const audioRef = useRef(null)
  const timerRef = useRef(null)
  const lullabyUrlIndexRef = useRef(0)
  const totalPlannedSecondsRef = useRef(0)
  const selectedSpotifyIdRef = useRef(null)

  // Create or reuse lullaby audio element
  useEffect(() => {
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
    setStars([])
    setPlaybackError('')
    setElapsedCount(0)
  }

  const startTimer = (seconds) => {
    setRemainingSeconds(seconds)
    totalPlannedSecondsRef.current = seconds
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          stopAll()
          return 0
        }
        // Per-second star count update during stars ritual
        if (ritualType === 'stars') {
          setElapsedCount(c => c + 1)
        }
        return prev - 1
      })
    }, 1000)
  }

  // Open-source lullaby fallback list
  const lullabyUrls = useMemo(() => ([
    // Pixabay Music (royalty-free)
    'https://cdn.pixabay.com/download/audio/2022/03/10/audio_6b47a4a1d3.mp3?filename=lullaby-9973.mp3',
    'https://cdn.pixabay.com/download/audio/2021/09/16/audio_0b2f2a5e30.mp3?filename=lullaby-11549.mp3',
    'https://cdn.pixabay.com/download/audio/2022/10/02/audio_2d5f0b6a4b.mp3?filename=lullaby-121934.mp3',
    'https://cdn.pixabay.com/download/audio/2021/09/05/audio_97aa6f288f.mp3?filename=sweet-dreams-ambient-110750.mp3',
    // Free Music Archive (may vary by region)
    'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Monk_Turner__Fascinoma/The_New_Law/Monk_Turner__Fascinoma_-_09_-_Goodnight.mp3'
  ]), [])

  // Curated calm/soothing Spotify playlists (IDs only)
  const spotifyPlaylists = useMemo(() => ([
    '37i9dQZF1DX0jgyAiPl8Af', // Sleep
    '37i9dQZF1DWZZbwlv3Vmtr', // Deep Focus
    '37i9dQZF1DX4sWSpwq3LiO', // Peaceful Piano
    '37i9dQZF1DX3rxVfibe1L0', // Lo-Fi Beats
    '37i9dQZF1DXabT14vJPHNw'  // Calming Acoustic
  ]), [])

  const playLullabyWithFallback = async () => {
    if (!audioRef.current) return false
    // Shuffle a copy so each Start picks a random track order
    const urls = [...lullabyUrls].sort(() => Math.random() - 0.5)
    setPlaybackError('')
    for (let i = 0; i < urls.length; i += 1) {
      try {
        lullabyUrlIndexRef.current = i
        audioRef.current.src = urls[i]
        audioRef.current.loop = true
        audioRef.current.volume = 0.4
        // Ensure the element is ready by waiting canplaythrough with a timeout
        await new Promise((resolve, reject) => {
          let settled = false
          const onReady = () => { if (!settled) { settled = true; cleanup(); resolve(true) } }
          const onError = () => { if (!settled) { settled = true; cleanup(); reject(new Error('load error')) } }
          const cleanup = () => {
            audioRef.current?.removeEventListener('canplaythrough', onReady)
            audioRef.current?.removeEventListener('error', onError)
          }
          audioRef.current?.addEventListener('canplaythrough', onReady, { once: true })
          audioRef.current?.addEventListener('error', onError, { once: true })
          audioRef.current?.load()
          setTimeout(() => { if (!settled) { settled = true; cleanup(); resolve(false) } }, 3000)
        })
        await audioRef.current.play()
        return true
      } catch (err) {
        // Try next URL
      }
    }
    setPlaybackError('Unable to start audio. Tap Start again to allow sound, or check your device volume.')
    return false
  }

  const handleStartRitual = async () => {
    setIsActive(true)
    onStartRitual(ritualType)
    const totalSeconds = Math.max(1, Math.floor(durationMinutes * 60))
    // Reset counters/visuals then start timer
    setElapsedCount(0)
    setStars([])
    startTimer(totalSeconds)

    if (ritualType === 'lullaby' && audioRef.current) {
      lullabyUrlIndexRef.current = 0
      // Pick a random Spotify playlist for the embed (shown below)
      const randomIdx = Math.floor(Math.random() * spotifyPlaylists.length)
      selectedSpotifyIdRef.current = spotifyPlaylists[randomIdx]
      await playLullabyWithFallback()
    }
  }

  // On ritual type change: stop anything active. Do not auto-start to comply with user-click requirement.
  useEffect(() => {
    if (isActive) {
      audioRef.current?.pause()
      if (audioRef.current) audioRef.current.currentTime = 0
    }
    // We keep isActive state; but stopAll on change via handler ensures full reset
  }, [ritualType])

  // Stop immediately when changing ritual type per user request
  const handleChangeRitual = (value) => {
    if (isActive) {
      stopAll()
    }
    setRitualType(value)
  }
  
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
            onChange={(e) => handleChangeRitual(e.target.value)}
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

        {/* Spotify Soothing Lullabies (rendered on user Start for lullaby) */}
        {isActive && ritualType === 'lullaby' && selectedSpotifyIdRef.current && (
          <div className="mt-4">
            <div className="text-magical-lavender-200 font-body mb-2">Soothing Lullabies</div>
            <div className="rounded-xl overflow-hidden border border-purple-400/30">
              <iframe
                title="Spotify Soothing Lullabies"
                style={{ border: 0, width: '100%', height: 352 }}
                src={`https://open.spotify.com/embed/playlist/${selectedSpotifyIdRef.current}?utm_source=generator`}
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
          </div>
        )}

        {/* Stars visualizer: Single centered big star with incremental number */}
        {isActive && ritualType === 'stars' && (
          <div className="text-center py-8">
            <div className="relative mx-auto flex items-center justify-center" style={{ width: 480, height: 480 }}>
              <div style={{ position: 'absolute', fontSize: 220 }}>⭐</div>
              <div className="text-white font-fairy" style={{ position: 'absolute', fontSize: 160 }}>
                {elapsedCount + 1}
              </div>
            </div>
          </div>
        )}

        {/* Playback error / hint */}
        {playbackError && (
          <div className="text-center text-magical-purple-300 font-body text-sm">
            {playbackError}
          </div>
        )}
        
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

        {/* Hidden audio element to satisfy autoplay/permission policies on some platforms */}
        <audio ref={audioRef} preload="auto" crossOrigin="anonymous" playsInline className="hidden" />
        
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
