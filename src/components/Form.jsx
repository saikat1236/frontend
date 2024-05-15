import React from 'react';
import PropTypes from 'prop-types';

export default function Form({ onSubmit, currentAccountId }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-b p-6  max-w-5xl mx-auto">
      <fieldset id="fieldset" className="space-y-4">
        <p className="text-lg font-medium">Sign the guest book, {currentAccountId}!</p>
        <div className="flex items-center space-x-3">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message:
          </label>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            id="message"
            required
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Donation (optional):
          </label>
          <input
            type="number"
            autoComplete="off"
            id="premium"
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign
          </button>
        </div>
    
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  currentAccountId: PropTypes.string.isRequired
};
