import findNextSeparatingCharacter from "./findNextSeparatingCharacter";

const getAuthor = (workingQuoteObject) => {
    let { author, remainingText } = workingQuoteObject
    workingQuoteObject['author'] = author = remainingText
    // console.log(remainingText)
    let textEnd = remainingText.length;
    console.log(`🚀 ~ file: parseQuotes.js ~ line 60 ~ getQuoteAuthor ~ author`, author)
    console.log(`🚀 ~ file: parseQuotes.js ~ line 62 ~ getQuoteAuthor ~ remainingText`, remainingText)
    // console.log(`🚀 ~ file: parseQuotes.js ~ line 62 ~ getQuoteAuthor ~ separator`, separator)

    // let separator = findNextSeparatingCharacter(remainingText);
    // console.log(`🚀 ~ file: getAuthor.js ~ line 19 ~ getAuthor ~ separator`, separator)
    if (remainingText && remainingText.includes("-")) {
        console.log(`🚀 ~ file: getAuthor.js ~ line 12 ~ getAuthor ~ remainingText && remainingText.includes("-")`, remainingText && remainingText.includes("-"))
        author = remainingText = remainingText.split(/-(.+)/)[1]
        author = author.trim()
        // author = remainingText = remainingText.split("-")[1]
        console.log(`🚀 ~ file: getAuthor.js ~ line 14 ~ getAuthor ~ author`, author)
    }
    if (!author && !remainingText) {
        author = remainingText = workingQuoteObject.details[0]?.value
    }
    let separator = findNextSeparatingCharacter(remainingText);
    console.log(`🚀 ~ file: getAuthor.js ~ line 19 ~ getAuthor ~ separator`, separator)
    if (separator.value > -1 && author) {
        console.log(`🚀 ~ file: getAuthor.js ~ line 15 ~ getAuthor ~ remainingText`, remainingText)
        console.log(`🚀 ~ file: getAuthor.js ~ line 17 ~ getAuthor ~ author`, author)
        // console.log(`🚀 ~ file: parseQuotes.js ~ line 65 ~ getQuoteAuthor ~ separator > -1 && separator`, (separator > -1), separator, author)
        // author = authorContainsDash(workingQuoteObject, author)
        remainingText = remainingText.trim()
        let i1 = remainingText[0]
        let i2 = remainingText[separator.value]
        console.log(`🚀 ~ file: getAuthor.js ~ line 19 ~ getAuthor ~ i1, i2, separator`, i1, i2, separator)

         author = Array.from(author).splice(0, separator.value ).join(String()).trim();
        console.log(`🚀 ~ file: getAuthor.js ~ line 16 ~ getAuthor ~ author`, author)

        // author = Array.from(remainingText).splice(separator.value + 2, textEnd).join(String()).trim();
        remainingText = Array.from(remainingText).splice(separator.value - 2, textEnd).join(String()).trim(); 
        // must be value - 2 to capture separating character and properly parse next part
        console.log(`🚀 ~ file: getAuthor.js ~ line 31 ~ getAuthor ~ remainingText`, remainingText)
        // console.log(`🚀 ~ file: parseQuotes.js ~ line 79 ~ getQuoteAuthor ~ remainingText`, remainingText)
        workingQuoteObject['remainingText'] = remainingText
        // workingQuoteObject['title'] = remainingText
        workingQuoteObject['author'] = author;
        // workingQuoteObject['author'] = remainingText
        // workingQuoteObject['parsingComplete'] = true
    } else {
        console.log('parse.js line:45 separator', separator);
        // author = authorContainsDash(workingQuoteObject['remainingText'])
        // author = authorContainsDash(remainingText)
        workingQuoteObject['author'] = author
        workingQuoteObject['remainingText'] = false
        workingQuoteObject['parsingComplete'] = true
    }
    let checkAuthor = findNextSeparatingCharacter(author)
    if(checkAuthor){
        workingQuoteObject['author'] = author = author.split(checkAuthor.openingChar)[0].trim()
        console.log(`🚀 ~ file: getAuthor.js ~ line 46 ~ getAuthor ~ author`, author)
    }
    console.log(`🚀 ~ file: getAuthor.js ~ line 44 ~ getAuthor ~ findNextSeparatingCharacter(author)`, findNextSeparatingCharacter(author))
    // workingQuoteObject['author'] = author;
    // console.log(`🚀 ~ file: parseQuotes.svelte ~ line 53 ~ parseQuoteAuthorName ~ author`, author)
    // console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ remainingText`, remainingText)
    // console.log(`🚀 ~ file: parse.js ~ line 54 ~ getQuoteAuthor ~ workingQuoteObject`, workingQuoteObject)
    return workingQuoteObject
}

// function authorContainsDash(workingQuoteObject, author) {
//     console.log(`🚀 ~ file: parseQuotes.js ~ line 50 ~ authorContainsDash ~ author`, author)
//     if (author.includes("-")) {
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 53 ~ authorContainsDash ~ author.includes("-")`, true)
//         // let res = author.split("-")[1].trim()
//         let res = author.split("-")
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 55 ~ authorContainsDash ~ res`, res)
//         res.shift()
//         res.join(String()).trim()
//         // res.trim()
//         workingQuoteObject['author'] = res
//         // let res = author.split("-").trim()
//         console.log(`🚀 ~ file: parseQuotes.js ~ line 53 ~ authorContainsDash ~ res`, res)
//         return res
//     }
//     return author.trim()
// }


export default getAuthor;