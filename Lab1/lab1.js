const questionOne = function questionOne(arr) {
    let arrSum = 0;
    for (i = 0; i < arr.length; i++){
        arrSum += arr[i] * arr[i];
    }
    return arrSum;
}

const questionTwo = function questionTwo(num) { 
    return (num <= 1 ? num : questionTwo(num-2) + questionTwo(num-1))
}

const questionThree = function questionThree(text) {
    const vowel = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
    let vowels = 0;
    for (i = 0; i < text.length; i++){
        if (vowel.includes(text.charAt(i))){
            vowels++;
        }
    }
    return vowels;
}

const questionFour = function questionFour(num) {
    if (num < 0) return NaN;
    if ((num === 1 || num === 2)) return num;
    let factorial = 1;
        for (i = 1; i <= num; i++){
            factorial = factorial * i
        }
        return factorial;
}

module.exports = {
    firstName: "Jessica", 
    lastName: "Noel", 
    studentId: "10445079",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};