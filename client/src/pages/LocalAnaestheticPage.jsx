// ─── Local Anaesthetic Reference Page ────────────────────────────────────────
// Source: Pain Drugs — Dental Reference Tables
// Parts 2–5: Analgesic Regimen, Local Anaesthetics, Dose Calculation, Vasoconstrictors

// ─── Data ─────────────────────────────────────────────────────────────────────

const ANALGESIC_ROWS = [
  {
    severity: 'MILD – MODERATE',
    regimen: 'Ibuprofen 400 mg every 6–8 h (<5 days)\n+ Paracetamol 1000 mg every 4–6 h (max 4 g/24 h)\n\nOR if NSAIDs contraindicated:\nParacetamol 1000 mg every 4–6 h alone',
    notes: 'Celecoxib 100 mg bd (<5 days) if non-selective NSAIDs not tolerated.\n\nAvoid NSAIDs in: uncontrolled asthma/NERD, peptic ulcer, renal failure, anticoagulation.',
    bg: 'bg-amber-50',
    text: 'text-amber-800',
  },
  {
    severity: 'SEVERE ACUTE',
    regimen: 'Ibuprofen 400 mg every 6–8 h (<5 days) OR Celecoxib\n+ Paracetamol 1000 mg every 4–6 h (max 4 g/24 h)\n+ Oxycodone IR 5 mg every 4–6 h PRN (<3 days)',
    notes: 'Always use IR oxycodone (not CR — delayed onset not ideal for acute pain). S8 prescription rules apply.\n\nIf NSAIDs contraindicated: paracetamol + oxycodone only.',
    bg: 'bg-red-50',
    text: 'text-red-800',
  },
];

// ONS = Office/Normal Setting, IONS = Intermediate/Other Nerve-block Settings
const LA_ONS = [
  {
    name: 'Lidocaine (plain)',
    duration: 'Short (~30 min pulpal)',
    concentration: '2% (20 mg/mL)',
    vasoconstrictor: 'None',
    maxDose: '4.4 mg/kg',
    maxVol70: '15.4 mL',
    maxVol20: '4.4 mL',
    cartridges: '~7',
    notes: 'Shorter acting — limited use alone in dentistry. Use with adrenaline for adequate duration.',
  },
  {
    name: 'Lidocaine + Adrenaline (Xylocaine)\n★ FIRST LINE',
    duration: 'Intermediate (60–90 min pulpal)',
    concentration: '2% (20 mg/mL)',
    vasoconstrictor: '1:80,000 (12.5 mcg/mL)',
    maxDose: '7 mg/kg',
    maxVol70: '24.5 mL',
    maxVol20: '7 mL',
    cartridges: '~11',
    notes: 'FIRST LINE for routine dental procedures. Most widely used in Australian dentistry. Aspirate before injecting. Avoid in sulphite-sensitive patients.',
    firstLine: true,
  },
  {
    name: 'Prilocaine (plain)',
    duration: 'Short (~30 min pulpal)',
    concentration: '3% (30 mg/mL)',
    vasoconstrictor: 'None',
    maxDose: '6 mg/kg',
    maxVol70: '10.5 mL',
    maxVol20: '3 mL',
    cartridges: '~5',
    notes: 'Shorter acting alone. Risk of methaemoglobinaemia in overdose (especially with topical benzocaine). Metabolised to orthotoluidine.',
  },
  {
    name: 'Prilocaine + Felypressin (Citanest)\n★ FIRST LINE (adrenaline CI)',
    duration: 'Intermediate (60–90 min pulpal)',
    concentration: '3% (30 mg/mL)',
    vasoconstrictor: 'Felypressin 0.03 IU/mL',
    maxDose: '9 mg/kg',
    maxVol70: '21 mL',
    maxVol20: '6 mL',
    cartridges: '~9.5',
    notes: 'FIRST LINE when adrenaline is contraindicated. Safe in pregnancy (no β-adrenergic effects). Minimal cardiac effects. Felypressin is a vasopressin analogue.',
    firstLine: true,
  },
  {
    name: 'Prilocaine + Adrenaline',
    duration: 'Intermediate',
    concentration: '3% (30 mg/mL)',
    vasoconstrictor: '1:300,000 (3.3 mcg/mL)',
    maxDose: '9 mg/kg',
    maxVol70: '21 mL',
    maxVol20: '6 mL',
    cartridges: '~9.5',
    notes: 'Lower concentration of adrenaline than lidocaine preparations. Suitable for prolonged procedures.',
  },
  {
    name: 'Mepivacaine (plain)',
    duration: 'Short (~20–40 min pulpal)',
    concentration: '3% (30 mg/mL)',
    vasoconstrictor: 'None',
    maxDose: 'See product info',
    maxVol70: 'Child 3–6y: 1.8 mL\nChild 6–14y: 2.7 mL\nAdolescent: 4.4 mL\nAdult: 6.6 mL',
    maxVol20: 'See adult column',
    cartridges: 'See adult column',
    notes: 'Useful when vasoconstrictors are absolutely contraindicated. Less effective duration than LA+adrenaline combinations. DO NOT use in children <3 years.',
  },
];

