
import { GoogleGenAI } from '@google/genai';
import { Category } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const createPrompt = (categories: Category[]): string => {
  const categoriesJson = JSON.stringify(categories, null, 2);

  return `
You are an expert Python developer who writes clean, efficient, and well-documented code.
Your task is to generate a Python script that organizes files in a specified directory based on their file extension.

The script should perform the following actions:
1. Define a variable for the target directory to be organized. Let the user easily change this path. Use the user's "Downloads" folder as a default.
2. Use the following categories and their corresponding file extensions to sort the files. The category name should be used as the subfolder name.
   \`\`\`json
   ${categoriesJson}
   \`\`\`
3. Iterate through each file in the target directory. Do not iterate into subdirectories.
4. For each file, check its extension (case-insensitively).
5. If the file's extension matches one of the extensions in the provided categories, move the file into a subdirectory named after the corresponding category.
6. Before moving a file, the script must check if the category subdirectory exists. If it does not exist, the script must create it.
7. Files that do not match any of the specified extensions should be ignored and left in the target directory.
8. The script should not attempt to move directories, only files.
9. Include clear comments in the code to explain each major step.
10. Use only standard Python libraries like \`os\`, \`shutil\`, and \`pathlib\`. Do not use any third-party libraries.
11. The script should print a message for each file it moves, like "Moved 'example.jpg' to 'Images'".
12. At the end, print a summary, like "File organization complete."

Your final output must be ONLY the raw Python code. Do not include any surrounding text, explanations, or markdown code fences like \`\`\`python\` or \`\`\`.
`;
};

export const generateScript = async (categories: Category[]): Promise<string> => {
  try {
    const prompt = createPrompt(categories);
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });
    const script = response.text.trim();
    if (!script) {
        throw new Error("Received an empty response from the API.");
    }
    return script;
  } catch (error) {
    console.error('Error generating script with Gemini:', error);
    throw new Error('Failed to communicate with the Gemini API.');
  }
};
