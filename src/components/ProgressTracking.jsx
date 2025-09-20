const ProgressTracking = ({ dreamStars, storyHistory }) => {
  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">⭐</span>
        Dream Stars & Story History
      </h2>
      
      <div className="space-y-6">
        {/* Dream Stars Display */}
        <div className="text-center p-6 bg-gradient-to-br from-star-gold-900/20 to-star-gold-800/20 rounded-2xl border border-star-gold-400/30">
          <div className="text-5xl font-fairy text-star-gold-400 mb-3 animate-glow">
            {dreamStars} ⭐
          </div>
          <div className="text-lg font-body text-magical-lavender-200">
            Magical Dream Stars Earned! ✨
          </div>
          <div className="text-sm text-magical-lavender-300 mt-2">
            Each completed story adds a star to your collection 🌟
          </div>
        </div>
        
        {/* Story History */}
        <div>
          <h3 className="text-xl font-fairy text-white mb-4 flex items-center">
            <span className="text-star-gold-400 mr-2">📚</span>
            Recent Adventures
          </h3>
          <div className="space-y-3">
            {storyHistory.length > 0 ? (
              storyHistory.slice(0, 5).map((story, index) => (
                <div key={index} className="text-magical-lavender-200 bg-gradient-to-r from-slate-800/40 to-purple-900/20 p-4 rounded-xl border border-purple-400/20 hover:border-purple-300/40 transition-all duration-300">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-star-gold-400 mr-3 text-lg">
                        {index === 0 ? '🌟' : index === 1 ? '⭐' : '✨'}
                      </span>
                      <span className="font-body text-lg">{story.title}</span>
                    </div>
                    <span className="text-magical-purple-300 text-sm font-body">
                      {story.date}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-magical-lavender-300 font-body">
                <div className="text-4xl mb-3">📖</div>
                <div className="text-lg">No stories yet!</div>
                <div className="text-sm">Complete your first magical story to see it here ✨</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Achievement Badge */}
        {dreamStars > 0 && (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-4 rounded-xl border border-purple-400/30 text-center">
            <div className="text-star-gold-400 font-fairy text-lg mb-2">
              🏆 Achievement Unlocked! 🏆
            </div>
            <div className="text-magical-lavender-200 font-body">
              {dreamStars === 1 ? "First Story Complete! 🌟" :
               dreamStars < 5 ? "Story Explorer! 📚" :
               dreamStars < 10 ? "Adventure Master! ⚔️" :
               "Legendary Storyteller! 👑"}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProgressTracking
