// ─── Dental Emergency Protocol Page ──────────────────────────────────────────
// Source: Dental Emergency Protocol — Quick Reference Guide
// DENT 3005 Pharmacology · University of Western Australia

// ─── Data ─────────────────────────────────────────────────────────────────────

const BLS_STEPS = [
  { letter: 'D', step: 'DANGER',           detail: 'Check for danger to yourself, others, or the patient. Remove danger if safe to do so.' },
  { letter: 'R', step: 'RESPONSE',         detail: 'Ask name, squeeze shoulders. If no response → Send for help.' },
  { letter: 'S', step: 'SEND FOR HELP',    detail: 'Call 000. Stay on line. If alone, roll patient to recovery position first.' },
  { letter: 'A', step: 'AIRWAY',           detail: 'Open mouth, check for foreign material. Remove if present. Open airway with chin lift.' },
  { letter: 'N', step: 'NORMAL BREATHING', detail: 'Look, listen, feel for 10 sec. If not breathing normally → start CPR.' },
  { letter: 'C', step: 'CPR',              detail: '30 chest compressions : 2 breaths. Continue until help arrives or patient breathes normally.' },
  { letter: 'D', step: 'DEFIBRILLATE',     detail: 'Apply AED if available. Follow voice prompts. Do NOT remove pads. Be prepared to restart CPR.' },
];

const EMERGENCY_KIT = [
  { drug: 'Adrenaline (Epinephrine)', indication: 'Anaphylaxis',        details: 'EpiPen 300 mcg / Anapen 500 mcg (adults) · EpiPen Jr 150 mcg (7.5–20 kg) · Keep 2 doses · Prefer autoinjector' },
  { drug: 'Salbutamol inhaler + spacer', indication: 'Acute asthma',   details: '4 puffs (mild–mod) · 12 puffs adult / 6 puffs <6 yr (severe)' },
  { drug: 'GTN spray / tablet',        indication: 'Angina / ACS',      details: '400 mcg spray or 300–600 mcg tablet sublingually · Max 3 doses × 5 min apart' },
  { drug: 'Aspirin 300 mg',            indication: 'Suspected MI',      details: 'Chewed or dissolved before swallowing (NOT for stroke)' },
  { drug: 'Glucose',                   indication: 'Hypoglycaemia',     details: 'Adult 15 g · Child >6 yr 10 g · Child ≤5 yr 5 g · Juice / gel / tablets' },
  { drug: 'Oxygen',                    indication: 'Multiple',          details: 'Mask 6–8 L/min · Nasal prongs 2 L/min · BVM if not breathing' },
  { drug: 'Oral airways (disposable)', indication: 'Ventilation support', details: 'Various sizes — for airway management' },
  { drug: 'AED',                       indication: 'Cardiac arrest',    details: 'Apply pads, follow voice prompts' },
  { drug: 'Monitors',                  indication: 'Assessment',        details: 'Pulse oximeter · BP monitor · Blood glucose monitor' },
];

const ANAPHYLAXIS_STEPS = [
  'Stop treatment immediately.',
  'Remove / stop the allergen.',
  'Lie patient flat (raise legs).',
  'Give IM adrenaline into anterolateral thigh: Autoinjector — adults/child >20 kg: 300 mcg · Autoinjector — child 10–20 kg: 150 mcg · OR ampoule — 10 mcg/kg up to 500 mcg (0.5 mL of 1:1000)',
  'Call 000 — patient MUST go to ED.',
  'Start supplemental oxygen + airway support if needed.',
  'Repeat adrenaline every 5 min until patient responds or help arrives.',
  'Be prepared to start CPR.',
];

const ALLERGY_SEVERITY = [
  { severity: 'Mild urticaria / angioedema', management: 'Stop tx · Remove allergen · Oral antihistamine (cetirizine / loratadine)', level: 'mild' },
  { severity: 'Extensive urticaria / swelling of eyelids, lips, tongue', management: 'Stop tx · Remove allergen · Refer urgently · Consider corticosteroids (e.g. prednisone)', level: 'moderate' },
  { severity: 'Anaphylaxis (hypotension, bronchospasm, laryngeal swelling)', management: 'Follow Anaphylaxis protocol →', level: 'severe' },
];

