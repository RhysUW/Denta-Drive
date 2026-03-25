/**
 * Cardiovascular drug reference data.
 * Used by:
 *  - MedicationsPage (reference table)
 *  - PatientForm TagInput (medication autocomplete suggestions)
 *
 * To add more drug classes in future, append entries to this array.
 * The `drugs` array drives autocomplete — each entry is a searchable drug name.
 */
const medicationsData = [
  {
    drugs: ['Captopril', 'Enalapril', 'Fosinopril', 'Lisinopril', 'Perindopril', 'Quinapril', 'Ramipril', 'Trandolapril'],
    drugClass: 'ACE Inhibitors',
    mechanism: 'Block conversion of angiotensin I to angiotensin II and inhibit breakdown of bradykinin, reducing vasoconstriction and lowering blood pressure.',
    purpose: 'Hypertension and other cardiovascular states where lowering blood pressure and reducing RAAS activity is useful.',
    sideEffects: 'Hypotension, orthostatic hypotension, angioedema, neutropenia, dysgeusia, burning mouth syndrome, dry mouth, oral lichenoid reactions.',
    dentalConsiderations: 'Monitor blood pressure, especially during sedation, GA, and positional changes. Sit patient upright slowly before standing. Be alert for angioedema involving lips, face, or tongue. Delay treatment if signs of infection and neutropenia is suspected; request white cell count if needed. Dry mouth increases caries and infection risk. Lichenoid reactions may need trauma minimisation and prosthesis adjustment.',
    drugInteractions: 'Quinapril with tetracyclines: separate doses by 2 hours. Prolonged NSAID use can reduce ACE inhibitor efficacy and increase renal risk. Paracetamol is preferred.',
  },
  {
    drugs: ['Candesartan', 'Irbesartan', 'Losartan', 'Olmesartan', 'Telmisartan', 'Valsartan'],
    drugClass: 'Angiotensin II Receptor Blockers (ARBs)',
    mechanism: 'Competitively block binding of angiotensin II to type 1 angiotensin receptors, reducing vasoconstriction and lowering blood pressure.',
    purpose: 'Hypertension and related cardiovascular conditions requiring RAAS blockade.',
    sideEffects: 'Hypotension (mainly relevant during GA and similar settings).',
    dentalConsiderations: 'Be cautious with blood pressure reduction during treatment and patient positioning.',
    drugInteractions: 'NSAIDs may increase risk of hyperkalaemia and reduce renal function.',
  },
  {
    drugs: ['Hydrochlorothiazide', 'Chlorthalidone', 'Indapamide'],
    drugClass: 'Thiazide and Related Diuretics',
    mechanism: 'Inhibit reabsorption of sodium and chloride in the nephron, increasing diuresis and helping lower blood pressure.',
    purpose: 'Hypertension and fluid-related cardiovascular conditions.',
    sideEffects: 'Renal concerns with interacting drugs.',
    dentalConsiderations: 'Watch for possible dehydration-related oral dryness clinically. Renal interaction risk.',
    drugInteractions: 'NSAIDs may reduce renal function.',
  },
  {
    drugs: ['Amiloride', 'Triamterene'],
    drugClass: 'Potassium-Sparing Diuretics',
    mechanism: 'Inhibit reabsorption of sodium in the distal tubule, promoting diuresis while conserving potassium.',
    purpose: 'Hypertension and fluid-related cardiovascular conditions when potassium conservation is desirable.',
    sideEffects: 'Dry mouth; risk of hyperkalaemia highlighted through interaction risk.',
    dentalConsiderations: 'Dry mouth increases caries risk and risk of oral infection.',
    drugInteractions: 'NSAIDs may increase risk of hyperkalaemia and reduce renal function.',
  },
  {
    drugs: ['Amlodipine', 'Clevidipine', 'Felodipine', 'Lercanidipine', 'Nifedipine', 'Nimodipine', 'Diltiazem', 'Verapamil'],
    drugClass: 'Calcium Channel Blockers',
    mechanism: 'Block L-type calcium channels and inward calcium current into cells. In vascular smooth muscle this reduces contraction and causes vasodilation. In the heart it can reduce heart rate, myocardial contractility, and AV conduction.',
    purpose: 'Hypertension, angina, and arrhythmias. Dihydropyridines (amlodipine, nifedipine) mainly act on blood vessels. Non-dihydropyridines (verapamil, diltiazem) also act on the heart and rhythm control.',
    sideEffects: 'Gingival hyperplasia, taste disturbance, exfoliative dermatitis, angioedema, reduced heart rate, reduced contractility, and reduced AV conduction.',
    dentalConsiderations: 'Gingival hyperplasia is an important oral side effect — assess gingival enlargement carefully. Taste disturbance and angioedema may affect patient comfort and safety. Always aspirate when giving local anaesthetic.',
    drugInteractions: 'Except for clevidipine, calcium channel blockers are linked with CYP3A4 inhibition issues. Diltiazem and verapamil with erythromycin may cause QT prolongation.',
  },
  {
    drugs: ['Atenolol', 'Bisoprolol', 'Metoprolol', 'Nebivolol'],
    drugClass: 'Cardioselective Beta Blockers (Beta-1 Selective)',
    mechanism: 'Block beta-1 receptors, reducing heart rate, contractility, cardiac output, and renin release, suppressing RAAS and lowering blood pressure.',
    purpose: 'Hypertension and other cardiovascular conditions where lowering heart rate and cardiac workload is beneficial.',
    sideEffects: 'Orthostatic hypotension, xerostomia, dysgeusia, oral lichenoid reactions, negative chronotropic and inotropic effects.',
    dentalConsiderations: 'Sit the patient up slowly after treatment because of orthostatic hypotension risk. Xerostomia increases caries and infection risk. Dysgeusia may alter taste perception. Oral lichenoid reactions may require referral if persistent.',
    drugInteractions: '',
  },
  {
    drugs: ['Propranolol'],
    drugClass: 'Non-Selective Beta Blocker',
    mechanism: 'Blocks both beta-1 and beta-2 receptors, lowering heart rate and contractility but also increasing peripheral vasoconstriction and bronchoconstriction due to beta-2 blockade.',
    purpose: 'Hypertension and other cardiovascular uses requiring beta blockade.',
    sideEffects: 'Orthostatic hypotension, xerostomia, dysgeusia, oral lichenoid reactions, bronchoconstriction.',
    dentalConsiderations: 'Use caution in patients with asthma or COPD because of bronchoconstriction risk. Sit patient up slowly after treatment. Monitor for dry mouth and lichenoid reactions.',
    drugInteractions: '',
  },
  {
    drugs: ['Carvedilol', 'Labetalol'],
    drugClass: 'Mixed Alpha- and Beta-Blockers',
    mechanism: 'Block beta-1, beta-2, and alpha-1 receptors, lowering blood pressure through reduced cardiac activity plus vasodilation.',
    purpose: 'Hypertension and cardiovascular states where combined alpha and beta blockade is useful.',
    sideEffects: 'Orthostatic hypotension, xerostomia, dysgeusia, oral lichenoid reactions, enhanced blood pressure lowering via vasodilation.',
    dentalConsiderations: 'Sit patient up slowly after treatment. Monitor oral dryness and possible lichenoid reactions.',
    drugInteractions: '',
  },
  {
    drugs: ['Esmolol'],
    drugClass: 'Injectable Beta Blocker',
    mechanism: 'Beta blockade causing reduced heart rate and reduced cardiac workload.',
    purpose: 'Acute cardiovascular control in monitored settings.',
    sideEffects: 'Hypotension, bradycardia/cardiac slowing effects.',
    dentalConsiderations: 'Manage with attention to blood pressure and postural change.',
    drugInteractions: '',
  },
  {
    drugs: ['Sotalol'],
    drugClass: 'Antiarrhythmic Beta Blocker',
    mechanism: 'Beta-blocking and antiarrhythmic actions used for rhythm control.',
    purpose: 'Arrhythmias.',
    sideEffects: '',
    dentalConsiderations: 'Manage as a rhythm-control cardiovascular drug with caution around blood pressure and heart rate.',
    drugInteractions: '',
  },
  {
    drugs: ['Glyceryl trinitrate', 'Isosorbide dinitrate', 'Isosorbide mononitrate'],
    drugClass: 'Nitrates',
    mechanism: 'Provide an exogenous source of nitric oxide, producing vasodilation.',
    purpose: 'Angina symptom relief.',
    sideEffects: 'Hypotension (patients advised to sit due to hypotension risk when glyceryl trinitrate is administered).',
    dentalConsiderations: 'If chest pain occurs: stop treatment, measure BP/HR/SpO2, assess consciousness, sit patient down, administer glyceryl trinitrate sublingually. If patient recovers, do not continue dental treatment — refer medically. If pain is severe, new, or persists, call 000 and manage as acute coronary syndrome.',
    drugInteractions: '',
  },
  {
    drugs: ['Ivabradine'],
    drugClass: 'Other Anti-Anginal',
    mechanism: 'Inhibits the current regulating the interval between depolarisations of the SA node.',
    purpose: 'Angina.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
  {
    drugs: ['Nicorandil'],
    drugClass: 'Other Anti-Anginal',
    mechanism: 'Produces venous and arterial dilation, improves myocardial oxygen balance, and decreases angina.',
    purpose: 'Angina.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
  {
    drugs: ['Perhexiline'],
    drugClass: 'Other Anti-Anginal',
    mechanism: 'Unclear mechanism but has anti-ischaemic effects.',
    purpose: 'Angina.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
  {
    drugs: ['Adrenaline', 'Dobutamine', 'Dopamine', 'Isoprenaline', 'Noradrenaline'],
    drugClass: 'Sympathomimetics',
    mechanism: 'Mimic the agonist action of adrenaline and noradrenaline at alpha and/or beta adrenoceptors.',
    purpose: 'Support of cardiovascular function in acute or severe settings.',
    sideEffects: 'Dry mouth.',
    dentalConsiderations: 'Patients need to be stabilised and treated only in a restricted setting under close monitoring.',
    drugInteractions: '',
  },
  {
    drugs: ['Digoxin'],
    drugClass: 'Cardiac Glycoside',
    mechanism: 'Inhibits the sodium-potassium ATPase pump in cardiac myocytes.',
    purpose: 'Heart failure and some rhythm-related indications.',
    sideEffects: 'Narrow therapeutic window with toxicity risk.',
    dentalConsiderations: 'Monitor for toxicity signs and defer treatment if toxicity is suspected.',
    drugInteractions: 'Macrolide antibiotics inhibit digoxin metabolism.',
  },
  {
    drugs: ['Milrinone'],
    drugClass: 'Other Drug for Heart Failure',
    mechanism: '',
    purpose: 'Heart failure.',
    sideEffects: '',
    dentalConsiderations: 'General heart failure dental precautions apply.',
    drugInteractions: '',
  },
  {
    drugs: ['Amiodarone'],
    drugClass: 'Antiarrhythmic',
    mechanism: 'Prolongs refractory period in all cardiac tissue.',
    purpose: 'Arrhythmia control.',
    sideEffects: 'Taste disturbance, skin pigmentation.',
    dentalConsiderations: 'Be aware of altered taste and visible pigmentation changes.',
    drugInteractions: '',
  },
  {
    drugs: ['Disopyramide'],
    drugClass: 'Antiarrhythmic',
    mechanism: 'Prolongs refractory period of myocardial tissue.',
    purpose: 'Arrhythmia control.',
    sideEffects: 'Dry mouth.',
    dentalConsiderations: 'Dry mouth increases caries risk and oral discomfort.',
    drugInteractions: '',
  },
  {
    drugs: ['Statins', 'Bile acid binding resins', 'Nicotinic acid', 'Ezetimibe', 'Fibrates', 'Fish oils'],
    drugClass: 'Lipid-Lowering Drugs',
    mechanism: '',
    purpose: 'Reduce progression of atherosclerosis, improve survival, reduce risk of myocardial infarction and stroke, and prevent pancreatitis in relevant lipid disorders.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
];

export default medicationsData;

/**
 * Flat list of all individual drug names for autocomplete.
 * Import this in PatientForm (or any component needing drug name suggestions).
 */
export const allDrugNames = medicationsData.flatMap((entry) => entry.drugs);
