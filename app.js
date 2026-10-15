(() => {
  'use strict';
  const D = window.ATLAS_DATA;
  const $ = id => document.getElementById(id);
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const num = value => Number(value).toLocaleString('en-US');
  const decimal = value => Number(value).toFixed(2);
  const drug = id => D.drugs.find(d => d.id === id);
  const plotColors = {fin:'#506c24',spiro:'#a14625',eple:'#7652a3',arni:'#19767e',apro:'#956817'};
  const endpointNames = {potassium:'Hyperkalemia',endocrine:'Endocrine disorders',pressure:'Hypotension / hemodynamics',edema:'Edema / fluid retention',renal:'Renal impairment',angioedema:'Angioedema'};
  const REFS = window.ATLAS_REFS || [];
  const refById = id => REFS.find(r => r.id === id);
  const citeMarker = ids => {
    if(!ids || !ids.length) return '';
    const valid = ids.filter(id => refById(id));
    if(!valid.length) return '';
    const label = '[' + valid.join(',') + ']';
    return `<a class="cite" href="#ref-${valid[0]}" data-refs="${valid.join(',')}" aria-label="References ${valid.join(', ')}">${label}</a>`;
  };
  const state = {activeDrug:'fin',selectedSignal:'spiro-endocrine',selectedOnset:0};
  const signalKey = s => `${s.drug}-${s.endpoint}`;
  const globalScale = value => (Math.log10(value) + 2) / 4 * 100;
  const compareScale = value => (Math.log10(value) + 1.7) / (1 + 1.7) * 100;
  const gridTicks = [0.01,0.1,1,10,100];
  function svgInterval(s, color, scale, ticks, dark = false) {
    const x = v => 6 + scale(v) / 100 * 288;
    return `<svg viewBox="0 0 300 32" preserveAspectRatio="none" aria-hidden="true">${ticks.map(t => `<line x1="${x(t)}" x2="${x(t)}" y1="0" y2="32" stroke="${dark ? '#41513d' : '#d5dccd'}" stroke-width="${t===1?1.2:.6}" ${t===1?'stroke-dasharray="3 3"':''}/>`).join('')}<line x1="${x(s.lo)}" x2="${x(s.hi)}" y1="16" y2="16" stroke="${color}" stroke-width="2" ${s.sentinel?'stroke-dasharray="4 2"':''}/><path d="M${x(s.lo)} 11V21M${x(s.hi)} 11V21" stroke="${color}" stroke-width="1.3"/><circle cx="${x(s.ror)}" cy="16" r="4" fill="${s.sentinel?(dark?'#19211c':'#f9f9f2'):color}" stroke="${color}" stroke-width="1.6"/></svg>`;
  }
  function axisTicks(ticks, scale) {
    return `<div class="axis-ticks">${ticks.map(t => `<span style="left:${2+scale(t)*.96}%">${t}</span>`).join('')}</div>`;
  }

  // The pathway diagram is conceptual; only the cohort bar uses quantitative widths.
  $('drug-tabs').innerHTML = D.drugs.map(d => `<button id="tab-${d.id}" role="tab" type="button" aria-selected="${d.id==='fin'}" aria-controls="pathway-panel" tabindex="${d.id==='fin'?0:-1}" style="--drug-color:${d.color}" data-drug="${d.id}"><i class="drug-dot"></i>${escape(d.short)}${d.id==='apro'?' *':''}</button>`).join('');
  function renderPathway(id) {
    state.activeDrug = id;
    const d = drug(id);
    document.querySelectorAll('[data-drug]').forEach(button => {
      const active = button.dataset.drug === id;
      button.setAttribute('aria-selected',active);
      button.tabIndex = active ? 0 : -1;
    });
    $('pathway-panel').setAttribute('aria-labelledby',`tab-${id}`);
    $('pathway-panel').style.setProperty('--drug-color',d.color);
    const target = {fin:'MR blockade',spiro:'MR + steroid receptors',eple:'Selective MR blockade',arni:'Neprilysin + AT1',apro:'ETA + ETB blockade'}[id];
    $('pathway-panel').innerHTML = `<div class="pathway-identity"><p class="eyebrow">${id==='apro'?'SENTINEL / EXPLORATORY':'THERAPY / MECHANISTIC PROFILE'}</p><h3>${escape(d.name)}</h3><p class="pathway-class">${escape(d.className)}</p><div class="pathway-route"><span>${escape(target)}</span><b aria-hidden="true">→</b><span class="route-axis">${escape(d.axis)}</span></div><div class="pathway-stats"><div><strong>${num(d.n)}</strong><span>REPORTS</span></div><div><strong>${d.age.toFixed(1)}</strong><span>MEAN AGE / Y</span></div><div><strong>${d.female.toFixed(1)}%</strong><span>FEMALE REPORTS</span></div></div></div><div class="pathway-reading"><article><h4>01 / PHARMACOLOGICAL RATIONALE</h4><p>${escape(d.mechanism)} ${citeMarker(d.refs && d.refs.mechanism)}</p></article><article><h4>02 / REPORTED SAFETY PATTERN</h4><p>${escape(d.interpretation)} ${citeMarker(d.refs && d.refs.interpretation)}</p></article><article class="caution"><h4>03 / INTERPRETIVE CAVEAT</h4><p>${escape(d.caution)} ${citeMarker(d.refs && d.refs.caution)}</p></article></div>`;
  }
  $('drug-tabs').addEventListener('click', e => {const b = e.target.closest('[data-drug]');if(b) renderPathway(b.dataset.drug);});
  $('drug-tabs').addEventListener('keydown', e => {
    if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key)) return;
    e.preventDefault();
    const tabs = [...$('drug-tabs').querySelectorAll('[role="tab"]')];
    let index = tabs.indexOf(document.activeElement);
    index = e.key==='Home'?0:e.key==='End'?tabs.length-1:(index+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length;
    renderPathway(tabs[index].dataset.drug);tabs[index].focus();
  });
  renderPathway('fin');
  const remainder = D.funnel.unique - D.drugs.reduce((sum,d) => sum+d.n,0);
  $('cohort-bar').innerHTML = D.drugs.map(d => `<span style="width:${d.n/D.funnel.unique*100}%;background:${d.color}" title="${escape(d.name)}: ${num(d.n)} reports"></span>`).join('') + `<span style="width:${remainder/D.funnel.unique*100}%;background:#56634e" title="Arithmetic remainder: ${num(remainder)}"></span>`;
  $('cohort-legend').innerHTML = D.drugs.map(d => `<span style="--drug-color:${d.color}"><i class="drug-dot"></i>${escape(d.short)}${d.id==='apro'?' *':''}<b>${num(d.n)}</b></span>`).join('') + `<span style="--drug-color:#77816c"><i class="drug-dot"></i>Remainder<b>${num(remainder)}</b></span>`;

  $('drug-filter').insertAdjacentHTML('beforeend',D.drugs.map(d => `<option value="${d.id}">${escape(d.name)}${d.id==='apro'?' *':''}</option>`).join(''));
  function filteredSignals() {
    return D.signals.filter(s => ($('drug-filter').value==='all'||s.drug===$('drug-filter').value)&&($('endpoint-filter').value==='all'||s.endpoint===$('endpoint-filter').value)&&(!$('abstract-only').checked||s.source==='abstract'));
  }
  function signalInterpretation(s) {
    if(s.cases===0) return 'No events were reported for this endpoint in the 17-report sentinel group. Continuity-corrected estimates are unstable; zero reports do not demonstrate absence of clinical risk.';
    if(s.lo>1) return 'The reported interval is entirely above 1: this endpoint was reported disproportionately often relative to the background. This is an association in reports, not a measured clinical risk.';
    if(s.hi<1) return 'The reported interval is entirely below 1: lower reporting odds relative to background. This does not establish a protective effect or absence of risk.';
    return 'The reported interval includes 1: no elevated ROR signal by the interval criterion. This does not prove equivalence or demonstrate that the therapy is free of this adverse event.';
  }
  function renderSignalDetail(s) {
    if(!s){$('signal-detail').innerHTML='<p>No matching estimates. Adjust the filters to review other estimates.</p>';return;}
    const d=drug(s.drug);
    $('signal-detail').innerHTML=`<div><p class="eyebrow">${s.sentinel?'SENTINEL / EXPLORATORY · ':''}${s.source.toUpperCase()} / REPORTED ESTIMATE</p><h3>${escape(d.name)} · ${escape(s.label)}</h3><p>${escape(signalInterpretation(s))}${s.sentinel?' All aprocitentan findings remain hypothesis-generating.':''} ${citeMarker(s.refs)}</p></div><div class="signal-metrics"><div><strong>${num(s.cases)}</strong><span>EVENT REPORTS</span></div><div><strong>${s.ic>0?'+':''}${decimal(s.ic)}</strong><span>IC025</span></div><div><strong>${escape(s.q)}</strong><span>FDR Q-VALUE</span></div></div>`;
  }
  function renderSignals() {
    const list=filteredSignals();
    if(!list.some(s=>signalKey(s)===state.selectedSignal)) state.selectedSignal=list[0]?signalKey(list[0]):null;
    $('signal-count').textContent=`${list.length} ESTIMATES`;
    $('export-csv').disabled=list.length===0;
    $('forest-plot').innerHTML=list.length?`<div class="forest-head"><span>THERAPY / ENDPOINT</span><span>LOWER ← REPORTING ODDS → HIGHER</span><span>ROR / 95% CI</span></div>${list.map(s=>`<button type="button" class="forest-row ${signalKey(s)===state.selectedSignal?'selected':''}" data-signal="${signalKey(s)}" aria-pressed="${signalKey(s)===state.selectedSignal}" aria-label="${escape(drug(s.drug).name)}, ${escape(s.label)}, ROR ${s.ror}, 95 percent CI ${s.lo} to ${s.hi}${s.sentinel?', exploratory sentinel':''}"><span class="forest-name"><strong>${escape(drug(s.drug).short)}${s.sentinel?' *':''}</strong><small>${escape(endpointNames[s.endpoint])}</small></span>${svgInterval(s,plotColors[s.drug],globalScale,gridTicks)}<span class="forest-value">${decimal(s.ror)}<small>${decimal(s.lo)}–${decimal(s.hi)}</small></span></button>`).join('')}<div class="forest-axis"><span>LOGARITHMIC SCALE</span>${axisTicks(gridTicks,globalScale)}<span>REFERENCE = 1</span></div>`:'<p class="empty-chart">No reported estimates match these filters. Select all therapies or disable the abstract-only filter.</p>';
    $('signal-table').innerHTML=list.map(s=>`<tr><td>${escape(drug(s.drug).name)}${s.sentinel?' *':''}</td><td>${escape(s.label)}</td><td>${s.cases}</td><td>${decimal(s.ror)} (${decimal(s.lo)}–${decimal(s.hi)})</td><td>${decimal(s.prr)}</td><td>${decimal(s.ic)}</td><td>${escape(s.q)}</td><td>${s.source}${s.sentinel?' · sentinel':''}</td><td class="refs-cell">${citeMarker(s.refs)}</td></tr>`).join('');
    renderSignalDetail(list.find(s=>signalKey(s)===state.selectedSignal));
  }
  ['drug-filter','endpoint-filter','abstract-only'].forEach(id=>$(id).addEventListener('change',renderSignals));
  $('forest-plot').addEventListener('click',e=>{
    const row=e.target.closest('[data-signal]');if(!row)return;
    state.selectedSignal=row.dataset.signal;
    $('forest-plot').querySelectorAll('[data-signal]').forEach(b=>{const active=b.dataset.signal===state.selectedSignal;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',active);});
    renderSignalDetail(D.signals.find(s=>signalKey(s)===state.selectedSignal));
  });
  $('export-csv').addEventListener('click',()=>{
    const rows=[['Therapy','Endpoint','Cases','ROR','CI lower','CI upper','PRR','IC025','FDR q','Source','Sentinel','Refs','Interpretation'],...filteredSignals().map(s=>[drug(s.drug).name,s.label,s.cases,s.ror,s.lo,s.hi,s.prr,s.ic,s.q,s.source,s.sentinel,(s.refs||[]).join(';'),'As reported; not incidence or causality; global denominators inconsistent'])];
    const csv='\uFEFF'+rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')).join('\r\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));
    const a=document.createElement('a');a.href=url;a.download='signal-compendium-reported-estimates.csv';document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
  });
  renderSignals();

  function renderComparison() {
    const [target,comparator]=$('comparison-select').value.split('-');
    const list=D.comparisons.filter(c=>c.target===target&&c.comparator===comparator);
    $('comparison-header').innerHTML=`<p class="eyebrow">HEAD-TO-HEAD / REPORTED ROR</p><h3>${escape(drug(target).short)} <span>vs</span><br>${escape(drug(comparator).short)}</h3>`;
    $('comparison-plot').innerHTML=list.map(c=>`<div class="compare-row"><div class="compare-row-heading"><span>${escape(endpointNames[c.endpoint])}</span><strong>${decimal(c.ror)}</strong></div>${svgInterval(c,drug(target).color,compareScale,[0.1,1,10],true)}${axisTicks([0.1,1,10],compareScale)}<p>95% CI ${decimal(c.lo)}–${decimal(c.hi)} · ${c.p?'p '+escape(c.p):'p not specified in source table'} · ${c.source.toUpperCase()} ${citeMarker(c.refs)}</p></div>`).join('');
  }
  $('comparison-select').addEventListener('change',renderComparison);renderComparison();

  function renderOnset() {
    $('onset-timeline').innerHTML=D.onset.map((o,i)=>{
      const d=drug(o.drug),range=o.ci||o.iqr;
      const scale=v=>6+v/365*288;
      return `<button type="button" class="timeline-row ${i===state.selectedOnset?'selected':''}" data-onset="${i}" aria-pressed="${i===state.selectedOnset}" aria-label="${escape(d.name)}, ${escape(endpointNames[o.endpoint])}, median onset ${o.median} days, ${o.n} dated reports${o.drug==='apro'?', exploratory':''}"><span class="timeline-label">${escape(d.short)}${o.drug==='apro'?' *':''}<small>${escape(endpointNames[o.endpoint])}</small></span><svg viewBox="0 0 300 28" preserveAspectRatio="none" aria-hidden="true">${[0,90,180,270,365].map(t=>`<line x1="${scale(t)}" x2="${scale(t)}" y1="0" y2="28" stroke="#3d4a38" stroke-width=".7"/>`).join('')}${range?`<line x1="${scale(range[0])}" x2="${scale(range[1])}" y1="14" y2="14" stroke="${d.color}" stroke-width="2" ${o.drug==='apro'?'stroke-dasharray="3 3"':''}/>`:''}<circle cx="${scale(o.median)}" cy="14" r="4" fill="${o.drug==='apro'?'#19211c':d.color}" stroke="${d.color}" stroke-width="1.5"/></svg><strong style="color:${d.color}">${o.median}</strong></button>`;
    }).join('')+`<div class="timeline-axis"><span></span>${axisTicks([0,90,180,270,365],v=>v/365*100)}<span></span></div>`;
    renderOnsetDetail();
  }
  function renderOnsetDetail() {
    const o=D.onset[state.selectedOnset],d=drug(o.drug);
    $('onset-detail').style.setProperty('--drug-color',d.color);
    const range=o.ci?`${o.ci[0]}–${o.ci[1]} days`:o.iqr?`${o.iqr[0]}–${o.iqr[1]} days`:'Not reported';
    $('onset-detail').innerHTML=`<p class="eyebrow">${o.drug==='apro'?'EXPLORATORY / ONLY 3 DATED REPORTS':'DATED REPORTS / ONSET PROFILE'}</p><h3>${escape(d.name)}<br>${escape(endpointNames[o.endpoint])}</h3><div class="onset-number">${o.median}<span>DAYS</span></div><p>Median onset among reports with usable dates. ${citeMarker(o.refs)}</p><p>${num(o.n)} of ${num(o.total)} endpoint reports (${(o.n/o.total*100).toFixed(1)}%) contributed to this estimate.</p><dl><div><dt>${o.ci?'BOOTSTRAP 95% CI':'IQR / NOT A CI'}</dt><dd>${range}</dd></div><div><dt>WEIBULL SHAPE β</dt><dd>${o.beta?o.beta.toFixed(3):'Not fitted'}</dd></div></dl>${o.drug==='apro'?'<p>No Weibull estimate or usable bootstrap CI is presented for this sparse sentinel group.</p>':''}`;
  }
  $('onset-timeline').addEventListener('click',e=>{
    const b=e.target.closest('[data-onset]');if(!b)return;state.selectedOnset=Number(b.dataset.onset);
    $('onset-timeline').querySelectorAll('[data-onset]').forEach(row=>{const active=Number(row.dataset.onset)===state.selectedOnset;row.classList.toggle('selected',active);row.setAttribute('aria-pressed',active);});renderOnsetDetail();
  });renderOnset();
  const curves=[{beta:.6,color:'#ff9e7a',name:'β < 1 · decreasing'},{beta:1,color:'#a6b0a5',name:'β = 1 · constant'},{beta:1.432,color:'#c5ef6b',name:'β = 1.432 · increasing'}];
  $('weibull-plot').innerHTML=`<svg viewBox="0 0 550 235" role="img" aria-label="Conceptual normalized Weibull hazard shapes, decreasing for beta below one, constant for beta one, increasing for beta 1.432. Not patient incidence."><path d="M45 28V180H520" fill="none" stroke="#586650"/>${[60,100,140].map(y=>`<line x1="45" x2="520" y1="${y}" y2="${y}" stroke="#303c2e" stroke-dasharray="2 5"/>`).join('')}${curves.map(c=>{const points=Array.from({length:100},(_,i)=>{const t=.12+i/99*2.88;const x=45+(t-.12)/2.88*475;const y=180-Math.pow(t,c.beta-1)*65;return `${i===0?'M':'L'}${x.toFixed(2)} ${y.toFixed(2)}`;}).join(' ');return `<path d="${points}" fill="none" stroke="${c.color}" stroke-width="2"/>`;}).join('')}<text x="45" y="15" fill="#a6b0a5" font-size="9" font-family="monospace">NORMALIZED HAZARD / ARBITRARY UNITS</text><text x="520" y="199" text-anchor="end" fill="#a6b0a5" font-size="9" font-family="monospace">ELAPSED TIME →</text>${curves.map((c,i)=>`<circle cx="${50+i*170}" cy="223" r="3" fill="${c.color}"/><text x="${59+i*170}" y="226" fill="${c.color}" font-size="9" font-family="monospace">${escape(c.name)}</text>`).join('')}</svg>`;

  $('integrity-list').innerHTML=D.caveats.map(c=>`<li>${escape(c)}</li>`).join('');
  const toggle=document.querySelector('.menu-toggle');
  toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',!expanded);toggle.classList.toggle('open',!expanded);$('navigation').classList.toggle('open',!expanded);});
  $('navigation').querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{$('navigation').classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('navigation').classList.contains('open')){$('navigation').classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});
  document.addEventListener('click',e=>{const nav=$('navigation');if(nav.classList.contains('open')&&!e.target.closest('#navigation')&&!e.target.closest('.menu-toggle')){nav.classList.remove('open');toggle.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
  const motionReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if('IntersectionObserver' in window){
    if(!motionReduced){
      const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.08});
      document.querySelectorAll('.finding,.section-heading,.intro-grid,.flow-layout').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el);});
    }
    const navObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('#navigation a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}}),{rootMargin:'-15% 0px -55% 0px'});
    ['references','overview','pathways','signals','timing'].forEach(id=>navObserver.observe($(id)));
  }
  let scrollFrame=false;
  function updateProgress(){
    const max=document.documentElement.scrollHeight-window.innerHeight;
    $('scroll-progress').style.width=`${max>0?window.scrollY/max*100:0}%`;
    if(window.scrollY < $('overview').offsetTop-window.innerHeight*.55){document.querySelectorAll('#navigation a').forEach(a=>a.classList.remove('active'));}
    scrollFrame=false;
  }
  window.addEventListener('scroll',()=>{if(!scrollFrame){scrollFrame=true;requestAnimationFrame(updateProgress);}},{passive:true});
  window.addEventListener('resize',updateProgress);updateProgress();

  // ---- Citation tooltips, click-highlight, and backlinks ----
  const tooltip = $('cite-tooltip');
  let tooltipFor = null;
  function tooltipHTML(ids) {
    return ids.map(id => {
      const r = refById(id);
      if(!r) return '';
      return `<div class="tt-item"><span class="tt-num">[${id}]</span>${escape(r.short)}</div>`;
    }).join('') + '<span class="tt-hint">Select the marker to jump to the reference.</span>';
  }
  function showTooltip(anchor) {
    const ids = (anchor.dataset.refs || '').split(',').map(s => Number(s)).filter(Boolean);
    if(!ids.length) return;
    tooltip.innerHTML = tooltipHTML(ids);
    tooltip.hidden = false;
    tooltipFor = anchor;
    const rect = anchor.getBoundingClientRect();
    tooltip.style.left = Math.min(Math.max(8, rect.left - 140), window.innerWidth - 356) + 'px';
    const below = rect.bottom + 12 + tooltip.offsetHeight < window.innerHeight;
    tooltip.style.top = (below ? rect.bottom + 10 : Math.max(8, rect.top - tooltip.offsetHeight - 10)) + 'px';
  }
  function hideTooltip() {
    tooltip.hidden = true;
    tooltipFor = null;
  }
  document.addEventListener('mouseover', e => {
    const a = e.target.closest && e.target.closest('a.cite');
    if(a) showTooltip(a);
  });
  document.addEventListener('focusin', e => {
    const a = e.target.closest && e.target.closest('a.cite');
    if(a) showTooltip(a);
  });
  document.addEventListener('mouseout', e => {
    const a = e.target.closest && e.target.closest('a.cite');
    if(a && !tooltip.matches(':hover')) hideTooltip();
  });
  tooltip.addEventListener('mouseleave', hideTooltip);
  document.addEventListener('scroll', hideTooltip, {passive:true});
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') {
      hideTooltip();
      if(tooltipFor) { tooltipFor.focus(); tooltipFor = null; }
    }
  });
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a.cite');
    hideTooltip();
    if(!a) return;
    const ids = (a.dataset.refs || '').split(',').map(s => Number(s)).filter(Boolean);
    ids.forEach(id => {
      const li = document.getElementById('ref-' + id);
      if(li) {
        li.classList.add('cite-target');
        setTimeout(() => li.classList.remove('cite-target'), 2600);
      }
    });
  });
})();
