import { useState } from 'react'

const InteractiveStorytelling = ({ story, onStoryUpdate }) => {
  const [currentChoice, setCurrentChoice] = useState(null)
  const [showChoices, setShowChoices] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  // Enhanced magical choice points
  const choicePoints = [
    {
      id: 1,
      text: "🌟 What magical path should our hero take?",
      choices: [
        { 
          id: 'a', 
          text: "🌲 Venture into the Enchanted Forest", 
          continuation: "The hero bravely stepped into the whispering forest, where ancient trees shared their secrets and magical creatures danced in the moonlight.",
          emoji: "🌲"
        },
        { 
          id: 'b', 
          text: "🏰 Journey to the Crystal Castle", 
          continuation: "The hero chose the shimmering path to the castle, where towers sparkled like diamonds and a wise queen awaited with gifts of wisdom.",
          emoji: "🏰"
        },
        { 
          id: 'c', 
          text: "🌊 Rest by the Singing Stream", 
          continuation: "The hero decided to rest by the gentle stream, where the water sang lullabies and a friendly talking fish shared stories of the deep.",
          emoji: "🌊"
        }
      ]
    },
    {
      id: 2,
      text: "✨ How should our hero solve this magical challenge?",
      choices: [
        { 
          id: 'a', 
          text: "🪄 Use Magical Powers", 
          continuation: "The hero's magic sparkled like stars, weaving a beautiful solution that filled everyone's heart with wonder and joy.",
          emoji: "🪄"
        },
        { 
          id: 'b', 
          text: "👥 Ask Friends for Help", 
          continuation: "The hero's friends came together like a constellation, each bringing their unique gifts to create something truly magical.",
          emoji: "👥"
        },
        { 
          id: 'c', 
          text: "💡 Think Creatively", 
          continuation: "The hero had a brilliant idea that shone like a shooting star, inspiring everyone and saving the day with pure imagination.",
          emoji: "💡"
        }
      ]
    },
    {
      id: 3,
      text: "🎭 What adventure awaits in this magical moment?",
      choices: [
        { 
          id: 'a', 
          text: "🚀 Fly to the Star Kingdom", 
          continuation: "The hero soared through the clouds on wings of stardust, discovering a kingdom where stars lived and dreams came true.",
          emoji: "🚀"
        },
        { 
          id: 'b', 
          text: "🐉 Befriend a Dragon", 
          continuation: "The hero met a gentle dragon with scales like rainbows, who became their most loyal friend and protector.",
          emoji: "🐉"
        },
        { 
          id: 'c', 
          text: "🧚‍♀️ Dance with Fairies", 
          continuation: "The hero joined a fairy circle, dancing under the moonlight as magical sparkles filled the air with wonder.",
          emoji: "🧚‍♀️"
        }
      ]
    }
  ]

  const handleChoice = (choice) => {
    setIsAnimating(true)
    setCurrentChoice(choice)
    setShowChoices(false)
    
    // Add the continuation to the story with a magical delay
    setTimeout(() => {
      const updatedStory = {
        ...story,
        paragraphs: [...story.paragraphs, choice.continuation]
      }
      
      onStoryUpdate(updatedStory)
      setIsAnimating(false)
    }, 1000)
  }

  const showChoicePoint = () => {
    if (story && story.paragraphs.length > 0) {
      const randomChoicePoint = choicePoints[Math.floor(Math.random() * choicePoints.length)]
      setCurrentChoice(randomChoicePoint)
      setShowChoices(true)
    }
  }

  if (!story) return null

  return (
    <div className="card-glow p-8">
      <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
        <span className="text-star-gold-400 mr-3 text-3xl">🎭</span>
        Interactive Magical Storytelling
      </h2>
      
      <div className="space-y-6">
        <button 
          onClick={showChoicePoint}
          className="button-primary w-full text-lg py-4"
          disabled={!story || story.paragraphs.length === 0 || isAnimating}
        >
          {isAnimating ? '✨ Adding Magic... ✨' : '🌟 Add Magical Choice Point 🌟'}
        </button>
        
        {showChoices && currentChoice && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-400/30">
              <div className="text-magical-lavender-200 font-body text-lg mb-4">
                {currentChoice.text}
              </div>
              <div className="text-star-gold-400 font-fairy text-sm">
                Choose your adventure! ✨
              </div>
            </div>
            
            <div className="space-y-3">
              {currentChoice.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoice(choice)}
                  className="button-secondary w-full text-left p-4 text-lg hover:transform hover:scale-105 transition-all duration-300"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{choice.emoji}</span>
                    <div>
                      <span className="font-fairy text-star-gold-400">
                        {choice.id.toUpperCase()}.
                      </span>
                      <span className="ml-2 font-body text-magical-lavender-200">
                        {choice.text}
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 p-4 rounded-xl border border-cyan-400/30">
          <div className="text-magical-lavender-200 font-body text-sm text-center">
            <span className="text-star-gold-400 font-fairy">💡 Magical Tip:</span><br />
            Interactive choices make the story more engaging and help your child feel like the hero of their own adventure! ✨
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveStorytelling
