// Enhanced story generator with more variety and themes
export const generateStory = (childData, settings) => {
  const themes = {
    'fairy-tale': {
      setting: 'a magical kingdom',
      characters: ['fairy', 'princess', 'knight', 'dragon', 'wizard'],
      elements: ['castle', 'magic', 'crown', 'enchanted forest', 'crystal'],
      beginnings: [
        `Once upon a time, in a land far away, ${childData.name} discovered a magical kingdom.`,
        `In the enchanted realm where dreams come true, ${childData.name} found themselves in a fairy tale adventure.`,
        `Long ago, when magic still filled the air, ${childData.name} stepped into a world of wonder.`
      ],
      endings: [
        `And so, ${childData.name} learned that true magic comes from kindness and courage.`,
        `From that day forward, ${childData.name} knew that every ending is just a new beginning.`,
        `The kingdom celebrated ${childData.name} as a true hero of the heart.`
      ]
    },
    'adventure': {
      setting: 'a mysterious forest',
      characters: ['explorer', 'guide', 'friend', 'mountain climber', 'treasure hunter'],
      elements: ['treasure', 'map', 'journey', 'mountain', 'cave'],
      beginnings: [
        `Deep in the heart of an ancient forest, ${childData.name} began an incredible adventure.`,
        `With a sense of wonder and excitement, ${childData.name} set out to explore the unknown.`,
        `In a world full of mysteries waiting to be discovered, ${childData.name} found their calling.`
      ],
      endings: [
        `Through courage and determination, ${childData.name} proved that every adventure teaches us something new.`,
        `The journey had changed ${childData.name} forever, filling them with wisdom and strength.`,
        `And so, ${childData.name} became known as the bravest explorer in all the land.`
      ]
    },
    'animals': {
      setting: 'a peaceful meadow',
      characters: ['rabbit', 'owl', 'deer', 'butterfly', 'frog'],
      elements: ['tree', 'flowers', 'stream', 'garden', 'nest'],
      beginnings: [
        `In a beautiful meadow where animals lived in harmony, ${childData.name} made wonderful friends.`,
        `Among the gentle creatures of the forest, ${childData.name} discovered the joy of friendship.`,
        `In a world where every animal had a story to tell, ${childData.name} became part of their family.`
      ],
      endings: [
        `The animals taught ${childData.name} that friendship knows no boundaries.`,
        `From that day on, ${childData.name} understood the language of all creatures.`,
        `The meadow became a place where ${childData.name} would always find peace and friendship.`
      ]
    },
    'space': {
      setting: 'a distant planet',
      characters: ['astronaut', 'alien', 'robot', 'space captain', 'star guide'],
      elements: ['spaceship', 'stars', 'moon', 'planet', 'nebula'],
      beginnings: [
        `Among the twinkling stars and distant galaxies, ${childData.name} embarked on a cosmic adventure.`,
        `In the vast expanse of space, ${childData.name} discovered wonders beyond imagination.`,
        `On a journey through the universe, ${childData.name} met beings from worlds far away.`
      ],
      endings: [
        `The universe had shown ${childData.name} that we are all connected by the stars.`,
        `From that cosmic journey, ${childData.name} brought back wisdom from the stars.`,
        `The galaxy celebrated ${childData.name} as a true space explorer.`
      ]
    },
    'pirates': {
      setting: 'a tropical island',
      characters: ['pirate', 'parrot', 'captain', 'first mate', 'treasure keeper'],
      elements: ['treasure', 'ship', 'island', 'compass', 'map'],
      beginnings: [
        `On the high seas where adventure awaits, ${childData.name} joined a crew of friendly pirates.`,
        `In a world of treasure maps and tropical islands, ${childData.name} became a brave sailor.`,
        `With the wind in their sails and courage in their heart, ${childData.name} set out for adventure.`
      ],
      endings: [
        `The pirates taught ${childData.name} that the greatest treasure is friendship.`,
        `From that day forward, ${childData.name} was known as the kindest pirate on the seven seas.`,
        `The island became a place where ${childData.name} would always find adventure and friendship.`
      ]
    }
  }

  const theme = themes[settings.theme]
  const paragraphs = Math.ceil(settings.length / 2) // Rough estimate: 2 minutes per paragraph

  // Select random beginning and ending
  const beginning = theme.beginnings[Math.floor(Math.random() * theme.beginnings.length)]
  const ending = theme.endings[Math.floor(Math.random() * theme.endings.length)]

  let story = {
    title: `${childData.name}'s ${theme.setting} Adventure`,
    paragraphs: [beginning],
    moral: "Always be kind and brave, and you'll find wonderful friends along the way!"
  }

  // Generate middle paragraphs
  for (let i = 1; i < paragraphs - 1; i++) {
    const character = theme.characters[i % theme.characters.length]
    const element = theme.elements[i % theme.elements.length]
    
    const middleParagraphs = [
      `As ${childData.name} explored further, they met a wise ${character} who shared stories of ${element}. The ${character} had a special ${childData.favorites.color} ${childData.favorites.animal} as a companion, and together they showed ${childData.name} the beauty of ${childData.favorites.place}.`,
      `Continuing their journey, ${childData.name} discovered that the ${character} was not just any ${character}, but a guardian of ${element}. With their ${childData.favorites.color} ${childData.favorites.animal} friend, they guided ${childData.name} through the magical ${childData.favorites.place}.`,
      `The adventure continued as ${childData.name} learned from the gentle ${character} about the secrets of ${element}. Their ${childData.favorites.color} ${childData.favorites.animal} companion helped them understand the magic that filled ${childData.favorites.place}.`
    ]
    
    story.paragraphs.push(middleParagraphs[i % middleParagraphs.length])
  }

  // Add ending
  if (paragraphs > 1) {
    story.paragraphs.push(ending)
  }

  return story
}

// Stable Horde API integration for illustrations
export const generateIllustration = async (childData, settings, sceneDescription) => {
  const prompt = `A soft, kid-friendly cartoon illustration for a bedtime story. Hero: ${childData.name}, Age: ${childData.age}, Favorite animal: ${childData.favorites.animal}, Color: ${childData.favorites.color}, Place: ${childData.favorites.place}. Theme: ${settings.theme}. Style: whimsical, pastel, cute, safe for children. Scene: ${sceneDescription}`
  
  try {
    const response = await fetch('https://stablehorde.net/api/v2/generate/async', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'your-api-key-here' // Replace with actual API key
      },
      body: JSON.stringify({
        prompt: prompt,
        params: {
          width: 512,
          height: 512,
          steps: 20,
          cfg_scale: 7,
          sampler_name: 'k_euler',
          n: 1
        }
      })
    })
    
    const data = await response.json()
    return data.id // Return job ID for polling
  } catch (error) {
    console.error('Error generating illustration:', error)
    return null
  }
}

// Poll for illustration completion
export const pollIllustration = async (jobId) => {
  try {
    const response = await fetch(`https://stablehorde.net/api/v2/generate/check/${jobId}`)
    const data = await response.json()
    
    if (data.done) {
      const imageResponse = await fetch(`https://stablehorde.net/api/v2/generate/status/${jobId}`)
      const imageData = await imageResponse.json()
      return imageData.generations[0].img
    }
    
    return null
  } catch (error) {
    console.error('Error polling illustration:', error)
    return null
  }
}
