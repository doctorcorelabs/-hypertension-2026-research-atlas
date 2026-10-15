// Estimates are transcribed as reported; the global table is not recalculated.
// age: mean years; female and serious: percentages of reports, not incidence.
// ic: Bayesian information component lower bound (IC025), not the point estimate.
// source: 'abstract' only for an explicitly reported estimate of this type.
// Onset median, IQR, bootstrap 95% CI, and alpha are in days; beta is unitless.
window.ATLAS_DATA = {
  funnel: { raw: 7519, stage1: 7431, unique: 6601, removed1: 88, removed2: 830 },
  drugs: [
    {
      id: 'fin',
      name: 'Finerenone',
      short: 'Finerenone',
      className: 'Non-steroidal mineralocorticoid receptor antagonist',
      n: 1639,
      color: '#c5ef6b',
      mechanism: 'Mineralocorticoid receptor antagonism can reduce renal potassium excretion. Its non-steroidal structure and receptor selectivity provide a pharmacological rationale for fewer sex-hormone receptor interactions; spontaneous reports cannot establish this mechanism.',
      interpretation: 'The global table reports hyperkalemia and renal impairment disproportionality without an elevated endocrine signal. Hyperkalemia reporting odds were lower than with spironolactone (ROR 0.68), which does not establish lower clinical risk or causality.',
      caution: 'Chronic kidney disease as an indication may confound the renal impairment signal. No elevated endocrine signal does not mean no endocrine events: 12 reports were recorded.',
      age: 67.8,
      female: 34.3,
      serious: 23.9,
      axis: 'Potassium',
      refs: { mechanism: [17, 24], interpretation: [], caution: [17] }
    },
    {
      id: 'spiro',
      name: 'Spironolactone',
      short: 'Spironolactone',
      className: 'First-generation steroidal mineralocorticoid receptor antagonist',
      n: 258,
      color: '#ff9e7a',
      mechanism: 'Mineralocorticoid receptor blockade can reduce potassium excretion. Interactions with androgen and other steroid hormone receptors offer a plausible rationale for endocrine or antiandrogenic complaints, but FAERS cannot demonstrate the mechanism in individual reports.',
      interpretation: 'Endocrine (ROR 10.85), hyperkalemia (ROR 4.53), and hypotension (ROR 1.63) reporting disproportionality was observed. Differences in reporting odds do not establish causation or a clinical safety ranking.',
      caution: 'The endocrine signal rests on 14 reports, with onset dates available for only 5. The whole-group serious outcome percentage (66.7%) is distinct from the hyperkalemia subset percentage.',
      age: 65.3,
      female: 50.4,
      serious: 66.7,
      axis: 'Hormones',
      refs: { mechanism: [26], interpretation: [], caution: [] }
    },
    {
      id: 'eple',
      name: 'Eplerenone',
      short: 'Eplerenone',
      className: 'Second-generation steroidal mineralocorticoid receptor antagonist',
      n: 347,
      color: '#c4afff',
      mechanism: 'Mineralocorticoid receptor antagonism can still reduce potassium excretion. Greater selectivity for mineralocorticoid receptors over sex-hormone receptors provides a rationale for fewer endocrine interactions, not a guarantee of their absence.',
      interpretation: 'The global table reports hyperkalemia (ROR 1.58) and endocrine (ROR 3.18) signals without elevated hypotension reporting. Head-to-head hyperkalemia and endocrine reporting odds were lower than with spironolactone; these findings are noncausal.',
      caution: 'The endocrine signal includes only 7 reports and a wide confidence interval. Differences in indications, renal function, and concomitant medications may confound comparisons.',
      age: 69.1,
      female: 32.6,
      serious: 56.5,
      axis: 'Potassium',
      refs: { mechanism: [26], interpretation: [], caution: [] }
    },
    {
      id: 'arni',
      name: 'Sacubitril/Valsartan',
      short: 'ARNI',
      className: 'Angiotensin receptor-neprilysin inhibitor',
      n: 1061,
      color: '#73d5df',
      mechanism: 'Neprilysin inhibition by sacubitril and AT1 receptor blockade by valsartan can enhance vasodilation and lower blood pressure. Reduced bradykinin degradation provides a plausible rationale for angioedema, not a confirmed explanation for every report.',
      interpretation: 'Hypotension or hemodynamic disturbance (ROR 6.06) and angioedema (ROR 3.33) disproportionality was reported. Hyperkalemia reporting odds below one against the global background do not establish clinical protection.',
      caution: 'The pressure endpoint includes hypotension, syncope, and postural symptoms, not only confirmed orthostatic hypotension. Heart failure and concomitant therapies may confound the findings.',
      age: 68.0,
      female: 29.2,
      serious: 27.6,
      axis: 'Perfusion',
      refs: { mechanism: [30, 33], interpretation: [], caution: [30] }
    },
    {
      id: 'apro',
      name: 'Aprocitentan',
      short: 'Aprocitentan',
      className: 'Dual endothelin receptor antagonist - sentinel',
      n: 17,
      color: '#f2cc78',
      mechanism: 'ETA and ETB endothelin receptor blockade can affect vascular tone and renal sodium and fluid regulation. Fluid retention or edema has a plausible pharmacological basis, but its specific mechanism cannot be inferred from spontaneous reports.',
      interpretation: 'Six of 17 reports included peripheral edema or fluid retention, with ROR 9.00 and a wide confidence interval. This is a hypothesis-generating sentinel observation, not confirmation of risk or causality.',
      caution: 'The cohort is very small (17 reports); zero hyperkalemia or endocrine reports does not establish safety. Edema onset was available for only 3 reports, with no usable bootstrap CI or Weibull parameters in the source.',
      age: 63.2,
      female: 41.2,
      serious: 23.5,
      axis: 'Fluid',
      refs: { mechanism: [37, 41], interpretation: [37], caution: [] }
    }
  ],
  signals: [
    { drug: 'fin', endpoint: 'potassium', label: 'Hyperkalemia', ror: 5.47, lo: 4.51, hi: 6.62, cases: 291, prr: 4.67, ic: 1.08, q: '< 0.001', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'fin', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', ror: 1.03, lo: 0.54, hi: 1.99, cases: 12, prr: 1.03, ic: -0.84, q: '1.000', source: 'abstract', sentinel: false , refs: [] },
    { drug: 'fin', endpoint: 'pressure', label: 'Hypotension/hemodynamic disturbance', ror: 0.41, lo: 0.32, hi: 0.53, cases: 72, prr: 0.44, ic: -1.34, q: '< 0.001', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'fin', endpoint: 'edema', label: 'Peripheral edema/fluid retention', ror: 0.34, lo: 0.24, hi: 0.47, cases: 40, prr: 0.36, ic: -1.71, q: '< 0.001', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'fin', endpoint: 'renal', label: 'Renal function impairment', ror: 4.60, lo: 3.92, hi: 5.39, cases: 396, prr: 3.73, ic: 0.97, q: '< 0.001', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'spiro', endpoint: 'potassium', label: 'Hyperkalemia', ror: 4.53, lo: 3.35, hi: 6.12, cases: 62, prr: 3.68, ic: 1.32, q: '< 0.001', source: 'abstract', sentinel: false , refs: [] },
    { drug: 'spiro', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', ror: 10.85, lo: 5.75, hi: 20.48, cases: 14, prr: 10.31, ic: 2.08, q: '< 0.001', source: 'abstract', sentinel: false , refs: [26] },
    { drug: 'spiro', endpoint: 'pressure', label: 'Hypotension/hemodynamic disturbance', ror: 1.63, lo: 1.13, hi: 2.36, cases: 34, prr: 1.55, ic: 0.09, q: '0.026', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'spiro', endpoint: 'edema', label: 'Peripheral edema/fluid retention', ror: 0.93, lo: 0.54, hi: 1.61, cases: 14, prr: 0.94, ic: -0.83, q: '1.000', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'eple', endpoint: 'potassium', label: 'Hyperkalemia', ror: 1.58, lo: 1.11, hi: 2.25, cases: 37, prr: 1.52, ic: 0.08, q: '0.026', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'eple', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', ror: 3.18, lo: 1.42, hi: 7.14, cases: 7, prr: 3.14, ic: 0.45, q: '0.023', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'eple', endpoint: 'pressure', label: 'Hypotension/hemodynamic disturbance', ror: 0.96, lo: 0.65, hi: 1.41, cases: 29, prr: 0.96, ic: -0.59, q: '1.000', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'arni', endpoint: 'potassium', label: 'Hyperkalemia', ror: 0.50, lo: 0.36, hi: 0.69, cases: 43, prr: 0.52, ic: -1.27, q: '< 0.001', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'arni', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', ror: 0.48, lo: 0.17, hi: 1.35, cases: 4, prr: 0.49, ic: -2.18, q: '0.383', source: 'manuscript', sentinel: false , refs: [] },
    { drug: 'arni', endpoint: 'pressure', label: 'Hypotension/hemodynamic disturbance', ror: 6.06, lo: 5.06, hi: 7.24, cases: 275, prr: 4.75, ic: 1.35, q: '< 0.001', source: 'abstract', sentinel: false , refs: [30] },
    { drug: 'arni', endpoint: 'angioedema', label: 'Angioedema', ror: 3.33, lo: 2.05, hi: 5.40, cases: 27, prr: 3.27, ic: 0.63, q: '< 0.001', source: 'abstract', sentinel: false , refs: [33] },
    { drug: 'apro', endpoint: 'edema', label: 'Peripheral edema/fluid retention', ror: 9.00, lo: 3.31, hi: 24.46, cases: 6, prr: 6.18, ic: 1.34, q: '< 0.001', source: 'abstract', sentinel: true , refs: [37] },
    { drug: 'apro', endpoint: 'potassium', label: 'Hyperkalemia', ror: 0.38, lo: 0.02, hi: 6.30, cases: 0, prr: 0.40, ic: -5.43, q: '0.821', source: 'manuscript', sentinel: true , refs: [] },
    { drug: 'apro', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', ror: 4.08, lo: 0.24, hi: 68.86, cases: 0, prr: 3.99, ic: -2.14, q: '1.000', source: 'manuscript', sentinel: true , refs: [] }
  ],
  comparisons: [
    { target: 'fin', comparator: 'spiro', endpoint: 'potassium', label: 'Hyperkalemia reporting odds', ror: 0.68, lo: 0.50, hi: 0.93, p: '0.017', source: 'abstract' , refs: [] },
    { target: 'fin', comparator: 'spiro', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic reporting odds', ror: 0.13, lo: 0.06, hi: 0.28, p: '< 0.001', source: 'manuscript' , refs: [] },
    { target: 'fin', comparator: 'spiro', endpoint: 'pressure', label: 'Hypotension/hemodynamic reporting odds', ror: 0.30, lo: 0.20, hi: 0.47, p: '< 0.001', source: 'manuscript' , refs: [] },
    { target: 'fin', comparator: 'eple', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic reporting odds', ror: 0.36, lo: 0.14, hi: 0.92, p: null, source: 'manuscript' , refs: [] },
    { target: 'fin', comparator: 'arni', endpoint: 'pressure', label: 'Hypotension/hemodynamic reporting odds', ror: 0.13, lo: 0.10, hi: 0.17, p: '< 0.001', source: 'manuscript' , refs: [] },
    { target: 'fin', comparator: 'arni', endpoint: 'angioedema', label: 'Angioedema reporting odds', ror: 0.21, lo: 0.10, hi: 0.45, p: null, source: 'manuscript' , refs: [] },
    { target: 'spiro', comparator: 'eple', endpoint: 'potassium', label: 'Hyperkalemia reporting odds', ror: 2.65, lo: 1.70, hi: 4.14, p: '< 0.001', source: 'manuscript' , refs: [] },
    { target: 'spiro', comparator: 'eple', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic reporting odds', ror: 2.79, lo: 1.11, hi: 7.01, p: '0.029', source: 'manuscript' , refs: [] }
  ],
  onset: [
    { drug: 'fin', endpoint: 'potassium', label: 'Hyperkalemia', median: 95, iqr: [55, 148], ci: [67, 120], n: 57, total: 291, beta: 1.432, alpha: 125.2 , refs: [9] },
    { drug: 'spiro', endpoint: 'potassium', label: 'Hyperkalemia', median: 91, iqr: null, ci: [55.5, 239], n: 12, total: 62, beta: 1.416, alpha: 161.2 , refs: [9] },
    { drug: 'spiro', endpoint: 'endocrine', label: 'Endocrine/antiandrogenic disorders', median: 123, iqr: null, ci: [78, 363], n: 5, total: 14, beta: 1.864, alpha: 199.5 , refs: [9] },
    { drug: 'arni', endpoint: 'pressure', label: 'Hypotension/hemodynamic disturbance', median: 68, iqr: [24, 123.5], ci: [41, 79], n: 135, total: 275, beta: 1.171, alpha: 86.8 , refs: [9] },
    { drug: 'apro', endpoint: 'edema', label: 'Peripheral edema/fluid retention', median: 152, iqr: [100.5, 212.5], ci: null, n: 3, total: 6, beta: null, alpha: null , refs: [] }
  ],
  caveats: [
    'FAERS contains spontaneous safety reports, not an exposed-population denominator. Reporting odds ratios and report percentages do not estimate incidence, absolute risk, treatment efficacy, or causality.',
    'The extraction does not establish a confirmed resistant-hypertension-specific cohort. Findings across these drug reports should not be presented as proven safety effects in resistant hypertension.',
    'Confounding by indication, especially chronic kidney disease for finerenone and heart failure for sacubitril/valsartan, as well as concomitant treatments and reporting differences, may influence comparisons.',
    'Aprocitentan has only 17 unique reports and 0-6 cases per endpoint. All its estimates are sentinel and exploratory; wide intervals and zero observed events do not establish absence of risk.',
    'Manuscript denominators are inconsistent: the five compendium drug groups total 3,322 reports versus 3,469 stated target and comparator exposures; Table 2 contingency-table totals imply 6,719 versus the stated 6,601 unique-case cohort. Do not recalculate the global table; all estimates are preserved as reported.',
    'Table 2 reports an aprocitentan endocrine ROR of 4.08 with zero cases, whereas the results narrative states ROR 0.00. The compendium preserves Table 2, including its wide interval and no elevated signal.',
    'For aprocitentan edema, the results narrative identifies 100.5-212.5 days as an IQR, but Table 5 places the same range under its bootstrap CI heading. The compendium represents this range only as an IQR, with ci, beta, and alpha set to null.',
    'Onset analyses use only reports with valid dates and restrict time to onset to 0-365 days. Small selected subsets and missing dates limit generalizability; Weibull fits do not establish population hazards or cumulative toxicity.',
    'Pressure, endocrine, potassium, and edema endpoints pool multiple MedDRA terms. Labels must not imply that all reports had confirmed orthostatic hypotension, gynecomastia, or a single clinical diagnosis.',
    'The ic field stores IC025, the lower confidence bound of the Bayesian information component. A statistically significant inverse reporting association is not evidence of clinical protection, and no elevated signal does not imply no events.',
    'Head-to-head estimates use Table 3 rounding. Reported p-values are taken from Table 3 or the accompanying results text; unreported p-values remain null. Only finerenone versus spironolactone hyperkalemia is explicitly reported as a numerical head-to-head estimate in the abstract.'
  ]
};
