const SECTIONS = [
  {
    id: 'antivirals',
    title: 'Antiviral Prescribing — Orolabial Herpes',
    subtitle: null,
    colour: { header: 'bg-indigo-600', border: 'border-indigo-200', th: 'bg-indigo-50 text-indigo-700' },
    columns: ['Drug (Brand)', 'Indication', 'Dose', 'Duration', 'Selected ADRs'],
    rows: [
      ['Aciclovir', 'Orolabial herpes simplex', '400 mg 5x/day (severe / immunocompromised)', '5 days', 'Vertigo, dizziness, sore throat'],
      ['', '', '400 mg 3x/day (HIV)', '5–10 days', ''],
      ['Famciclovir (Famvir)', 'Recurrent orolabial herpes simplex (immunocompetent)', '1500 mg single dose', 'Single dose', 'Confusion (elderly), dizziness'],
      ['', '', '500 mg 2x/day (immunocompromised / HIV)', '5–10 days', ''],
      ['Valaciclovir (Valtrex)', 'Recurrent orolabial herpes simplex', '2 g every 12 hours for 2 doses', '1 day', 'Vertigo, dizziness, sore throat'],
      ['', 'HIV-positive', '1 g 2x/day', '5–10 days', ''],
      ['', 'Prevention (immunocompromised)', '500 mg 2x/day', 'Ongoing', ''],
    ],
  },
];

export default function DentalAntiviralPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Antiviral</h1>
        <p className="text-sm text-gray-400 mt-1">
          Antiviral prescribing reference for orolabial herpes infections.
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
