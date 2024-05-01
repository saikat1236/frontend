import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/msg.css'; // adjust path as necessary

export default function Messages({ messages }) {
  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 mb-6 mt-4 text-center">Messages</h2>
      <div className={styles.messagesContainer}>
        <table className={styles.messagesTable}>
          <thead className={styles.tableHeader + " dark:" + styles.darkTableHeader}>
            <tr>
              <th scope="col" className="w-1/3">ID</th>
              <th scope="col" className="w-1/3">Message</th>
              <th scope="col" className="w-1/3">Premium Attached</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index} className={styles.tableRow + " dark:" + styles.darkTableRow + " hover:" + styles.tableRowHover}>
                <td className={styles.tableCell}>{msg.id}</td>
                <td className={styles.tableCell}>{msg.message}</td>
                <td className={styles.tableCell}>
                  {msg.premium_attached ? `${parseFloat(msg.premium_attached / 1e24).toFixed(2)} NEAR` : 'None'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

Messages.propTypes = {
  messages: PropTypes.array.isRequired
};