const LA_IONS = [
  {
    name: 'Mepivacaine + Adrenaline',
    duration: 'Intermediate',
    concentration: '2% (20 mg/mL)',
    vasoconstrictor: '1:100,000 (10 mcg/mL)',
    maxDose: 'Not specified',
    maxVol70: 'See notes',
    maxVol20: 'See notes',
    cartridges: 'See notes',
    notes: 'DO NOT use in children <3 years. Follow product information for dosing. Intermediate acting.',
  },
  {
    name: 'Articaine + Adrenaline (Septanest, Ultracain)',
    duration: 'Intermediate (60–75 min pulpal)',
    concentration: '4% (40 mg/mL)',
    vasoconstrictor: '1:100,000 (10 mcg/mL)',
    maxDose: '7 mg/kg',
    maxVol70: '12.25 mL',
    maxVol20: '3.5 mL',
    cartridges: '~5.6',
    notes: 'INFILTRATION ONLY — DO NOT use for inferior alveolar/lingual/mental nerve blocks (↑ risk of prolonged/permanent paraesthesia). DO NOT use <4 years. Has both amide & ester properties — metabolised in liver AND plasma.',
    warning: true,
  },
  {
    name: 'Articaine + Adrenaline 1:200,000',
    duration: 'Intermediate',
    concentration: '4% (40 mg/mL)',
    vasoconstrictor: '1:200,000 (5 mcg/mL)',
    maxDose: '7 mg/kg',
    maxVol70: '12.25 mL',
    maxVol20: '3.5 mL',
    cartridges: '~5.6',
    notes: 'Lower adrenaline concentration — suitable where reduced vasoconstrictor preferred. Same nerve block restrictions as 1:100,000 formulation.',
    warning: true,
  },
  {
    name: 'Ropivacaine',
    duration: 'Long (12–18 hours)',
    concentration: '0.5–0.75% (5–7.5 mg/mL)',
    vasoconstrictor: 'None',
    maxDose: '3 mg/kg',
    maxVol70: '~42 mL (at 0.5%)',
    maxVol20: 'Concentrations up to 0.5% in children',
    cartridges: 'N/A (not in cartridge form)',
    notes: 'Prolonged postoperative analgesia. Useful for refractory acute dental pain. Less cardiotoxic than bupivacaine. Can be used in children at concentrations up to 0.5%.',
  },
  {
    name: 'Bupivacaine (plain or + Adrenaline)',
    duration: 'Long (12–18 hours)',
    concentration: '0.25–0.5% (2.5–5 mg/mL)',
    vasoconstrictor: 'Plain or 1:200,000',
    maxDose: '2 mg/kg',
    maxVol70: '~40 mL (at 0.25%)',
    maxVol20: 'DO NOT use <12 years',
    cartridges: 'N/A (not in cartridge form)',
    notes: 'MORE CARDIOTOXIC than ropivacaine — cardiac toxicity may manifest BEFORE neurological signs. DO NOT use in children <12 years. Similar indications to ropivacaine. Monitor closely.',
    warning: true,
  },
  {
    name: 'Prilocaine 4% (plain)',
    duration: 'Short–Intermediate',
    concentration: '4% (40 mg/mL)',
    vasoconstrictor: 'None',
    maxDose: '6 mg/kg',
    maxVol70: '10.5 mL',
    maxVol20: '3 mL',
    cartridges: '~4.8',
    notes: 'No vasoconstrictor. Risk of methaemoglobinaemia. Max dose lower when no vasoconstrictor.',
  },
];

