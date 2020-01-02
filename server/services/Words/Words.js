const LineByLine = require('n-readlines');

class WordsService{
    constructor(wordFile, wonFile, lostFile){
        this.randomWord = () => {
            return words[Math.floor(Math.random() * (words.length - 1))]
        }

        this.randomLostMsg = () => {
            return lostMsg[Math.floor(Math.random() * (lostMsg.length - 1))]
        }

        this.randomWonMsg = () => {
            return wonMsg[Math.floor(Math.random() * (wonMsg.length - 1))]
        }
        
        const loadFromFileTo = (file, toArray) => {
            let liner, line, lineNumber = 0
            try{
                liner = new LineByLine(__dirname + file)
            }
            catch(e){
                console.log(`WordService did not load ${file}.`)
                console.log(e)
                return
            }
            while(line = liner.next()){
                ++lineNumber
                line = line.toString('ascii')
                if(line.length > WORD_LENGTH){
                    console.log(`WordService warning: a word '${line}' of length ${line.length} at line number ${lineNumber} in file ${file} was found with more than allowed length of ${WORD_LENGTH}. Word is skipped over.`)
                }
                else {
                    toArray.push(line)
                }
            }
            console.log(`WordService ${file} loaded...`)
        }
        const words = []
        const lostMsg = []
        const wonMsg = []
        const WORD_LENGTH = 40

        console.log("WordService loading...")
        loadFromFileTo(wordFile, words)
        loadFromFileTo(wonFile, wonMsg)
        loadFromFileTo(lostFile, lostMsg) 
    }
}

const wordsService = new WordsService("/words.txt", "/won.txt", "/lost.txt")

export default wordsService