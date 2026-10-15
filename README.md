# SIGNAL / COMPENDIUM

An English-language, standalone visual companion to the Comparative Safety in Resistant Hypertension FAERS research project. The site is references-first: a numbered Vancouver-style reference list (43 entries) opens the content, and factual statements carry inline citation markers.

## Open the website

Double-click `index.html`. All charts, assets, and source downloads work locally without a build step, internet connection, or framework.

Alternatively, from this folder run:

```powershell
python -m http.server 8080 --bind 127.0.0.1
```

Then visit **http://127.0.0.1:8080**. Stop the server with Ctrl+C. No API key is required. The website makes no API calls and contains no analytics, trackers, remote fonts, or third-party runtime scripts. Only the explicitly clicked official FDA documentation link leaves the site.

## Experience

- Original conceptual SVG cardiorenal signal network; diagram positions are not quantitative.
- Five keyboard-accessible pathway tabs, drug profiles, and cohort composition.
- Nineteen reported global estimates with interactive logarithmic forest plots, therapy/endpoint filters, abstract-only filtering, accessible data table, and filtered CSV download.
- Eight head-to-head estimates across four selectable comparisons.
- Median-onset timelines with dated-case counts, bootstrap CI versus IQR distinctions, and an explicitly illustrative Weibull explanation.
- Limitations and manuscript consistency notes.
- Responsive layouts, reduced-motion support, skip link, focus styles, semantic HTML, and print styling.

## Source and interpretation

`research-data.js` is the single chart-data source. Values are transcribed from the supplied manuscript and abstract, not recomputed or independently authenticated. The manuscript's global table totals conflict with the stated cohort; all global estimates are therefore labeled **as reported**. Other conflicts are disclosed in the website's provenance notes.

FAERS reporting odds are not incidence or clinical risk. Associations are not causal effects. Aprocitentan findings are exploratory (17 total reports), and absence of reports does not establish safety. This analysis does not establish that each included report meets the clinical definition of resistant hypertension. This site is educational research communication, not prescribing advice.

The original manuscript, abstract, and figures are copied into `sources/` and `assets/` so this folder can be moved as a unit. Source documents retain their original wording; the site's narrative uses more cautious interpretation where the documents overstate causality.

## Files

| File | Purpose |
|---|---|
| `index.html` | English research narrative and semantic structure |
| `styles.css` | Editorial visual system and responsive design |
| `app.js` | Charts, filters, tabs, CSV export |
| `research-data.js` | Reported estimates and source caveats |
| `references.js` | Numbered reference data (citation tooltips) |
| `assets/` | Original project figures and custom favicon |
| `sources/` | Local copies of the manuscript, abstract, and reference list |
| `verify_site.py` | Bounded automated browser and asset checks |

## Validation

JavaScript syntax:

```powershell
node --check app.js
node --check research-data.js
node --check references.js
```

Browser checks (optional Python development dependency, not required to use the site):

```powershell
python -m pip install playwright
python -m playwright install chromium
python verify_site.py
```

The verification script runs a temporary loopback server, stops it on completion, and creates desktop/mobile screenshots under `checks/`. It checks chart counts, filters and empty states, keyboard tabs, comparisons, timeline selection, CSV download, modal close/focus restoration, local-file operation, reduced-motion settings, missing assets, console errors, and page overflow at multiple viewport widths.
