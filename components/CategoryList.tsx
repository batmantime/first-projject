
import React from 'react';
import { Category } from '../types';
import TrashIcon from './icons/TrashIcon';

interface CategoryListProps {
  categories: Category[];
  onRemoveCategory: (name: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ categories, onRemoveCategory }) => {
  if (categories.length === 0) {
    return <p className="text-center text-slate-500">No categories added yet.</p>;
  }

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div
          key={category.name}
          className="flex items-center justify-between bg-slate-700/50 p-3 rounded-lg"
        >
          <div>
            <h3 className="font-bold text-slate-100">{category.name}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {category.extensions.map((ext) => (
                <span key={ext} className="text-xs bg-slate-600 text-cyan-300 px-2 py-1 rounded-full">
                  {ext}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={() => onRemoveCategory(category.name)}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-600 rounded-full transition-colors"
            aria-label={`Remove ${category.name} category`}
          >
            <TrashIcon className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
