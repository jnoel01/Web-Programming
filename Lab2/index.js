const arrayUtils = require("./arrayUtils.js");
const stringUtils = require("./stringUtils.js");
const objUtils = require("./objUtils.js");

// MEAN TESTS //
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }

 // MEDIANSQUARED TESTS //
 try {
    // Should Pass
    const medianOne = arrayUtils.medianSquared([1, 2, 3]);
    console.log('median passed successfully');
 } catch (e) {
    console.error('median failed test case');
 }
 try {
    // Should Fail
    const medianTwo = arrayUtils.medianSquared(["guitar", 1, 3, "apple"]);
    console.error('median did not error');
 } catch (e) {
    console.log('median failed successfully');
 }

 // MAXELEMENT TESTS //
 try {
    // Should Pass
    const maxOne = arrayUtils.maxElement([5, 6, 7]);
    console.log('maxelement passed successfully');
 } catch (e) {
    console.error('maxelement failed test case');
 }
 try {
    // Should Fail
    const maxTwo = arrayUtils.maxElement([]);
    console.error('mean did not error');
 } catch (e) {
    console.log('maxelement failed successfully');
 }
 
 // FILL TESTS //
 try {
    // Should Pass
    const fillOne = arrayUtils.fill(11);
    console.log('fill passed successfully');
 } catch (e) {
    console.error('fill failed test case');
 }
 try {
    // Should Fail
    const fillTwo = arrayUtils.fill(-23);
    console.error('fill did not error');
 } catch (e) {
    console.log('fill failed successfully');
 }

 // COUNTREPEATING TESTS //
 try {
    // Should Pass
    const countOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countrepeat passed successfully');
 } catch (e) {
    console.error('countrepeat failed test case');
 }
 try {
    // Should Fail
    const countTwo = arrayUtils.countRepeating();
    console.error('countrepeat did not error');
 } catch (e) {
    console.log('countrepeat failed successfully');
 }

 // ISEQUAL TESTS //
 try {
    // Should Pass
    const equalOne = arrayUtils.isEqual([1, 2, 3], [3, 1, 2]);
    console.log('isequal passed successfully');
 } catch (e) {
    console.error('isequal failed test case');
 }
 try {
    // Should Fail
    const equalTwo = arrayUtils.isEqual();
    console.error('isequal did not error');
 } catch (e) {
    console.log('isequal failed successfully');
 }

 // CAMELCASE TESTS //
 try {
    // Should Pass
    const cameOne = stringUtils.camelCase('my function rocks');
    console.log('camel passed successfully');
 } catch (e) {
    console.error('camel failed test case');
 }
 try {
    // Should Fail
    const camelTwo = stringUtils.camelCase(123);
    console.error('camel did not error');
 } catch (e) {
    console.log('camel failed successfully');
 }

 // REPLACECHAR TESTS //
 try {
    // Should Pass
    const replaceOne = stringUtils.replaceChar("babbbbble");
    console.log('replacechar passed successfully');
 } catch (e) {
    console.error('replacechar failed test case');
 }
 try {
    // Should Fail
    const replaceTwo = stringUtils.replaceChar("");
    console.error('replacechar did not error');
 } catch (e) {
    console.log('replacechar failed successfully');
 }

// MASHUP TESTS //
try {
    // Should Pass
    const mashOne = stringUtils.mashUp("hello", "world");
    console.log('mashup passed successfully');
 } catch (e) {
    console.error('mashup failed test case');
 }
 try {
    // Should Fail
    const mashTwo = stringUtils.mashUp("h","e");
    console.error('mashup did not error');
 } catch (e) {
    console.log('mashup failed successfully');
 }

 //  MAKEARRAYS TESTS //
 try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };

    // Should Pass
    const firstSecondThirdOne = objUtils.makeArrays([first, second, third]);
    console.log('makearray passed successfully');
 } catch (e) {
    console.error('makearray failed test case');
 }
 try {
    const first = { x: 2, y: 3};
    const second = { a: 70, x: 4, z: 5 };
    const third = { x: 0, y: 9, q: 10 };

    // Should Fail
    const firstSecondThirdTwo = objUtils.makeArrays();
    console.error('makearray did not error');
 } catch (e) {
    console.log('makearray failed successfully');
 }

 // ISDEEPEQUAL TESTS //
 try {
    // Should Pass
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}

    const deepOne = objUtils.isDeepEqual(first, second);
    console.log('isdeep passed successfully');
 } catch (e) {
    console.error('isdeep failed test case');
 }
 try {
    const first = {a: 2, b: 3};
    const second = {a: 2, b: 4};
    const third = {a: 2, b: 3};
    const forth = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
    const fifth  = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
    // Should Fail
    const deepTwo = objUtils.isDeepEqual("foo", "bar");
    console.error('isdeep did not error');
 } catch (e) {
    console.log('isdeep failed successfully');
 }


 // COMPUTE OBJECT TESTS //
 try {
    // Should Pass
    const computeOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('compute passed successfully');
 } catch (e) {
    console.error('compute failed test case');
 }
 try {
    // Should Fail
    const computeTwo = objUtils.computeObject({ a: 3, b: 7, c: 5 });
    console.error('compute did not error');
 } catch (e) {
    console.log('compute failed successfully');
 }