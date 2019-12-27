const LineByLine = require('n-readlines');

class WordsService{
    constructor(filePath){
        const words = []
        const WORD_LENGTH = 40

        console.log("WordService loading...")

        let liner, line, lineNumber = 0
        try{
            liner = new LineByLine('./words.txt')
        }
        catch(e){
            console.log("WordService did not load. See if the file exists in the right directory.")
            return
        }
        while(line = liner.next()){
            ++lineNumber
            line = line.toString('ascii')
            if(line.length > WORD_LENGTH){
                console.log(`WordService warning: a word ${line} of length ${line.length} at line number ${lineNumber} was found with more than allowed length of ${WORD_LENGTH}. Word is skipped over.`)
            }
            else {
                words.push(line)
            }
        }
        console.log("WordService loaded...")

        this.getWordAtIndex = (index) => {
            if(index >= words.length || index < 0){
                console.log(`WordService error: index ${index} out of bound. WordService::getWordAtIndex() exited early.`)
                return undefined
            }
            return words[index]
        }
    
        this.getRandomWord = () => {
            return words[Math.floor(Math.random() * (words.length - 1))]
        }
    }
}

const wordsService = new WordsService("./words.txt")

export default wordsService