const { fetchWebsiteText } = require("./fetchWebsiteContent");
const { loadDictionaries, isWordValid } = require("./dictionaryManager");


async function spellCheckWebsite(url) {
    console.log(`Fetching text content from: ${url}`);
    const text = await fetchWebsiteText(url);

        // Load dictionaries
        const { defaultDict, customWords } = loadDictionaries();
       // console.log("Custom Words Loaded:", customWords); // Check if this prints the words correctly
    // Split text into words
    const words = text.split(/\W+/).filter(Boolean); // Split by non-word characters and filter empty strings

    // Check spelling
    const misspelledWords = words.filter((word) => !isWordValid(word, defaultDict, customWords));

    // Report results
    if (misspelledWords.length > 0) {
        console.error("Misspelled words found:", misspelledWords);
        process.exit(1); // Exit with failure for CI/CD
    } else {
        console.log("No spelling errors found.");
    }
}

// Replace with your website URL
const websiteURL = "https://www.vml.com";
spellCheckWebsite(websiteURL);
