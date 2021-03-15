import './App.css';
import {useState} from 'react'
import Sentence from './components/Sentence'

const App = () => {

  const [sentences, setSentences] = useState([])
  const [importantSentences, setImportantSentences] = useState([])

  const loadFile = (event) => {
    const fileList = event.target.files
    const file = fileList[0]
    const reader = new FileReader()
    reader.addEventListener('load', (event) => {
        const splitLines = str => str.split(/\r?\n/)
        setSentences(splitLines(event.target.result))
    })
    reader.readAsText(file)
  }

  const addImportantSentence = (number) => {
    setImportantSentences([...importantSentences, number])
  }

  const removeImportantSentence = (number) => {
    const newImportantSentences = importantSentences.filter((sentenceNumber) => sentenceNumber !== number)
    setImportantSentences(newImportantSentences)
  }

  const saveMarkings = () => {
    if(importantSentences.length === 0) {
      alert('You have no markings in the text')
      return
    }
    let content = ''
    importantSentences.forEach((number) => content = content + number + '\n')
    console.log(content)
    downloadFile(content, 'sentences.txt', 'text/plain')
  }

  const downloadFile = (content, filename, contentType) => {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    
    a.href= URL.createObjectURL(file);
    a.download = filename;
    a.click();
  
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="App">
        <h1>Annotation tool</h1>
        <input type="file" onChange={loadFile}></input>
        <div className="app__flexbox">
          <div className="file__box">
            {sentences.map(
              (sentence, index) => <Sentence key={index} id={index+1} sentence={sentence} addSentenceListener={addImportantSentence} removeSentenceListener={removeImportantSentence}/>
            )}
          </div>
          <div className="important-sentences-box">
              <h3>Marked sentences:</h3>
              <div id="important-sentences">
                {importantSentences.map((number, index) => <p key={index}>{number}</p>)}
              </div>
              <button className="save-btn" onClick={saveMarkings}>Save markings</button>
          </div>
        </div>
    </div>
  )
}

export default App;
