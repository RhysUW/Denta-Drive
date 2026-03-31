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

  // ─── Haematology ────────────────────────────────────────────────────────────

  {
    drugs: ['Dalteparin', 'Danaparoid', 'Enoxaparin', 'Heparin'],
    drugClass: 'Heparins (Injectable Anticoagulants)',
    mechanism: 'Bind antithrombin III and inactivate clotting factors IIa (thrombin) and Xa.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'Protamine combines with heparin to form a stable inactive complex. NSAIDs increase bleeding risk for antithrombotic therapy in dental practice.',
  },
  {
    drugs: ['Bivalirudin'],
    drugClass: 'Direct Thrombin Inhibitor (Injectable Anticoagulant)',
    mechanism: 'Reversibly inhibits both free and fibrin-bound thrombin.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: '',
  },
  {
    drugs: ['Dabigatran'],
    drugClass: 'Direct Thrombin Inhibitor (Oral Anticoagulant)',
    mechanism: 'Reversibly inhibits both free and fibrin-bound thrombin.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Monitor bleeding during and after procedures. Review medication history for interactions. Be cautious with antibiotics and antifungals. Coordinate with medical providers for safe management. Balance bleeding risk against thromboembolic risk for oral procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'PGP substrate. Macrolides (clarithromycin, erythromycin) and azole antifungals (ketoconazole, itraconazole) increase bleeding risk. Idarucizumab binds dabigatran and its metabolites to form a stable inactive complex.',
  },
  {
    drugs: ['Apixaban'],
    drugClass: 'Factor Xa Inhibitor (Oral Anticoagulant)',
    mechanism: 'Selectively inhibits factor Xa, blocking thrombin production.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Monitor bleeding during and after procedures. Review medication history for interactions. Be cautious with antibiotics and antifungals. Coordinate with medical providers for safe management. Balance bleeding risk against thromboembolic risk for oral procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'PGP substrate. Macrolides (clarithromycin, erythromycin) and azole antifungals (ketoconazole, itraconazole) increase bleeding risk. Andexanet alfa binds apixaban and reduces its action.',
  },
  {
    drugs: ['Fondaparinux'],
    drugClass: 'Factor Xa Inhibitor (Injectable Anticoagulant)',
    mechanism: 'Selectively inhibits factor Xa, blocking thrombin production.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: '',
  },
  {
    drugs: ['Rivaroxaban'],
    drugClass: 'Factor Xa Inhibitor (Oral Anticoagulant)',
    mechanism: 'Selectively inhibits factor Xa, blocking thrombin production.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Monitor bleeding during and after procedures. Review medication history for interactions. Be cautious with antibiotics and antifungals. Coordinate with medical providers for safe management. Balance bleeding risk against thromboembolic risk for oral procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'PGP substrate. Macrolides (clarithromycin, erythromycin) and azole antifungals (ketoconazole, itraconazole) increase bleeding risk. Andexanet alfa binds rivaroxaban and reduces its action.',
  },
  {
    drugs: ['Warfarin'],
    drugClass: 'Vitamin K Antagonist Anticoagulant',
    mechanism: 'Competitively inhibits the vitamin K epoxide reductase complex subunit 1 (VKORC1); inhibits synthesis of vitamin K-dependent clotting factors II, VII, IX, and X.',
    purpose: 'Anticoagulant. Prophylaxis and treatment of venous thromboembolism; ischaemic stroke and TIA; acute coronary syndromes.',
    sideEffects: '',
    dentalConsiderations: 'Dental implications are specifically highlighted for invasive procedures. Interruption only if advised by the medical or general practitioner. Check INR before the procedure and recheck within 24 hours. INR less than 3.5: perform procedure. INR greater than 3.5: defer and refer. Monitor bleeding during and after procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'Aspirin, azoles, dicloxacillin, flucloxacillin, macrolides, metronidazole, NSAIDs, paracetamol, tetracyclines, tramadol. Monitor INR levels and consult with physician.',
  },
  {
    drugs: ['Eptifibatide', 'Tirofiban'],
    drugClass: 'Glycoprotein IIb/IIIa Inhibitors (Antiplatelets)',
    mechanism: 'Occupy glycoprotein IIb/IIIa receptors, prevent binding of fibrinogen to platelets, and block platelet aggregation.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: '',
  },
  {
    drugs: ['Clopidogrel'],
    drugClass: 'P2Y12 Antagonist (Antiplatelet)',
    mechanism: 'Binds to the platelet P2Y12 receptor and inhibits platelet aggregation.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: '',
  },
  {
    drugs: ['Prasugrel'],
    drugClass: 'P2Y12 Antagonist — Prasugrel (Antiplatelet)',
    mechanism: 'Binds to the platelet P2Y12 receptor and inhibits platelet aggregation.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Monitor bleeding during and after procedures. Review medication history for interactions. Be cautious with antibiotics and antifungals. Coordinate with medical providers for safe management. Consider delaying opioids if pain is manageable. Balance bleeding risk against thromboembolic risk for oral procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'Metabolized by CYP3A4. Clarithromycin, erythromycin, and azole antifungals increase bleeding risk. Opioids delay platelet inhibition.',
  },
  {
    drugs: ['Ticagrelor'],
    drugClass: 'P2Y12 Antagonist — Ticagrelor (Antiplatelet)',
    mechanism: 'Binds to the platelet P2Y12 receptor and inhibits platelet aggregation.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Monitor bleeding during and after procedures. Review medication history for interactions. Be cautious with antibiotics and antifungals. Coordinate with medical providers for safe management. Consider delaying opioids if pain is manageable. Balance bleeding risk against thromboembolic risk for oral procedures. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: 'Metabolized by CYP3A4. Clarithromycin, erythromycin, and azole antifungals increase bleeding risk. Opioids delay platelet inhibition.',
  },
  {
    drugs: ['Aspirin'],
    drugClass: 'NSAID Antiplatelet',
    mechanism: 'Irreversibly inhibits cyclooxygenase, inhibits platelet aggregation, and reduces the synthesis of thromboxane A2.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs where possible in dental pain management; use paracetamol instead.',
    drugInteractions: 'Warfarin has a listed interaction with aspirin.',
  },
  {
    drugs: ['Dipyridamole'],
    drugClass: 'Phosphodiesterase Inhibitor Antiplatelet',
    mechanism: 'Inhibits phosphodiesterase, increases platelet cAMP, and inhibits platelet function.',
    purpose: 'Antiplatelet therapy for prophylaxis and treatment of acute coronary syndromes, ischaemic stroke, and TIA.',
    sideEffects: '',
    dentalConsiderations: 'Antithrombotic drug. Balance bleeding risk against thromboembolic risk for oral procedures. Consider specialist referral for high bleeding risk or complex procedures. Advise patient to seek help for persistent, restarting, or concerning bleeding. Avoid NSAIDs; use paracetamol instead.',
    drugInteractions: '',
  },
  {
    drugs: ['Alteplase', 'Tenecteplase'],
    drugClass: 'Thrombolytics / Fibrinolytics',
    mechanism: 'Convert plasminogen to plasmin and catalyse breakdown of fibrin.',
    purpose: 'Acute STEMI; acute ischaemic stroke; acute massive venous thromboembolism in haemodynamically unstable patients.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
  {
    drugs: ['Tranexamic acid'],
    drugClass: 'Haemostatic Agent',
    mechanism: 'Blocks binding of plasminogen and plasmin to fibrin.',
    purpose: 'Drug affecting haemostasis.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: '',
  },
  {
    drugs: ['Vitamin K'],
    drugClass: 'Anticoagulation Reversal Agent — Vitamin K',
    mechanism: 'Reverses the effect of vitamin K antagonists. Essential cofactor in synthesis of clotting factors II, VII, IX, and X, and proteins C and S.',
    purpose: 'Drug affecting haemostasis and reversing anticoagulation due to vitamin K antagonists.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: 'Reverses effect of warfarin and other vitamin K antagonists.',
  },
  {
    drugs: ['Andexanet alfa'],
    drugClass: 'Anticoagulation Reversal Agent — Andexanet Alfa',
    mechanism: 'Binds to apixaban or rivaroxaban and reduces their action.',
    purpose: 'Reversal of anticoagulation.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: 'Acts against apixaban and rivaroxaban.',
  },
  {
    drugs: ['Idarucizumab'],
    drugClass: 'Anticoagulation Reversal Agent — Idarucizumab',
    mechanism: 'Binds with dabigatran and its metabolites to form a stable inactive complex.',
    purpose: 'Reversal of anticoagulation.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: 'Acts against dabigatran.',
  },
  {
    drugs: ['Protamine'],
    drugClass: 'Anticoagulation Reversal Agent — Protamine',
    mechanism: 'Combines with heparin to form a stable inactive complex.',
    purpose: 'Reversal of anticoagulation.',
    sideEffects: '',
    dentalConsiderations: '',
    drugInteractions: 'Acts against heparin.',
  },
  {
    drugs: ['Darbepoetin alfa', 'Epoetin alfa', 'Epoetin beta', 'Methoxy peg-epoetin beta'],
    drugClass: 'Erythropoietin Agonists (Drugs for Anaemia)',
    mechanism: 'Recombinant glycoproteins that bind to erythropoietin receptors on erythroid progenitor cells and stimulate erythropoiesis.',
    purpose: 'Drugs for anaemia.',
    sideEffects: '',
    dentalConsiderations: 'Be aware of oral manifestations of haematopoietic disorders, including pale oral mucosa, glossitis, angular cheilitis, and oral mucositis. Role of the dental professional includes early recognition of oral signs, multidisciplinary management, and awareness of pharmacological implications.',
    drugInteractions: '',
  },
  {
    drugs: ['Folic acid'],
    drugClass: 'Drug for Anaemia — Folic Acid',
    mechanism: 'Required for synthesis of purine and pyrimidine bases (DNA), amino acid metabolism, and normal erythropoiesis.',
    purpose: 'Drug for anaemia.',
    sideEffects: '',
    dentalConsiderations: 'Be aware of oral manifestations of haematopoietic disorders, including pale oral mucosa, glossitis, angular cheilitis, and oral mucositis. Role of the dental professional includes early recognition of oral signs, multidisciplinary management, and awareness of pharmacological implications.',
    drugInteractions: '',
  },
  {
    drugs: ['Iron'],
    drugClass: 'Drug for Anaemia — Iron',
    mechanism: 'Essential element required for the formation of haemoglobin and myoglobin.',
    purpose: 'Drug for anaemia.',
    sideEffects: '',
    dentalConsiderations: 'Be aware of oral manifestations of haematopoietic disorders, including pale oral mucosa, glossitis, angular cheilitis, and oral mucositis. Role of the dental professional includes early recognition of oral signs, multidisciplinary management, and awareness of pharmacological implications.',
    drugInteractions: '',
  },
  {
    drugs: ['Vitamin B12'],
    drugClass: 'Drug for Anaemia — Vitamin B12',
    mechanism: 'Essential for nerve development, nucleic acid synthesis, and normal erythropoiesis.',
    purpose: 'Drug for anaemia.',
    sideEffects: '',
    dentalConsiderations: 'Be aware of oral manifestations of haematopoietic disorders, including pale oral mucosa, glossitis, angular cheilitis, and oral mucositis. Role of the dental professional includes early recognition of oral signs, multidisciplinary management, and awareness of pharmacological implications.',
    drugInteractions: '',
  },
];