const SYNCOPE_ROWS = [
  { scenario: 'Patient feels faint',      action: 'Stop tx · Tilt chair horizontal · Raise legs · Measure HR · Talk to assess consciousness' },
  { scenario: 'Patient loses consciousness', action: 'Stop tx · Raise legs (head < heart) · Measure BP & HR · Allow slow recovery · Check standing BP · Refer if elderly / repeated / slow recovery' },
  { scenario: 'No return of consciousness', action: 'Call 000 · Start BLS · Place on side · Continue care until conscious or help arrives' },
];

const ANGINA_ROWS = [
  { scenario: 'Prevention',          action: 'Ensure angina patient brings GTN spray/tablets to every visit.' },
  { scenario: 'Known angina — chest pain', action: 'Stop tx · Monitor BP/HR/SaO₂ · Assess consciousness · GTN spray 400 mcg SL (or tablet 300–600 mcg SL) every 5 min — max 3 doses · If pain persists >10 min after 2 doses → treat as severe/new' },
  { scenario: 'Patient recovers',    action: 'Do NOT resume treatment. Refer for medical review even if well.' },
  { scenario: 'Severe / new chest pain', action: 'Call 000 · GTN as above · Aspirin 300 mg chewed · Monitor vitals · O₂ if SaO₂ <90% (titrate 90–96%) · If loses consciousness → BLS + AED' },
];

const GLUCOSE_ROWS = [
  { scenario: 'Conscious & cooperative',       action: 'Stop tx · Give glucose: Adult 15 g · Child >6 yr 10 g · Child ≤5 yr 5 g · If no glucose → fast-acting food/drink · Repeat after 15 min if no improvement · After 3 doses → seek medical advice · Follow with longer-acting carbohydrate · Do NOT allow driving · Advise medical review' },
  { scenario: 'Drowsy / uncooperative / unconscious', action: 'Stop tx · Call 000 · Start BLS if unconscious' },
  { scenario: 'Hyperglycaemia (DKA/HHS)',       action: 'Advise usual meds + medical review · Symptoms: abdominal pain, nausea, vomiting, fatigue, SOB · Patients on SGLT2 inhibitors → Call 000 if DKA suspected' },
];

const NEURO_ROWS = [
  { scenario: 'STROKE — FAST',             action: 'F: Face drooped? · A: Lift both arms? · S: Slurred speech / understand you? · T: TIME CRITICAL → Call 000 · Stop tx · Measure BP/HR/SaO₂ · O₂ if SaO₂ <90% · Maintain airway · BLS if needed · Do NOT give aspirin (may be haemorrhagic)' },
  { scenario: 'SEIZURE',                   action: 'Stop tx · Protect from falling · Turn on side (reduce aspiration) · Do NOT restrain · Do NOT put anything in mouth · Wait for seizure to end · Assess consciousness · Clear airway · Status epilepticus (>few min) → Call 000 · Known epilepsy: observe ≥30 min, no driving, provide summary to GP' },
  { scenario: 'Periocular muscle paralysis (LA)', action: 'Stop injection · Reassure (temporary) · No rubbing eyes · Cover with 2 eye patches · Observe until blinking returns (~1 hr) · No driving · Phone check same day · Medical review if not resolved within 12 hr' },
  { scenario: 'Methaemoglobinaemia',       action: 'Stop tx · Call 000 · O₂ + airway support · Monitor BP/HR/SpO₂ · BLS if required' },
];

