const NarrationControls = ({ 
  isPlaying, 
  isPaused, 
  onPlay, 
  onPause, 
  onStop, 
  onReplay,
  progress,
  settings 
}) => {
  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">🎵</span>
        Magical Narration
      </h2>
      
      <div className="space-y-6">
        {/* Magical Progress Bar */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-body text-magical-lavender-200">
              🌟 Story Progress
            </span>
            <span className="text-star-gold-400 font-fairy text-lg">
              {progress}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        {/* Magical Control Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {!isPlaying ? (
            <button onClick={onPlay} className="button-primary text-lg py-4 col-span-2">
              ▶️ Play Magical Story
            </button>
          ) : (
            <button onClick={onPause} className="button-secondary text-lg py-4">
              ⏸️ Pause
            </button>
          )}
          
          {isPlaying && (
            <button onClick={onStop} className="button-secondary text-lg py-4">
              ⏹️ Stop
            </button>
          )}
          
          <button onClick={onReplay} className="button-secondary text-lg py-4 col-span-2">
            🔄 Replay Story
          </button>
        </div>
        
        {/* Magical Settings Display */}
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-4 rounded-xl border border-purple-400/30">
          <h3 className="text-lg font-fairy text-star-gold-400 mb-3">
            🎭 Current Settings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm font-body text-magical-lavender-200">
            <div className="flex items-center">
              <span className="mr-2">🗣️</span>
              <span>Language: {settings.language.toUpperCase()}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🎵</span>
              <span>Tone: {settings.tone === 'calm' ? 'Calm & Soothing' : 'Normal & Fun'}</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">⚡</span>
              <span>Speed: {settings.tone === 'calm' ? 'Slow & Gentle' : 'Normal'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NarrationControls
