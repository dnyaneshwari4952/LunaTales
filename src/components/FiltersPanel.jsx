const FiltersPanel = ({ settings, onSettingsChange }) => {
  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">🎛️</span>
        Magical Story Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🧚‍♀️ Story Theme
          </label>
          <select
            className="select-magical w-full text-lg"
            value={settings.theme}
            onChange={(e) => onSettingsChange({...settings, theme: e.target.value})}
          >
            <option value="fairy-tale">✨ Fairy Tale Adventure</option>
            <option value="adventure">🗺️ Epic Adventure</option>
            <option value="animals">🐻 Animal Friends</option>
            <option value="space">🚀 Space Explorer</option>
            <option value="pirates">🏴‍☠️ Pirate Adventure</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            ⏰ Story Length
          </label>
          <select
            className="select-magical w-full text-lg"
            value={settings.length}
            onChange={(e) => onSettingsChange({...settings, length: parseInt(e.target.value)})}
          >
            {[5, 10, 15, 20, 25, 30].map(minutes => (
              <option key={minutes} value={minutes}>
                {minutes === 5 ? '🌟 Quick Story' : 
                 minutes === 10 ? '✨ Perfect Bedtime' :
                 minutes === 15 ? '🌙 Longer Adventure' :
                 minutes === 20 ? '⭐ Epic Tale' :
                 minutes === 25 ? '🌠 Grand Adventure' :
                 '🌟 Ultimate Journey'} ({minutes} min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🎵 Story Tone
          </label>
          <select
            className="select-magical w-full text-lg"
            value={settings.tone}
            onChange={(e) => onSettingsChange({...settings, tone: e.target.value})}
          >
            <option value="calm">🌙 Calm & Soothing</option>
            <option value="normal">✨ Normal & Fun</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🎭 Story Mode
          </label>
          <select
            className="select-magical w-full text-lg"
            value={settings.mode}
            onChange={(e) => onSettingsChange({...settings, mode: e.target.value})}
          >
            <option value="standard">🌟 Standard Adventure</option>
            <option value="continuity">📚 Continuing Series</option>
            <option value="family">👨‍👩‍👧‍👦 Family Story</option>
            <option value="dream">💭 Dream Journey</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🗣️ Narration Language
          </label>
          <select
            className="select-magical w-full text-lg"
            value={settings.language}
            onChange={(e) => onSettingsChange({...settings, language: e.target.value})}
          >
            <option value="en">🇺🇸 English</option>
            <option value="hi">🇮🇳 Hindi</option>
            <option value="es">🇪🇸 Spanish</option>
            <option value="fr">🇫🇷 French</option>
            <option value="de">🇩🇪 German</option>
          </select>
        </div>

        <div className="space-y-4 pt-4 border-t border-purple-400/20">
          <h3 className="text-lg font-fairy text-star-gold-400 mb-4">
            ✨ Magical Features
          </h3>
          
          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
            <label className="text-lg font-body text-magical-lavender-200 flex items-center">
              🎨 Illustrations
            </label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.illustrations}
                onChange={(e) => onSettingsChange({...settings, illustrations: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
            <label className="text-lg font-body text-magical-lavender-200 flex items-center">
              🎵 Sound Effects
            </label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.soundEffects}
                onChange={(e) => onSettingsChange({...settings, soundEffects: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
            <label className="text-lg font-body text-magical-lavender-200 flex items-center">
              👨‍👩‍👧‍👦 Parental Preview
            </label>
            <div className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.parentalPreview}
                onChange={(e) => onSettingsChange({...settings, parentalPreview: e.target.checked})}
              />
              <span className="toggle-slider"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FiltersPanel
