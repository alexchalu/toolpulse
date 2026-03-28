#!/usr/bin/env python3
"""
Fix all broken calculator pages by injecting working tools into empty toolContent divs.
"""

import os
import re

# Calculator HTML templates
calculators = {
    'percentage-calculator.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">What is X% of Y?</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Percentage</label>
            <input type="number" id="percent1" placeholder="25" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Value</label>
            <input type="number" id="value1" placeholder="200" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
    </div>
    <button onclick="calc1()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Calculate</button>
    <div id="result1" style="margin-top:1rem;font-size:1.5rem;font-weight:700;color:#0071e3;text-align:center"></div>
</div>

<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">X is what % of Y?</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">First Value</label>
            <input type="number" id="value2a" placeholder="50" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Second Value</label>
            <input type="number" id="value2b" placeholder="200" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
    </div>
    <button onclick="calc2()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Calculate</button>
    <div id="result2" style="margin-top:1rem;font-size:1.5rem;font-weight:700;color:#0071e3;text-align:center"></div>
</div>

<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Percentage Change from X to Y</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Original Value</label>
            <input type="number" id="value3a" placeholder="100" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">New Value</label>
            <input type="number" id="value3b" placeholder="150" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;outline:none">
        </div>
    </div>
    <button onclick="calc3()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Calculate</button>
    <div id="result3" style="margin-top:1rem;font-size:1.5rem;font-weight:700;color:#0071e3;text-align:center"></div>
</div>

<script>
function calc1() {
    const percent = parseFloat(document.getElementById('percent1').value);
    const value = parseFloat(document.getElementById('value1').value);
    if (isNaN(percent) || isNaN(value)) {
        document.getElementById('result1').innerHTML = '<span style="color:#ef4444">Please enter valid numbers</span>';
        return;
    }
    const result = (percent / 100) * value;
    document.getElementById('result1').textContent = result.toFixed(2);
}

function calc2() {
    const a = parseFloat(document.getElementById('value2a').value);
    const b = parseFloat(document.getElementById('value2b').value);
    if (isNaN(a) || isNaN(b) || b === 0) {
        document.getElementById('result2').innerHTML = '<span style="color:#ef4444">Please enter valid numbers</span>';
        return;
    }
    const result = (a / b) * 100;
    document.getElementById('result2').textContent = result.toFixed(2) + '%';
}

function calc3() {
    const original = parseFloat(document.getElementById('value3a').value);
    const newVal = parseFloat(document.getElementById('value3b').value);
    if (isNaN(original) || isNaN(newVal) || original === 0) {
        document.getElementById('result3').innerHTML = '<span style="color:#ef4444">Please enter valid numbers</span>';
        return;
    }
    const change = ((newVal - original) / original) * 100;
    const color = change >= 0 ? '#22c55e' : '#ef4444';
    document.getElementById('result3').innerHTML = '<span style="color:' + color + '">' + (change >= 0 ? '+' : '') + change.toFixed(2) + '%</span>';
}
</script>''',

    'word-counter.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Word Counter</h2>
    <textarea id="textInput" placeholder="Type or paste your text here..." style="width:100%;min-height:200px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;line-height:1.6" oninput="countWords()"></textarea>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:1rem;margin-top:1.5rem">
        <div style="text-align:center;padding:1rem;background:#f5f5f7;border-radius:8px">
            <div style="font-size:2rem;font-weight:800;color:#0071e3" id="wordCount">0</div>
            <div style="font-size:.75rem;color:#86868b;text-transform:uppercase;margin-top:.25rem">Words</div>
        </div>
        <div style="text-align:center;padding:1rem;background:#f5f5f7;border-radius:8px">
            <div style="font-size:2rem;font-weight:800;color:#0071e3" id="charCount">0</div>
            <div style="font-size:.75rem;color:#86868b;text-transform:uppercase;margin-top:.25rem">Characters</div>
        </div>
        <div style="text-align:center;padding:1rem;background:#f5f5f7;border-radius:8px">
            <div style="font-size:2rem;font-weight:800;color:#0071e3" id="sentenceCount">0</div>
            <div style="font-size:.75rem;color:#86868b;text-transform:uppercase;margin-top:.25rem">Sentences</div>
        </div>
        <div style="text-align:center;padding:1rem;background:#f5f5f7;border-radius:8px">
            <div style="font-size:2rem;font-weight:800;color:#0071e3" id="paragraphCount">0</div>
            <div style="font-size:.75rem;color:#86868b;text-transform:uppercase;margin-top:.25rem">Paragraphs</div>
        </div>
    </div>
</div>

<script>
function countWords() {
    const text = document.getElementById('textInput').value;
    const words = text.trim() ? text.trim().split(/\\s+/).filter(w => w.length > 0) : [];
    const chars = text.length;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
    const paragraphs = text.trim() ? text.split(/\\n+/).filter(p => p.trim().length > 0) : [];
    
    document.getElementById('wordCount').textContent = words.length;
    document.getElementById('charCount').textContent = chars;
    document.getElementById('sentenceCount').textContent = sentences.length;
    document.getElementById('paragraphCount').textContent = paragraphs.length;
}
</script>''',

    'qr-code-generator.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">QR Code Generator</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Text or URL</label>
    <input type="text" id="qrInput" placeholder="https://example.com" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;margin-bottom:1rem">
    <button onclick="generateQR()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Generate QR Code</button>
    <div id="qrResult" style="margin-top:1.5rem;text-align:center;display:none">
        <canvas id="qrCanvas" style="max-width:100%;border:1px solid rgba(0,0,0,.08);border-radius:8px"></canvas>
        <button onclick="downloadQR()" style="margin-top:1rem;padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Download PNG</button>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
<script>
function generateQR() {
    const text = document.getElementById('qrInput').value.trim();
    if (!text) {
        alert('Please enter text or URL');
        return;
    }
    const canvas = document.getElementById('qrCanvas');
    QRCode.toCanvas(canvas, text, { width: 300, margin: 2 }, function(error) {
        if (error) {
            alert('Error generating QR code');
        } else {
            document.getElementById('qrResult').style.display = 'block';
        }
    });
}

function downloadQR() {
    const canvas = document.getElementById('qrCanvas');
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = canvas.toDataURL();
    link.click();
}
</script>''',

    'uuid-generator.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">UUID Generator</h2>
    <button onclick="generateUUID()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%;margin-bottom:1rem">Generate UUID v4</button>
    <div id="uuidResult" style="display:none">
        <div style="background:#f5f5f7;padding:1rem;border-radius:8px;font-family:monospace;font-size:.95rem;word-break:break-all;margin-bottom:.75rem" id="uuidDisplay"></div>
        <button onclick="copyUUID()" style="padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
let currentUUID = '';

function generateUUID() {
    currentUUID = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    document.getElementById('uuidDisplay').textContent = currentUUID;
    document.getElementById('uuidResult').style.display = 'block';
}

function copyUUID() {
    navigator.clipboard.writeText(currentUUID).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'lorem-ipsum-generator.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Lorem Ipsum Generator</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Number of Paragraphs</label>
    <input type="number" id="paraCount" value="3" min="1" max="20" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;margin-bottom:1rem">
    <button onclick="generateLorem()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Generate</button>
    <div id="loremResult" style="margin-top:1.5rem;display:none">
        <div style="background:#f5f5f7;padding:1.5rem;border-radius:8px;max-height:400px;overflow-y:auto;line-height:1.6;font-size:.9rem" id="loremText"></div>
        <button onclick="copyLorem()" style="margin-top:1rem;padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
const lorem = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus.",
    "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis.",
    "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est.",
];

function generateLorem() {
    const count = parseInt(document.getElementById('paraCount').value) || 3;
    const paras = [];
    for (let i = 0; i < count; i++) {
        paras.push(lorem[i % lorem.length]);
    }
    document.getElementById('loremText').innerHTML = paras.map(p => '<p style="margin-bottom:1rem">' + p + '</p>').join('');
    document.getElementById('loremResult').style.display = 'block';
}

function copyLorem() {
    const text = document.getElementById('loremText').innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'text-case-converter.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Text Case Converter</h2>
    <textarea id="textCase" placeholder="Type or paste your text here..." style="width:100%;min-height:150px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;line-height:1.6;margin-bottom:1rem"></textarea>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:.75rem">
        <button onclick="convertCase('upper')" style="padding:.7rem 1rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">UPPERCASE</button>
        <button onclick="convertCase('lower')" style="padding:.7rem 1rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">lowercase</button>
        <button onclick="convertCase('title')" style="padding:.7rem 1rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Title Case</button>
        <button onclick="convertCase('camel')" style="padding:.7rem 1rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">camelCase</button>
        <button onclick="convertCase('snake')" style="padding:.7rem 1rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">snake_case</button>
    </div>
</div>

<script>
function convertCase(type) {
    const textarea = document.getElementById('textCase');
    let text = textarea.value;
    
    switch(type) {
        case 'upper':
            text = text.toUpperCase();
            break;
        case 'lower':
            text = text.toLowerCase();
            break;
        case 'title':
            text = text.toLowerCase().replace(/\\b\\w/g, l => l.toUpperCase());
            break;
        case 'camel':
            text = text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
            break;
        case 'snake':
            text = text.toLowerCase().replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
            break;
    }
    
    textarea.value = text;
}
</script>''',

    'color-converter.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Color Converter</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">HEX</label>
            <input type="text" id="hexInput" placeholder="#FF5733" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px" oninput="convertFromHex()">
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">RGB</label>
            <input type="text" id="rgbInput" placeholder="rgb(255, 87, 51)" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px" oninput="convertFromRgb()">
        </div>
    </div>
    <div style="margin-bottom:1rem">
        <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">HSL</label>
        <input type="text" id="hslInput" placeholder="hsl(9, 100%, 60%)" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px" oninput="convertFromHsl()">
    </div>
    <div style="height:100px;border-radius:8px;border:1px solid rgba(0,0,0,.08);background:#fff;margin-bottom:1rem" id="colorPreview"></div>
</div>

<script>
function hexToRgb(hex) {
    const result = /^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function convertFromHex() {
    const hex = document.getElementById('hexInput').value;
    const rgb = hexToRgb(hex);
    if (rgb) {
        document.getElementById('rgbInput').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('colorPreview').style.background = hex;
    }
}

function convertFromRgb() {
    const match = document.getElementById('rgbInput').value.match(/\\d+/g);
    if (match && match.length === 3) {
        const [r, g, b] = match.map(Number);
        const hex = rgbToHex(r, g, b);
        document.getElementById('hexInput').value = hex;
        const hsl = rgbToHsl(r, g, b);
        document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
        document.getElementById('colorPreview').style.background = hex;
    }
}

function convertFromHsl() {
    // Simplified HSL to RGB conversion
    const match = document.getElementById('hslInput').value.match(/\\d+/g);
    if (match && match.length === 3) {
        const h = parseInt(match[0]) / 360;
        const s = parseInt(match[1]) / 100;
        const l = parseInt(match[2]) / 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        r = Math.round(r * 255);
        g = Math.round(g * 255);
        b = Math.round(b * 255);
        const hex = rgbToHex(r, g, b);
        document.getElementById('hexInput').value = hex;
        document.getElementById('rgbInput').value = `rgb(${r}, ${g}, ${b})`;
        document.getElementById('colorPreview').style.background = hex;
    }
}
</script>''',

    'hash-generator.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Hash Generator</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;letter-spacing:.02em;text-transform:uppercase;display:block;margin-bottom:.3rem">Input Text</label>
    <textarea id="hashInput" placeholder="Enter text to hash..." style="width:100%;min-height:100px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <button onclick="generateHashes()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Generate Hashes</button>
    <div id="hashResults" style="margin-top:1.5rem;display:none">
        <div style="margin-bottom:1rem">
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">MD5</label>
            <div style="background:#f5f5f7;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.85rem;word-break:break-all" id="md5Hash"></div>
        </div>
        <div style="margin-bottom:1rem">
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">SHA-1</label>
            <div style="background:#f5f5f7;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.85rem;word-break:break-all" id="sha1Hash"></div>
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">SHA-256</label>
            <div style="background:#f5f5f7;padding:.75rem;border-radius:8px;font-family:monospace;font-size:.85rem;word-break:break-all" id="sha256Hash"></div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"></script>
<script>
async function generateHashes() {
    const text = document.getElementById('hashInput').value;
    if (!text) {
        alert('Please enter text to hash');
        return;
    }
    
    document.getElementById('md5Hash').textContent = CryptoJS.MD5(text).toString();
    document.getElementById('sha1Hash').textContent = CryptoJS.SHA1(text).toString();
    document.getElementById('sha256Hash').textContent = CryptoJS.SHA256(text).toString();
    document.getElementById('hashResults').style.display = 'block';
}
</script>''',

    'base64-encoder-decoder.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Base64 Encoder/Decoder</h2>
    <textarea id="base64Input" placeholder="Enter text to encode or base64 to decode..." style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
        <button onclick="encodeBase64()" style="padding:.75rem 1.5rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Encode</button>
        <button onclick="decodeBase64()" style="padding:.75rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Decode</button>
    </div>
    <div id="base64Result" style="display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Result</label>
        <textarea id="base64Output" readonly style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical"></textarea>
        <button onclick="copyResult()" style="margin-top:.75rem;padding:.6rem 1.5rem;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
function encodeBase64() {
    const text = document.getElementById('base64Input').value;
    if (!text) {
        alert('Please enter text to encode');
        return;
    }
    try {
        const encoded = btoa(unescape(encodeURIComponent(text)));
        document.getElementById('base64Output').value = encoded;
        document.getElementById('base64Result').style.display = 'block';
    } catch (e) {
        alert('Error encoding: ' + e.message);
    }
}

function decodeBase64() {
    const text = document.getElementById('base64Input').value;
    if (!text) {
        alert('Please enter base64 to decode');
        return;
    }
    try {
        const decoded = decodeURIComponent(escape(atob(text)));
        document.getElementById('base64Output').value = decoded;
        document.getElementById('base64Result').style.display = 'block';
    } catch (e) {
        alert('Error decoding: Invalid base64 string');
    }
}

function copyResult() {
    const output = document.getElementById('base64Output');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'url-encoder-decoder.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">URL Encoder/Decoder</h2>
    <textarea id="urlInput" placeholder="Enter URL or text..." style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
        <button onclick="encodeURL()" style="padding:.75rem 1.5rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Encode</button>
        <button onclick="decodeURL()" style="padding:.75rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Decode</button>
    </div>
    <div id="urlResult" style="display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Result</label>
        <textarea id="urlOutput" readonly style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical"></textarea>
        <button onclick="copyURLResult()" style="margin-top:.75rem;padding:.6rem 1.5rem;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
function encodeURL() {
    const text = document.getElementById('urlInput').value;
    if (!text) {
        alert('Please enter URL or text to encode');
        return;
    }
    const encoded = encodeURIComponent(text);
    document.getElementById('urlOutput').value = encoded;
    document.getElementById('urlResult').style.display = 'block';
}

function decodeURL() {
    const text = document.getElementById('urlInput').value;
    if (!text) {
        alert('Please enter URL to decode');
        return;
    }
    try {
        const decoded = decodeURIComponent(text);
        document.getElementById('urlOutput').value = decoded;
        document.getElementById('urlResult').style.display = 'block';
    } catch (e) {
        alert('Error decoding: Invalid URL encoding');
    }
}

function copyURLResult() {
    const output = document.getElementById('urlOutput');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'html-encoder.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">HTML Entity Encoder/Decoder</h2>
    <textarea id="htmlInput" placeholder="Enter HTML to encode/decode..." style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:var(--font);background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem">
        <button onclick="encodeHTML()" style="padding:.75rem 1.5rem;background:#0071e3;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Encode</button>
        <button onclick="decodeHTML()" style="padding:.75rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.9rem">Decode</button>
    </div>
    <div id="htmlResult" style="display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Result</label>
        <textarea id="htmlOutput" readonly style="width:100%;min-height:120px;padding:1rem;font-size:.95rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical"></textarea>
        <button onclick="copyHTMLResult()" style="margin-top:.75rem;padding:.6rem 1.5rem;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
function encodeHTML() {
    const text = document.getElementById('htmlInput').value;
    if (!text) {
        alert('Please enter HTML to encode');
        return;
    }
    const encoded = text.replace(/&/g, '&amp;')
                       .replace(/</g, '&lt;')
                       .replace(/>/g, '&gt;')
                       .replace(/"/g, '&quot;')
                       .replace(/'/g, '&#39;');
    document.getElementById('htmlOutput').value = encoded;
    document.getElementById('htmlResult').style.display = 'block';
}

function decodeHTML() {
    const text = document.getElementById('htmlInput').value;
    if (!text) {
        alert('Please enter HTML to decode');
        return;
    }
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    document.getElementById('htmlOutput').value = textarea.value;
    document.getElementById('htmlResult').style.display = 'block';
}

function copyHTMLResult() {
    const output = document.getElementById('htmlOutput');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'css-minifier.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">CSS Minifier</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Input CSS</label>
    <textarea id="cssInput" placeholder="Paste CSS code here..." style="width:100%;min-height:200px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <button onclick="minifyCSS()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Minify CSS</button>
    <div id="cssResult" style="margin-top:1.5rem;display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Minified Output</label>
        <textarea id="cssOutput" readonly style="width:100%;min-height:150px;padding:1rem;font-size:.85rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:.75rem"></textarea>
        <div style="display:flex;gap:.75rem">
            <button onclick="copyCSSResult()" style="flex:1;padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Copy</button>
            <div style="padding:.6rem 1rem;background:#f5f5f7;border-radius:8px;font-size:.85rem;font-weight:600;display:flex;align-items:center" id="cssStats"></div>
        </div>
    </div>
</div>

<script>
function minifyCSS() {
    const css = document.getElementById('cssInput').value.trim();
    if (!css) {
        alert('Please enter CSS code');
        return;
    }
    
    // Basic CSS minification
    const minified = css
        .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // Remove comments
        .replace(/\\s+/g, ' ') // Collapse whitespace
        .replace(/\\s*([{}:;,])\\s*/g, '$1') // Remove spaces around special chars
        .replace(/;}/g, '}') // Remove last semicolon in block
        .trim();
    
    const originalSize = new Blob([css]).size;
    const minifiedSize = new Blob([minified]).size;
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    
    document.getElementById('cssOutput').value = minified;
    document.getElementById('cssStats').textContent = `Saved ${saved}%`;
    document.getElementById('cssResult').style.display = 'block';
}

function copyCSSResult() {
    const output = document.getElementById('cssOutput');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'javascript-minifier.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">JavaScript Minifier</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Input JavaScript</label>
    <textarea id="jsInput" placeholder="Paste JavaScript code here..." style="width:100%;min-height:200px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <button onclick="minifyJS()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Minify JavaScript</button>
    <div id="jsResult" style="margin-top:1.5rem;display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Minified Output</label>
        <textarea id="jsOutput" readonly style="width:100%;min-height:150px;padding:1rem;font-size:.85rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:.75rem"></textarea>
        <div style="display:flex;gap:.75rem">
            <button onclick="copyJSResult()" style="flex:1;padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Copy</button>
            <div style="padding:.6rem 1rem;background:#f5f5f7;border-radius:8px;font-size:.85rem;font-weight:600;display:flex;align-items:center" id="jsStats"></div>
        </div>
    </div>
</div>

<script>
function minifyJS() {
    const js = document.getElementById('jsInput').value.trim();
    if (!js) {
        alert('Please enter JavaScript code');
        return;
    }
    
    // Basic JS minification (no AST parsing)
    const minified = js
        .replace(/\\/\\/.*$/gm, '') // Remove single-line comments
        .replace(/\\/\\*[\\s\\S]*?\\*\\//g, '') // Remove multi-line comments
        .replace(/\\s+/g, ' ') // Collapse whitespace
        .replace(/\\s*([{}();:,=<>!&|+\\-*\\/])\\s*/g, '$1') // Remove spaces around operators
        .replace(/;}/g, '}') // Remove last semicolon before }
        .trim();
    
    const originalSize = new Blob([js]).size;
    const minifiedSize = new Blob([minified]).size;
    const saved = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
    
    document.getElementById('jsOutput').value = minified;
    document.getElementById('jsStats').textContent = `Saved ${saved}%`;
    document.getElementById('jsResult').style.display = 'block';
}

function copyJSResult() {
    const output = document.getElementById('jsOutput');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'markdown-preview.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Markdown Preview</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Markdown Input</label>
            <textarea id="mdInput" placeholder="# Heading\\n\\n**Bold** and *italic* text..." style="width:100%;min-height:300px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical" oninput="renderMarkdown()"></textarea>
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Preview</label>
            <div id="mdPreview" style="min-height:300px;padding:1rem;background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:8px;overflow:auto;line-height:1.6;font-size:.9rem"></div>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
function renderMarkdown() {
    const md = document.getElementById('mdInput').value;
    const html = marked.parse(md);
    document.getElementById('mdPreview').innerHTML = html;
}

// Add some basic styles to the preview
const style = document.createElement('style');
style.textContent = `
#mdPreview h1 { font-size: 1.5rem; font-weight: 700; margin: 0.5rem 0; }
#mdPreview h2 { font-size: 1.3rem; font-weight: 700; margin: 0.5rem 0; }
#mdPreview h3 { font-size: 1.1rem; font-weight: 600; margin: 0.5rem 0; }
#mdPreview p { margin: 0.5rem 0; }
#mdPreview ul, #mdPreview ol { margin: 0.5rem 0; padding-left: 1.5rem; }
#mdPreview code { background: #f5f5f7; padding: 0.1rem 0.3rem; border-radius: 3px; font-size: 0.9em; }
#mdPreview pre { background: #f5f5f7; padding: 0.75rem; border-radius: 6px; overflow-x: auto; }
#mdPreview pre code { background: none; padding: 0; }
#mdPreview a { color: #0071e3; text-decoration: underline; }
#mdPreview blockquote { border-left: 3px solid #0071e3; padding-left: 1rem; color: #424245; margin: 0.5rem 0; }
`;
document.head.appendChild(style);
</script>''',

    'diff-checker.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Text Diff Checker</h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem">
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Original Text</label>
            <textarea id="text1" placeholder="Original text..." style="width:100%;min-height:200px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical"></textarea>
        </div>
        <div>
            <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Modified Text</label>
            <textarea id="text2" placeholder="Modified text..." style="width:100%;min-height:200px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical"></textarea>
        </div>
    </div>
    <button onclick="compareTexts()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Compare</button>
    <div id="diffResult" style="margin-top:1.5rem;display:none">
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:.75rem">Differences</h3>
        <div id="diffOutput" style="background:#f5f5f7;padding:1rem;border-radius:8px;font-family:monospace;font-size:.85rem;line-height:1.6;white-space:pre-wrap;max-height:400px;overflow:auto"></div>
    </div>
</div>

<script>
function compareTexts() {
    const text1 = document.getElementById('text1').value;
    const text2 = document.getElementById('text2').value;
    
    if (!text1 && !text2) {
        alert('Please enter text in both fields');
        return;
    }
    
    const lines1 = text1.split('\\n');
    const lines2 = text2.split('\\n');
    let output = '';
    
    const maxLen = Math.max(lines1.length, lines2.length);
    let differences = 0;
    
    for (let i = 0; i < maxLen; i++) {
        const line1 = lines1[i] || '';
        const line2 = lines2[i] || '';
        
        if (line1 !== line2) {
            differences++;
            if (line1 && !line2) {
                output += `<span style="background:#ffcccc;color:#cc0000;padding:0 4px">- ${line1}</span>\\n`;
            } else if (!line1 && line2) {
                output += `<span style="background:#ccffcc;color:#00cc00;padding:0 4px">+ ${line2}</span>\\n`;
            } else {
                output += `<span style="background:#ffcccc;color:#cc0000;padding:0 4px">- ${line1}</span>\\n`;
                output += `<span style="background:#ccffcc;color:#00cc00;padding:0 4px">+ ${line2}</span>\\n`;
            }
        } else {
            output += `  ${line1}\\n`;
        }
    }
    
    if (differences === 0) {
        output = '<span style="color:#22c55e;font-weight:600">✓ Texts are identical</span>';
    } else {
        output = `<div style="margin-bottom:0.5rem;color:#86868b">${differences} difference(s) found</div>` + output;
    }
    
    document.getElementById('diffOutput').innerHTML = output;
    document.getElementById('diffResult').style.display = 'block';
}
</script>''',

    'number-base-converter.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Number Base Converter</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Input Value</label>
    <input type="text" id="baseInput" placeholder="Enter a number" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;margin-bottom:1rem">
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Input Base</label>
    <select id="baseFrom" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;margin-bottom:1rem">
        <option value="10" selected>Decimal (Base 10)</option>
        <option value="2">Binary (Base 2)</option>
        <option value="8">Octal (Base 8)</option>
        <option value="16">Hexadecimal (Base 16)</option>
    </select>
    <button onclick="convertBase()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Convert</button>
    <div id="baseResult" style="margin-top:1.5rem;display:none">
        <div style="display:grid;gap:1rem">
            <div style="background:#f5f5f7;padding:1rem;border-radius:8px">
                <div style="font-size:.75rem;color:#86868b;margin-bottom:.25rem">Decimal</div>
                <div style="font-size:1.1rem;font-weight:700;font-family:monospace" id="decResult"></div>
            </div>
            <div style="background:#f5f5f7;padding:1rem;border-radius:8px">
                <div style="font-size:.75rem;color:#86868b;margin-bottom:.25rem">Binary</div>
                <div style="font-size:1.1rem;font-weight:700;font-family:monospace;word-break:break-all" id="binResult"></div>
            </div>
            <div style="background:#f5f5f7;padding:1rem;border-radius:8px">
                <div style="font-size:.75rem;color:#86868b;margin-bottom:.25rem">Octal</div>
                <div style="font-size:1.1rem;font-weight:700;font-family:monospace" id="octResult"></div>
            </div>
            <div style="background:#f5f5f7;padding:1rem;border-radius:8px">
                <div style="font-size:.75rem;color:#86868b;margin-bottom:.25rem">Hexadecimal</div>
                <div style="font-size:1.1rem;font-weight:700;font-family:monospace" id="hexResult"></div>
            </div>
        </div>
    </div>
</div>

<script>
function convertBase() {
    const input = document.getElementById('baseInput').value.trim();
    const fromBase = parseInt(document.getElementById('baseFrom').value);
    
    if (!input) {
        alert('Please enter a number');
        return;
    }
    
    try {
        const decimal = parseInt(input, fromBase);
        
        if (isNaN(decimal)) {
            alert('Invalid number for the selected base');
            return;
        }
        
        document.getElementById('decResult').textContent = decimal.toString(10);
        document.getElementById('binResult').textContent = decimal.toString(2);
        document.getElementById('octResult').textContent = decimal.toString(8);
        document.getElementById('hexResult').textContent = decimal.toString(16).toUpperCase();
        document.getElementById('baseResult').style.display = 'block';
    } catch (e) {
        alert('Error converting: ' + e.message);
    }
}
</script>''',

    'image-to-base64.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Image to Base64 Converter</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Select Image</label>
    <input type="file" id="imageInput" accept="image/*" style="width:100%;padding:.7rem .85rem;font-size:.95rem;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;margin-bottom:1rem" onchange="convertImage()">
    <div id="imageResult" style="margin-top:1.5rem;display:none">
        <div style="text-align:center;margin-bottom:1rem">
            <img id="imagePreview" style="max-width:100%;max-height:300px;border-radius:8px;border:1px solid rgba(0,0,0,.08)">
        </div>
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Base64 String</label>
        <textarea id="base64Output" readonly style="width:100%;min-height:150px;padding:1rem;font-size:.75rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:.75rem"></textarea>
        <button onclick="copyBase64()" style="padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem;width:100%">Copy to Clipboard</button>
    </div>
</div>

<script>
function convertImage() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        document.getElementById('imagePreview').src = base64;
        document.getElementById('base64Output').value = base64;
        document.getElementById('imageResult').style.display = 'block';
    };
    reader.readAsDataURL(file);
}

function copyBase64() {
    const output = document.getElementById('base64Output');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}
</script>''',

    'json-to-csv.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">JSON to CSV Converter</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Input JSON (Array of Objects)</label>
    <textarea id="jsonInput" placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]' style="width:100%;min-height:200px;padding:1rem;font-size:.9rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem"></textarea>
    <button onclick="convertToCSV()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Convert to CSV</button>
    <div id="csvResult" style="margin-top:1.5rem;display:none">
        <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">CSV Output</label>
        <textarea id="csvOutput" readonly style="width:100%;min-height:150px;padding:1rem;font-size:.85rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:.75rem"></textarea>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
            <button onclick="copyCSV()" style="padding:.6rem 1.5rem;background:#22c55e;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Copy</button>
            <button onclick="downloadCSV()" style="padding:.6rem 1.5rem;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:600;cursor:pointer;font-size:.85rem">Download CSV</button>
        </div>
    </div>
</div>

<script>
function convertToCSV() {
    const json = document.getElementById('jsonInput').value.trim();
    if (!json) {
        alert('Please enter JSON data');
        return;
    }
    
    try {
        const data = JSON.parse(json);
        
        if (!Array.isArray(data) || data.length === 0) {
            alert('JSON must be a non-empty array of objects');
            return;
        }
        
        // Get headers from first object
        const headers = Object.keys(data[0]);
        let csv = headers.join(',') + '\\n';
        
        // Add rows
        data.forEach(row => {
            const values = headers.map(header => {
                const val = row[header] === null || row[header] === undefined ? '' : String(row[header]);
                // Escape commas and quotes
                return val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val;
            });
            csv += values.join(',') + '\\n';
        });
        
        document.getElementById('csvOutput').value = csv;
        document.getElementById('csvResult').style.display = 'block';
    } catch (e) {
        alert('Invalid JSON: ' + e.message);
    }
}

function copyCSV() {
    const output = document.getElementById('csvOutput');
    output.select();
    navigator.clipboard.writeText(output.value).then(() => {
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = original, 2000);
    });
}

function downloadCSV() {
    const csv = document.getElementById('csvOutput').value;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}
</script>''',

    'regex-tester.html': '''<div class="card" style="background:white;border:1px solid rgba(0,0,0,.08);border-radius:16px;padding:2rem;box-shadow:0 2px 12px rgba(0,0,0,.06);margin-bottom:1.5rem">
    <h2 style="font-size:1.1rem;font-weight:700;margin-bottom:1.25rem">Regex Tester</h2>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Regular Expression</label>
    <div style="display:flex;gap:.5rem;margin-bottom:1rem">
        <input type="text" id="regexInput" placeholder="\\w+@\\w+\\.\\w+" style="flex:1;padding:.7rem .85rem;font-size:.95rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px">
        <div style="display:flex;gap:.5rem;align-items:center;padding:0 .5rem">
            <label style="display:flex;align-items:center;gap:.25rem;font-size:.85rem;cursor:pointer">
                <input type="checkbox" id="flagG" checked> g
            </label>
            <label style="display:flex;align-items:center;gap:.25rem;font-size:.85rem;cursor:pointer">
                <input type="checkbox" id="flagI"> i
            </label>
            <label style="display:flex;align-items:center;gap:.25rem;font-size:.85rem;cursor:pointer">
                <input type="checkbox" id="flagM"> m
            </label>
        </div>
    </div>
    <label style="font-size:.78rem;font-weight:600;color:#424245;display:block;margin-bottom:.3rem">Test String</label>
    <textarea id="testString" placeholder="Enter text to test..." style="width:100%;min-height:150px;padding:1rem;font-size:.95rem;font-family:monospace;background:#f5f5f7;border:1px solid rgba(0,0,0,.08);border-radius:8px;resize:vertical;margin-bottom:1rem" oninput="testRegex()"></textarea>
    <button onclick="testRegex()" style="padding:.75rem 2rem;background:#0071e3;color:#fff;border:none;border-radius:12px;font-weight:600;cursor:pointer;font-size:.95rem;width:100%">Test Regex</button>
    <div id="regexResult" style="margin-top:1.5rem;display:none">
        <div style="background:#f5f5f7;padding:1rem;border-radius:8px;margin-bottom:.75rem">
            <div style="font-size:.85rem;color:#424245;margin-bottom:.5rem"><strong id="matchCount"></strong></div>
            <div id="highlightedText" style="font-family:monospace;font-size:.9rem;line-height:1.6;white-space:pre-wrap;word-break:break-word"></div>
        </div>
        <div id="matches" style="background:#fff;border:1px solid rgba(0,0,0,.08);border-radius:8px;padding:1rem;max-height:200px;overflow:auto;font-family:monospace;font-size:.85rem"></div>
    </div>
</div>

<script>
function testRegex() {
    const regexStr = document.getElementById('regexInput').value;
    const testStr = document.getElementById('testString').value;
    
    if (!regexStr || !testStr) return;
    
    try {
        let flags = '';
        if (document.getElementById('flagG').checked) flags += 'g';
        if (document.getElementById('flagI').checked) flags += 'i';
        if (document.getElementById('flagM').checked) flags += 'm';
        
        const regex = new RegExp(regexStr, flags);
        const matches = [...testStr.matchAll(new RegExp(regexStr, flags + (flags.includes('g') ? '' : 'g')))];
        
        if (matches.length === 0) {
            document.getElementById('matchCount').innerHTML = '<span style="color:#ef4444">No matches found</span>';
            document.getElementById('highlightedText').textContent = testStr;
            document.getElementById('matches').innerHTML = '<div style="color:#86868b">No matches</div>';
        } else {
            document.getElementById('matchCount').innerHTML = `<span style="color:#22c55e">${matches.length} match${matches.length > 1 ? 'es' : ''} found</span>`;
            
            // Highlight matches
            let highlighted = testStr;
            const sortedMatches = matches.sort((a, b) => b.index - a.index);
            sortedMatches.forEach(match => {
                const before = highlighted.substring(0, match.index);
                const matched = highlighted.substring(match.index, match.index + match[0].length);
                const after = highlighted.substring(match.index + match[0].length);
                highlighted = before + '<span style="background:#ffeb3b;padding:0 2px;border-radius:2px">' + matched + '</span>' + after;
            });
            document.getElementById('highlightedText').innerHTML = highlighted;
            
            // Show matches list
            const matchList = matches.map((m, i) => 
                `<div style="padding:.5rem;border-bottom:1px solid rgba(0,0,0,.08)">
                    <strong style="color:#0071e3">Match ${i + 1}:</strong> ${m[0]}
                    <span style="color:#86868b;font-size:.8rem"> (index: ${m.index})</span>
                </div>`
            ).join('');
            document.getElementById('matches').innerHTML = matchList;
        }
        
        document.getElementById('regexResult').style.display = 'block';
    } catch (e) {
        document.getElementById('matchCount').innerHTML = '<span style="color:#ef4444">Invalid regex: ' + e.message + '</span>';
        document.getElementById('highlightedText').textContent = testStr;
        document.getElementById('matches').innerHTML = '';
        document.getElementById('regexResult').style.display = 'block';
    }
}

// Auto-test on input
document.getElementById('regexInput').addEventListener('input', testRegex);
document.getElementById('flagG').addEventListener('change', testRegex);
document.getElementById('flagI').addEventListener('change', testRegex);
document.getElementById('flagM').addEventListener('change', testRegex);
</script>'''
}

def fix_page(filename):
    """Fix a single HTML page by injecting the calculator."""
    filepath = filename
    
    if filename not in calculators:
        print(f"⚠️  No calculator defined for {filename}")
        return False
    
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already fixed
        if '<script>' in content and 'function ' in content and 'id="toolContent"></div>' not in content:
            print(f"✓ {filename} already has a calculator")
            return True
        
        # Replace empty toolContent div
        empty_div = '<div class="tool-content" id="toolContent"></div>'
        if empty_div not in content:
            print(f"⚠️  {filename} doesn't have empty toolContent div")
            return False
        
        new_content = content.replace(empty_div, calculators[filename])
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"✅ Fixed {filename}")
        return True
        
    except Exception as e:
        print(f"❌ Error fixing {filename}: {e}")
        return False

def main():
    print("Starting calculator injection...\n")
    
    fixed = 0
    failed = 0
    
    for filename in calculators.keys():
        if fix_page(filename):
            fixed += 1
        else:
            failed += 1
    
    print(f"\n📊 Summary:")
    print(f"   ✅ Fixed: {fixed}")
    print(f"   ❌ Failed: {failed}")
    print(f"   📝 Total: {fixed + failed}")

if __name__ == '__main__':
    main()
