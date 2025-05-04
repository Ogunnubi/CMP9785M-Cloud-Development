import {useState} from 'react'
import "./ChatAssistant.css"
import useAxiosPrivate from '../../Hooks/useAxiosPrivate';
import { aiagent } from '../../api/api';

const ChatAssistant = () => {

    const axiosPrivate = useAxiosPrivate();

    const [showTooltip, setShowTooltip] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');


    const sendMessage = async () => {
        if (!input.trim()) return;
        
        // Add user message to chat
        setMessages(prev => [...prev, { text: input, sender: 'user' }]);
        
        try {
          const { data } = await axiosPrivate.post('/ai/assistant', { 
            message: input 
          });
          
          // Add AI response to chat
          setMessages(prev => [...prev, { text: data.message, sender: 'assistant' }]);
        } catch (error) {
          console.error("Error with assistant:", error);
        }
        
        setInput('');
    };


  return (
    <div className="assistant-container">
      {!isOpen ? (
        <div 
          className='tooltip-container'
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button 
            className="assistant-icon" 
            onClick={() => setIsOpen(true)}
            title='Using the AI assistant costs 10 credits per conversation'
          >
            💬
          </button>
          {showTooltip && (
            <div 
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '50%',
                  transform: 'translateX(-100%)',
                  backgroundColor: '#333',
                  color: 'white',
                  padding: '8px 12px',
                  borderRadius: '4px',
                  fontSize: '14px',
                  marginBottom: '8px',
                  whiteSpace: 'nowrap',
                  zIndex: 9999
                }}
            >
              The AI assistant costs 10 credits
            </div>
          )}
        </div>
      ) : (
        <div className="assistant-chat">
          <div className="chat-header">
            <div className="chat-title-header">
              <h3>Assistant</h3>
              <p style={{fontSize: "13px"}}>The AI costs 10 credits</p>
            </div>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatAssistant