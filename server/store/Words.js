const LineByLine = require('n-readlines');

class WordsStore{
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
                console.log(`WordStore did not load ${file}.`)
                console.log(e)
                return
            }
            while(line = liner.next()){
                ++lineNumber
                line = line.toString('ascii')
                if(line.length > WORD_LENGTH){
                    console.log(`WordStore warning: a word '${line}' of length ${line.length} at line number ${lineNumber} in file ${file} was found with more than allowed length of ${WORD_LENGTH}. Word is skipped over.`)
                }
                else {
                    toArray.push(line)
                }
            }
            console.log(`WordStore ${file} loaded...`)
        }
        const words = []
        const lostMsg = []
        const wonMsg = []
        const WORD_LENGTH = 40

        console.log("WordStore loading...")
        loadFromFileTo(wordFile, words)
        loadFromFileTo(wonFile, wonMsg)
        loadFromFileTo(lostFile, lostMsg) 
    }
}

const wordsStore = new WordsStore("/Words/words.txt", "/Words/won.txt", "/Words/lost.txt")

export default wordsStore