// Generic calculator initialization
function initCalculator(config) {
  const form = document.getElementById('calc-form');
  const inputsContainer = document.getElementById('inputs');
  const resultsBox = document.getElementById('results');
  const resultContent = document.getElementById('result-content');
  const infoContent = document.getElementById('info-content');
  
  // Render inputs
  config.inputs.forEach(input => {
    const group = document.createElement('div');
    group.className = 'input-group';
    
    const label = document.createElement('label');
    label.textContent = input.label;
    label.htmlFor = input.name;
    group.appendChild(label);
    
    let inputEl;
    if (input.type === 'select') {
      inputEl = document.createElement('select');
      inputEl.id = input.name;
      inputEl.name = input.name;
      input.options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        inputEl.appendChild(option);
      });
    } else {
      inputEl = document.createElement('input');
      inputEl.type = input.type;
      inputEl.id = input.name;
      inputEl.name = input.name;
      inputEl.placeholder = input.placeholder || '';
      if (input.min !== undefined) inputEl.min = input.min;
      if (input.max !== undefined) inputEl.max = input.max;
      if (input.step !== undefined) inputEl.step = input.step;
    }
    
    group.appendChild(inputEl);
    inputsContainer.appendChild(group);
  });
  
  // Render info
  infoContent.innerHTML = config.info || '<p>Enter values above and click Calculate to see results.</p>';
  
  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const data = {};
    config.inputs.forEach(input => {
      const el = document.getElementById(input.name);
      data[input.name] = input.type === 'number' ? parseFloat(el.value) || 0 : el.value;
    });
    
    const results = config.calculate(data);
    
    resultContent.innerHTML = '';
    Object.entries(results).forEach(([label, value]) => {
      const item = document.createElement('div');
      item.className = 'result-item';
      item.innerHTML = `<div class="result-label">${label}:</div><div class="result-value">${value}</div>`;
      resultContent.appendChild(item);
    });
    
    resultsBox.classList.add('show');
    resultsBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}
