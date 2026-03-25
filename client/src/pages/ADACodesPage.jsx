import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';

// ─── ADA Code Data ─────────────────────────────────────────────────────────────

const ADA_CATEGORIES = [
  {
    id: 'diagnostic',
    name: 'Diagnostic',
    range: '011–099',
    tailwind: {
      header: 'bg-emerald-600',
      badge: 'bg-emerald-100 text-emerald-700',
      border: 'border-emerald-200',
      tag: 'bg-emerald-50 text-emerald-600 ring-emerald-200',
      dot: 'bg-emerald-500',
    },
    codes: [
      { code: '011', description: 'Examination' },
      { code: '012', description: 'Examination, comprehensive' },
      { code: '013', description: 'Examination, detailed and complex' },
      { code: '014', description: 'Consultation' },
      { code: '015', description: 'Oral hygiene status – documentation of' },
      { code: '018', description: 'Case presentation' },
      { code: '021', description: 'Study models' },
      { code: '022', description: 'Diagnostic casts' },
      { code: '031', description: 'Intraoral periapical or bitewing radiograph – per exposure' },
      { code: '032', description: 'Occlusal radiograph' },
      { code: '033', description: 'Panoramic radiograph' },
      { code: '034', description: 'Lateral cephalometric radiograph' },
      { code: '035', description: 'Radiograph – additional films (per radiograph)' },
      { code: '036', description: 'Lateral skull radiograph' },
      { code: '037', description: 'Posteroanterior (PA) skull radiograph' },
      { code: '038', description: 'Other skull or facial radiograph' },
      { code: '039', description: 'Other radiograph' },
      { code: '041', description: 'Pulp test' },
      { code: '051', description: 'Clinical photographs' },
      { code: '055', description: 'Digital volume tomography (DVT/CBCT) – per visit' },
      { code: '058', description: 'Communication – extended' },
      { code: '059', description: 'Other diagnostic procedure' },
    ],
  },
  {
    id: 'preventive',
    name: 'Preventive',
    range: '111–199',
    tailwind: {
      header: 'bg-orange-500',
      badge: 'bg-orange-100 text-orange-700',
      border: 'border-orange-200',
      tag: 'bg-orange-50 text-orange-600 ring-orange-200',
      dot: 'bg-orange-500',
    },
    codes: [
      { code: '111', description: 'Removal of plaque and/or stain' },
      { code: '114', description: 'Scale and clean' },
      { code: '115', description: 'Extensive scale and clean' },
      { code: '116', description: 'Removal of calculus – supragingival' },
      { code: '117', description: 'Removal of calculus – subgingival, per tooth' },
      { code: '118', description: 'Removal of calculus – subgingival, per quadrant' },
      { code: '121', description: 'Topical application of fluoride – child' },
      { code: '122', description: 'Topical application of fluoride – adult' },
      { code: '123', description: 'Fluoride varnish application' },
      { code: '131', description: 'Fissure sealing – per tooth' },
      { code: '141', description: 'Dietary analysis' },
      { code: '142', description: 'Oral hygiene instruction' },
      { code: '151', description: 'Mouthguard – vacuum formed' },
      { code: '153', description: 'Sports mouthguard – custom' },
      { code: '161', description: 'Bleaching – in surgery, per visit' },
      { code: '162', description: 'Bleaching – home, per arch' },
      { code: '165', description: 'Bleaching – non-vital tooth, per visit' },
      { code: '171', description: 'Desensitization – topical' },
      { code: '172', description: 'Removal of extrinsic staining' },
      { code: '173', description: 'Re-mineralisation therapy' },
      { code: '174', description: 'Caries risk assessment' },
      { code: '175', description: 'Preventive resin restoration' },
    ],
  },
  {
    id: 'periodontics',
    name: 'Periodontics',
    range: '211–299',
    tailwind: {
      header: 'bg-purple-600',
      badge: 'bg-purple-100 text-purple-700',
      border: 'border-purple-200',
      tag: 'bg-purple-50 text-purple-600 ring-purple-200',
      dot: 'bg-purple-500',
    },
    codes: [
      { code: '211', description: 'Periodontal consultation and assessment' },
      { code: '212', description: 'Periodontal charting' },
      { code: '221', description: 'Scaling and cleaning – per appointment (complex)' },
      { code: '222', description: 'Periodontal root planing – per tooth' },
      { code: '223', description: 'Periodontal root planing – per quadrant' },
      { code: '225', description: 'Periodontal debridement' },
      { code: '231', description: 'Periodontal surgery – per quadrant' },
      { code: '232', description: 'Gingival surgery – per tooth or region' },
      { code: '233', description: 'Gingivectomy – per tooth' },
      { code: '234', description: 'Gingivectomy – per quadrant' },
      { code: '235', description: 'Crown lengthening – per tooth' },
      { code: '241', description: 'Periodontal emergency treatment' },
      { code: '243', description: 'Incision and drainage of periodontal abscess' },
      { code: '245', description: 'Splinting – per tooth' },
      { code: '251', description: 'Subgingival curettage – per tooth' },
      { code: '252', description: 'Subgingival curettage – per quadrant' },
      { code: '261', description: 'Bone grafting – periodontal' },
      { code: '262', description: 'Guided tissue regeneration – per tooth' },
      { code: '271', description: 'Mucogingival surgery – per tooth' },
      { code: '272', description: 'Connective tissue graft' },
      { code: '273', description: 'Free gingival graft' },
      { code: '281', description: 'Removal of periodontal abscess' },
      { code: '282', description: 'Periodontal maintenance' },
      { code: '291', description: 'Other periodontal procedure' },
    ],
  },
  {
    id: 'oral-surgery',
    name: 'Oral Surgery',
    range: '311–399',
    tailwind: {
      header: 'bg-red-600',
      badge: 'bg-red-100 text-red-700',
      border: 'border-red-200',
      tag: 'bg-red-50 text-red-600 ring-red-200',
      dot: 'bg-red-500',
    },
    codes: [
      { code: '311', description: 'Removal of tooth' },
      { code: '314', description: 'Removal of tooth, erupted – surgical' },
      { code: '315', description: 'Removal of impacted tooth – soft tissue' },
      { code: '316', description: 'Removal of impacted tooth – partially bony' },
      { code: '317', description: 'Removal of impacted tooth – completely bony' },
      { code: '318', description: 'Removal of impacted tooth – completely bony with complications' },
      { code: '319', description: 'Removal of residual root fragments' },
      { code: '321', description: 'Removal of supernumerary tooth – erupted' },
      { code: '322', description: 'Surgical exposure of unerupted tooth' },
      { code: '323', description: 'Surgical repositioning of tooth' },
      { code: '324', description: 'Removal of tooth for transplantation' },
      { code: '325', description: 'Preparation for transplantation – donor site' },
      { code: '326', description: 'Tooth transplantation' },
      { code: '331', description: 'Removal of torus or exostosis' },
      { code: '332', description: 'Alveolectomy' },
      { code: '341', description: 'Excision of soft tissue lesion' },
      { code: '342', description: 'Excision of bone lesion' },
      { code: '343', description: 'Enucleation of cyst' },
      { code: '351', description: 'Apicectomy – per root' },
      { code: '352', description: 'Repair of root apex' },
      { code: '353', description: 'Retrograde root filling – per root' },
      { code: '361', description: 'Frenectomy' },
      { code: '362', description: 'Frenoplasty' },
      { code: '363', description: 'Operculectomy' },
      { code: '371', description: 'Treatment of dry socket' },
      { code: '372', description: 'Incision and drainage of abscess' },
      { code: '373', description: 'Treatment of osteitis / osteomyelitis' },
      { code: '374', description: 'Removal of foreign body' },
      { code: '381', description: 'Repair of lacerations – simple, per visit' },
      { code: '382', description: 'Repair of lacerations – complex' },
      { code: '383', description: 'Treatment of jaw fracture' },
      { code: '384', description: 'Reduction of dislocated jaw' },
      { code: '385', description: 'Orthognathic surgery – consultation' },
      { code: '391', description: 'Other oral surgery procedure' },
    ],
  },
  {
    id: 'anaesthesia',
    name: 'Anaesthesia',
    range: '911–920',
    tailwind: {
      header: 'bg-rose-600',
      badge: 'bg-rose-100 text-rose-700',
      border: 'border-rose-200',
      tag: 'bg-rose-50 text-rose-600 ring-rose-200',
      dot: 'bg-rose-500',
    },
    codes: [
      { code: '911', description: 'Local anaesthetic' },
      { code: '912', description: 'Intraligamentary anaesthetic' },
      { code: '913', description: 'Intraosseous anaesthetic' },
      { code: '914', description: 'Relative analgesia (inhalation sedation)' },
      { code: '915', description: 'Conscious intravenous sedation' },
      { code: '916', description: 'General anaesthesia – first 15 minutes' },
      { code: '917', description: 'General anaesthesia – each subsequent 15 minutes' },
      { code: '918', description: 'Emergency general anaesthesia' },
      { code: '919', description: 'Pre-anaesthetic assessment' },
      { code: '920', description: 'Anaesthetic monitoring' },
    ],
  },
  {
    id: 'endodontics',
    name: 'Endodontics',
    range: '411–499',
    tailwind: {
      header: 'bg-teal-600',
      badge: 'bg-teal-100 text-teal-700',
      border: 'border-teal-200',
      tag: 'bg-teal-50 text-teal-600 ring-teal-200',
      dot: 'bg-teal-500',
    },
    codes: [
      { code: '411', description: 'Emergency pulp removal' },
      { code: '412', description: 'Dressing of tooth' },
      { code: '414', description: 'Pulp capping – indirect' },
      { code: '415', description: 'Pulp capping – direct' },
      { code: '416', description: 'Pulpotomy' },
      { code: '417', description: 'Pulpotomy – primary tooth' },
      { code: '421', description: 'Root canal therapy – anterior tooth (1 root)' },
      { code: '422', description: 'Root canal therapy – premolar (1–2 roots)' },
      { code: '423', description: 'Root canal therapy – molar (2+ roots)' },
      { code: '424', description: 'Root canal therapy – additional canal' },
      { code: '431', description: 'Root canal therapy – retreatment, anterior' },
      { code: '432', description: 'Root canal therapy – retreatment, premolar' },
      { code: '433', description: 'Root canal therapy – retreatment, molar' },
      { code: '434', description: 'Root canal therapy – retreatment, additional canal' },
      { code: '441', description: 'Apicectomy – anterior' },
      { code: '442', description: 'Apicectomy – premolar' },
      { code: '443', description: 'Apicectomy – molar' },
      { code: '451', description: 'Splinting – per tooth' },
      { code: '452', description: 'Splinting – per arch' },
      { code: '461', description: 'Perforation repair' },
      { code: '471', description: 'Obturation – per canal (complex)' },
      { code: '481', description: 'Root canal treatment – primary tooth' },
      { code: '491', description: 'Other endodontic procedure' },
    ],
  },
  {
    id: 'restorative',
    name: 'Restorative',
    range: '511–599',
    tailwind: {
      header: 'bg-rose-800',
      badge: 'bg-rose-100 text-rose-800',
      border: 'border-rose-300',
      tag: 'bg-rose-50 text-rose-800 ring-rose-200',
      dot: 'bg-rose-800',
    },
    codes: [
      { code: '511', description: 'Acid etch procedure' },
      { code: '512', description: 'Liner and/or base application' },
      { code: '514', description: 'Occlusal adjustment – minor' },
      { code: '515', description: 'Occlusal adjustment – per visit (complex)' },
      { code: '521', description: 'Amalgam restoration – one surface' },
      { code: '522', description: 'Amalgam restoration – two surfaces' },
      { code: '523', description: 'Amalgam restoration – three surfaces' },
      { code: '524', description: 'Amalgam restoration – four or more surfaces' },
      { code: '531', description: 'Composite resin restoration – one surface, anterior' },
      { code: '532', description: 'Composite resin restoration – two or more surfaces, anterior' },
      { code: '533', description: 'Composite resin restoration – one surface, posterior' },
      { code: '534', description: 'Composite resin restoration – two surfaces, posterior' },
      { code: '535', description: 'Composite resin restoration – three or more surfaces, posterior' },
      { code: '536', description: 'Composite resin restoration – adhesive, complex' },
      { code: '537', description: 'Composite resin restoration – cervical erosion/abrasion' },
      { code: '541', description: 'Gold inlay – one surface' },
      { code: '542', description: 'Gold inlay – two surfaces' },
      { code: '543', description: 'Gold inlay – three or more surfaces' },
      { code: '545', description: 'Gold onlay – per tooth' },
      { code: '546', description: 'Porcelain inlay/onlay – per tooth' },
      { code: '547', description: 'Composite resin inlay/onlay – per tooth' },
      { code: '551', description: 'Crown – full cast metal' },
      { code: '552', description: 'Crown – 3/4 cast metal' },
      { code: '554', description: 'Crown – porcelain fused to metal' },
      { code: '555', description: 'Crown – porcelain fused to metal (precious metal)' },
      { code: '556', description: 'Crown – full porcelain/ceramic' },
      { code: '557', description: 'Crown – full resin' },
      { code: '558', description: 'Crown – replacement' },
      { code: '559', description: 'Crown – provisional' },
      { code: '561', description: 'Pin retention – per pin' },
      { code: '562', description: 'Core build-up, including any pins' },
      { code: '563', description: 'Core build-up – cast metal' },
      { code: '571', description: 'Veneer – direct composite resin' },
      { code: '572', description: 'Veneer – indirect porcelain' },
      { code: '573', description: 'Veneer – indirect composite resin' },
      { code: '578', description: 'Re-cementation of crown' },
      { code: '579', description: 'Re-cementation of inlay or onlay' },
      { code: '581', description: 'Temporary or sedative restoration' },
      { code: '582', description: 'Re-restoration of previously filled tooth' },
      { code: '591', description: 'Other restorative procedure' },
    ],
  },
  {
    id: 'prosthodontics-removable',
    name: 'Prosthodontics – Removable',
    range: '611–699',
    tailwind: {
      header: 'bg-amber-500',
      badge: 'bg-amber-100 text-amber-700',
      border: 'border-amber-200',
      tag: 'bg-amber-50 text-amber-700 ring-amber-200',
      dot: 'bg-amber-500',
    },
    codes: [
      { code: '611', description: 'Removable partial denture – acrylic base' },
      { code: '612', description: 'Removable partial denture – each additional tooth' },
      { code: '613', description: 'Removable partial denture – metal framework' },
      { code: '614', description: 'Removable partial denture – flexible base' },
      { code: '615', description: 'Removable partial denture – valplast or similar' },
      { code: '616', description: 'Removable partial denture – implant assisted' },
      { code: '621', description: 'Complete denture – maxillary' },
      { code: '622', description: 'Complete denture – mandibular' },
      { code: '623', description: 'Immediate denture – per arch' },
      { code: '624', description: 'Complete denture – copy technique' },
      { code: '625', description: 'Duplicate denture' },
      { code: '631', description: 'Denture adjustment' },
      { code: '632', description: 'Denture repair – simple' },
      { code: '633', description: 'Denture repair – complex' },
      { code: '634', description: 'Denture – addition of tooth' },
      { code: '635', description: 'Denture – addition of clasp' },
      { code: '636', description: 'Denture relining – chairside' },
      { code: '637', description: 'Denture relining – laboratory' },
      { code: '638', description: 'Denture rebasing – laboratory' },
      { code: '641', description: 'Overdenture – per arch' },
      { code: '643', description: 'Overdenture – attachment per tooth or implant' },
      { code: '645', description: 'Removable implant retained overdenture' },
      { code: '651', description: 'Obturator – per appliance' },
      { code: '661', description: 'Occlusal splint – hard' },
      { code: '663', description: 'Occlusal splint – soft' },
      { code: '664', description: 'Occlusal splint – dual laminate' },
      { code: '671', description: 'Transitional partial denture' },
      { code: '691', description: 'Other removable prosthodontic procedure' },
    ],
  },
  {
    id: 'prosthodontics-fixed',
    name: 'Prosthodontics – Fixed',
    range: '711–799',
    tailwind: {
      header: 'bg-yellow-600',
      badge: 'bg-yellow-100 text-yellow-800',
      border: 'border-yellow-300',
      tag: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
      dot: 'bg-yellow-600',
    },
    codes: [
      { code: '711', description: 'Fixed partial denture – pontic – cast metal' },
      { code: '712', description: 'Fixed partial denture – pontic – porcelain fused to metal' },
      { code: '713', description: 'Fixed partial denture – pontic – full porcelain/ceramic' },
      { code: '714', description: 'Fixed partial denture – pontic – resin bonded' },
      { code: '715', description: 'Fixed partial denture – pontic – full resin' },
      { code: '721', description: 'Fixed partial denture – retainer – cast metal crown' },
      { code: '722', description: 'Fixed partial denture – retainer – porcelain fused to metal' },
      { code: '723', description: 'Fixed partial denture – retainer – full porcelain/ceramic' },
      { code: '724', description: 'Fixed partial denture – retainer – gold inlay/onlay' },
      { code: '725', description: 'Fixed partial denture – retainer – resin bonded' },
      { code: '731', description: 'Fixed partial denture – provisional' },
      { code: '741', description: 'Fixed partial denture – recementation' },
      { code: '751', description: 'Post and core – prefabricated metal' },
      { code: '752', description: 'Post and core – cast metal' },
      { code: '753', description: 'Post and core – fibre reinforced resin' },
      { code: '761', description: 'Crown – Maryland type bridge retainer' },
      { code: '771', description: 'Fixed partial denture – implant-supported pontic' },
      { code: '772', description: 'Fixed partial denture – implant-supported retainer crown' },
      { code: '791', description: 'Other fixed prosthodontic procedure' },
    ],
  },
  {
    id: 'orthodontics',
    name: 'Orthodontics',
    range: '811–899',
    tailwind: {
      header: 'bg-pink-500',
      badge: 'bg-pink-100 text-pink-700',
      border: 'border-pink-200',
      tag: 'bg-pink-50 text-pink-600 ring-pink-200',
      dot: 'bg-pink-500',
    },
    codes: [
      { code: '811', description: 'Orthodontic consultation' },
      { code: '812', description: 'Orthodontic records' },
      { code: '813', description: 'Treatment planning' },
      { code: '814', description: 'Orthodontic progress review' },
      { code: '821', description: 'Removable appliance – simple' },
      { code: '822', description: 'Removable appliance – moderate' },
      { code: '823', description: 'Removable appliance – complex' },
      { code: '824', description: 'Functional appliance – simple' },
      { code: '825', description: 'Functional appliance – complex' },
      { code: '826', description: 'Extra-oral appliance (headgear) – per fitting' },
      { code: '831', description: 'Fixed appliance – per arch (initial placement)' },
      { code: '832', description: 'Fixed appliance – per arch (activation)' },
      { code: '833', description: 'Fixed appliance – full treatment (both arches)' },
      { code: '835', description: 'Fixed appliance – sectional' },
      { code: '841', description: 'Orthodontic band – per tooth' },
      { code: '842', description: 'Orthodontic bracket – bonded, per tooth' },
      { code: '843', description: 'Orthodontic wire – per arch' },
      { code: '844', description: 'Orthodontic auxiliaries' },
      { code: '845', description: 'Clear aligner – full treatment' },
      { code: '846', description: 'Clear aligner – per arch per stage' },
      { code: '851', description: 'Retainer – removable, per arch' },
      { code: '852', description: 'Retainer – fixed/bonded, per arch' },
      { code: '853', description: 'Retainer – replacement or repair' },
      { code: '861', description: 'Interceptive orthodontics' },
      { code: '862', description: 'Space maintainer – fixed' },
      { code: '863', description: 'Space maintainer – removable' },
      { code: '871', description: 'Orthognathic surgery – orthodontic component' },
      { code: '891', description: 'Other orthodontic procedure' },
    ],
  },
  {
    id: 'implants',
    name: 'Implants',
    range: '688–688 / 731–777',
    tailwind: {
      header: 'bg-sky-600',
      badge: 'bg-sky-100 text-sky-700',
      border: 'border-sky-200',
      tag: 'bg-sky-50 text-sky-600 ring-sky-200',
      dot: 'bg-sky-500',
    },
    codes: [
      { code: '011', description: 'Implant examination / consultation' },
      { code: '681', description: 'Implant placement – per implant' },
      { code: '682', description: 'Implant – second stage surgery (uncovering)' },
      { code: '683', description: 'Implant – bone grafting per site' },
      { code: '684', description: 'Implant – sinus augmentation/lift' },
      { code: '685', description: 'Implant – guided bone regeneration, per site' },
      { code: '686', description: 'Implant – abutment placement' },
      { code: '687', description: 'Implant – abutment replacement' },
      { code: '688', description: 'Implant maintenance – per visit' },
      { code: '731', description: 'Implant crown – cast metal (screw retained)' },
      { code: '732', description: 'Implant crown – porcelain fused to metal' },
      { code: '733', description: 'Implant crown – full porcelain/zirconia' },
      { code: '771', description: 'Implant-supported fixed partial denture – pontic' },
      { code: '772', description: 'Implant-supported fixed partial denture – retainer' },
      { code: '777', description: 'Implant-supported prosthesis – full arch' },
    ],
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    range: '961–999',
    tailwind: {
      header: 'bg-slate-600',
      badge: 'bg-slate-100 text-slate-700',
      border: 'border-slate-200',
      tag: 'bg-slate-50 text-slate-600 ring-slate-200',
      dot: 'bg-slate-500',
    },
    codes: [
      { code: '961', description: 'Treatment under general anaesthesia – per visit' },
      { code: '962', description: 'Domiciliary visit' },
      { code: '963', description: 'Hospital visit' },
      { code: '964', description: 'After-hours attendance' },
      { code: '965', description: 'Sterilisation of instruments' },
      { code: '971', description: 'Report – written (short)' },
      { code: '972', description: 'Report – written (long)' },
      { code: '973', description: 'Medical certificate' },
      { code: '974', description: 'Referral letter' },
      { code: '975', description: 'Insurance claim form completion' },
      { code: '976', description: 'Communication – written, extended' },
      { code: '981', description: 'Removal of sutures' },
      { code: '982', description: 'Tissue conditioning' },
      { code: '983', description: 'Repair of tooth/teeth – trauma, per tooth' },
      { code: '984', description: 'Reattachment of tooth fragment' },
      { code: '985', description: 'Interim therapeutic restoration' },
      { code: '991', description: 'Recall visit' },
      { code: '992', description: 'Review appointment' },
      { code: '993', description: 'Emergency consultation' },
      { code: '994', description: 'Telephone consultation' },
      { code: '999', description: 'Other service' },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

const TOTAL_CODES = ADA_CATEGORIES.reduce((sum, cat) => sum + cat.codes.length, 0);

export default function ADACodesPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCategories = useMemo(() => {
    const q = query.toLowerCase().trim();
    return ADA_CATEGORIES
      .filter((cat) => activeCategory === 'all' || cat.id === activeCategory)
      .map((cat) => {
        if (!q) return cat;
        const filteredCodes = cat.codes.filter(
          (c) => c.code.includes(q) || c.description.toLowerCase().includes(q)
        );
        // Also keep category if its name matches, showing all codes in it
        if (cat.name.toLowerCase().includes(q)) return cat;
        return filteredCodes.length > 0 ? { ...cat, codes: filteredCodes } : null;
      })
      .filter(Boolean);
  }, [query, activeCategory]);

  const totalVisible = filteredCategories.reduce((sum, cat) => sum + cat.codes.length, 0);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">ADA Codes</h1>
        <p className="text-sm text-gray-400 mt-1">
          Australian Dental Association Schedule of Dental Services – 13th Edition (2022) · {TOTAL_CODES} codes across {ADA_CATEGORIES.length} categories
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by code or description…"
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 bg-white outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
            activeCategory === 'all'
              ? 'bg-gray-800 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All categories
        </button>
        {ADA_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(activeCategory === cat.id ? 'all' : cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeCategory === cat.id
                ? `${cat.tailwind.header} text-white`
                : `${cat.tailwind.badge} hover:opacity-80`
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Results count when searching */}
      {query && (
        <p className="text-xs text-gray-400 mb-4">
          {totalVisible} code{totalVisible !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Category cards */}
      {filteredCategories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <Search size={32} className="mx-auto mb-3 opacity-30" />
          <p className="text-sm">No codes match your search.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filteredCategories.map((cat) => (
            <div
              key={cat.id}
              className={`rounded-xl border ${cat.tailwind.border} overflow-hidden shadow-sm`}
            >
              {/* Card header */}
              <div className={`${cat.tailwind.header} px-5 py-3 flex items-center justify-between`}>
                <div>
                  <h2 className="text-sm font-semibold text-white">{cat.name}</h2>
                  <p className="text-xs text-white/70 mt-0.5">Items {cat.range}</p>
                </div>
                <span className="text-xs font-medium text-white/80 bg-white/20 px-2.5 py-1 rounded-full">
                  {cat.codes.length} items
                </span>
              </div>

              {/* Code list */}
              <div className="bg-white divide-y divide-gray-50">
                {cat.codes.map(({ code, description }) => (
                  <div key={code} className="flex items-center gap-4 px-5 py-2.5 hover:bg-gray-50 transition-colors">
                    <span className={`shrink-0 font-mono text-xs font-semibold px-2 py-0.5 rounded ring-1 ${cat.tailwind.tag}`}>
                      {code}
                    </span>
                    <span className="text-sm text-gray-700">{description}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
