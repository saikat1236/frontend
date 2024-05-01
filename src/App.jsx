import { useEffect, useState } from 'react'
import { Wallet } from "./services/near-wallet";
import Form from './components/Form';
import SignIn from './components/SignIn';
import Messages from './components/Messages';
import { utils } from 'near-api-js';
import { HelloNearContract } from '.././src/config';

// Contract that the app will interact with
const CONTRACT = HelloNearContract;
const wallet = new Wallet({ createAccessKeyFor: CONTRACT })
function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const initFunction = async () => {
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
            args: { 
                from_index: 0,  // Pass as number, not string
                limit: 10       // Pass as number, not string
            },
            gas: "100000000000000",  // Gas value
            deposit: "0"             // No deposit is needed for fetching messages
        });
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return []; // Return an empty array in case of failure
    }
};







  const onSubmit = async (e) => {
    e.preventDefault();
    const { fieldset, message, donation } = e.target.elements;
    fieldset.disabled = true;
  
    try {
      const deposit = utils.format.parseNearAmount(donation.value || '0');
      await wallet.callMethod({
          contractId: CONTRACT,
          method: "add_message",
          args: { message: message.value },
          deposit
      });
      const messages = await getLast10Messages();
      setMessages(messages.reverse());
      message.value = '';  // Clearing the input
      donation.value = '0';
    } catch (error) {
      console.error('Error submitting message:', error);
      alert('Failed to submit message.');
    } finally {
      fieldset.disabled = false;
      message.focus();
    }
};

  
  const signIn = async () => {
    try {
      await wallet.signIn();  // Assuming this returns a promise
      setIsSignedIn(true);
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };
  
  const signOut = async () => {
    try {
      await wallet.signOut(); // Assuming this returns a promise
      setIsSignedIn(false);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <main>
    <table>
  <tbody>
    <tr>
      <td><h1>📖 NEAR Guest Book</h1></td>
      <td>
        {isSignedIn
          ? <button onClick={signOut}>Log out</button>
          : <button onClick={signIn}>Log in</button>
        }
      </td>
    </tr>
  </tbody>
</table>

      <hr />
      {isSignedIn
        ? <Form onSubmit={onSubmit} currentAccountId={wallet.accountId} />
        : <SignIn />
      }

      <hr />

      {messages.length > 0 && <Messages messages={messages} />}


    </main>
  )
}

export default App


