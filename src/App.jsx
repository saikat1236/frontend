import { useEffect, useState } from 'react'
import { Wallet } from "./services/near-wallet";
import Form from './components/Form';
import TanStackTable from './components/Table';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { utils } from 'near-api-js';
import { HelloNearContract } from '.././src/config';

const CONTRACT = HelloNearContract;
const wallet = new Wallet({ createAccessKeyFor: CONTRACT })

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function initFunction() {
      try {
        const isSignedIn = await wallet.startUp();
        const messages = await getLast10Messages();
        console.log(messages);  
        setIsSignedIn(isSignedIn);
        setMessages(messages.reverse());
      } catch (error) {
        console.error('Failed to initialize or fetch messages:', error);
      }
    }
    initFunction();
  }, []);

  const getLast10Messages = async () => {
    try {
      const messages = await wallet.callMethod({
          contractId: CONTRACT,
          method: "get_messages",
          args: { from_index: 0, limit: 10 },
          gas: "100000000000000",
          deposit: "0"
      });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { message } = event.target.elements;
    const deposit = "0"; // Simplified for now
    try {
      await wallet.callMethod({
        contractId: CONTRACT,
        method: "add_message",
        args: { message: message.value },
        deposit
      });
      const newMessages = await getLast10Messages();
      setMessages(newMessages.reverse());
      message.value = '';  // Clear the input after submission
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to submit message.');
    }
  };

  // Assume these functions have similar structures but different implementations
  const onSubmitall = async (event) => {
    try {
      const messages = await wallet.callMethod({
          contractId: CONTRACT,
          method: "get_messages",
          args: { from_index: 0, limit: 10 },
          gas: "100000000000000",
          deposit: "0"
      });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const onSubmitprem = async (event) => {
    try {
      const messages = await wallet.callMethod({
          contractId: CONTRACT,
          method: "get_premium_messages",
          args: { from_index: 0, limit: 10 },
          gas: "100000000000000",
          deposit: "0"
      });
      return messages;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return [];
    }
  };

  const signIn = async () => {
    try {
      await wallet.signIn();
      setIsSignedIn(true);
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const signOut = async () => {
    try {
      await wallet.signOut();
      setIsSignedIn(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <main>
<table className="w-full">
  <tbody>
    <tr>
      <td className="text-xl font-bold py-4 px-2"><h1>📖 NEAR Guest Book</h1></td>
      <td className="text-right">
        {isSignedIn
          ? <button onClick={signOut} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 ease-in-out">Log out</button>
          : <button onClick={signIn} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300 ease-in-out">Log in</button>
        }
      </td>
    </tr>
  </tbody>
</table>


      <hr />
      {isSignedIn
        ? <Form onSubmit={onSubmit} onAllMessages={onSubmitall} onPremiumMessages={onSubmitprem} currentAccountId={wallet.accountId} />
      // ? <TanStackTable messages={messages} />
       : <SignIn />
      }

      <hr />

      {messages.length > 0 && <TanStackTable messages={messages}/>}

    </main>
  );
}

export default App;
