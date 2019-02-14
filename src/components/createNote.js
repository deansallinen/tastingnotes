// createNote.js

import React, {useState} from 'react'
// import { Mutation } from 'react-apollo'

const Input = ({placeholder}) => (
  <input className='bg-grey-light w-full mb-4 rounded py-2 px-2' type='text' placeholder={placeholder} />
)

const SectionGeneral = () => (
  <>
    <h2 className='mb-4'>General</h2>
    <Input placeholder='Tasting Date'  />
    <Input placeholder='Tasting Location'  />
    <Input placeholder='Tasting Partners'  />
    <Input placeholder='Wine Name'  />
    <Input placeholder='Producer'  />
    <Input placeholder='Region/appellation'  />
    <Input placeholder='Grape Varieties'  />
    <Input placeholder='Vintage'  />
    <Input placeholder='Alcohol'  />
    <Input placeholder='Price'  />
  </>
)

const SectionVisual = () => (
  <>
    <h2 className='mb-4'>Visual</h2>
    <label htmlFor='color-depth'>color-depth</label>
    <select name='color-depth'>
      <option value='watery'>watery</option>
      <option value='pale'>pale</option>
      <option value='medium'>medium</option>
      <option value='deep'>deep</option>
      <option value='dark'>dark</option>
    </select>
    
    <label htmlFor='color-hue'>color-hue</label>
    <select name='color-hue'>
      <option value='watery'>watery</option>
      <option value='pale'>pale</option>
      <option value='medium'>medium</option>
      <option value='deep'>deep</option>
      <option value='dark'>dark</option>
    </select>
    
    <label htmlFor='clarity'>clarity</label>
    <select name='clarity'>
      <option value='clear'>clear</option>
      <option value='slight-haze'>slight-haze</option>
      <option value='cloudy'>cloudy</option>
    </select>
  </>
)

const SectionAromatic = () => (
  <>
    <h2 className='mb-4'>Aromatic</h2>
    <label htmlFor='aroma-intensity'>aroma-intensity</label>
    <select name='aroma-intensity'>
      <option value='low'>low</option>
      <option value='moderate'>moderate</option>
      <option value='aromatic'>aromatic</option>
      <option value='powerful'>powerful</option>
    </select>
    
    <label htmlFor='development'>development</label>
    <select name='development'>
      <option value='youthful'>youthful</option>
      <option value='some-age'>some-age</option>
      <option value='aged'>aged</option>
    </select>
    
    <input className='border' type='textarea' placeholder='Aromas'  />
  </>
)

const SectionTaste = () => (
  <>
    <h2 className='mb-4'>Taste</h2>
    <label htmlFor='dry-sweet'>dry-sweet</label>
    <select name='dry-sweet'>
      <option value='bone-dry'>bone-dry</option>
      <option value='dry'>dry</option>
      <option value='off-dry'>off-dry</option>
      <option value='medium-sweet'>medium-sweet</option>
      <option value='sweet'>sweet</option>
      <option value='very-sweet'>very-sweet</option>
    </select>
    
    <label htmlFor='body'>body</label>
    <select name='body'>
      <option value='very-light'>very-light</option>
      <option value='light'>light</option>
      <option value='medium'>medium</option>
      <option value='medium-full'>medium-full</option>
      <option value='full-bodied'>full-bodied</option>
      <option value='heavy'>heavy</option>
    </select>
    
    <label htmlFor='acidity'>acidity</label>
    <select name='acidity'>
      <option value='tart'>tart</option>
      <option value='crisp'>crisp</option>
      <option value='flat'>flat</option>
      <option value='smooth'>smooth</option>
      <option value='flabby'>flabby</option>
    </select>
    
    <label htmlFor='tannins'>tannins</label>
    <input name='tannins' type='checkbox' />
    
    <label htmlFor='tannin-level'>tannin-level</label>
    <select name='tannin-level'>
      <option value='low'>low</option>
      <option value='medium'>medium</option>
      <option value='high'>high</option>
    </select>
    <label htmlFor='tannin-type'>tannin-type</label>
    <select name='tannin-type'>
      <option value='soft'>soft</option>
      <option value='round'>round</option>
      <option value='dry'>dry</option>
      <option value='hard'>hard</option>
    </select>
    
    <label htmlFor='balance'>balance</label>
    <select name='balance'>
      <option value='good'>good</option>
      <option value='fair'>fair</option>
      <option value='unbalanced'>unbalanced</option>
    </select>
    <label htmlFor='balance-excess'>balance-excess</label>
    <select name='balance-excess'>
      <option value='alcohol'>alcohol</option>
      <option value='acid'>acid</option>
      <option value='tannin'>tannin</option>
      <option value='sugar'>sugar</option>
    </select>
    
    <label htmlFor='flavour-intensity'>flavour-intensity</label>
    <select name='flavour-intensity'>
      <option value='low'>low</option>
      <option value='moderate'>moderate</option>
      <option value='flavourful'>flavourful</option>
      <option value='powerful'>powerful</option>
    </select>
    
    <input className='border' type='textarea' placeholder='Flavours'  />
    
    <label htmlFor='finish'>finish</label>
    <select name='finish'>
      <option value='short'>short</option>
      <option value='medium'>medium</option>
      <option value='long'>long</option>
      <option value='v-long'>v-long</option>
    </select>
  </>
)

