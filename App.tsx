
import React, { useState, useCallback } from 'react';
import { Category } from './types';
import { generateScript } from './services/geminiService';
import CategoryInput from './components/CategoryInput';
import CategoryList from './components/CategoryList';
import CodeDisplay from './components/CodeDisplay';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Images', extensions: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'] },
    { name: 'Documents', extensions: ['.pdf', '.docx', '.doc', '.txt', '.pptx', '.xlsx'] },
    { name: 'Archives', extensions: ['.zip', '.rar', '.7z', '.tar.gz'] },
    { name: 'Audio', extensions: ['.mp3', '.wav', '.aac', '.flac']},
    { name: 'Video', extensions: ['.mp4', '.mov', '.avi', '.mkv']},
  ]);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCategory = (category: Category) => {
    if (category.name && category.extensions.length > 0 && !categories.some(c => c.name.toLowerCase() === category.name.toLowerCase())) {
      setCategories(prev => [...prev, category]);
    }
  };

  const handleRemoveCategory = (name: string) => {
    setCategories(prev => prev.filter(c => c.name !== name));
  };

  const handleGenerateScript = useCallback(async () => {
    if (categories.length === 0) {
        setError('Please add at least one category to generate a script.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedScript('');

    try {
      const script = await generateScript(categories);
      setGeneratedScript(script);
    } catch (err) {
      setError('Failed to generate script. Please check your API key and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [categories]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-600">
            Python File Organizer
          </h1>
          <p className="mt-4 text-lg text-slate-400">
            Automatically generate a Python script to sort your downloads folder.
          </p>
        </header>

        <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 mb-8 backdrop-blur-sm border border-slate-700">
          <h2 className="text-2xl font-bold mb-4 text-cyan-300">1. Define Your Categories</h2>
          <p className="text-slate-400 mb-6">Add categories and their file extensions (e.g., .jpg, .pdf). The script will create folders with these names.</p>
          <CategoryInput onAddCategory={handleAddCategory} />
          <CategoryList categories={categories} onRemoveCategory={handleRemoveCategory} />
        </div>
        
        <div className="flex flex-col items-center">
            <button
                onClick={handleGenerateScript}
                disabled={isLoading}
                className="w-full max-w-sm flex items-center justify-center text-lg font-semibold px-8 py-4 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                    </>
                ) : '2. Generate Python Script'}
            </button>
            {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
        </div>

        {generatedScript && (
          <div className="mt-8 md:mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center text-cyan-300">3. Your Custom Script is Ready!</h2>
            <CodeDisplay script={generatedScript} />
          </div>
        )}
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Generated with Gemini API & React</p>
      </footer>
    </div>
  );
};

export default App;
