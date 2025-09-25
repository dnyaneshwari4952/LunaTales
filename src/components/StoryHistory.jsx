const StoryHistory = ({ storyHistory }) => {
  return (
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
  )
}

export default StoryHistory
