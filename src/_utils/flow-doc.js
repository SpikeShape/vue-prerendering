// @flow

/*
  This is just an overview to check if your editor/IDE is configured to show errors on the fly
  To read about proper typing in Flow, check the following links:
  * The official docs: https://flow.org/en/docs/types/
  * An (unofficial) cheat sheet including links to the Flow docs: https://devhints.io/flow

  Removing the first line should remove all type-specific errors
*/

let teststring = 'teststring'; // Error
console.log(teststring);

/**
 * correct:
 * let teststring: string = 'teststring';
 */


let teststring2: number = 2;
teststring2 += '2'; // Error
console.log(teststring2);

/**
 * correct:
 * teststring2 += 2;
 */


let testarray: Array = ['testentry']; // Error
console.table(testarray);

/**
 * let testarray: Array<string> = ['testentry'];
 */


const protectedArray: $ReadOnlyArray<string> = ['testentry'];
protectedArray.push('whatever'); // Error

/**
 * better:
 * either
 * let protectedArray: Array<string> = ['test'];
 *
 * My tip:
 * Don't mutate Arrays in const variables - just for consistency
 */


function sum(x: string, y: boolean) {
  return x + y; // Error
}

sum(1, true);  // Error when calling with incorrect parameters


function sum2(x: number, y: number): void {
  return x + y; // Error because of incorrect return type
}

sum2(1, 1);

/**
 * correct:
 * function sum2(x: number, y: number): number {
 *   return x + y;
 * }
 */
