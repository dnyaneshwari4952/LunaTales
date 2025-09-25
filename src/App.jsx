import { useState, useEffect, useRef } from 'react'
import './App.css'
import PersonalizationForm from './components/PersonalizationForm'
import FiltersPanel from './components/FiltersPanel'
import NarrationControls from './components/NarrationControls'
import ProgressTracking from './components/ProgressTracking'
import GoodnightRitual from './components/GoodnightRitual'
import Story from './components/Story'
import InteractiveStorytelling from './components/InteractiveStorytelling'
import Dashboard from './components/Dashboard'
import DreamStars from './components/DreamStars'
import StoryHistory from './components/StoryHistory'
import { generateStory } from './components/StoryGenerator'

// Magical Starry Background Component
const MagicalStarryBackground = () => {
  const stars = Array.from({ length: 150 }, (_, i) => (
    <div
      key={i}
      className={i % 10 === 0 ? "star-large" : "star"}
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${2 + Math.random() * 3}s`
      }}
    />
  ))

  const shootingStars = Array.from({ length: 3 }, (_, i) => (
    <div
      key={`shooting-${i}`}
      className="shooting-star"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{background: 'linear-gradient(135deg, #0f172a 0%, #4c1d95 50%, #000000 100%)'}}>
      {/* Animated Star Field */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `
          radial-gradient(2px 2px at 20px 30px, #fbbf24, transparent),
          radial-gradient(2px 2px at 40px 70px, #fbbf24, transparent),
          radial-gradient(1px 1px at 90px 40px, #fbbf24, transparent),
          radial-gradient(1px 1px at 130px 80px, #fbbf24, transparent),
          radial-gradient(2px 2px at 160px 30px, #fbbf24, transparent)
        `,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px 100px'
      }} />
      
      {/* Individual Stars */}
      {stars}
      
      {/* Shooting Stars */}
      {shootingStars}
      
      {/* Magical Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 bg-magical-purple-400 rounded-full opacity-60 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}

function App() {
  // State management
  const [childData, setChildData] = useState({
    name: '',
    age: '',
    favorites: {
      animal: '',
      color: '',
      place: ''
    }
  })

  const [settings, setSettings] = useState({
    theme: 'fairy-tale',
    length: 10,
    tone: 'calm',
    mode: 'standard',
    language: 'en',
    illustrations: true,
    soundEffects: true,
    parentalPreview: false
  })

  const [currentStory, setCurrentStory] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  const [dreamStars, setDreamStars] = useState(0)
  const [storyHistory, setStoryHistory] = useState([])
  const [showRitual, setShowRitual] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  
  const speechSynthesis = useRef(null)
  const currentUtterance = useRef(null)

  // Load data from localStorage on mount
  useEffect(() => {
    const savedChildData = localStorage.getItem('bedtime-storyteller-child')
    const savedSettings = localStorage.getItem('bedtime-storyteller-settings')
    const savedDreamStars = localStorage.getItem('bedtime-storyteller-stars')
    const savedHistory = localStorage.getItem('bedtime-storyteller-history')

    if (savedChildData) setChildData(JSON.parse(savedChildData))
    if (savedSettings) setSettings(JSON.parse(savedSettings))
    if (savedDreamStars) setDreamStars(parseInt(savedDreamStars))
    if (savedHistory) setStoryHistory(JSON.parse(savedHistory))

    // Initialize speech synthesis
    speechSynthesis.current = window.speechSynthesis
  }, [])

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('bedtime-storyteller-child', JSON.stringify(childData))
  }, [childData])

  useEffect(() => {
    localStorage.setItem('bedtime-storyteller-settings', JSON.stringify(settings))
  }, [settings])

  useEffect(() => {
    localStorage.setItem('bedtime-storyteller-stars', dreamStars.toString())
  }, [dreamStars])

  useEffect(() => {
    localStorage.setItem('bedtime-storyteller-history', JSON.stringify(storyHistory))
  }, [storyHistory])

  // Story generation
  const generateNewStory = () => {
    if (!childData.name) {
      alert('Please enter your child\'s name first!')
      return
    }
    
    const story = generateStory(childData, settings)
    setCurrentStory(story)
    setProgress(0)
    setShowRitual(false)
  }

  // Narration functions
  const speakText = (text) => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = settings.language
      utterance.rate = settings.tone === 'calm' ? 0.7 : 1.0
      utterance.pitch = settings.tone === 'calm' ? 0.8 : 1.0
      
      utterance.onend = () => {
        setIsPlaying(false)
        setIsPaused(false)
        setProgress(100)
        setDreamStars(prev => prev + 1)
        setStoryHistory(prev => [{
          title: currentStory.title,
          date: new Date().toLocaleDateString()
        }, ...prev.slice(0, 4)])
        setShowRitual(true)
      }
      
      utterance.onboundary = (event) => {
        if (event.name === 'sentence') {
          setProgress(prev => Math.min(prev + 10, 100))
        }
      }
      
      currentUtterance.current = utterance
      speechSynthesis.current.speak(utterance)
    }
  }

  const handlePlay = () => {
    if (currentStory) {
      const fullText = `${currentStory.title}\n\n${currentStory.paragraphs.join('\n\n')}\n\nMoral: ${currentStory.moral}`
      speakText(fullText)
      setIsPlaying(true)
      setIsPaused(false)
    }
  }

  const handlePause = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.pause()
      setIsPaused(true)
    }
  }

  const handleStop = () => {
    if (speechSynthesis.current) {
      speechSynthesis.current.cancel()
      setIsPlaying(false)
      setIsPaused(false)
      setProgress(0)
    }
  }

  const handleReplay = () => {
    handleStop()
    setTimeout(handlePlay, 100)
  }

  const handleStartRitual = (ritualType) => {
    // Mock ritual implementation
    alert(`Starting ${ritualType} ritual... This would play calming sounds or guide breathing exercises.`)
  }

  const handleStoryUpdate = (updatedStory) => {
    setCurrentStory(updatedStory)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <MagicalStarryBackground />
      
      {/* Main Content - Only visible when filters and dashboard are closed */}
      {!showFilters && !showDashboard && (
        <div className="relative z-10 container mx-auto px-4 py-8 animate-fade-in">
          <header className="text-center mb-12">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="button-primary text-lg px-6 py-3 flex items-center space-x-2 animate-pulse"
              >
                <span>📊</span>
                <span>Dashboard</span>
              </button>
              <h1 className="text-4xl sm:text-6xl font-fairy text-white animate-glow flex-1 text-center" style={{
                background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'gradient-shift 3s ease infinite'
              }}>
                🌙 MAGICAL Bedtime Storyteller ✨
              </h1>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="button-primary text-lg px-6 py-3 flex items-center space-x-2 animate-pulse"
              >
                <span>🎛️</span>
                <span>Filters</span>
              </button>
            </div>
            <p className="text-magical-lavender-300 text-xl font-body">
              Create magical bedtime stories for your little one 🧚‍♀️
            </p>
            <div className="mt-6 flex justify-center space-x-4 text-2xl animate-float">
              <span className="animate-wiggle">🐻</span>
              <span className="animate-wiggle" style={{animationDelay: '0.2s'}}>🚀</span>
              <span className="animate-wiggle" style={{animationDelay: '0.4s'}}>⭐</span>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Controls */}
          <div className="space-y-8">
            <div className="animate-slide-up" style={{animationDelay: '0.1s'}}>
              <ProgressTracking 
                dreamStars={dreamStars} 
                storyHistory={storyHistory} 
              />
            </div>
            
            <div className="animate-slide-up" style={{animationDelay: '0.2s'}}>
              <GoodnightRitual onStartRitual={handleStartRitual} />
            </div>
          </div>

          {/* Right Column - Story Display */}
          <div className="space-y-8">
            <div className="card-glow p-8 animate-slide-up" style={{animationDelay: '0.5s'}}>
              <h2 className="text-2xl font-fairy text-white mb-6 flex items-center">
                <span className="text-star-gold-400 mr-3 text-3xl">📖</span>
                Your Magical Story
              </h2>
              
              {currentStory ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-fairy text-star-gold-400 animate-glow">
                      ✨ {currentStory.title} ✨
                    </h3>
                    <button 
                      onClick={generateNewStory}
                      className="button-primary text-sm px-4 py-2 flex items-center space-x-2"
                    >
                      <span>✨</span>
                      <span>New Story</span>
                    </button>
                  </div>
                  
                  {settings.parentalPreview && (
                    <div className="space-y-4">
                      {currentStory.paragraphs.map((paragraph, index) => (
                        <div key={index} className="text-magical-lavender-200 leading-relaxed text-lg font-body p-4 bg-slate-800/30 rounded-xl border border-purple-400/20">
                          {paragraph}
                        </div>
                      ))}
                      
                      <div className="text-magical-purple-300 italic border-l-4 border-star-gold-400 pl-6 py-3 bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-r-xl">
                        <span className="text-star-gold-400 font-fairy">💫 Moral:</span> {currentStory.moral}
                      </div>
                    </div>
                  )}
                  
                  {settings.illustrations && (
                    <div className="mt-6 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 rounded-2xl border border-purple-400/30">
                      <div className="text-magical-purple-300 mb-3 font-body text-lg">
                        🎨 Magical Illustrations Coming Soon!
                      </div>
                      <div className="text-sm text-magical-lavender-400 bg-slate-800/40 p-3 rounded-lg">
                        <span className="text-star-gold-400">✨ Prompt:</span> "A soft, kid-friendly cartoon illustration for a bedtime story. 
                        Hero: {childData.name}, Age: {childData.age}, 
                        Favorite animal: {childData.favorites.animal}, 
                        Color: {childData.favorites.color}, 
                        Place: {childData.favorites.place}. 
                        Theme: {settings.theme}. 
                        Style: whimsical, pastel, cute, safe for children."
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-magical-lavender-300 mb-6 text-xl font-body">
                    🌟 No magical story yet! Create one below! 🌟
                  </div>
                  <button 
                    onClick={generateNewStory}
                    className="button-primary text-lg px-12 py-4"
                    disabled={!childData.name}
                  >
                    ✨ Generate Magical Story ✨
                  </button>
                  {!childData.name && (
                    <p className="text-magical-purple-400 mt-4 text-sm">
                      Please enter your child's name first! 👶
                    </p>
                  )}
                </div>
              )}
            </div>

            {currentStory && (
              <>
                <div className="animate-slide-up" style={{animationDelay: '0.6s'}}>
                  <Story
                    story={currentStory}
                    childData={childData}
                    settings={settings}
                    onGenerateNew={generateNewStory}
                  />
                </div>
                
                <div className="animate-slide-up" style={{animationDelay: '0.7s'}}>
                  <InteractiveStorytelling
                    story={currentStory}
                    onStoryUpdate={handleStoryUpdate}
                  />
                </div>
                
                <div className="animate-slide-up" style={{animationDelay: '0.8s'}}>
                  <NarrationControls
                    isPlaying={isPlaying}
                    isPaused={isPaused}
                    onPlay={handlePlay}
                    onPause={handlePause}
                    onStop={handleStop}
                    onReplay={handleReplay}
                    progress={progress}
                    settings={settings}
                  />
                </div>
              </>
            )}

            {showRitual && (
              <div className="card-glow p-8 animate-breathe">
                <h2 className="text-3xl font-fairy text-white mb-6 text-center animate-glow">
                  🌙 Time for Sweet Dreams ✨
                </h2>
                <p className="text-magical-lavender-300 text-center mb-6 text-lg font-body">
                  Your magical story is complete! Time for a peaceful goodnight ritual. 🌟
                </p>
                <div className="text-center">
                  <button 
                    onClick={() => setShowRitual(false)}
                    className="button-primary text-lg px-8 py-4"
                  >
                    ✨ Start New Adventure ✨
                  </button>
                </div>
              </div>
            )}
          </div>
          </div>
        </div>
      )}

      {/* Filters Panel - Full Screen */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-slate-900 filters-container">
          {/* Header */}
          <div className="h-16 bg-slate-800 border-b border-purple-400/30 flex items-center justify-between px-6">
            <h1 className="text-2xl font-fairy text-white">
              🎛️ Story Settings & Personalization
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFilters(false)}
                className="button-primary text-sm px-4 py-2 flex items-center space-x-2"
              >
                <span>🏠</span>
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="text-white hover:text-star-gold-400 text-xl p-2 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="flex h-full filters-content" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Left Side - Personalization */}
            <div className="flex-1 p-4 border-r border-purple-400/20">
              <div className="h-full filters-scroll">
                <h2 className="text-lg font-fairy text-star-gold-400 mb-4 flex items-center">
                  <span className="mr-2">✨</span>
                  Personalize Your Magical Story
                </h2>
                <div className="filters-content">
                  <PersonalizationForm 
                    childData={childData} 
                    onUpdate={setChildData} 
                  />
                </div>
              </div>
            </div>

            {/* Right Side - Story Settings */}
            <div className="flex-1 p-4">
              <div className="h-full filters-scroll">
                <h2 className="text-lg font-fairy text-star-gold-400 mb-4 flex items-center">
                  <span className="mr-2">🎛️</span>
                  Magical Story Settings
                </h2>
                <div className="filters-content">
                  <FiltersPanel 
                    settings={settings} 
                    onSettingsChange={setSettings} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Panel - Full Screen */}
      {showDashboard && (
        <div className="fixed inset-0 z-50 bg-slate-900 filters-container">
          {/* Header */}
          <div className="h-16 bg-slate-800 border-b border-purple-400/30 flex items-center justify-between px-6">
            <h1 className="text-2xl font-fairy text-white">
              📊 Your Magical Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowDashboard(false)}
                className="button-primary text-sm px-4 py-2 flex items-center space-x-2"
              >
                <span>🏠</span>
                <span>Back to Home</span>
              </button>
              <button
                onClick={() => setShowDashboard(false)}
                className="text-white hover:text-star-gold-400 text-xl p-2 rounded-full"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Main Content Container */}
          <div className="flex h-full filters-content" style={{ height: 'calc(100vh - 64px)' }}>
            {/* Left Side - Dream Stars */}
            <div className="flex-1 p-4 border-r border-purple-400/20">
              <div className="h-full filters-scroll">
                <h2 className="text-lg font-fairy text-star-gold-400 mb-4 flex items-center">
                  <span className="mr-2">⭐</span>
                  Dream Stars & Achievements
                </h2>
                <div className="filters-content">
                  <DreamStars dreamStars={dreamStars} />
                </div>
              </div>
            </div>

            {/* Right Side - Story History */}
            <div className="flex-1 p-4">
              <div className="h-full filters-scroll">
                <h2 className="text-lg font-fairy text-star-gold-400 mb-4 flex items-center">
                  <span className="mr-2">📚</span>
                  Story History & Adventures
                </h2>
                <div className="filters-content">
                  <StoryHistory storyHistory={storyHistory} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
