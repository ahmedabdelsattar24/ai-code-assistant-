
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { CodeInput } from './components/CodeInput';
import { Loader } from './components/Loader';
import { ResultsDisplay } from './components/ResultsDisplay';
import { processCode, Action } from './services/geminiService';
import { AnalysisResult } from './types';

const App: React.FC = () => {
    const [code, setCode] = useState<string>('');
    const [language, setLanguage] = useState<string>('python');
    const [loadingAction, setLoadingAction] = useState<Action | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

    const handleProcessCode = useCallback(async (action: Action) => {
        if (!code.trim()) {
            setError('Please enter some code to process.');
            return;
        }
        setLoadingAction(action);
        setError(null);
        setAnalysisResult(null);

        try {
            const result = await processCode(code, language, action);
            setAnalysisResult(result);
        } catch (err) {
            console.error('API Error:', err);
            setError('Failed to process code. The model may be unavailable or the input is invalid. Please try again.');
        } finally {
            setLoadingAction(null);
        }
    }, [code, language]);

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            <Header />
            <main className="container mx-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <p className="text-center text-gray-600 mb-8 text-lg">
                        Elevate your code from functional to exceptional. Enter a snippet, choose an action, and let our AI assistant help you.
                    </p>
                    <CodeInput
                        code={code}
                        setCode={setCode}
                        language={language}
                        setLanguage={setLanguage}
                        onProcess={handleProcessCode}
                        loadingAction={loadingAction}
                    />

                    {error && (
                        <div className="mt-8 bg-red-100 border border-red-300 text-red-800 p-4 rounded-lg shadow-md text-center">
                            <p className="font-semibold">An Error Occurred</p>
                            <p>{error}</p>
                        </div>
                    )}
                    
                    {loadingAction && <Loader action={loadingAction} />}
                    
                    {analysisResult && !loadingAction && (
                        <div className="mt-8">
                            <ResultsDisplay result={analysisResult} originalCode={{code, language}}/>
                        </div>
                    )}
                </div>
            </main>
            <footer className="text-center p-4 text-gray-500 text-sm">
                <p>&copy; 2024 AI Code Assistant. Powered by Gemini.</p>
            </footer>
        </div>
    );
};

export default App;