export default medicationsData;

// ─── Custom entries (user-added via MedicationsPage) ────────────────────────

const CUSTOM_KEY = 'dentaltrack_medications_custom';

/**
 * Read user customisations from localStorage.
 * Shape: { patches: { [drugClass]: string[] }, newEntries: MedicationEntry[] }
 */
export function getCustomEntries() {
  try {
    return JSON.parse(localStorage.getItem(CUSTOM_KEY) || '{}');
  } catch {
    return {};
  }
}

/** Persist user customisations to localStorage. */
export function saveCustomEntries(data) {
  localStorage.setItem(CUSTOM_KEY, JSON.stringify(data));
}

/**
 * All drug names (static + user-added) for autocomplete.
 * Call as a function so PatientForm always gets the latest custom drugs.
 */
export function getAllDrugNames() {
  const { patches = {}, newEntries = [] } = getCustomEntries();
  const patchedNames = Object.values(patches).flat();
  const newNames = newEntries.flatMap((e) => e.drugs);
  return [...medicationsData.flatMap((e) => e.drugs), ...patchedNames, ...newNames];
}

/**
 * Find the full medication entry for a given drug name.
 * Searches static data (with user patches applied) and user-added new entries.
 * Returns null if no matching entry is found.
 */
export function findEntryForDrug(drugName) {
  const { patches = {}, newEntries = [] } = getCustomEntries();
  const merged = [
    ...medicationsData.map((entry) =>
      patches[entry.drugClass]
        ? { ...entry, drugs: [...entry.drugs, ...patches[entry.drugClass]] }
        : entry
    ),
    ...newEntries,
  ];
  const lower = drugName.toLowerCase();
  return merged.find((entry) =>
    entry.drugs.some((d) => d.toLowerCase() === lower)
  ) ?? null;
}
