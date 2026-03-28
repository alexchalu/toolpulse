#!/usr/bin/env python3
"""
Fix Bugs #9 and #13 for convert-*.html files.

Bug #9: Missing event listeners on converter input fields.
  - Scans all converter files for function definitions (doConvert, convert, calc, calculate)
    without corresponding event listeners. Adds addEventListener('input', ...) if missing.

Bug #13: Wrong disclaimer text on conversion pages.
  - Current (442 files): "...While every effort is made for accuracy, please verify critical
    calculations independently. CalcLeap is not liable for decisions made based on these results."
  - Current (4 files): Medical disclaimer on calorie/joule converters (wrong context)
  - Target: "Values are calculated using standard conversion factors. CalcLeap provides these
    tools for informational and educational purposes."
"""
import glob, re, os, sys

DESIRED_DISCLAIMER = '<div class="calc-disclaimer" style="margin:1.5rem 0;padding:1rem 1.25rem;background:#fff8e1;border-left:4px solid #f59e0b;border-radius:0 8px 8px 0;font-size:.85rem;line-height:1.6;color:#92400e"><strong>ℹ️ Note:</strong> Values are calculated using standard conversion factors. CalcLeap provides these tools for informational and educational purposes.</div>'

def check_event_listeners(filepath, content):
    """Check if converter has proper event handling. Returns (is_broken, fix_info)."""
    # Find defined converter functions
    defined_funcs = re.findall(r'function\s+(doConvert|convert|calc|calculate)\s*\(', content)
    if not defined_funcs:
        return False, None
    
    # Check for any input-related event handling
    has_oninput = bool(re.search(r'oninput="(doConvert|convert|calc|calculate)\(\)"', content))
    has_input_listener = bool(re.search(r"addEventListener\('input'", content))
    has_keyup_listener = bool(re.search(r"addEventListener\('keyup'", content))
    has_change_listener = bool(re.search(r"addEventListener\('change'", content))
    
    if has_oninput or has_input_listener or has_keyup_listener or has_change_listener:
        return False, None
    
    # Broken: has function but no event wiring
    return True, defined_funcs[0]


def fix_event_listener(content, func_name):
    """Add addEventListener for the converter function."""
    # Find the input element id
    input_match = re.search(r'<input[^>]*id="([^"]+)"[^>]*type="number"', content)
    if not input_match:
        input_match = re.search(r'<input[^>]*type="number"[^>]*id="([^"]+)"', content)
    
    if not input_match:
        return content, False
    
    input_id = input_match.group(1)
    
    # Add addEventListener right after the function definition's closing
    listener_code = f"\n        document.getElementById('{input_id}').addEventListener('input', {func_name});\n"
    
    # Find the </script> tag and insert before it
    content = content.replace('</script>', listener_code + '    </script>', 1)
    return content, True


def fix_disclaimer(content):
    """Replace disclaimer div with the correct text."""
    # Match the entire calc-disclaimer div
    pattern = r'<div class="calc-disclaimer"[^>]*>.*?</div>'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        return content, False
    
    old_text = match.group(0)
    if old_text == DESIRED_DISCLAIMER:
        return content, False  # Already correct
    
    content = content.replace(old_text, DESIRED_DISCLAIMER)
    return content, True


def main():
    files = sorted(glob.glob('convert-*.html'))
    print(f"Scanning {len(files)} converter files...\n")
    
    bug9_fixes = 0
    bug13_fixes = 0
    bug9_broken = []
    bug13_changed = []
    errors = []
    
    for f in files:
        with open(f, 'r') as fh:
            original = fh.read()
        
        content = original
        
        # Bug #9: Check and fix event listeners
        is_broken, func_name = check_event_listeners(f, content)
        if is_broken:
            content, fixed = fix_event_listener(content, func_name)
            if fixed:
                bug9_fixes += 1
                bug9_broken.append(f)
            else:
                errors.append(f"Bug9: Could not fix {f} (no input id found)")
        
        # Bug #13: Fix disclaimer text
        content, disclaimer_fixed = fix_disclaimer(content)
        if disclaimer_fixed:
            bug13_fixes += 1
            bug13_changed.append(f)
        
        # Write back if changed
        if content != original:
            with open(f, 'w') as fh:
                fh.write(content)
    
    # Report
    print("=" * 60)
    print("BUG #9: Missing Event Listeners")
    print("=" * 60)
    if bug9_broken:
        print(f"Fixed {bug9_fixes} files:")
        for f in bug9_broken:
            print(f"  ✅ {f}")
    else:
        print("No broken files found — all converter files have proper event handling.")
    
    print()
    print("=" * 60)
    print("BUG #13: Wrong Disclaimer Text")
    print("=" * 60)
    print(f"Fixed {bug13_fixes} files.")
    if bug13_changed[:10]:
        print("Examples:")
        for f in bug13_changed[:10]:
            print(f"  ✅ {f}")
        if len(bug13_changed) > 10:
            print(f"  ... and {len(bug13_changed) - 10} more")
    
    if errors:
        print()
        print("⚠️ Errors:")
        for e in errors:
            print(f"  {e}")
    
    print(f"\nTotal: Bug#9={bug9_fixes} fixes, Bug#13={bug13_fixes} fixes")
    return bug9_fixes, bug13_fixes


if __name__ == '__main__':
    main()
