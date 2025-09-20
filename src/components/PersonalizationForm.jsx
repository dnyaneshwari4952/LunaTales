import { useState, useEffect } from 'react'

const PersonalizationForm = ({ childData, onUpdate }) => {
  const [formData, setFormData] = useState(childData)

  useEffect(() => {
    setFormData(childData)
  }, [childData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdate(formData)
  }

  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">✨</span>
        Personalize Your Magical Story
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            👶 Child's Name
          </label>
          <input
            type="text"
            className="input-field w-full text-lg"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            placeholder="Enter your little one's name..."
          />
        </div>
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🎂 Age
          </label>
          <input
            type="number"
            className="input-field w-full text-lg"
            value={formData.age}
            onChange={(e) => setFormData({...formData, age: e.target.value})}
            placeholder="How old are they?"
            min="3"
            max="12"
          />
        </div>
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🐻 Favorite Animal
          </label>
          <input
            type="text"
            className="input-field w-full text-lg"
            value={formData.favorites.animal}
            onChange={(e) => setFormData({
              ...formData, 
              favorites: {...formData.favorites, animal: e.target.value}
            })}
            placeholder="e.g., cat, dragon, unicorn, bear..."
          />
        </div>
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🌈 Favorite Color
          </label>
          <input
            type="text"
            className="input-field w-full text-lg"
            value={formData.favorites.color}
            onChange={(e) => setFormData({
              ...formData, 
              favorites: {...formData.favorites, color: e.target.value}
            })}
            placeholder="e.g., blue, purple, rainbow, pink..."
          />
        </div>
        <div>
          <label className="block text-lg font-body text-magical-lavender-200 mb-3">
            🏰 Favorite Place
          </label>
          <input
            type="text"
            className="input-field w-full text-lg"
            value={formData.favorites.place}
            onChange={(e) => setFormData({
              ...formData, 
              favorites: {...formData.favorites, place: e.target.value}
            })}
            placeholder="e.g., forest, castle, space, ocean..."
          />
        </div>
        <button type="submit" className="button-primary w-full text-lg py-4">
          ✨ Save Magical Preferences ✨
        </button>
      </form>
    </div>
  )
}

export default PersonalizationForm
