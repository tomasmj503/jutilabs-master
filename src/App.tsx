import React, { useState } from 'react';
import { 
  PhoneMissed, 
  Bot, 
  MessageSquare, 
  Star, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  ArrowRight,
  TrendingDown,
  DollarSign,
  Calculator,
  Zap
} from 'lucide-react';

export default function App() {
  const [missedCalls, setMissedCalls] = useState(15);
  const [emergencyPercent, setEmergencyPercent] = useState(30);
  const [avgTicket, setAvgTicket] = useState(1500);

  const lostRevenue = Math.round(missedCalls * (emergencyPercent / 100) * avgTicket * 4); // per mes

  return (
    <div className="min-h-screen bg-base font-['Roboto'] text-dark pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="bg-authority text-white pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-bold text-action mb-6">
            <MapPin size={16} />
            <span>Exclusivo para Dueños de HVAC en Texas</span>
          </div>
          <h1 className="font-['Montserrat'] text-4xl md:text-6xl font-black leading-tight mb-6">
            Estás Perdiendo <span className="text-action">$15,000 al Mes</span> Porque Tu Competencia Contesta Más Rápido.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Implementamos un sistema 24/7 que atrapa cada llamada perdida y la convierte en una cita agendada. Y para que funcione perfecto, <span className="font-bold text-white">te construimos una web premium completamente GRATIS.</span>
          </p>
          <a href="#disponibilidad" className="block md:inline-block w-full md:w-auto bg-action text-authority font-black text-lg py-4 px-8 rounded-lg shadow-[0_4px_14px_0_rgba(249,152,32,0.39)] hover:shadow-[0_6px_20px_rgba(249,152,32,0.23)] hover:-translate-y-1 transition-all duration-200">
            Ver Si Mi Ciudad Está Disponible
          </a>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Montserrat'] text-3xl md:text-5xl font-black text-authority mb-4">
              La Sangría Silenciosa de tu Negocio
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estás en el techo, sudando a 100 grados. Suena el teléfono. No puedes contestar. Ese cliente no va a dejar un mensaje de voz; va a llamar al siguiente en Google.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-base p-8 rounded-2xl border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <PhoneMissed size={100} />
              </div>
              <div className="text-4xl font-black text-authority mb-2">150</div>
              <p className="font-bold text-dark mb-2">Llamadas al mes</p>
              <p className="text-sm text-gray-600">Promedio de llamadas que recibe un negocio HVAC establecido.</p>
            </div>
            <div className="bg-base p-8 rounded-2xl border border-gray-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <TrendingDown size={100} />
              </div>
              <div className="text-4xl font-black text-authority mb-2">25%</div>
              <p className="font-bold text-dark mb-2">Llamadas perdidas</p>
              <p className="text-sm text-gray-600">Se van al buzón porque estás ocupado o es fuera de horario.</p>
            </div>
            <div className="bg-dark text-white p-8 rounded-2xl relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <DollarSign size={100} />
              </div>
              <div className="text-4xl font-black text-action mb-2">$15k+</div>
              <p className="font-bold mb-2">Dinero en la basura</p>
              <p className="text-sm text-gray-300">A $1,500 por ticket, estás regalando miles de dólares a tu competencia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 px-4 bg-base border-y border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
            <div className="bg-authority p-6 text-white flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Calculator size={32} className="text-action" />
              </div>
              <div>
                <h3 className="font-['Montserrat'] text-2xl font-black">Calculadora de Fuga de Ingresos</h3>
                <p className="text-sm text-gray-300">Descubre cuánto dinero estás perdiendo exactamente.</p>
              </div>
            </div>
            
            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-bold text-dark">Llamadas Perdidas / Semana</label>
                    <span className="text-authority font-black">{missedCalls}</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="50" 
                    value={missedCalls} 
                    onChange={(e) => setMissedCalls(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-action"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-bold text-dark">% que son Emergencias</label>
                    <span className="text-authority font-black">{emergencyPercent}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    step="5"
                    value={emergencyPercent} 
                    onChange={(e) => setEmergencyPercent(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-action"
                  />
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="font-bold text-dark">Ticket Promedio ($)</label>
                    <span className="text-authority font-black">${avgTicket}</span>
                  </div>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="100"
                    value={avgTicket} 
                    onChange={(e) => setAvgTicket(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-action"
                  />
                </div>
              </div>

              <div className="bg-dark rounded-2xl p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-white/5">
                  <DollarSign size={200} />
                </div>
                <p className="text-gray-400 font-bold mb-2 relative z-10">Estás perdiendo aprox.</p>
                <div className="font-['Montserrat'] text-5xl md:text-6xl font-black text-action mb-4 relative z-10">
                  ${lostRevenue.toLocaleString()}
                </div>
                <p className="text-white font-bold relative z-10">Al Mes</p>
                <div className="mt-6 pt-6 border-t border-white/10 relative z-10">
                  <p className="text-sm text-gray-400">Nuestro sistema recupera al menos el 40% de esto en los primeros 30 días.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Montserrat'] text-3xl md:text-5xl font-black text-authority mb-4">
              El Ecosistema Jutilabs™
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No somos una agencia de marketing tradicional. Instalamos 5 bots de Inteligencia Artificial que trabajan 24/7 para tu negocio.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Features List */}
            <div className="space-y-6">
              {[
                { icon: MessageSquare, title: "Missed Call Text-Back", desc: "Si no contestas, el bot envía un SMS al instante: 'Hola, soy [Tu Nombre] de [Tu Empresa]. Estoy en un trabajo, ¿en qué te puedo ayudar?'" },
                { icon: Bot, title: "Clasificación de Leads", desc: "El bot hace preguntas filtro para saber si es una reparación menor o un reemplazo completo de unidad." },
                { icon: Zap, title: "Seguimiento Automático", desc: "Persigue a los prospectos que dejaron de responder hasta que agenden o digan que no." },
                { icon: Star, title: "Máquina de Reseñas", desc: "Pide reseñas en Google automáticamente 2 horas después de terminar el trabajo." },
                { icon: RefreshCw, title: "Reactivación de Clientes", desc: "Envía ofertas de mantenimiento preventivo a tu base de datos antigua antes del verano/invierno." }
              ].map((feature, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="bg-base p-3 rounded-xl text-authority">
                      <feature.icon size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-dark mb-1">{feature.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Simulation */}
            <div className="relative mx-auto w-full max-w-[340px]">
              <div className="absolute -inset-4 bg-gradient-to-tr from-authority to-action opacity-20 blur-2xl rounded-[3rem]"></div>
              <div className="bg-white border-[8px] border-dark rounded-[3rem] h-[650px] overflow-hidden relative shadow-2xl flex flex-col">
                {/* Phone Header */}
                <div className="bg-base px-6 pt-12 pb-4 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-authority rounded-full flex items-center justify-center text-white">
                    <Bot size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Jutilabs AI Bot</h5>
                    <p className="text-xs text-green-600 font-medium">En línea</p>
                  </div>
                </div>
                
                {/* Chat Area */}
                <div className="flex-1 bg-[#f8f9fa] p-4 flex flex-col gap-4 overflow-y-auto">
                  <div className="text-center text-xs text-gray-400 my-2">Hoy 2:14 PM</div>
                  
                  {/* Missed call indicator */}
                  <div className="bg-red-50 border border-red-100 text-red-600 text-xs py-2 px-3 rounded-lg text-center flex items-center justify-center gap-2 mx-4">
                    <PhoneMissed size={14} /> Llamada perdida de Cliente
                  </div>

                  <div className="self-start bg-gray-200 text-dark py-2 px-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm">
                    Hola, llamaste a Texas Pro HVAC. Estoy en un techo ahora mismo. ¿Es una emergencia de AC?
                  </div>
                  
                  <div className="self-end bg-action text-white py-2 px-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                    ¡Sí! Mi aire dejó de enfriar y tengo niños en casa. Hace 95 grados.
                  </div>
                  
                  <div className="self-start bg-gray-200 text-dark py-2 px-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm">
                    Entendido. Cobramos $89 por la visita de diagnóstico. Tengo un técnico disponible a las 4:30 PM hoy. ¿Te reservo ese espacio?
                  </div>
                  
                  <div className="self-end bg-action text-white py-2 px-4 rounded-2xl rounded-tr-sm max-w-[85%] text-sm shadow-sm">
                    Sí por favor. Mi dirección es 123 Main St.
                  </div>
                  
                  <div className="self-start bg-gray-200 text-dark py-2 px-4 rounded-2xl rounded-tl-sm max-w-[85%] text-sm shadow-sm">
                    ¡Listo! Cita confirmada para hoy 4:30 PM en 123 Main St. El técnico te llamará 15 mins antes de llegar. 🛠️❄️
                  </div>
                </div>
                
                {/* Phone Footer */}
                <div className="bg-white p-4 border-t border-gray-200">
                  <div className="bg-gray-100 rounded-full h-10 px-4 flex items-center text-gray-400 text-sm">
                    Escribe un mensaje...
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objection Handling */}
      <section className="bg-dark text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-5">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-action rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ShieldCheck size={64} className="text-action mx-auto mb-6" />
          <h2 className="font-['Montserrat'] text-3xl md:text-5xl font-black mb-8">
            ¿Dónde está la trampa? <br/>
            <span className="text-gray-400 text-2xl md:text-4xl">¿Por qué regalamos webs de $3,500?</span>
          </h2>
          
          <div className="bg-white/10 border border-white/20 p-8 md:p-12 rounded-3xl text-left backdrop-blur-sm">
            <p className="text-lg md:text-xl leading-relaxed mb-6">
              Transparencia radical: <strong className="text-action">No somos una caridad.</strong>
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Nuestro negocio es venderte nuestra suscripción mensual de Inteligencia Artificial. Pero nos dimos cuenta de un problema gigante: 
              la mayoría de los contratistas HVAC tienen sitios web lentos, feos o que no convierten.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8">
              Si conectamos nuestra IA a una web mala, no funciona. Así que decidimos eliminar el problema de raíz. <strong className="text-white">Nosotros asumimos el costo de construirte una web premium de alta conversión (valorada en $3,500).</strong> Tú solo pagas la suscripción mensual del software que te trae los clientes.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="text-action" size={20} />
                <span>Sin contratos a largo plazo</span>
              </div>
              <div className="hidden md:block text-white/20">•</div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="text-action" size={20} />
                <span>La web es tuya</span>
              </div>
              <div className="hidden md:block text-white/20">•</div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <CheckCircle2 className="text-action" size={20} />
                <span>Resultados desde el día 1</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-4 bg-base">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Montserrat'] text-3xl md:text-5xl font-black text-authority mb-4">
              Planes Simples. ROI Masivo.
            </h2>
            <p className="text-lg text-gray-600">Elige el motor que impulsará tu negocio.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Plan 1 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-['Montserrat'] text-2xl font-black text-dark mb-2">El Salvavidas</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-authority">$147</span>
                <span className="text-gray-500 font-medium">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Web Premium GRATIS</span>
                </li>
                <li className="flex gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Hosting & Mantenimiento</span>
                </li>
                <li className="flex gap-3 text-gray-700 font-bold">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Missed Call Text-Back</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-xl font-bold text-authority border-2 border-authority hover:bg-authority hover:text-white transition-colors">
                Seleccionar Plan
              </button>
            </div>

            {/* Plan 2 - Highlighted */}
            <div className="bg-authority p-8 rounded-3xl shadow-2xl relative transform md:-translate-y-4 border-2 border-action">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-action text-authority font-black px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                Más Popular
              </div>
              <h3 className="font-['Montserrat'] text-2xl font-black text-white mb-2">Beta Partner</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-5xl font-black text-white">$297</span>
                <span className="text-gray-400 font-medium">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-white">
                  <CheckCircle2 size={20} className="text-action shrink-0" />
                  <span>Web Premium GRATIS</span>
                </li>
                <li className="flex gap-3 text-white">
                  <CheckCircle2 size={20} className="text-action shrink-0" />
                  <span>Hosting & Mantenimiento</span>
                </li>
                <li className="flex gap-3 text-white">
                  <CheckCircle2 size={20} className="text-action shrink-0" />
                  <span>Missed Call Text-Back</span>
                </li>
                <li className="flex gap-3 text-white font-bold">
                  <CheckCircle2 size={20} className="text-action shrink-0" />
                  <span>AI Chatbot (Clasificación)</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-xl font-black text-authority bg-action hover:bg-orange-400 transition-colors shadow-[0_0_15px_rgba(249,152,32,0.5)]">
                Quiero Ser Partner
              </button>
            </div>

            {/* Plan 3 */}
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="font-['Montserrat'] text-2xl font-black text-dark mb-2">Dominación Total</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-black text-authority">$497</span>
                <span className="text-gray-500 font-medium">/mes</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex gap-3 text-gray-700">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Todo lo de Beta Partner</span>
                </li>
                <li className="flex gap-3 text-gray-700 font-bold">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Automatización de Emails</span>
                </li>
                <li className="flex gap-3 text-gray-700 font-bold">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Sistema de Reseñas Google</span>
                </li>
                <li className="flex gap-3 text-gray-700 font-bold">
                  <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                  <span>Reactivación de Clientes</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-xl font-bold text-authority border-2 border-authority hover:bg-authority hover:text-white transition-colors">
                Dominar Mi Ciudad
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee & Scarcity */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 border border-green-200 p-8 rounded-2xl flex items-start gap-4">
            <ShieldCheck size={40} className="text-green-600 shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-dark mb-2">Garantía "2 Trabajos"</h4>
              <p className="text-gray-700">Si nuestro sistema no te consigue al menos 2 trabajos en los primeros 30 días, te damos el siguiente mes completamente GRATIS.</p>
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 p-8 rounded-2xl flex items-start gap-4">
            <MapPin size={40} className="text-red-600 shrink-0" />
            <div>
              <h4 className="font-bold text-xl text-dark mb-2">Exclusividad Territorial</h4>
              <p className="text-gray-700">Solo trabajamos con <strong className="text-red-700">1 contratista HVAC por ciudad</strong>. Si tu competencia toma tu zona primero, quedas fuera.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section id="disponibilidad" className="py-24 px-4 bg-authority text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-['Montserrat'] text-3xl md:text-5xl font-black mb-6">
            Reclama Tu Ciudad Antes Que Tu Competencia
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Ingresa tu código postal para verificar si tu territorio aún está disponible.
          </p>
          
          <form className="bg-white p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-lg mx-auto shadow-2xl" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="text" 
              placeholder="Tu Código Postal (Ej. 75001)" 
              className="flex-1 px-6 py-4 text-dark font-bold text-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-action"
              required
            />
            <button type="submit" className="bg-action text-authority font-black px-8 py-4 rounded-xl hover:bg-orange-400 transition-colors flex items-center justify-center gap-2">
              Verificar <ArrowRight size={20} />
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-400 flex items-center justify-center gap-2">
            <ShieldCheck size={16} /> Tu información está 100% segura.
          </p>
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-gray-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] md:hidden z-50">
        <a href="#disponibilidad" className="block w-full bg-action text-authority font-black text-center py-4 rounded-xl shadow-lg">
          VERIFICAR DISPONIBILIDAD
        </a>
      </div>
    </div>
  );
}
