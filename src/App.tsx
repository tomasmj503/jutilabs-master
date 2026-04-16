import { useState, useEffect, useRef } from 'react';
import {
  CheckCircle2, ChevronDown, ArrowRight, MessageSquare,
  CreditCard, ClipboardList, Truck, Star, BarChart3,
  TrendingUp, Users, Package, Send, Sparkles
} from 'lucide-react';

// ═════════════════════════════════════════════════════════════════════
//  Reveal — anima elementos al entrar en el viewport (Intersection Observer)
// ═════════════════════════════════════════════════════════════════════
function Reveal({
  children, delay = 0, className = '', as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
  className?: string;
  as?: 'div' | 'section' | 'article';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.RefObject<any>}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  DESIGN SYSTEM — Componentes reutilizables
// ═════════════════════════════════════════════════════════════════════

// ─── Logo ──────────────────────────────────────────────────────────────
function Logo({ size = 'md', onDark = false }: { size?: 'sm' | 'md' | 'lg'; onDark?: boolean }) {
  const dims = size === 'lg' ? 44 : size === 'sm' ? 28 : 36;
  const textClass = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-lg' : 'text-2xl';
  const wordmarkColor = onDark ? '#FFFFFF' : '#09264A';
  const outlineWidth = size === 'sm' ? 1.5 : 2.5;
  return (
    <div className={`flex items-center gap-3 font-['Space_Grotesk'] font-bold ${textClass} select-none leading-none`}>
      <svg width={dims} height={dims} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="14" fill="#09264A" />
        <path
          d="M 27 4 L 42 4 L 42 27 L 35 35 L 42 35 L 29 46 L 36 46 L 11 61 L 20 49 L 14 49 L 27 38 L 20 38 L 33 27 L 33 11 L 27 11 Z"
          fill="#FFBF00" stroke="#0d1117" strokeWidth={outlineWidth}
          strokeLinejoin="miter" strokeMiterlimit={8}
        />
      </svg>
      <span>
        <span style={{ color: wordmarkColor }}>JUTI</span>
        <span style={{ color: '#FFBF00' }}>LABS</span>
      </span>
    </div>
  );
}

// ─── Section — wrapper con variantes de fondo ──────────────────────────
type SectionTone = 'navy' | 'white' | 'gray' | 'navyDeep';
function Section({ tone = 'white', id, children, className = '' }: {
  tone?: SectionTone; id?: string; children: React.ReactNode; className?: string;
}) {
  const bg = {
    navy: 'bg-[#09264A] text-white',
    navyDeep: 'bg-[#061935] text-white',
    white: 'bg-white text-[#1C2228]',
    gray: 'bg-[#F5F6F7] text-[#1C2228]',
  }[tone];
  return (
    <section id={id} className={`${bg} py-14 md:py-28 px-5 md:px-6 ${className}`}>
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}

// ─── Button ────────────────────────────────────────────────────────────
function Button({
  variant = 'primary', href, children, size = 'md', className = '', type = 'button', onClick, disabled
}: {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string; children: React.ReactNode; size?: 'sm' | 'md' | 'lg';
  className?: string; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean;
}) {
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }[size];
  const variants = {
    primary: 'bg-[#FFBF00] text-[#09264A] hover:bg-[#FFD033] font-bold shadow-[0_4px_20px_-2px_rgb(255_191_0_/_0.35)]',
    secondary: 'bg-white text-[#09264A] border-2 border-[#09264A] hover:bg-[#09264A] hover:text-white font-semibold',
    ghost: 'text-[#09264A] hover:text-[#FFBF00] font-semibold underline-offset-4 hover:underline',
  }[variant];
  const baseClass = `inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 ${sizes} ${variants} ${className}`;
  return href
    ? <a href={href} className={baseClass}>{children}</a>
    : <button type={type} onClick={onClick} disabled={disabled} className={`${baseClass} disabled:opacity-60`}>{children}</button>;
}

// ─── Card ──────────────────────────────────────────────────────────────
function Card({ children, className = '', tone = 'white', hover = true }: {
  children: React.ReactNode; className?: string; tone?: 'white' | 'navy' | 'gray'; hover?: boolean;
}) {
  const styles = {
    white: 'bg-white border border-[#E8EAED] shadow-[0_1px_2px_0_rgb(9_38_74_/_0.04),0_2px_8px_-2px_rgb(9_38_74_/_0.06)]',
    navy: 'bg-[#09264A] text-white border border-white/10',
    gray: 'bg-[#F5F6F7] border border-[#E8EAED]',
  }[tone];
  return <div className={`rounded-2xl p-7 ${styles} ${hover ? 'card-hover' : ''} ${className}`}>{children}</div>;
}

// ─── Eyebrow — label de sección ────────────────────────────────────────
function Eyebrow({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return (
    <div className={`label-caps mb-4 ${onDark ? 'text-[#FFBF00]' : 'text-[#09264A]'}`}>
      {children}
    </div>
  );
}

// ─── FAQ Item ──────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#E8EAED] rounded-xl overflow-hidden bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#F5F6F7] transition-colors"
      >
        <span className="font-semibold text-[#1C2228] pr-4">{q}</span>
        <ChevronDown size={20} className={`shrink-0 text-[#8A9197] transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div
        className="overflow-hidden transition-all duration-300 ease-out"
        style={{ maxHeight: open ? '500px' : '0', opacity: open ? 1 : 0 }}
      >
        <div className="px-5 pb-5 pt-1 text-[#4A5159] text-sm leading-relaxed">{a}</div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  APP
// ═════════════════════════════════════════════════════════════════════
export default function App() {
  const [formData, setFormData] = useState({ nombre: '', whatsapp: '', negocio: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('https://formspree.io/f/xlgagwbb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `Nuevo lead JUTILABS — ${formData.nombre}` }),
      });
    } catch (_) { /* abrimos WhatsApp igualmente */ }
    setSubmitted(true);
    setLoading(false);
    const msg = encodeURIComponent(
      `Hola Tom, me registré en el sitio de JUTILABS.\n\n👤 ${formData.nombre}\n📱 ${formData.whatsapp}\n🏪 ${formData.negocio}\n\nQuiero automatizar mis pedidos.`
    );
    window.open(`https://wa.me/573025282411?text=${msg}`, '_blank');
  };

  const cycleSteps = [
    { icon: Package, title: 'Te muestra la carta', desc: 'Cuando alguien escribe, tu asistente le arma el menú con los precios del día.' },
    { icon: MessageSquare, title: 'Entiende lo que piden', desc: 'Aunque escriban con errores o manden audio: "2 pollos con papas y una coca grande" — lo entiende.' },
    { icon: ClipboardList, title: 'Confirma el total', desc: 'Le pasa el resumen al cliente, pregunta delivery o recojo, pide la dirección si hace falta.' },
    { icon: CreditCard, title: 'Cobra por ti', desc: 'Acepta Yape, Nequi, Plin, Daviplata, efectivo o tarjeta. Si mandan comprobante, lo verifica solo.' },
    { icon: BarChart3, title: 'Lo deja registrado', desc: 'Cada pedido va directo a tu Google Sheet: cliente, ítems, total, método de pago, hora.' },
    { icon: Truck, title: 'Avisa cuando sale', desc: 'Marcas despachado y tu asistente le manda al cliente "¡Tu pedido va en camino!" automáticamente.' },
    { icon: Star, title: 'Pide la reseña', desc: 'Dos horas después del despacho, le manda un WhatsApp con el link a Google Maps para que te califique.' },
  ];

  const faqs = [
    { q: '¿Tengo que cambiar mi WhatsApp o usar una app nueva?', a: 'Nada. Tu asistente corre sobre tu mismo WhatsApp Business. Tus clientes siguen escribiendo al número de siempre. No se enteran del cambio.' },
    { q: '¿Cuánto tiempo tarda en andar?', a: 'Dos semanas. Armamos tu carta, precios y métodos de pago, probamos contigo, y lanzamos. Tu operación no se detiene ni un día.' },
    { q: '¿Esto reemplaza a mi gente?', a: 'No. Los libera de anotar pedidos a mano para que hagan lo que sí importa: cocinar, despachar, atender bien. Tu asistente es la base; tu equipo es la operación.' },
    { q: '¿Qué pasa si el asistente se equivoca con un pedido?', a: 'Lo ves todo en tu celular antes de que salga. Si algo no cuadra, pasa al operador humano. En la práctica, 99 de cada 100 pedidos salen bien solos.' },
    { q: '¿Funciona en mi país?', a: 'Sí. Trabajamos en Colombia, Perú, México, Chile y Ecuador. Tu asistente se adapta a tu moneda, tus métodos de pago (Yape, Nequi, Plin, Daviplata) y la forma de hablar de tu país.' },
    { q: '¿Esto reemplaza a Rappi o iFood?', a: 'No. Rappi te consigue clientes nuevos, eso sirve. Lo que automatizamos son los clientes que ya son tuyos — los que te escriben directo al WhatsApp. Esos pedidos no pagan comisión, y son los que hoy atiendes a mano.' },
    { q: '¿Necesito computadora o POS?', a: 'No. Todo se maneja desde tu celular. Si ya tienes un POS, lo conectamos (plan Enterprise).' },
    { q: '¿Y si mi WhatsApp se cae?', a: 'Usamos la WhatsApp Business Cloud API oficial de Meta — la misma que usan las empresas grandes. 99.9% de disponibilidad.' },
  ];

  return (
    <div className="min-h-screen bg-[#F5F6F7] pb-20 md:pb-0">

      {/* ══ HEADER ══ */}
      <header className="sticky top-0 z-50 bg-[#09264A] border-b border-white/10 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo onDark />
          <Button href="#contacto" size="sm" variant="primary">
            Agenda 15 min
          </Button>
        </div>
      </header>

      <main>
      {/* ══ HERO — navy ══ */}
      <Section tone="navy" className="!py-16 md:!py-32">
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-xs font-medium mb-6 max-w-full">
              <span className="w-2 h-2 bg-[#FFBF00] rounded-full animate-pulse shrink-0"></span>
              <span className="truncate">Restaurantes · Distribuidoras · Carnicerías · Panaderías</span>
            </div>

            <h1 className="text-[34px] sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.1]">
              ¿Cuántos mensajes te quedaron sin contestar anoche?{' '}
              <span className="text-[#FFBF00]">Cada uno es plata que se fue.</span>
            </h1>

            <p className="text-base md:text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
              Te ponemos un asistente en tu WhatsApp.
              <span className="text-white font-semibold"> Tú solo preparas.</span>
            </p>

            <Button href="#contacto" size="lg" variant="primary" className="w-full sm:w-auto">
              Agenda 15 min conmigo
              <ArrowRight size={20} />
            </Button>
            <p className="mt-4 text-sm text-white/70">
              Diagnóstico gratis · Sin compromiso · Piloto 2 semanas gratis
            </p>
          </div>

          {/* Phone mockup con float sutil */}
          <div className="flex justify-center phone-float">
            <PhoneMockup />
          </div>
        </div>
      </Section>

      {/* ══ AUTHORITY BAR — stats + tech stack — white ══ */}
      <Section tone="white" className="!py-12">
        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-10">
          {[
            { v: '530M+', l: 'usuarios WhatsApp en LATAM' },
            { v: '4 horas', l: 'al día que tu equipo recupera*' },
            { v: '<1%', l: 'de error en cada pedido' },
            { v: '14 días', l: 'para tener tu asistente andando' },
          ].map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-2xl font-bold text-[#09264A]">{s.v}</div>
              <div className="text-xs text-[#4A5159] mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[#B5BBC2] mt-3">
          *Promedio estimado en negocios que procesan 30+ pedidos/día por WhatsApp.
        </p>

        {/* Tech stack — autoridad real, solo lo reconocible */}
        <div className="border-t border-[#E8EAED] pt-8">
          <div className="text-center mb-5">
            <div className="label-caps text-[#8A9197]">Tu asistente corre sobre lo que ya conoces</div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { name: 'WhatsApp Business', provider: 'API oficial de Meta' },
              { name: 'Google Gemini', provider: 'inteligencia artificial' },
              { name: 'Google Sheets', provider: 'tus reportes' },
            ].map((t) => (
              <div key={t.name} className="flex flex-col items-center text-center">
                <div className="font-display font-bold text-[#09264A] text-sm">{t.name}</div>
                <div className="text-[10px] text-[#8A9197] uppercase tracking-wider">{t.provider}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ══ PROBLEMA — gray ══ */}
      <Section tone="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>El problema real</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#09264A] mb-4">
            No es que pierdas plata.<br/>
            Es que <span className="text-[#E53E3E]">ni siquiera sabes cuánta.</span>
          </h2>
          <p className="text-[#4A5159]">
            Cada mensaje sin contestar, cada pago sin verificar, cada cliente que no vuelve.
            Nada de eso está en un reporte.
            Solo se siente al cierre del mes, cuando trabajaste más y ganaste menos.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: MessageSquare, stat: '5–10', unit: 'mensajes perdidos por noche', title: 'El celular suena a las 11pm', desc: 'Llegan pedidos cuando ya nadie contesta. Al día siguiente, el cliente ya pidió en otro lado. Plata que se fue sin que te dieras cuenta.' },
            { icon: TrendingUp, stat: '4 horas', unit: 'al día que no vuelven', title: 'Tu gente no cocina. Anota.', desc: 'Tu equipo pasa la mitad del turno copiando pedidos, verificando Yapes a mano, buscando direcciones. Esa hora no está cocinando ni atendiendo mejor.' },
            { icon: Users, stat: '0%', unit: 'visibilidad real', title: 'Cierras sin saber cuánto vendiste', desc: 'No sabes qué producto te dio margen, qué día vendes más, ni quién te compra dos veces al mes. Decides por intuición porque no hay datos.' },
          ].map((c, i) => (
            <Reveal key={c.title} delay={(i + 1) as 1|2|3}>
            <Card>
              <div className="bg-[#09264A]/5 p-3 rounded-xl w-fit mb-5">
                <c.icon size={22} className="text-[#09264A]" />
              </div>
              <div className="font-display text-4xl font-bold text-[#09264A] mb-1">{c.stat}</div>
              <div className="label-caps text-[#8A9197] mb-4">{c.unit}</div>
              <h3 className="font-bold text-[#1C2228] mb-2 text-lg">{c.title}</h3>
              <p className="text-sm text-[#4A5159] leading-relaxed">{c.desc}</p>
            </Card>
            </Reveal>
          ))}
        </div>

        {/* Manifiesto — la idea central */}
        <Reveal className="bg-[#09264A] rounded-2xl p-8 md:p-16 text-white text-center">
          <Eyebrow onDark>La idea completa</Eyebrow>
          <h3 className="font-display text-[26px] sm:text-3xl md:text-5xl font-bold leading-tight max-w-3xl mx-auto mt-3 mb-5">
            No es una app.<br/>
            <span className="text-[#FFBF00]">Es la persona que no tuviste que contratar.</span>
          </h3>
          <p className="text-white/80 text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            Contesta pedidos todo el día y toda la noche. No se equivoca.
            No pide aumento. No se enferma un viernes.
          </p>
          <p className="text-white font-semibold text-base md:text-xl mt-5 max-w-2xl mx-auto">
            Y cuesta menos que un medio tiempo.
          </p>
        </Reveal>
      </Section>

      {/* ══ CASOS DE USO — white ══ */}
      <Section tone="white">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Cómo se ve en la práctica</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#09264A] mb-4">
            3 negocios distintos.<br/>
            <span className="text-[#09264A]">El mismo asistente.</span>
          </h2>
          <p className="text-[#4A5159]">
            Hemos visto estos escenarios una y otra vez. Si alguno te suena familiar,
            ya sabes por dónde empezamos.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              tag: 'Pollería · Piura, Perú',
              icon: '🍗',
              title: 'Pollería de barrio',
              pain: '40+ pedidos al día por WhatsApp. La dueña anotaba todo en una libreta mientras su esposo cocinaba. Después de las 9pm entraban 5-10 mensajes que nadie alcanzaba a contestar.',
              solution: 'Su asistente entiende los pedidos, muestra la carta, cobra por Yape y registra cada orden. Al cerrar la cocina, ella abre el celular y ve todo sin haber anotado nada.',
              outcome: 'Cero pedidos perdidos por no contestar a tiempo. Cierra sabiendo exactamente cuánto vendió — sin el celular en la mano.',
            },
            {
              tag: 'Distribuidora mayorista',
              icon: '🚚',
              title: 'Distribuidor de cárnicos',
              pain: 'Recibía pedidos caóticos por WhatsApp — mensajes sueltos, audios a las 4am, cantidades sin confirmar. Cada pedido mal tomado significaba flete perdido o producto devuelto.',
              solution: 'Su asistente entiende los pedidos por texto o audio, confirma cantidades y precios con el cliente antes de cerrar, y deja cada orden registrada en Google Sheets con cliente, ítems y total.',
              outcome: 'Pedidos confirmados antes de salir de la bodega. Cero errores por "mal entendí lo que pidió". Todo rastreable al cierre del día.',
            },
            {
              tag: 'Proveedor B2B',
              icon: '🍞',
              title: 'Insumos para panaderías',
              pain: 'Decenas de panaderos mandando pedidos por WhatsApp cada madrugada. Alguien tenía que leerlos uno por uno, confirmar precios del día, y pasar todo a una planilla. Pedidos perdidos en los grupos de chat.',
              solution: 'Su asistente contesta el pedido de cada panadero con la lista del día, confirma el total, y deja la orden registrada en el Sheet del cliente. Responde en segundos, 24/7.',
              outcome: 'Pedidos contestados a los 5 segundos, no a las 2 horas. Ningún panadero se queda sin respuesta. Cierre de día con todo en un solo lugar.',
            },
          ].map((c) => (
            <div key={c.title} className="bg-[#F5F6F7] rounded-2xl p-7 border border-[#E8EAED] flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div className="text-3xl">{c.icon}</div>
                <div className="label-caps text-[#09264A]">{c.tag}</div>
              </div>
              <h3 className="font-display font-bold text-[#09264A] text-lg mb-4 leading-snug">{c.title}</h3>

              <div className="mb-4">
                <div className="label-caps text-[#E53E3E] mb-1.5 text-[10px]">El dolor</div>
                <p className="text-sm text-[#4A5159] leading-relaxed">{c.pain}</p>
              </div>

              <div className="mb-4">
                <div className="label-caps text-[#09264A] mb-1.5 text-[10px]">Lo que hace JUTILABS</div>
                <p className="text-sm text-[#4A5159] leading-relaxed">{c.solution}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-[#E8EAED]">
                <div className="label-caps text-[#FFBF00] mb-1.5 text-[10px]" style={{ color: '#B88900' }}>Resultado</div>
                <p className="text-sm font-semibold text-[#1C2228] leading-relaxed">{c.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-[#8A9197] mt-10 max-w-2xl mx-auto">
          * Basado en operaciones reales de clientes JUTILABS. Nombres omitidos por privacidad.
          Cada implementación se adapta a tu negocio específico.
        </p>
      </Section>

      {/* ══ SOLUCIÓN — gray ══ */}
      <Section tone="gray">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Qué hace tu asistente</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#09264A] mb-4">
            Esto es lo que hace por ti —<br/>
            todo el día, todos los días
          </h2>
          <p className="text-[#4A5159]">
            Siete cosas que antes hacía tu gente a mano. Ahora pasan solas,
            en el WhatsApp que ya tienes.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cycleSteps.map((step, i) => (
            <Card key={step.title} className="relative">
              <div className="absolute top-5 right-5 font-display text-3xl font-bold text-[#E8EAED]">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="bg-[#FFBF00]/15 p-3 rounded-xl w-fit mb-4">
                <step.icon size={20} className="text-[#09264A]" />
              </div>
              <h3 className="font-bold text-[#1C2228] mb-2 text-sm">{step.title}</h3>
              <p className="text-xs text-[#4A5159] leading-relaxed">{step.desc}</p>
            </Card>
          ))}
          <Card tone="navy" className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 text-[#FFBF00] label-caps mb-3">
              <Sparkles size={14} /> Además, siempre
            </div>
            <ul className="space-y-2.5 text-sm text-white/90">
              {['Dashboard en tu celular','Registra gastos por voz o foto','Reportes automáticos en Sheets','Horarios configurables','Te atendemos por WhatsApp'].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#FFBF00] shrink-0" />{item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ══ 60 DÍAS — white ══ */}
      <Section tone="white">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow>Lo que vas a sentir</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#09264A] mb-4">
            Así se ven tus primeros 60 días
          </h2>
          <p className="text-[#4A5159]">
            No es proyección ni promesa. Es lo que pasa cuando tu asistente entra a trabajar.
          </p>
        </Reveal>

        <div className="max-w-3xl mx-auto">
          {[
            { day: 'Día 1', title: 'Entra a trabajar', desc: 'Tu asistente contesta su primer pedido. Lo ves aparecer en tu celular sin haber hecho nada.' },
            { day: 'Día 7', title: 'Ves tu primera semana completa', desc: 'Sabes cuánto vendiste, qué día entró más plata, por dónde pagaron. Sin abrir una libreta.' },
            { day: 'Día 14', title: 'Tu asistente ya maneja los pedidos solo', desc: 'Entiende los mensajes, cobra y registra sin que tengas que revisar cada uno. Supervisas desde tu celular si quieres.' },
            { day: 'Día 30', title: 'Empiezas a ver el negocio', desc: 'Qué producto te deja más, qué cliente vuelve cada semana, a qué hora vendes más. Decides con datos, no con memoria.' },
            { day: 'Día 60', title: 'Los pedidos, las reseñas y los recordatorios ya corren solos', desc: 'Clientes que vuelven por promos automáticas. Reseñas en Google que llegan sin pedirlas. Todo sin contratar a nadie.' },
          ].map((d, i) => (
            <div key={d.day} className="flex gap-6 pb-8 relative">
              {/* Línea vertical */}
              {i < 4 && <div className="absolute left-[7px] top-4 bottom-0 w-px bg-[#E8EAED]"></div>}
              {/* Punto */}
              <div className="shrink-0 w-[15px] h-[15px] rounded-full bg-[#FFBF00] border-2 border-white relative z-10 mt-1"></div>
              <div className="flex-1">
                <div className="label-caps text-[#FFBF00] mb-1" style={{ color: '#B88900' }}>{d.day}</div>
                <h3 className="font-display font-bold text-[#1C2228] text-xl mb-2">{d.title}</h3>
                <p className="text-[#4A5159] leading-relaxed">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ══ PRECIOS — navy ══ */}
      <Section tone="navy">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <Eyebrow onDark>Cuánto cuesta</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold mb-4">
            Menos que un medio tiempo.<br/>
            Trabaja 6 veces más.
          </h2>
          <p className="text-white/60">
            Una mensualidad fija. Sin sueldo mínimo. Sin prestaciones.
            Sin comisión por pedido.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {[
            { name: 'Starter', tagline: 'Para arrancar rápido y empezar a ver resultados.', price: '$80', priceRange: '–120 USD/mes', setup: 'Setup: $400–600 USD', features: ['Tu asistente en WhatsApp 24/7','Catálogo, pedido, pago, despacho y reseña','Registra gastos por voz o foto','Dashboard en tu celular','Reportes automáticos en Sheets','Te atendemos por WhatsApp'], cta: 'Quiero arrancar', popular: false },
            { name: 'Pro', tagline: 'Para crecer sin tener que contratar más gente.', price: '$200', priceRange: '–350 USD/mes', setup: 'Setup: $1,200–1,800 USD', features: ['Todo lo del Starter, y además:','Campañas de WhatsApp a tus clientes','Llamadas perdidas se convierten en pedido','Cobro automático a los que te deben','Control de mesas y caja (restaurantes)','Lista de precios del día automática'], cta: 'Quiero el Pro', popular: true },
            { name: 'Enterprise', tagline: 'Para operaciones grandes que necesitan todo integrado.', price: '$400', priceRange: '–600 USD/mes', setup: 'Setup: $2,500–4,000 USD', features: ['Todo lo del Pro, y además:','Pedidos B2B mayoristas','Trazabilidad en tiempo real del pedido','Facturación electrónica','Conexión a tu POS actual','Múltiples usuarios y sucursales'], cta: 'Hablar conmigo', popular: false },
          ].map((p) => (
            <div key={p.name} className={`rounded-2xl p-8 relative flex flex-col ${p.popular ? 'bg-white text-[#1C2228] shadow-2xl md:-translate-y-3 border-2 border-[#FFBF00]' : 'bg-white/5 border border-white/10'}`}>
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFBF00] text-[#09264A] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Más popular
                </div>
              )}
              <h3 className={`font-display text-2xl font-bold mb-1 ${p.popular ? 'text-[#09264A]' : 'text-white'}`}>{p.name}</h3>
              <p className={`text-sm mb-6 ${p.popular ? 'text-[#4A5159]' : 'text-white/60'}`}>{p.tagline}</p>
              <div className="mb-1">
                <span className={`font-display text-5xl font-bold ${p.popular ? 'text-[#09264A]' : 'text-[#FFBF00]'}`}>{p.price}</span>
                <span className={`${p.popular ? 'text-[#8A9197]' : 'text-white/50'} text-sm`}>{p.priceRange}</span>
              </div>
              <div className={`text-xs mb-7 ${p.popular ? 'text-[#8A9197]' : 'text-white/40'}`}>{p.setup}</div>
              <ul className="space-y-3 mb-8 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 ${p.popular ? 'text-[#1C2228]/90' : 'text-white/90'}`}>
                    <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${p.popular ? 'text-[#09264A]' : 'text-[#FFBF00]'}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className={`block text-center py-3 rounded-xl font-bold transition-all ${p.popular ? 'bg-[#FFBF00] text-[#09264A] hover:bg-[#FFD033] shadow-[0_4px_20px_-2px_rgb(255_191_0_/_0.35)]' : 'border-2 border-white/30 text-white hover:bg-white hover:text-[#09264A]'}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Urgencia honesta — escasez real */}
        <p className="mt-10 text-center text-sm text-white/60 max-w-xl mx-auto">
          Tomo máximo <span className="text-[#FFBF00] font-semibold">3 clientes nuevos al mes</span> para poder instalar todo bien, contigo.
        </p>

        {/* Comparación: empleado real vs tu asistente */}
        <div className="mt-10 max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <div className="label-caps text-white/50 mb-3">Contratar a alguien</div>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Sueldo (medio tiempo)</span><span className="font-semibold">$135–230/mes</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>+ prestaciones y aportes</span><span className="font-semibold">+25–30%</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Horario</span><span className="font-semibold">4 horas/día</span></li>
              <li className="flex justify-between"><span>Se enferma, falta, renuncia</span><span className="font-semibold">sí</span></li>
            </ul>
            <p className="text-[10px] text-white/40 mt-4 leading-relaxed">
              Referencia: sueldo mínimo Perú S/1,025 (~$270/mes full time) ·
              Colombia ~$350/mes + prestaciones.
            </p>
          </div>
          <div className="bg-[#FFBF00]/10 border border-[#FFBF00]/30 rounded-2xl p-7">
            <div className="label-caps text-[#FFBF00] mb-3">Tu asistente JUTILABS</div>
            <ul className="space-y-2.5 text-sm text-white">
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Mensualidad</span><span className="font-semibold text-[#FFBF00]">desde $80/mes</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Prestaciones</span><span className="font-semibold text-[#FFBF00]">ninguna</span></li>
              <li className="flex justify-between border-b border-white/10 pb-2"><span>Horario</span><span className="font-semibold text-[#FFBF00]">24/7</span></li>
              <li className="flex justify-between"><span>Se enferma, falta, renuncia</span><span className="font-semibold text-[#FFBF00]">nunca</span></li>
            </ul>
          </div>
        </div>

        {/* Risk reversal — piloto gratis */}
        <div className="mt-10 max-w-3xl mx-auto bg-white rounded-2xl p-8 md:p-10 text-center border-4 border-[#FFBF00]">
          <div className="inline-flex items-center gap-2 bg-[#09264A] text-[#FFBF00] px-4 py-1.5 rounded-full label-caps mb-4">
            🚀 Piloto 2 semanas — gratis
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-[#09264A] mb-3">
            Arrancamos con un piloto. Si no funciona, no pagas nada.
          </h3>
          <p className="text-[#4A5159] leading-relaxed max-w-xl mx-auto">
            Montamos la automatización más sencilla de tu negocio durante 2 semanas,
            sin costo. Al final vemos juntos cuántas horas te ahorró y cuántos errores
            evitó. Si te sirve, seguimos con el setup completo. Si no, nos damos la mano
            y listo.
          </p>
        </div>
      </Section>

      {/* ══ FAQ — white ══ */}
      <Section tone="white">
        <div className="max-w-3xl mx-auto">
          <Reveal className="text-center mb-12">
            <Eyebrow>Objeciones honestas</Eyebrow>
            <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold text-[#09264A]">
              Lo que todo dueño nos pregunta
            </h2>
          </Reveal>
          <div className="space-y-3">
            {faqs.map((faq) => <FAQItem key={faq.q} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </Section>

      {/* ══ CONTACTO — navy ══ */}
      <Section tone="navy" id="contacto">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
          <Eyebrow onDark>Último paso</Eyebrow>
          <h2 className="text-[32px] sm:text-4xl md:text-5xl font-bold mb-4">
            ¿Cuándo fue la última vez que cerraste tranquilo,<br/>
            <span className="text-[#FFBF00]">sin el celular en la mano?</span>
          </h2>
          <p className="text-white/60 mb-10">
            15 minutos conmigo. Revisamos tu operación, te digo si te puedo ayudar o no,
            y te vas con un plan aunque no me contrates.
          </p>
          </Reveal>

          {submitted ? (
            <div className="bg-white/5 border border-[#FFBF00]/40 rounded-2xl p-10">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="font-display text-2xl font-bold mb-2">¡Listo!</h3>
              <p className="text-white/70 mb-6">Recibimos tus datos. Abrimos WhatsApp para coordinar.</p>
              <Button href={`https://wa.me/573025282411`} variant="primary" size="lg">
                Abrir WhatsApp <ArrowRight size={18} />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 text-left shadow-2xl space-y-5">
              {[
                { label: 'Tu nombre', key: 'nombre', type: 'text', placeholder: 'Ej. Carlos Ramírez' },
                { label: 'Tu WhatsApp', key: 'whatsapp', type: 'tel', placeholder: 'Ej. +57 310 000 0000' },
              ].map((f) => (
                <div key={f.key}>
                  <label htmlFor={`field-${f.key}`} className="block text-sm font-semibold text-[#1C2228] mb-1.5">{f.label}</label>
                  <input
                    id={`field-${f.key}`}
                    type={f.type} required placeholder={f.placeholder}
                    value={(formData as any)[f.key]}
                    onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                    className="w-full border border-[#E8EAED] rounded-xl px-4 py-3 text-[#1C2228] placeholder:text-[#B5BBC2] focus:outline-none focus:ring-2 focus:ring-[#09264A]/20 focus:border-[#09264A] transition"
                  />
                </div>
              ))}
              <div>
                <label htmlFor="field-negocio" className="block text-sm font-semibold text-[#1C2228] mb-1.5">Tipo de negocio</label>
                <select
                  id="field-negocio"
                  aria-label="Tipo de negocio"
                  required value={formData.negocio}
                  onChange={(e) => setFormData({ ...formData, negocio: e.target.value })}
                  className="w-full border border-[#E8EAED] rounded-xl px-4 py-3 text-[#1C2228] focus:outline-none focus:ring-2 focus:ring-[#09264A]/20 focus:border-[#09264A] transition bg-white"
                >
                  <option value="">Selecciona tu negocio</option>
                  <option>Pollería</option>
                  <option>Restaurante</option>
                  <option>Distribuidora de alimentos</option>
                  <option>Carnicería / Salsamentaría</option>
                  <option>Panadería</option>
                  <option>Tienda de abarrotes</option>
                  <option>Otro negocio de alimentos</option>
                </select>
              </div>

              <Button type="submit" variant="primary" size="lg" disabled={loading} className="w-full">
                {loading ? 'Enviando...' : <><Send size={18} /> Agendar 15 min con Tom</>}
              </Button>

              <p className="text-xs text-[#8A9197] text-center">
                Implementación en 1–2 semanas · Sin reemplazar nada · Sin contratos largos
              </p>
            </form>
          )}
        </div>
      </Section>

      </main>

      {/* ══ FOOTER — navy deep ══ */}
      <footer className="bg-[#061935] py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Bloque principal */}
          <div className="text-center">
            <div className="inline-block"><Logo size="sm" onDark /></div>
            <p className="text-white/60 text-sm mt-5">Automatización IA para negocios de alimentos en Latinoamérica</p>
            <p className="text-white/30 text-xs mt-2">Bogotá, Colombia · Servicio en toda LATAM · Tom Muñoz, Fundador</p>
            <a href={`https://wa.me/573025282411`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 mt-6 text-[#FFBF00] text-sm font-semibold hover:underline">
              <MessageSquare size={16} /> +57 302 528 2411
            </a>
          </div>

          {/* Línea legal al pie */}
          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <div>© {new Date().getFullYear()} JUTILABS. Todos los derechos reservados.</div>
            <div className="flex items-center gap-4">
              <a href="#contacto" className="hover:text-white/70 transition-colors">Contacto</a>
              <span className="text-white/20">·</span>
              <a href="/privacidad" className="hover:text-white/70 transition-colors">Privacidad</a>
              <span className="text-white/20">·</span>
              <a href="/terminos" className="hover:text-white/70 transition-colors">Términos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ══ STICKY MOBILE CTA ══ */}
      <div className="fixed bottom-0 left-0 w-full p-3 bg-white border-t border-[#E8EAED] shadow-lg md:hidden z-50">
        <Button href="#contacto" variant="primary" size="md" className="w-full">
          Agenda 15 min conmigo
        </Button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════
//  WhatsApp Phone Mockup
// ═════════════════════════════════════════════════════════════════════
function PhoneMockup() {
  const messages = [
    { from: 'cli', msg: 'buenas, me mandas 2 pollos enteros y unas alitas?' },
    { from: 'bot', msg: '¡Hola! 👋\n\n🍗 2 Pollos enteros — S/ 59.90\n🔥 Alitas BBQ (500g) — S/ 24.90\n\n💰 *Total: S/ 84.80*\n¿Delivery o recojo?' },
    { from: 'cli', msg: 'delivery' },
    { from: 'bot', msg: '📍 ¿Tu dirección?' },
    { from: 'cli', msg: 'Av. Grau 450, Piura' },
    { from: 'bot', msg: '✅ *Pedido #247 confirmado*\nPaga por Yape 9xx·xxx·xxx\n\n⏱ Entrega ~35 min' },
  ];
  return (
    <div className="w-full max-w-[320px] rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-[#0d1117] bg-[#ECE5DD]">
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: '#075E54' }}>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#FFBF00', color: '#09264A' }}>JL</div>
        <div>
          <div className="text-white text-sm font-semibold">Bot JUTILABS 🤖</div>
          <div className="text-green-200 text-[10px]">● Activo 24/7</div>
        </div>
      </div>
      <div className="px-3 py-3 space-y-2 text-[11px] min-h-[380px]"
        style={{ background: '#ECE5DD', backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c9b8' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'bot' ? 'justify-end' : 'justify-start'}`}>
            <div className="max-w-[80%] px-2.5 py-1.5 shadow-sm whitespace-pre-line"
              style={{ background: m.from === 'bot' ? '#DCF8C6' : '#FFFFFF', color: '#111',
                borderRadius: m.from === 'bot' ? '12px 2px 12px 12px' : '2px 12px 12px 12px' }}>
              {m.msg}
              {m.from === 'bot' && <span className="text-[9px] text-gray-500 ml-2 float-right mt-1">9:03 ✓✓</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
