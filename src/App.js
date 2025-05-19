import React, { useState, useRef, useEffect } from 'react';
function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'AIzaSyD7p-w7JHTasGEi62ykGaMJ-sVDcnp2hYQ';

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', parts: [{ text: input }] };
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [userMessage] }),
        }
      );

      if (!res.ok) throw new Error(`Network error: ${res.status}`);

      const data = await res.json();
      let botReply = '';

      if (data?.candidates?.length > 0) {
        const parts = data.candidates[0].content?.parts;
        if (parts?.length > 0) botReply = parts[0].text;
      }

      if (!botReply.trim()) botReply = "I'm not sure how to respond to that.";

      botReply = botReply.split(' ').slice(0, 200).join(' ');

      setMessages((prev) => [...prev, { role: 'model', content: botReply }]);
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const messagesEndRef = useRef(null);

  useEffect(() => {
  if (messagesEndRef.current) {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }
}, [messages]);

  return (
    <div style={{ padding: '0.5rem' }}>
      <div style={{
        width: '90vw',
        aspectRatio: '9383 / 4000',
        maxWidth:'800px',
        marginTop:'0rem',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 100%)',
        boxShadow: 'inset -5px -5px 250px rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(275px)',
        borderRadius: '10px',
        padding: '2rem',
        border: '1px solid rgba(255, 255, 255, 0.5)'
      }}>
        <div className="flex-container">
          <div>
            <img className="sublogo" alt="sublogo" src="/assets/ChatwithAI.png" />
          </div>
          <button className="ccbtn" onClick={() => setMessages([])}>
            <img className="Xlogo" alt="clear" src="/assets/XCircle.png" />Clear Chat
          </button>
        </div>

          <div
                style={{
                overflowY: 'scroll',
                padding: '0.5rem',
                scrollbarWidth: 'none',       
                msOverflowStyle: 'none'       
  }}
  className="scroll-container"
>
          {messages.length === 0 && !loading && (
            <div  style={{ padding: '1rem', color: '#ccc' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                <div>
                <h2 className="hellotext">Hello there,<br></br>How can I Help You?</h2>
                </div>
              </div>
              <div className="tempcontainer" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {['What’s the weather today?', 'Summarize this article', 'Give me a recipe'].map((rec, index) => (
                  <div
                    className="rec"
                    key={index}
                    onClick={() => setInput(rec)}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      padding: '0.5rem 1rem',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.2)',
                      fontSize: '0.9rem',
                      transition: '0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                  >
                    {rec}
                  </div>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                marginLeft: msg.role === 'user' ? 'auto' : 'initial',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  backgroundImage: `url("${msg.role === 'user' ? '/assets/user-icon.png' : '/assets/airesponse.png'}")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  marginRight: '10px',
                }}
              />
              <div className="message-box">{msg.content}</div>
            </div>
          ))}

          {loading && (
            <div className="chat-loader">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-btn">
          <div className="input-btn-wrapper">
            <input
              type="text"
              className="userinput"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{ width: '80%', padding: '0.7rem', marginTop: '1rem' }}
              placeholder="Write a message"
            />
            <button
              className="sendbtn"
              onClick={sendMessage}
              style={{ padding: '0.7rem', marginTop: '1rem' }}
            >
                <img className="emoji" alt="send" src="/assets/PaperPlaneTilt.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
