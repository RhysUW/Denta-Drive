// ─── Dental RX Page ───────────────────────────────────────────────────────────
// Content: Dental Infection Protocols and Prescribing Guide

const SECTIONS = [
  {
    id: 'core-rules',
    title: 'Dental Infection Protocols and Prescribing Guide',
    subtitle: 'Core rules',
    colour: { header: 'bg-slate-700', border: 'border-slate-200', th: 'bg-slate-50 text-slate-700' },
    columns: ['Core rule', 'Lecture-based meaning'],
    rows: [
      ['Source control first', 'Extraction, root canal treatment, periodontal debridement, or drainage is the primary treatment. Antibiotics do not replace dental treatment.'],
      ['When not to prescribe', 'Do not prescribe routinely for localized odontogenic infection without facial swelling or systemic signs when you can drain and definitively treat the source.'],
      ['When to prescribe', 'Prescribe when dental treatment is delayed for more than 24 hours, when there are spreading or systemic features, or when the lecture gives a specific indication such as necrotizing gingivitis or peri-implantitis.'],
      ['Review window', 'Reassess at 48 to 72 hours. Escalate if the patient is not improving or is worsening.'],
      ['If infection recurs despite antibiotics', 'Recurrent infection despite antibiotics suggests missed dental intervention; seek expert advice.'],
    ],
  },
  {
    id: 'odontogenic-protocol',
    title: 'Odontogenic Infections: Step-by-Step Protocol',
    subtitle: null,
    colour: { header: 'bg-emerald-600', border: 'border-emerald-200', th: 'bg-emerald-50 text-emerald-700' },
    columns: ['Step', 'What to do', 'Why / prescribing logic'],
    rows: [
      ['1. Classify the infection', 'Decide whether it is localized or spreading.\n\nLocalized infection includes periapical, pericoronal, and periodontal abscesses presenting with dental pain, pus, or gum swelling and no facial swelling or systemic signs.', 'This determines whether local dental treatment alone is usually enough or whether antibiotic cover is justified.'],
      ['2. Always control the source', 'Perform extraction, root canal treatment, periodontal debridement, and/or drainage of pus.', 'Antibiotics do not replace treatment.'],
      ['3. If localized and stable', 'Treat locally with drainage and definitive dental treatment.\n\nProvide analgesia.\n\nFor pericoronal infection, give warm saline or chlorhexidine rinses.', 'Localized infection is mechanically treatable, so routine antibiotics are usually not required.'],
      ['4. Decide whether antibiotics are actually indicated', 'Start antibiotics only if dental treatment is delayed more than 24 hours, if fragments remain post-extraction, or if systemic / spreading features are present.', 'When you have loss of local control or treatment delay (not for pain control!)'],
      ['5. If spreading but no severe/systemic features', 'Manage as an outpatient with drainage, source control, analgesia, and oral antibiotics.\n\nStart antibiotics after culture if possible.', 'These cases still need source control first, but antibiotics are added because the infection is no longer purely local.\n\nLocal anaesthetic may fail, so sedation or GA may be needed.'],
      ['6. Review at 48 to 72 hours', 'Reassess symptoms, swelling, drainage, and response.\n\nAdjust antibiotics based on culture. If needed, check for unresolved abscess with CT.', 'Early review as the safety checkpoint to confirm that source control and the selected regimen are working.'],
      ['7. Escalate urgently if severe/systemic', 'Transfer urgently to hospital / oral and maxillofacial support for airway management, IV fluids, drainage, surgical source control, and IV antibiotics.', 'Facial swelling, trismus, dysphagia, dyspnoea, fever over 38°C, pallor, or sepsis signs indicate a risk that is too high for routine outpatient management.'],
    ],
  },
  {
    id: 'oral-regimens',
    title: 'Oral Antibiotic Regimens',
    subtitle: 'For spreading odontogenic infection without severe/systemic features, and for infection following dentoalveolar surgery',
    colour: { header: 'bg-blue-600', border: 'border-blue-200', th: 'bg-blue-50 text-blue-700' },
    columns: ['Regimen', 'Adult dose and duration', 'Child dose and duration'],
    rows: [
      ['Metronidazole + phenoxymethylpenicillin', 'Metronidazole 400 mg orally every 12 hours for 5 days\nPLUS\nPhenoxymethylpenicillin 500 mg orally every 6 hours for 5 days', 'Metronidazole 10 mg/kg up to 400 mg every 12 hours for 5 days\nPLUS\nPhenoxymethylpenicillin 12.5 mg/kg up to 500 mg every 6 hours for 5 days'],
      ['Metronidazole + amoxicillin', 'Metronidazole 400 mg orally every 12 hours for 5 days\nPLUS\nAmoxicillin 500 mg orally every 8 hours for 5 days', 'Metronidazole 10 mg/kg up to 400 mg every 12 hours for 5 days\nPLUS\nAmoxicillin 15 mg/kg up to 500 mg every 8 hours for 5 days'],
      ['Amoxicillin + clavulanate', '875 mg + 125 mg orally every 12 hours for 5 days', '22.5 mg/kg + 3.2 mg/kg up to 875 mg + 125 mg every 12 hours for 5 days in children 2 months or older'],
      ['Clindamycin', '300 mg orally every 8 hours for 5 days', '7.5 mg/kg up to 300 mg every 8 hours for 5 days'],
    ],
  },
  {
    id: 'severe-systemic',
    title: 'Severe or Systemic Spreading Infections',
    subtitle: null,
    colour: { header: 'bg-red-600', border: 'border-red-200', th: 'bg-red-50 text-red-700' },
    columns: ['Trigger / parameter', 'Protocol'],
    rows: [
      ['Red-flag features', 'Facial swelling, trismus, dysphagia, dyspnoea, fever over 38°C, pallor, or sepsis signs.'],
      ['Immediate actions', 'Urgent transfer to hospital with oral / maxillofacial support.\n\nAirway management, IV fluids, drainage of pus, and surgical source control are critical.\n\nCollect cultures before antibiotics if possible, but do not delay treatment.'],
      ['IV antibiotics: first options', 'Benzylpenicillin IV plus metronidazole IV,\nOR\nAmoxicillin + clavulanate IV'],
      ['Penicillin allergy', 'Non-severe allergy: cefazolin + metronidazole.\nSevere allergy: clindamycin monotherapy.'],
      ['Step-down to oral therapy', 'Switch when clinically stable, drains are dry, and the patient is afebrile.'],
    ],
  },
  {
    id: 'prophylaxis',
    title: 'Antibiotic Prophylaxis',
    subtitle: null,
    colour: { header: 'bg-orange-500', border: 'border-orange-200', th: 'bg-orange-50 text-orange-700' },
    columns: ['Question', 'Lecture answer'],
    rows: [
      ['Is routine surgical antibiotic prophylaxis indicated for usual dental surgery?', 'Rarely. The role of surgical prophylaxis for patients with profound immune compromise undergoing invasive dental procedures is uncertain.'],
      ['What prophylaxis is indicated?', 'Infective endocarditis prophylaxis for patients with specific cardiac conditions.'],
      ['What is specifically listed as NOT indicated?', 'Prevention of alveolar osteitis, tooth extractions, third molar surgery, insertion of dental implants, periodontal surgery, periapical surgery, and soft or hard tissue removal.'],
    ],
  },
  {
    id: 'ie-prophylaxis',
    title: 'Infective Endocarditis Prophylaxis',
    subtitle: null,
    colour: { header: 'bg-purple-600', border: 'border-purple-200', th: 'bg-purple-50 text-purple-700' },
    columns: ['Parameter', 'Lecture protocol'],
    rows: [
      ['Who gets it?', 'ONLY for patients with the following cardiac conditions (increased risk of infective endocarditis) who are undergoing a procedure listed below:\n\n• Prosthetic cardiac valve, including transcatheter-implanted prosthesis or homograft\n• Prosthetic material used for cardiac valve repair, such as annuloplasty rings and chords\n• Previous infective endocarditis\n• Congenital heart disease only if it involves:\n   – Unrepaired cyanotic defects, including palliative shunts and conduits\n   – Repaired defects with residual defects at or adjacent to the site of prosthetic patch or device (which inhibit endothelialisation)\n• Rheumatic heart disease'],
      ['Which dental procedures qualify?', 'Only procedures involving manipulation of gingival tissue, manipulation of periapical tissue, or perforation of oral mucosa.\n\nExamples: extraction, implant placement, biopsy, removal of soft tissue or bone, subgingival scaling and root planing, and replanting avulsed teeth.'],
      ['Standard oral regimen', 'Amoxicillin 2 g orally, 60 minutes before the procedure.\nChild: 50 mg/kg up to 2 g.'],
      ['Delayed non-severe penicillin hypersensitivity', 'Cefalexin 2 g orally, 60 minutes before the procedure.\nChild: 50 mg/kg up to 2 g.'],
      ['Immediate hypersensitivity (severe or non-severe) or delayed severe hypersensitivity to penicillins', 'Clindamycin 600 mg orally, 60 to 120 minutes before the procedure.\nChild: 20 mg/kg up to 600 mg.'],
    ],
  },
  {
    id: 'periodontal',
    title: 'Periodontal Infections',
    subtitle: null,
    colour: { header: 'bg-teal-600', border: 'border-teal-200', th: 'bg-teal-50 text-teal-700' },
    columns: ['Condition', 'Prescribing'],
    rows: [
      ['Gingivitis', 'Antibiotics not indicated.'],
      ['Periodontitis', 'Antibiotics rarely indicated.'],
      ['Necrotizing gingivitis', 'Metronidazole 400 mg orally every 12 hours for 3 to 5 days.'],
      ['Periodontal abscess', 'Treat as spreading odontogenic infection only if the patient is profoundly immunocompromised.'],
      ['Peri-mucositis', 'Antibiotics not indicated.'],
      ['Peri-implantitis', 'Amoxicillin 500 mg orally every 8 hours\nPLUS\nMetronidazole 400 mg orally every 12 hours for 7 days.'],
    ],
  },
  {
    id: 'post-operative',
    title: 'Post-Operative Dental Infections',
    subtitle: null,
    colour: { header: 'bg-amber-500', border: 'border-amber-200', th: 'bg-amber-50 text-amber-700' },
    columns: ['Step', 'Protocol'],
    rows: [
      ['1. Confirm that it is really infection', 'Exclude dry socket and post-operative inflammation before diagnosing post-operative infection.'],
      ['2. Know the clinical clues', 'Look for cellulitis, purulent discharge, and persistent or worsening pain after 48 hours.'],
      ['3. Treat mild infection locally first', 'Drainage, fragment removal, analgesia, and rehydration.'],
      ['4. Decide if antibiotics are needed', 'Add antibiotics only if systemic features are present or the patient is immunocompromised.'],
      ['5. Use the correct oral regimens', 'Use the same oral regimens as for spreading odontogenic infections without severe/systemic features.'],
      ['6. Review', 'Review at 48 to 72 hours to assess response.'],
    ],
  },
  {
    id: 'prescriptions',
    title: 'Prescriptions',
    subtitle: 'Quick-reference prescription summary',
    colour: { header: 'bg-sky-600', border: 'border-sky-200', th: 'bg-sky-50 text-sky-700' },
    columns: ['Clinical situation', 'Prescription', 'Duration / timing'],
    rows: [
      ['Spreading odontogenic infection without severe/systemic features', 'Metronidazole 400 mg orally every 12 hours\nPLUS\nPhenoxymethylpenicillin 500 mg orally every 6 hours', '5 days'],
      ['Spreading odontogenic infection without severe/systemic features', 'Metronidazole 400 mg orally every 12 hours\nPLUS\nAmoxicillin 500 mg orally every 8 hours', '5 days'],
      ['Spreading odontogenic infection without severe/systemic features', 'Amoxicillin + clavulanate 875 mg + 125 mg orally every 12 hours', '5 days'],
      ['Spreading odontogenic infection without severe/systemic features, penicillin hypersensitivity', 'Clindamycin 300 mg orally every 8 hours', '5 days'],
      ['Necrotizing gingivitis', 'Metronidazole 400 mg orally every 12 hours', '3 to 5 days'],
      ['Peri-implantitis', 'Amoxicillin 500 mg orally every 8 hours\nPLUS\nMetronidazole 400 mg orally every 12 hours', '7 days'],
      ['IE prophylaxis — standard', 'Amoxicillin 2 g orally', '60 minutes before procedure'],
      ['IE prophylaxis — delayed non-severe penicillin hypersensitivity', 'Cefalexin 2 g orally', '60 minutes before procedure'],
      ['IE prophylaxis — immediate or delayed severe penicillin hypersensitivity', 'Clindamycin 600 mg orally', '60 to 120 minutes before procedure'],
    ],
  },
];

export default function DentalRXPage() {
  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dental RX</h1>
        <p className="text-sm text-gray-400 mt-1">
          Dental infection protocols, antibiotic prescribing guide, and prophylaxis reference.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className={`rounded-xl border ${section.colour.border} overflow-hidden shadow-sm`}
          >
            {/* Card header */}
            <div className={`${section.colour.header} px-5 py-3`}>
              <h2 className="text-sm font-semibold text-white">{section.title}</h2>
              {section.subtitle && (
                <p className="text-xs text-white/70 mt-0.5">{section.subtitle}</p>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    {section.columns.map((col) => (
                      <th
                        key={col}
                        className={`text-left px-5 py-2.5 text-xs font-semibold uppercase tracking-wide ${section.colour.th} border-b ${section.colour.border}`}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-50">
                  {section.rows.map((row, ri) => (
                    <tr key={ri} className="hover:bg-gray-50 transition-colors">
                      {row.map((cell, ci) => (
                        <td
                          key={ci}
                          className={`px-5 py-3 text-gray-700 align-top ${ci === 0 ? 'font-medium text-gray-800 w-48' : ''}`}
                        >
                          {cell.split('\n').map((line, li) => (
                            <span key={li}>
                              {line}
                              {li < cell.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
