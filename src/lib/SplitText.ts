/**
 * Simple SplitText implementation to avoid needing the GSAP Club plugin
 * This is a basic version that will work for our needs
 */
export class SimpleSplitText {
  chars: HTMLElement[] = [];
  words: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  originalHTML: string;
  element: Element;
  
  constructor(element: Element | string, options: any = {}) {
    if (typeof element === 'string') {
      const selectedElement = document.querySelector(element);
      if (!selectedElement) {
        throw new Error(`SplitText: Element with selector "${element}" not found.`);
      }
      this.element = selectedElement;
    } else {
      this.element = element;
    }
    
    this.originalHTML = this.element.innerHTML;
    this.split(options);
  }
  
  split(options: any) {
    const text = this.element.textContent || '';
    this.element.innerHTML = '';
    
    // Create container for our split text
    const container = document.createElement('div');
    container.className = 'split-text-container';
    
    // Split by lines first (simulating, not actual line breaks)
    const lines = text.split('\n');
    
    lines.forEach((line, lineIndex) => {
      const lineEl = document.createElement('div');
      lineEl.className = options.linesClass || 'split-line';
      lineEl.setAttribute('data-line', lineIndex.toString());
      
      // Split by words
      const words = line.trim().split(/\s+/);
      
      words.forEach((word, wordIndex) => {
        const wordEl = document.createElement('div');
        wordEl.className = options.wordsClass || 'split-word';
        wordEl.setAttribute('data-word', wordIndex.toString());
        wordEl.style.display = 'inline-block';
        
        // Split by characters
        const chars = word.split('');
        
        chars.forEach((char, charIndex) => {
          const charEl = document.createElement('span');
          charEl.className = options.charsClass || 'split-char';
          charEl.setAttribute('data-char', charIndex.toString());
          charEl.style.display = 'inline-block';
          charEl.textContent = char;
          
          wordEl.appendChild(charEl);
          this.chars.push(charEl);
        });
        
        lineEl.appendChild(wordEl);
        lineEl.appendChild(document.createTextNode(' '));
        this.words.push(wordEl);
      });
      
      container.appendChild(lineEl);
      this.lines.push(lineEl);
    });
    
    this.element.appendChild(container);
  }
  
  revert() {
    this.element.innerHTML = this.originalHTML;
    this.chars = [];
    this.words = [];
    this.lines = [];
  }
}

// Mock GSAP's SplitText
export default SimpleSplitText;
