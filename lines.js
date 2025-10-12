function makeHyphenLine(el) {
  // Build something like: ---- douwe teusink ---- portfolio ----
  const center = el.getAttribute('data-center') || '';
  const left = el.getAttribute('data-left') || '';
  const right = el.getAttribute('data-right') || '';
  const accent = el.getAttribute('data-accent') === 'true';

  // Create spans so we can measure mono char width
  el.innerHTML = '<span class="left"></span><span class="center"></span><span class="right"></span>';
  const spanLeft = el.querySelector('.left');
  const spanCenter = el.querySelector('.center');
  const spanRight = el.querySelector('.right');
  if (accent) spanCenter.style.color = 'var(--accent)';

  const pad = '  '; // spaces around labels
  const centerText = center ? pad + center + pad : '';
  const leftText = left ? pad + left + pad : '';
  const rightText = right ? pad + right + pad : '';

  // Measure char width using monospace '-'
  const measure = document.createElement('span');
  measure.textContent = '-';
  measure.style.visibility = 'hidden';
  measure.style.position = 'absolute';
  el.appendChild(measure);
  const charW = measure.getBoundingClientRect().width || 8;
  el.removeChild(measure);

  const maxChars = Math.floor(el.clientWidth / charW);
  const totalLabelChars = (leftText + centerText + rightText).length;
  const remaining = Math.max(0, maxChars - totalLabelChars);
  const leftHyphens = Math.floor(remaining / 2);
  const rightHyphens = remaining - leftHyphens;

  spanLeft.textContent = '-'.repeat(leftHyphens) + leftText;
  spanCenter.textContent = centerText;
  spanRight.textContent = rightText + '-'.repeat(rightHyphens);
}

function buildHeaderLines(){ document.querySelectorAll('.hy-line').forEach(makeHyphenLine); }
window.addEventListener('resize', buildHeaderLines);
window.addEventListener('DOMContentLoaded', buildHeaderLines);