const OCULAR_ROWS = [
  { scenario: 'Chemical injury',          action: 'Irrigate eye with water immediately · Hold eyelid open · Remove contact lens · Continue irrigation ≥15 min (cup/tap — not eyecup) · Weak chemical + minor irritation → same-day medical review · Caustic / marked inflammation → Call 000, continue irrigation' },
  { scenario: 'Foreign body',             action: 'Irrigate eye · Hold eyelid open · Do NOT touch eye surface · Do NOT attempt removal · If not dislodged → transfer to ED · Ongoing symptoms → urgent medical review' },
  { scenario: 'Penetrating injury',       action: 'Call 000 — urgent ED · Do NOT remove object · Do NOT irrigate · No rubbing · Cover eye with shield (or polystyrene cup base) · Describe object to medical team' },
  { scenario: 'Unilateral blindness (post dermal filler)', action: 'Stop tx · Call 000 · Note onset time · Assess visual deficit + stroke symptoms + skin signs · If hyaluronic acid filler → inject hyaluronidase if appropriate · Transfer to ED urgently' },
];

const AIRWAY_ROWS = [
  { scenario: 'Object suspected ingested',    action: 'Stop tx · Check mouth & clothes · If not found → sit patient upright · Refer for medical assessment · If stable & asymptomatic → complete dental tx before referral' },
  { scenario: 'Conscious + airway obstruction', action: 'Call 000 · Reassure · Encourage coughing · ≤5 back blows (heel of hand, between shoulder blades) · If ineffective → ≤5 chest thrusts (CPR compression point) · Alternate until relieved or help arrives · Abdominal thrusts NOT recommended' },
  { scenario: 'Unconscious',                  action: 'Call 000 · Inspect throat, remove object if visible · Start CPR · Consider cricothyroidotomy (trained clinicians only)' },
];

const DRUG_DOSES = [
  { drug: 'Adrenaline IM', patient: 'Adult / >20 kg',  dose: '300 mcg autoinjector / 0.3 mL 1:1000 ampoule', note: 'Anaphylaxis — repeat every 5 min' },
  { drug: 'Adrenaline IM', patient: 'Child 10–20 kg',  dose: '150 mcg autoinjector / 10 mcg/kg (max 500 mcg)', note: 'Anaphylaxis' },
  { drug: 'GTN spray',     patient: 'All',             dose: '400 mcg SL, every 5 min, max 3 doses',          note: 'Angina / ACS' },
  { drug: 'GTN tablet',    patient: 'All',             dose: '300–600 mcg SL, every 5 min, max 3 doses',      note: 'Angina / ACS' },
  { drug: 'Aspirin',       patient: 'All',             dose: '300 mg oral, chewed or dissolved',              note: 'Suspected MI only — NOT stroke' },
  { drug: 'Salbutamol (mild)', patient: 'All',         dose: '4 puffs via spacer, wait 4 min, repeat if needed', note: 'Asthma mild/moderate' },
  { drug: 'Salbutamol (severe)', patient: 'Adult / ≥6 yr', dose: '12 puffs via spacer or 5 mg nebulised',   note: 'Asthma severe' },
  { drug: 'Salbutamol (severe)', patient: 'Child <6 yr', dose: '6 puffs via spacer or 5 mg nebulised',      note: 'Asthma severe' },
  { drug: 'Glucose',       patient: 'Adult',           dose: '15 g oral',                                     note: 'Hypoglycaemia' },
  { drug: 'Glucose',       patient: 'Child ≥6 yr',     dose: '10 g oral',                                     note: 'Hypoglycaemia' },
  { drug: 'Glucose',       patient: 'Child ≤5 yr',     dose: '5 g oral',                                      note: 'Hypoglycaemia' },
  { drug: 'O₂ therapy',   patient: 'All',             dose: 'Start if SaO₂ <90%, titrate to 90–96%',        note: 'ACS, stroke, asthma severe' },
];

// ─── Shared components ────────────────────────────────────────────────────────

function SectionHeader({ color, children }) {
  const styles = {
    red:    'bg-red-700 text-white',
    orange: 'bg-orange-600 text-white',
    blue:   'bg-blue-700 text-white',
    teal:   'bg-teal-700 text-white',
    purple: 'bg-purple-700 text-white',
    slate:  'bg-slate-700 text-white',
    green:  'bg-green-700 text-white',
    amber:  'bg-amber-600 text-white',
  };
  return (
    <div className={`px-5 py-2.5 rounded-t-xl font-bold text-sm tracking-wide uppercase ${styles[color]}`}>
      {children}
    </div>
  );
}

