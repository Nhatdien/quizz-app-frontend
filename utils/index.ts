import { parse } from 'node-html-parser';

export function getInnerTextFromHTML(htmlString: string): string {
  // Parse the HTML string
  const root = parse(htmlString);

  // Retrieve and return the innerText
  return root.text || "";
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

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));