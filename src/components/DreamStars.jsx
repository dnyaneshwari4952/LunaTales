const DreamStars = ({ dreamStars }) => {
  return (
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
      
      {/* Achievement Badge */}
      {dreamStars > 0 && (
        <div className="mt-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-3 rounded-xl border border-purple-400/30">
          <div className="text-star-gold-400 font-fairy text-sm mb-1">
            🏆 Achievement Unlocked! 🏆
          </div>
          <div className="text-magical-lavender-200 font-body text-sm">
            {dreamStars === 1 ? "First Story Complete! 🌟" :
             dreamStars < 5 ? "Story Explorer! 📚" :
             dreamStars < 10 ? "Adventure Master! ⚔️" :
             "Legendary Storyteller! 👑"}
          </div>
        </div>
      )}
    </div>
  )
}

export default DreamStars