const LA_COLUMNS = [
  'Local Anaesthetic', 'Duration', 'Concentration', 'Vasoconstrictor',
  'Max mg/kg', 'Max Vol 70 kg Adult', 'Max Vol 20 kg Child', 'Cartridges* (70 kg)', 'Key Dental Notes',
];

const VASOCONSTRICTOR_ROWS = [
  {
    name: 'Adrenaline (Epinephrine)\n1:80,000 or 1:100,000',
    benefits: 'Prolongs anaesthesia duration. Reduces systemic absorption. Reduces bleeding (haemostasis). Intensifies anaesthesia.',
    caution: 'Sulphite-sensitive patients. Caution: severe uncontrolled hypertension, unstable angina, arrhythmias. Use cautiously with MAOIs and TCAs.',
    notes: 'Most commonly used vasoconstrictor in Australian dentistry. Small amounts used in dental cartridges are generally safe even in cardiac patients (benefits outweigh risks at standard doses). Aspirate before injecting.',
  },
  {
    name: 'Felypressin (synthetic vasopressin)\n0.03 IU/mL',
    benefits: 'Vasoconstriction without β-adrenergic effects. Safe in pregnancy. Minimal cardiac effects.',
    caution: 'Do not use in large doses in pregnancy (uterotonic effects at high doses). Avoid in significant cardiovascular disease.',
    notes: 'Used with prilocaine 3%. FIRST LINE when adrenaline is contraindicated (e.g. phaeochromocytoma, thyrotoxicosis, sulphite allergy). Safer cardiac profile than adrenaline.',
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function Lines({ text }) {
  return text.split('\n').map((line, i) => (
    <span key={i} className="block">{line}</span>
  ));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CardHeader({ colour, title, subtitle }) {
  return (
    <div className={`${colour} px-5 py-3`}>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      {subtitle && <p className="text-xs text-white/70 mt-0.5">{subtitle}</p>}
    </div>
  );
}

function SectionSeparator({ label, colour }) {
  return (
    <tr>
      <td colSpan={LA_COLUMNS.length} className={`px-5 py-2 text-xs font-bold uppercase tracking-widest ${colour}`}>
        {label}
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LocalAnaestheticPage() {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Local Anaesthetic</h1>
        <p className="text-sm text-gray-400 mt-1">
          LA reference — agents, dosing, vasoconstrictors, and analgesic regimens.
          <span className="ml-2 text-gray-300">* Cartridges calculated at 2.2 mL per cartridge</span>
        </p>
      </div>

      {/* ── Part 2: Analgesic Regimen ── */}
      <div className="rounded-xl border border-amber-200 overflow-hidden shadow-sm">
        <CardHeader colour="bg-amber-500" title="Dental Analgesic Regimen" subtitle="Based on Therapeutic Guidelines: Oral & Dental Version 3 — analgesics are adjuncts, treat the underlying cause" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['Pain Severity', 'First-line Regimen', 'Notes / Alternatives'].map((col) => (
                  <th key={col} className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide bg-amber-50 text-amber-700 border-b border-amber-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {ANALGESIC_ROWS.map((row) => (
                <tr key={row.severity} className="align-top">
                  <td className={`px-5 py-3 font-semibold text-sm w-36 ${row.text} ${row.bg}`}>
                    {row.severity}
                  </td>
                  <td className="px-5 py-3 text-gray-700 leading-relaxed">
                    <Lines text={row.regimen} />
                  </td>
                  <td className="px-5 py-3 text-gray-700 leading-relaxed">
                    <Lines text={row.notes} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part 3: Local Anaesthetics ── */}
      <div className="rounded-xl border border-blue-200 overflow-hidden shadow-sm">
        <CardHeader colour="bg-blue-600" title="Local Anaesthetics in Dentistry" subtitle="Australian Guidelines  |  ★ = First-line  |  ⚠ = Special restrictions" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {LA_COLUMNS.map((col) => (
                  <th key={col} className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wide bg-blue-50 text-blue-700 border-b border-blue-200 whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              <SectionSeparator label="ONS — Office/Normal Setting" colour="bg-blue-600 text-white" />
              {LA_ONS.map((row) => (
                <tr key={row.name} className={`align-top hover:bg-gray-50 transition-colors ${row.firstLine ? 'bg-green-50/40' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-800 whitespace-pre-line min-w-[160px]">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.duration}</td>
                  <td className="px-4 py-3 text-gray-600 font-medium whitespace-nowrap">{row.concentration}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.vasoconstrictor}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">{row.maxDose}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-pre-line">{row.maxVol70}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-pre-line">{row.maxVol20}</td>
                  <td className="px-4 py-3 text-gray-600">{row.cartridges}</td>
                  <td className={`px-4 py-3 leading-relaxed min-w-[240px] ${row.warning ? 'text-red-700' : 'text-gray-600'}`}>{row.notes}</td>
                </tr>
              ))}
              <SectionSeparator label="IONS — Intermediate/Other Nerve-block Settings" colour="bg-orange-500 text-white" />
              {LA_IONS.map((row) => (
                <tr key={row.name} className={`align-top hover:bg-gray-50 transition-colors ${row.warning ? 'bg-red-50/30' : ''}`}>
                  <td className="px-4 py-3 font-medium text-gray-800 min-w-[160px]">{row.name}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.duration}</td>
                  <td className="px-4 py-3 text-gray-600 font-medium whitespace-nowrap">{row.concentration}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.vasoconstrictor}</td>
                  <td className="px-4 py-3 text-gray-700 font-semibold whitespace-nowrap">{row.maxDose}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-pre-line">{row.maxVol70}</td>
                  <td className="px-4 py-3 text-gray-600 whitespace-pre-line">{row.maxVol20}</td>
                  <td className="px-4 py-3 text-gray-600">{row.cartridges}</td>
                  <td className={`px-4 py-3 leading-relaxed min-w-[240px] ${row.warning ? 'text-red-700 font-medium' : 'text-gray-600'}`}>{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Part 4: Dose Calculation ── */}
      <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <CardHeader colour="bg-slate-600" title="LA Dose Calculation Method" />
        <div className="bg-white px-5 py-4">
          <p className="text-sm text-gray-500 mb-2">Formula</p>
          <p className="text-base font-mono bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800">
            Max dose (mg/kg) × weight (kg) ÷ concentration (mg/mL) = Max volume (mL)
          </p>
          <p className="text-sm text-gray-500 mt-3">Then divide by <span className="font-semibold text-gray-700">2.2 mL</span> to get number of cartridges.</p>
        </div>
      </div>

      {/* ── Part 5: Vasoconstrictors ── */}
      <div className="rounded-xl border border-purple-200 overflow-hidden shadow-sm">
        <CardHeader colour="bg-purple-600" title="Vasoconstrictors" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {['Vasoconstrictor', 'Benefits', 'Avoid / Caution', 'Clinical Notes'].map((col) => (
                  <th key={col} className="text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide bg-purple-50 text-purple-700 border-b border-purple-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-50">
              {VASOCONSTRICTOR_ROWS.map((row) => (
                <tr key={row.name} className="align-top hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-3 font-medium text-gray-800 whitespace-pre-line w-52">{row.name}</td>
                  <td className="px-5 py-3 text-gray-700 leading-relaxed">{row.benefits}</td>
                  <td className="px-5 py-3 text-red-600 leading-relaxed">{row.caution}</td>
                  <td className="px-5 py-3 text-gray-700 leading-relaxed">{row.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key */}
      <p className="text-xs text-gray-400 pb-2">
        Key: MOA = Mechanism of Action | CI = Contraindication | IR = Immediate Release | CR = Controlled Release |
        S4/S8 = PBS Schedule | NERD = NSAID-Exacerbated Respiratory Disease | TCA = Tricyclic Antidepressant |
        MAOI = Monoamine Oxidase Inhibitor | INR = International Normalised Ratio
      </p>
    </div>
  );
}
