

export interface Tip {
    text: string;
    simplified: string;
}

export interface CodeVersion {
    code: string;
    tips: Tip[];
}

export interface ComplexityAnalysis {
    original: string;
    refactored: string;
}

export interface AnalysisResult {
    type: 'analysis' | 'debug' | 'explanation';
    title?: string;
    cleanCode?: CodeVersion;
    performantCode?: CodeVersion;
    advancedCode?: CodeVersion;
    complexity?: ComplexityAnalysis;
}


export enum Tab {
    Clean = 'Clean Code',
    Performant = 'Performance',
    Advanced = 'Advanced',
    Complexity = 'Complexity',
    Debug = 'Debug Result',
    Explanation = 'Explanation',
}