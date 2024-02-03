// create a random number with 6 digits from an array of numbers
export const createRandomNumber = (theNumberLength) => {
    const theNumberArray = [];
    for (let i = 0; i < theNumberLength; i++) {
        theNumberArray.push(Math.floor(Math.random() * 10));
    }
    return theNumberArray.join("");
};
//
