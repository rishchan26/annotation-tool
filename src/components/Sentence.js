import {useState} from 'react'

const Sentence = ({id, sentence, addSentenceListener, removeSentenceListener}) => {
    const [important, setImportant] = useState(false)

    const changeImportance = () => {
        if (important === false) {
            addSentenceListener(id)
        }
        else {
            removeSentenceListener(id)
        }
        setImportant(!important)
    }

    return (
        <div className="sentence__box">
            <span className="sentence__box__id">{id}</span>
            <p className={important ? 'important__sentence sentence__box__content' : 'sentence__box__content' }onClick={changeImportance}>{sentence}</p>
        </div>
    )
}

export default Sentence