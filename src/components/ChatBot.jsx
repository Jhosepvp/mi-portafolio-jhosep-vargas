import { useState } from 'react';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react'; // Íconos

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false); // Abrir/Cerrar chat
  const [messages, setMessages] = useState([
    { role: 'system', content: '¡Hola! Soy la IA de Jhosep. Pregúntame sobre sus proyectos o experiencia.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // 1. Añadir mensaje del usuario
    const userMsg = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // 2. Llamar a tu Backend local
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: input }),
      });
      
      const data = await res.json();

      // 3. Añadir respuesta de la IA
      setMessages((prev) => [...prev, { role: 'system', content: data.respuesta }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'system', content: 'Ups, tuve un error de conexión.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      
      {/* Botón Flotante para abrir/cerrar */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            background: '#2563eb', color: 'white', border: 'none', borderRadius: '50%', 
            width: '60px', height: '60px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
        >
          <MessageCircle size={30} />
        </button>
      )}

      {/* Ventana del Chat */}
      {isOpen && (
        <div style={{
          width: '350px', height: '500px', background: 'white', borderRadius: '12px',
          boxShadow: '0 5px 20px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column',
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ background: '#2563eb', color: 'white', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Asistente Virtual</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: 'white' }}>
              <X size={20} />
            </button>
          </div>

          {/* Mensajes */}
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', background: '#f9fafb' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{
                display: 'flex', gap: '10px', marginBottom: '10px',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                 {msg.role === 'system' && (
                  <div style={{
                    width: '35px', 
                    height: '35px', 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    border: '1px solid #e5e7eb',
                    background: 'white',
                    flexShrink: 0 // Para que no se aplaste
                  }}>
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" // O TU URL AQUÍ
                      alt="IA" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                )}
                          
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem',
                  background: msg.role === 'user' ? '#2563eb' : 'white',
                  color: msg.role === 'user' ? 'white' : '#1f2937',
                  boxShadow: msg.role === 'system' ? '0 1px 2px rgba(0,0,0,0.05)' : 'none',
                  borderBottomRightRadius: msg.role === 'user' ? '0' : '12px',
                  borderBottomLeftRadius: msg.role === 'system' ? '0' : '12px'
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && <div style={{ color: '#6b7280', fontSize: '0.8rem', marginLeft: '40px' }}>Escribiendo...</div>}
          </div>

          {/* Input */}
          <div style={{ padding: '10px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Pregunta algo..."
              style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', outline: 'none' }}
            />
            <button 
              onClick={sendMessage}
              disabled={loading}
              style={{ background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '0 12px' }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}