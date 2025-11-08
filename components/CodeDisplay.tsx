
import React, { useState } from 'react';
import ClipboardIcon from './icons/ClipboardIcon';

interface CodeDisplayProps {
  script: string;
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ script }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="relative bg-slate-950 rounded-lg shadow-xl border border-slate-700">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-800 rounded-t-lg">
        <span className="text-sm font-medium text-slate-300">organize_files.py</span>
        <button
          onClick={handleCopy}
          className="flex items-center px-3 py-1 text-sm bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600 transition-colors"
        >
          <ClipboardIcon className="w-4 h-4 mr-2" />
          {isCopied ? 'Copied!' : 'Copy Script'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="language-python text-sm font-mono">{script}</code>
      </pre>
    </div>
  );
};

export default CodeDisplay;
