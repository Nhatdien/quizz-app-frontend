export function getInnerTextFromHTML(htmlString: string): string {
  // Create a temporary DOM element
  let tempElement = document.createElement("div");

  // Set the innerHTML of the temporary element to the HTML string
  tempElement.innerHTML = htmlString;

  // Retrieve and return the innerText
  return tempElement.innerText;
}

export function compareTwoArrayAnyOrder<T>(arr1: T[], arr2: T[]): boolean {
  // Check if the length of the two arrays are the same
  if (arr1.length !== arr2.length) {
    return false;
  }

  // Sort the two arrays
  arr1.sort();
  arr2.sort();

  // Check if the two arrays are equal
  return arr1.every((value, index) => value === arr2[index]);
}
