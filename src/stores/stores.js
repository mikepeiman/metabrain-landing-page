import { writable } from "svelte/store"
import {supabase} from '$lib/supabaseClient.js'
const settingsChange = writable({})

export const storedSettingsChange = {
    subscribe: settingsChange.subscribe,
    set: val => {
    console.log(`🚀 ~ file: stores.js ~ line 8 ~ val`, val)
        settingsChange.set(val);
        localStorage.setItem("settingsChange", JSON.stringify(val));
    }
};

export const loadQuotes = async () => {
    const {data, error} = await supabase.from('quotes').select('*').run()
    console.log(`🚀 ~ file: stores.js ~ line 16 ~ quotes`, data)
    if (error) {
        return console.error(error)
    }
    return data
}

