"use client";

import React from 'react';

export default function TailwindTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Tailwind CSS Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-red-500 p-6 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-2">Red Card</h2>
            <p>This should have red background and white text.</p>
          </div>
          
          <div className="bg-blue-500 p-6 rounded-lg text-white">
            <h2 className="text-xl font-semibold mb-2">Blue Card</h2>
            <p>This should have blue background and white text.</p>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Utility Classes Test</h2>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500">
              <p className="font-medium">This should have yellow styling</p>
            </div>
            
            <div className="flex space-x-4">
              <div className="w-1/3 h-20 bg-purple-500 rounded flex items-center justify-center text-white">1/3 Width</div>
              <div className="w-2/3 h-20 bg-green-500 rounded flex items-center justify-center text-white">2/3 Width</div>
            </div>
          </div>
        </div>
        
        <div className="flex space-x-4">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
            Blue Button
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition-colors">
            Gray Button
          </button>
          <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-2 px-4 rounded transition-colors">
            Outline Button
          </button>
        </div>
      </div>
    </div>
  );
}
