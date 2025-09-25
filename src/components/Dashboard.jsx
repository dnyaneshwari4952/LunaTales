import DreamStars from './DreamStars'
import StoryHistory from './StoryHistory'

const Dashboard = ({ dreamStars, storyHistory }) => {
  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">📊</span>
        Your Magical Dashboard
      </h2>
      
      <div className="space-y-6">
        {/* Dream Stars Display */}
        <DreamStars dreamStars={dreamStars} />
        
        {/* Story History */}
        <StoryHistory storyHistory={storyHistory} />
      </div>
    </div>
  )
}

export default Dashboard
