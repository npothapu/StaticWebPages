const Typo = require("typo-js");
const fs = require("fs");

function loadDictionaries() {
    try {
        const defaultDict = new Typo("en_US"); // Load default dictionary

        // Load custom words from file
        let customWords = [];
        if (fs.existsSync("./custom.dic")) {
            customWords = fs
                .readFileSync("./custom.dic", "utf-8")
                .split("\n")
                .map(word => word.trim()) // Remove extra spaces and \r characters
                .filter(Boolean); // Filter empty lines
        } else {
            console.warn("Warning: custom.dic not found. Using default dictionary only.");
        }

        return { defaultDict, customWords };
    } catch (error) {
        console.error("Error loading dictionaries:", error);
        return { defaultDict: null, customWords: [] };
    }
}

//module.exports = { loadDictionaries };
// Check if a word is valid
function isWordValid(word, defaultDict, customDict) {
    return defaultDict.check(word) || customDict.includes(word);
}

module.exports = { loadDictionaries, isWordValid };

