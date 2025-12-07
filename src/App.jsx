import { useState, useEffect } from 'react';
import { Github, ExternalLink, Database, Server, Code2, Terminal, Mail, Linkedin, FileText, Phone, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [perfil, setPerfil] = useState(null);
  const [showContact, setShowContact] = useState(false); // Estado para el Modal

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setPerfil(data.perfil))
      .catch(err => console.error(err));
  }, []);

  if (!perfil) return <div className="h-screen bg-dark flex items-center justify-center text-cyan animate-pulse">Cargando...</div>;

  const floatingIcons = [
    { icon: <Database size={40} />, x: -150, y: -100, delay: 0 },
    { icon: <Server size={40} />, x: 150, y: -50, delay: 1 },
    { icon: <Code2 size={40} />, x: -100, y: 150, delay: 2 },
    { icon: <Terminal size={40} />, x: 200, y: 100, delay: 0.5 },
  ];

  return (
    <div className="relative min-h-screen font-sans bg-dark text-white selection:bg-cyan selection:text-black">

      {/* FONDO MÍSTICO */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[120px] animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex justify-between items-center p-6 backdrop-blur-sm border-b border-white/5">
        <h2 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan to-purple-500">
          {perfil.nombre}<span className="text-white">.dev</span>
        </h2>
        <div className="flex gap-4">
          <a href={perfil.contacto?.github} target="_blank" className="text-gray-400 hover:text-cyan transition-colors"><Github size={20}/></a>
          <a href={perfil.contacto?.linkedin} target="_blank" className="text-gray-400 hover:text-cyan transition-colors"><Linkedin size={20}/></a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative z-10 flex flex-col items-center justify-center text-center min-h-[85vh] px-4">
        <div className="relative">
          {floatingIcons.map((item, i) => (
            <motion.div
              key={i}
              className="absolute text-cyan/20"
              initial={{ x: 0, y: 0 }}
              animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
              style={{ top: '50%', left: '50%', marginLeft: item.x, marginTop: item.y }}
            >
              {item.icon}
            </motion.div>
          ))}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
          >
            HOLA, SOY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan via-white to-purple-500 drop-shadow-[0_0_15px_rgba(102,252,241,0.3)]">
              {perfil.nombre.toUpperCase()}
            </span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-10"
        >
          {perfil.bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {/* Botón Ver Proyectos */}
          <a href="#proyectos" className="px-8 py-3 bg-cyan text-dark font-bold rounded-full hover:shadow-[0_0_20px_rgba(102,252,241,0.6)] transition-all hover:scale-105">
            Ver Proyectos
          </a>

          {/* Botón CV (Descarga directa) */}
          <a href={perfil.contacto?.cv_link} download className="flex items-center gap-2 px-8 py-3 border border-white/20 text-white rounded-full hover:bg-white/5 transition-all">
            <FileText size={18}/> Descargar CV
          </a>

          {/* Botón Contacto (Abre Modal) */}
          <button onClick={() => setShowContact(true)} className="flex items-center gap-2 px-8 py-3 border border-cyan/30 text-cyan rounded-full hover:bg-cyan/10 transition-all">
            <Mail size={18}/> Contactar
          </button>
        </motion.div>
      </header>

      {/* PROYECTOS SECTION */}
      <section id="proyectos" className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="flex items-center gap-4 mb-16">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-cyan/50"></span>
          <h3 className="text-3xl font-bold flex items-center gap-2">
            <Code2 className="text-cyan"/> Proyectos Destacados
          </h3>
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-cyan/50"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {perfil.proyectos && perfil.proyectos.map((proyecto, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="group bg-[#121212]/80 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden hover:border-cyan/50 transition-all shadow-xl"
            >
              <div className="h-48 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h4 className="text-4xl font-black text-white/5 select-none">{proyecto.nombre.substring(0,2)}</h4>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold group-hover:text-cyan transition-colors">{proyecto.nombre}</h4>
                  <ExternalLink className="text-gray-500 hover:text-white cursor-pointer" size={20} />
                </div>
                <p className="text-gray-400 mb-6 text-sm leading-relaxed">{proyecto.descripcion}</p>

                {proyecto.detalles_tecnicos && (
                    <div className="mb-4 text-xs text-cyan/80 font-mono bg-cyan/5 p-2 rounded border border-cyan/10">
                        >_ {proyecto.detalles_tecnicos}
                    </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {proyecto.tecnologias && proyecto.tecnologias.map((tech, i) => (
                    <span key={i} className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-300 bg-white/5">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MODAL DE CONTACTO (Holográfico) */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowContact(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
              className="relative w-full max-w-md bg-[#0B0C10] border border-cyan/30 p-8 rounded-2xl shadow-[0_0_30px_rgba(102,252,241,0.15)]"
              onClick={(e) => e.stopPropagation()} // Evita cerrar si clickeas adentro
            >
              <button onClick={() => setShowContact(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <X size={24} />
              </button>

              <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                <Terminal className="text-cyan"/> Información de Contacto
              </h3>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-colors">
                  <div className="bg-cyan/10 p-3 rounded-full text-cyan"><Mail size={24}/></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Correo Electrónico</p>
                    <a href={`mailto:${perfil.contacto?.email}`} className="text-white font-medium hover:text-cyan">{perfil.contacto?.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan/30 transition-colors">
                  <div className="bg-purple-500/10 p-3 rounded-full text-purple-400"><Phone size={24}/></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Teléfono / WhatsApp</p>
                    <p className="text-white font-medium">{perfil.contacto?.telefono}</p>
                  </div>
                </div>

                <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-white/10">
                   <a href={perfil.contacto?.linkedin} target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Linkedin size={18}/> LinkedIn</a>
                   <a href={perfil.contacto?.github} target="_blank" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><Github size={18}/> GitHub</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="relative z-10 text-center py-8 text-gray-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} {perfil.nombre}.dev</p>
      </footer>
    </div>
  );
}

export default App;
