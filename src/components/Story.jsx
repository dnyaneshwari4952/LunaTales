import React from 'react'

const Story = ({ story, childData, settings, onGenerateNew }) => {
  if (!story) {
    return (
      <div className="card-glow p-8 animate-slide-up">
        <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
          <span className="text-star-gold-400 mr-3 text-3xl">📚</span>
          Story
        </h2>
        <div className="text-center py-12">
          <div className="text-magical-lavender-300 mb-6 text-xl font-body">
            🌟 No story generated yet! Create one to see it here! 🌟
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card-glow p-8 animate-slide-up">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">📚</span>
        Story
      </h2>
      
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-3xl font-fairy text-star-gold-400 animate-glow mb-4">
            ✨ {story.title} ✨
          </h3>
          {onGenerateNew && (
            <button 
              onClick={onGenerateNew}
              className="button-primary text-sm px-6 py-3 flex items-center space-x-2 mx-auto"
            >
              <span>✨</span>
              <span>Generate New Story</span>
            </button>
          )}
        </div>
        
        <div className="text-magical-lavender-200 leading-relaxed text-lg font-body p-8 bg-slate-800/30 rounded-xl border border-purple-400/20 hover:bg-slate-800/40 transition-all duration-300">
          <div className="space-y-6">
            {story.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        
        <div className="text-magical-purple-300 italic border-l-4 border-star-gold-400 pl-6 py-4 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-r-xl">
          <div className="flex items-start">
            <span className="text-star-gold-400 font-fairy text-2xl mr-3">💫</span>
            <div>
              <span className="text-star-gold-400 font-fairy text-lg">Moral:</span>
              <p className="mt-2 text-lg">{story.moral}</p>
            </div>
          </div>
        </div>
        
        {settings.illustrations && (
          <div className="mt-6 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-400/30">
            <div className="text-magical-purple-300 mb-3 font-body text-lg flex items-center">
              <span className="text-2xl mr-2">🎨</span>
              Magical Illustrations Coming Soon!
            </div>
            <div className="text-sm text-magical-lavender-400 bg-slate-800/40 p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-star-gold-400 mr-2">✨</span>
                <div>
                  <span className="text-star-gold-400 font-semibold">Prompt:</span>
                  <p className="mt-1">
                    "A soft, kid-friendly cartoon illustration for a bedtime story. 
                    Hero: {childData.name}, Age: {childData.age}, 
                    Favorite animal: {childData.favorites.animal}, 
                    Color: {childData.favorites.color}, 
                    Place: {childData.favorites.place}. 
                    Theme: {settings.theme}. 
                    Style: whimsical, pastel, cute, safe for children."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Story
