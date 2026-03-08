const fs = require('fs');

// Add affiliate recommendations to password generator
const passwordGenPath = 'password-generator.html';
if (fs.existsSync(passwordGenPath)) {
  let content = fs.readFileSync(passwordGenPath, 'utf8');
  
  const affiliateSection = `
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">
            <h3 style="margin-top: 0; color: white;">🔐 Recommended Password Managers</h3>
            <p>Don't remember passwords manually - use a secure password manager:</p>
            <ul style="list-style: none; padding: 0;">
                <li style="margin: 1rem 0; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <strong>1Password</strong> - Best overall password manager. Store unlimited passwords, credit cards, and secure notes. 
                    <a href="https://1password.com" target="_blank" rel="noopener" style="color: #fff; text-decoration: underline;">Try 1Password →</a>
                </li>
                <li style="margin: 1rem 0; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <strong>Bitwarden</strong> - Best free option. Open source, unlimited passwords on all devices. 
                    <a href="https://bitwarden.com" target="_blank" rel="noopener" style="color: #fff; text-decoration: underline;">Try Bitwarden →</a>
                </li>
                <li style="margin: 1rem 0; padding: 1rem; background: rgba(255,255,255,0.1); border-radius: 8px;">
                    <strong>NordPass</strong> - From the makers of NordVPN. Secure password storage with breach monitoring. 
                    <a href="https://nordpass.com" target="_blank" rel="noopener" style="color: #fff; text-decoration: underline;">Try NordPass →</a>
                </li>
            </ul>
        </div>`;
  
  // Insert before the last closing div
  content = content.replace('</body>', affiliateSection + '\n</body>');
  fs.writeFileSync(passwordGenPath, content);
  console.log('✓ Added affiliate links to password-generator.html');
}

console.log('\n✅ Affiliate links added to high-value pages');
console.log('Note: Sign up for affiliate programs to monetize these links:');
console.log('- 1Password Affiliate Program');
console.log('- Bitwarden (no affiliate program, but good for users)');
console.log('- NordPass Affiliate Program');
