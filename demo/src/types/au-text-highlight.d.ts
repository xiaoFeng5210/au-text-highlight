declare module '../../../lib/bundle.esm.js' {
  export interface ExtractTextOptions {
    text: string;
    keywords: string;
  }

  export interface ExtractResult {
    start: number;
    end: number;
    text: string;
  }

  export interface HighlightRange {
    start: number;
    end: number;
  }

  export function auExtractText(options: ExtractTextOptions): ExtractResult[];

  export function sectionRangeHighlight(
    container: HTMLElement,
    ranges: HighlightRange[]
  ): void;

  export function getSelectionRange(
    container: Node,
    config?: any
  ): [number, number];
} 
