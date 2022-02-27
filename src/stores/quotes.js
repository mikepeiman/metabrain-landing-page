import { writable } from "svelte/store";

const quotesFile = writable({})
const fileContent = writable({})
const quotesArray = writable([])
export const addedQuotes = writable([])

export const addQuote = (quote) => {
console.log(`🚀 ~ file: quotes.js ~ line 9 ~ addQuote ~ quote`, quote)
    addedQuotes.update((cur) => [...cur, quote])
    console.log(`🚀 ~ file: quotes.js ~ line 11 ~ addQuote ~ addedQuotes`, addedQuotes)
}

export const deleteQuote = (id) => {
    addedQuotes.update((cur) => {
        const newQuotes = cur.filter(quote => quote.id !== id)
        return newQuotes
    })
}




export const storedQuotesFile = {
    subscribe: quotesFile.subscribe,
    set: val => {
        quotesFile.set(val);
        localStorage.setItem("quotesFile", JSON.stringify(val));
    }
};

export const storedFileContent = {
    subscribe: fileContent.subscribe,
    set: val => {
        fileContent.set(val);
        localStorage.setItem("fileContent", JSON.stringify(val));
    }
};

export const storedQuotesArray = {
    subscribe: quotesArray.subscribe,
    set: val => {
        quotesArray.set(val);
        localStorage.setItem("quotesArray", JSON.stringify(val));
    }
};