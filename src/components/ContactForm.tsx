import { useState, type FormEvent } from 'react';

const WA_LINK = 'https://wa.me/556899423231?text=Olá! Gostaria de solicitar um orçamento.';

const segmentOptions = [
  'Advocacia / Direito',
  'Odontologia / Saúde',
  'Psicologia / Terapia',
  'Contabilidade / Finanças',
  'Imobiliária / Real Estate',
  'Arquitetura / Design',
  'Consultoria',
  'Prestação de Serviços',
  'Outro',
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', segment: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Olá Victor! Me chamo *${form.name}*.\nSegmento: ${form.segment}\nWhatsApp: ${form.phone}\n\n${form.message}`;
    window.open(`${WA_LINK}?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-purple-500/30 bg-purple-500/8 p-10 text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h3 className="text-xl font-bold text-zinc-100 mb-2">Mensagem enviada!</h3>
        <p className="text-zinc-400 text-sm">Te redirecionei para o WhatsApp. Aguardo seu contato!</p>
        <button
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-purple-400 hover:text-purple-300 transition-colors"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: 'Nome completo *', type: 'text', key: 'name', placeholder: 'João Silva' },
        { label: 'WhatsApp *', type: 'tel', key: 'phone', placeholder: '(11) 99999-9999' },
      ].map((f) => (
        <div key={f.key}>
          <label className="text-xs font-medium text-zinc-400 block mb-1.5">{f.label}</label>
          <input
            required
            type={f.type}
            placeholder={f.placeholder}
            value={form[f.key as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
        </div>
      ))}

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1.5">Segmento do negócio *</label>
        <select
          required
          value={form.segment}
          onChange={(e) => setForm({ ...form, segment: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all appearance-none"
        >
          <option value="" disabled>Selecione seu segmento</option>
          {segmentOptions.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs font-medium text-zinc-400 block mb-1.5">Mensagem</label>
        <textarea
          rows={3}
          placeholder="Conte um pouco sobre seu projeto..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-lg shadow-purple-600/25"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        Enviar via WhatsApp
      </button>
    </form>
  );
}