const SECTIONS = [
  {
    id: 'antifungals',
    title: 'Antifungal Drugs',
    subtitle: null,
    colour: { header: 'bg-teal-600', border: 'border-teal-200', th: 'bg-teal-50 text-teal-700' },
    columns: ['Drug', 'Indication', 'Dose', 'Duration', 'Key Notes / Clinical Use'],
    rows: [
      ['Fluconazole', 'Oropharyngeal candidiasis', '50–100 mg 1x/day', '7–14 days', 'First-line systemic if topical fails'],
      ['', 'Oesophageal candidiasis', 'Up to 200–400 mg 1x/day', '14–21 days', 'Used for more severe disease'],
      ['Miconazole (oral gel)', 'Oropharyngeal candidiasis (Adults & >2 yrs)', '2.5 mL 4x/day', '7–14 days', 'Apply directly to lesions'],
      ['', 'Oropharyngeal candidiasis (<2 yrs)', '1.25 mL 4x/day', '7–14 days', 'Use cautiously (aspiration risk)'],
      ['Itraconazole (oral liquid)', 'Oropharyngeal candidiasis (immunocompromised)', '200 mg 1x/day', '7–14 days', 'Use if fluconazole not suitable'],
      ['', 'Oesophageal candidiasis', '200 mg 1x/day', '14–21 days', 'More resistant infections'],
      ['Itraconazole (capsules)', 'Oropharyngeal candidiasis', '50–100 mg 1x/day', '28 days', 'Alternative formulation'],
      ['Itraconazole (capsules)', 'Oropharyngeal candidiasis', '100–200 mg 1x/day', 'Varies', 'Dose depends on severity'],
      ['Posaconazole (oral liquid)', 'Oropharyngeal candidiasis (immunocompromised)', '200 mg 1x/day (day 1), then 100 mg 1x/day', 'Varies', 'Used when other treatments fail'],
      ['', 'Refractory infection', '400 mg 2x/day', 'Varies', 'For resistant infections'],
      ['Amphotericin B', 'Oral & perioral candidiasis', '10 mg 4x/day', '7–14 days', '**Do not use with azole antifungals (antagonistic interaction)'],
      ['Nystatin', 'Oropharyngeal candidiasis', '100,000 units 4x/day (up to 500,000 units 4x/day)', '7–14 days', 'Topical, safe, minimal systemic absorption'],
    ],
  },
];

export default function DentalAntifungalPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Antifungal</h1>
        <p className="text-sm text-gray-400 mt-1">
          Antifungal prescribing reference for oral and perioral candidiasis.
        </p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div
            key={section.id}
            className={`rounded-xl border ${section.colour.border} overflow-hidden shadow-sm`}
          >
            <div className={`${section.colour.header} px-5 py-3`}>
              <h2 className="text-sm font-semibold text-white">{section.title}</h2>
              {section.subtitle && (
                <p className="text-xs text-white/70 mt-0.5">{section.subtitle}</p>
              )}
            </div>

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
                          className={`px-5 py-3 text-gray-700 align-top ${ci === 0 && cell ? 'font-medium text-gray-800' : ''}`}
                        >
                          {cell}
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
