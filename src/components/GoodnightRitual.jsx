import { useState } from 'react'

const GoodnightRitual = ({ onStartRitual }) => {
  const [ritualType, setRitualType] = useState('lullaby')
  const [isActive, setIsActive] = useState(false)
  
  const handleStartRitual = () => {
    setIsActive(true)
    onStartRitual(ritualType)
    
    // Reset after 3 seconds for demo
    setTimeout(() => {
      setIsActive(false)
    }, 3000)
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
        
        {/* Ritual Selection */}
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
        
        <button 
          onClick={handleStartRitual}
          className="button-primary w-full text-lg py-4"
          disabled={isActive}
        >
          {isActive ? '✨ Ritual Active... ✨' : '🌟 Start Magical Ritual 🌟'}
        </button>
        
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