const SectionConclusion = () => (
  <>
    <h2 className='mb-4'>Conclusion</h2>
    <input className='border' type='textarea' placeholder='Conclusion'  />

    <label htmlFor='style'>style</label>
    <select name='style'>
      <option value='traditional'>traditional</option>
      <option value='in-between'>in-between</option>
      <option value='modern'>modern</option>
    </select>
    
    <p>Rating</p>
    <div>
      <input type="radio" id="one"
       name="rating" value="1" checked />
      <label for="one">1</label>
  
      <input type="radio" id="two"
       name="rating" value="2" />
      <label for="two">2</label>
  
      <input type="radio" id="three"
       name="rating" value="3"/>
      <label for="three">3</label>
    </div>
  </>
)

const SectionFoodPairing = () => (
  <>
    <h2 className='mb-4'>Food Pairing</h2>
    <input className='border' type='text' placeholder='Food'  />
    <p>pairing-match</p>
    <div>
      <input type="radio" id="one"
       name="pairing-match" value="perfect" checked />
      <label for="one">perfect</label>
  
      <input type="radio" id="two"
       name="pairing-match" value="good" />
      <label for="two">good</label>
  
      <input type="radio" id="three"
       name="pairing-match" value="neutral" />
      <label for="three">neutral</label>
      
      <input type="radio" id="three"
       name="pairing-match" value="bad" />
      <label for="three">bad</label>
    </div>
  </>
)

const NoteSection = ({children, step, prevStep, nextStep}) => (
  <section className='max-w-md mx-auto mb-4 py-6 px-8 rounded bg-white '>
    <div>
      {children}
    </div>
    <div className='mt-4 flex justify-between'>
      <button className='py-2 px-4 font-bold rounded text-grey-darkest hover:bg-grey-light shadow' onClick={prevStep}>Back</button>
      <button className='py-2 px-4 font-bold rounded text-purple-lightest bg-purple-dark hover:bg-purple shadow' onClick={nextStep}>Next</button>
    </div>
  </section>
)

const NOTE_STEPS = {
  0: <SectionGeneral />,
  1: <SectionVisual />,
  2: <SectionAromatic />,
  3: <SectionTaste />,
  4: <SectionFoodPairing />,
  5: <SectionConclusion />,
}

const Note = () => {
  const [step, setStep] = useState(0)
  // const userID = '576f29d6-8199-486f-a2b0-712fbae19469'
  // const productID = '5ddb4590-5ebb-4a84-8995-e0d82c706717'
  
  const NUM_STEPS = Object.keys(NOTE_STEPS).length - 1
  const nextStep = () => setStep(Math.min(step + 1, NUM_STEPS))
  const prevStep = () => setStep(Math.max(step - 1, 0))
  
  return (
    <div>
      <h1>{step}</h1>
      <NoteSection step={step} prevStep={prevStep} nextStep={nextStep} >
        {NOTE_STEPS[step]}
      </NoteSection>
    </div>
  )
}

export default Note