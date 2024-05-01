import React from 'react';
import PropTypes from 'prop-types';

export default function Form({ onSubmit, onAllMessages, onPremiumMessages, currentAccountId }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
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
            name="message"
            required
            className="flex-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign
          </button>
        </div>
      
        <div className="flex justify-between">
          <button type="button" onClick={onAllMessages} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
            All messages
          </button>
          <button type="button" onClick={onPremiumMessages} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
            Premium messages
          </button>
        </div>
      </fieldset>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onAllMessages: PropTypes.func.isRequired,
  onPremiumMessages: PropTypes.func.isRequired,
  currentAccountId: PropTypes.string.isRequired
};
