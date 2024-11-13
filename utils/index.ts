export function getInnerTextFromHTML(htmlString: string): string {
    // Create a temporary DOM element
    let tempElement = document.createElement('div');
    
    // Set the innerHTML of the temporary element to the HTML string
    tempElement.innerHTML = htmlString;
    
    // Retrieve and return the innerText
    return tempElement.innerText;
}


