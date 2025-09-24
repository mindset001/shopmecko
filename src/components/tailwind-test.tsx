"use client";

import React from 'react';

export default function TailwindTest() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-blue-500 mb-4">Tailwind CSS Test</h2>
      <div className="flex flex-col space-y-4">
        <div className="bg-red-500 text-white p-4 rounded">This should be a red box with white text</div>
        <div className="bg-green-500 text-white p-4 rounded">This should be a green box with white text</div>
        <div className="bg-blue-500 text-white p-4 rounded">This should be a blue box with white text</div>
        <div className="border border-gray-300 p-4 hover:bg-gray-100 transition-colors duration-200">
          This should have a border and change background on hover
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
          Purple Button
        </button>
        
        {/* Test with custom CSS classes */}
        <h3 className="custom-test-heading">This uses custom CSS</h3>
        <div className="custom-test-container">
          <p>This box should have a dashed orange border</p>
          <button className="custom-test-button">Lime Button</button>
        </div>
      </div>
    </div>
  );
}