function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-gray-200 shadow-sm overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function ProtoTable({ rows, scenarioLabel = 'Scenario', actionLabel = 'Action', scenarioBold = false }) {
  return (
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-50 border-b border-gray-200">
          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-48">{scenarioLabel}</th>
          <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">{actionLabel}</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100 bg-white">
        {rows.map((r, i) => (
          <tr key={i} className="align-top">
            <td className={`px-4 py-3 leading-relaxed ${scenarioBold ? 'font-semibold text-gray-800' : 'text-gray-700'}`}>{r.scenario}</td>
            <td className="px-4 py-3 text-gray-700 leading-relaxed">{r.action}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EmergencyProtocolsPage() {
  return (
    <div className="p-8 space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Emergency Protocols</h1>
        <p className="text-sm text-gray-400 mt-1">Dental Emergency Quick Reference · DENT 3005 Pharmacology · UWA</p>
      </div>

      {/* ── BLS ─────────────────────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="red">Basic Life Support (DRSANCD) — Call Triple Zero 000</SectionHeader>
        <table className="min-w-full text-sm">
          <tbody className="divide-y divide-gray-100 bg-white">
            {BLS_STEPS.map((s, i) => (
              <tr key={i} className="align-top">
                <td className="px-4 py-3 w-10">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-700 font-bold text-sm">{s.letter}</span>
                </td>
                <td className="px-4 py-3 font-semibold text-gray-800 w-44">{s.step}</td>
                <td className="px-4 py-3 text-gray-700 leading-relaxed">{s.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ── Emergency Kit ────────────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="orange">Emergency Kit — Drugs & Equipment</SectionHeader>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-52">Drug / Equipment</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-36">Indication</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Key Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {EMERGENCY_KIT.map((row, i) => (
              <tr key={i} className="align-top">
                <td className="px-4 py-3 font-medium text-gray-800">{row.drug}</td>
                <td className="px-4 py-3 text-gray-600">{row.indication}</td>
                <td className="px-4 py-3 text-gray-700 leading-relaxed">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ── Allergic Reactions ───────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="orange">Allergic Reactions & Anaphylaxis</SectionHeader>
        <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
          {/* Anaphylaxis steps */}
          <div className="p-5">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">Anaphylaxis — Step-by-Step</p>
            <ol className="space-y-2">
              {ANAPHYLAXIS_STEPS.map((step, i) => (
                <li key={i} className="flex gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
              <p><strong>EpiPen®:</strong> Grip → Pull blue safety → Press orange end to thigh → Hold 3 sec</p>
              <p><strong>Anapen®:</strong> Remove black shield → Remove grey cap → Press needle end 90° → Press red button → Hold 3 sec</p>
            </div>
          </div>
          {/* Severity guide */}
          <div className="p-5">
            <p className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-3">Allergy Severity Guide</p>
            <div className="space-y-3">
              {ALLERGY_SEVERITY.map((row, i) => {
                const colors = { mild: 'bg-yellow-50 border-yellow-200', moderate: 'bg-orange-50 border-orange-200', severe: 'bg-red-50 border-red-200' };
                return (
                  <div key={i} className={`rounded-lg border p-3 ${colors[row.level]}`}>
                    <p className="text-xs font-semibold text-gray-800 mb-1">{row.severity}</p>
                    <p className="text-xs text-gray-700 leading-relaxed">{row.management}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* ── Syncope & Hyperventilation ───────────────────────────────────────── */}
      <Card>
        <SectionHeader color="blue">Syncope & Hyperventilation Syndrome</SectionHeader>
        <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Syncope</p>
            </div>
            <ProtoTable rows={SYNCOPE_ROWS} />
          </div>
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">Hyperventilation Syndrome</p>
            </div>
            <div className="bg-white p-4 space-y-3 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Symptoms</p>
                <p className="text-gray-700 leading-relaxed">Light-headedness · Dizziness · SOB · Panic · Blurred vision · Tingling in fingers/toes/lips · Feeling of detachment</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Signs</p>
                <p className="text-gray-700 leading-relaxed">Rapid breathing · Deep sighing breaths · Rapid HR · Altered consciousness · Involuntary hand/finger contraction</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Management</p>
                <p className="text-gray-700 leading-relaxed">Stop tx · Encourage slow nasal breathing · Reassure · Have patient talk to you</p>
                <p className="mt-1.5 text-red-700 font-semibold text-xs">Do NOT use rebreathing bag</p>
                <p className="text-gray-600 text-xs mt-1">If symptoms persist &gt;5–10 min → Call 000</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Cardiac & Endocrine ──────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="teal">Cardiac & Endocrine Emergencies</SectionHeader>
        <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide">ACS / Acute Angina (GTN + Aspirin)</p>
            </div>
            <ProtoTable rows={ANGINA_ROWS} />
          </div>
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-teal-700 uppercase tracking-wide">Hypoglycaemia & Hyperglycaemia</p>
            </div>
            <ProtoTable rows={GLUCOSE_ROWS} />
          </div>
        </div>
      </Card>

      {/* ── Respiratory & Neurological ───────────────────────────────────────── */}
      <Card>
        <SectionHeader color="purple">Respiratory & Neurological Emergencies</SectionHeader>
        <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
          {/* Asthma */}
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wide">Acute Asthma (Salbutamol)</p>
            </div>
            <ProtoTable
              rows={[
                { scenario: 'Sit patient upright', action: 'Stop dental treatment immediately.' },
                { scenario: 'Mild / Moderate', action: '4 puffs salbutamol via spacer (1 puff at a time, shake before each) · Patient takes 4 breaths after each puff · Wait 4 min · If no improvement → repeat 4 puffs · If still no improvement → treat as severe' },
                { scenario: 'Severe / Life-threatening', action: 'Call 000 · O₂ + airway support · Salbutamol via spacer: Adult/child ≥6 yr: 12 puffs · Child <6 yr: 6 puffs (4 breaths after each puff) · If no spacer → salbutamol 5 mg via O₂-driven nebuliser · Repeat every 20 min · If life-threatening → continuous salbutamol' },
              ]}
            />
          </div>
          {/* Neuro */}
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wide">Stroke · Seizure · Neurological</p>
            </div>
            <ProtoTable rows={NEURO_ROWS} />
          </div>
        </div>
      </Card>

      {/* ── Ocular & Airway ──────────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="slate">Ocular Emergencies & Inhaled / Swallowed Objects</SectionHeader>
        <div className="grid grid-cols-2 divide-x divide-gray-100 bg-white">
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Ocular Emergencies</p>
            </div>
            <ProtoTable rows={OCULAR_ROWS} />
          </div>
          <div>
            <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Inhaled / Swallowed Objects</p>
            </div>
            <ProtoTable rows={AIRWAY_ROWS} />
          </div>
        </div>
      </Card>

      {/* ── Drug Dose Reminder ───────────────────────────────────────────────── */}
      <Card>
        <SectionHeader color="green">Quick Drug Dose Reminder</SectionHeader>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-44">Drug</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">Patient</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Dose</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Indication / Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {DRUG_DOSES.map((row, i) => (
              <tr key={i} className="align-top">
                <td className="px-4 py-3 font-medium text-gray-800">{row.drug}</td>
                <td className="px-4 py-3 text-gray-600">{row.patient}</td>
                <td className="px-4 py-3 text-gray-700">{row.dose}</td>
                <td className="px-4 py-3 text-gray-600">{row.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <p className="text-xs text-gray-400 pb-4">
        Reference: Therapeutic Guidelines Oral and Dental (v3) · Australian Medicines Handbook · ANZCOR BLS Flowchart · Dr Thuy Linh Truong, DENT 3005, UWA 2025
      </p>
    </div>
  );
}
