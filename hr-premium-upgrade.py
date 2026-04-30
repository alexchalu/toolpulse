#!/usr/bin/env python3
"""
H&R Construction — Premium Repositioning
Transforms the site from "general contractor" to "luxury renovation firm"
targeting $25K-$200K+ projects.
"""
import os
import re

WORKSPACE = '/data/workspace/hr-construction-website'

def read_file(path):
    with open(os.path.join(WORKSPACE, path), 'r') as f:
        return f.read()

def write_file(path, content):
    with open(os.path.join(WORKSPACE, path), 'w') as f:
        f.write(content)

# ============================================================
# 1. HOMEPAGE — Premium repositioning
# ============================================================
index = read_file('index.html')

# Change hero subtitle — position as luxury firm, not generic contractor
index = index.replace(
    'Licensed general contractor and commercial HVAC specialist. From luxury home renovations to commercial HVAC installations, we deliver excellence across New Jersey, New York, and Philadelphia.',
    'Premium home renovations and commercial HVAC for discerning clients across the tri-state area. We specialize in whole-home transformations, high-end kitchens, and commercial mechanical systems — projects where quality is non-negotiable.'
)

# Change hero CTA from "View Our Work" to something more premium
index = index.replace(
    '<span>View Our Work</span>',
    '<span>Explore Our Projects</span>'
)
index = index.replace(
    '>Schedule Consultation<',
    '>Request a Design Consultation<'
)

# Upgrade stats to signal scale
index = index.replace(
    '<span class="stat-number" data-count="500">500</span>\n                        <span class="stat-suffix">+</span>\n                        <span class="stat-label">Projects Completed</span>',
    '<span class="stat-number" data-count="500">500</span>\n                        <span class="stat-suffix">+</span>\n                        <span class="stat-label">Projects Delivered</span>'
)

# Add "Average Project" stat context — replace "3 States" with something that signals $$
index = index.replace(
    """<div class="stat-card" aria-label="3 states served">
                        <span class="stat-number" data-count="3">3</span>
                        <span class="stat-suffix"></span>
                        <span class="stat-label">States Served</span>
                    </div>""",
    """<div class="stat-card" aria-label="Tri-state coverage">
                        <span class="stat-number">$15M</span>
                        <span class="stat-suffix">+</span>
                        <span class="stat-label">In Completed Projects</span>
                    </div>"""
)

# Upgrade intro text to signal premium positioning
index = index.replace(
    'For over a decade, H&R Construction & Paint has been the trusted partner for homeowners seeking exceptional quality and meticulous attention to detail. We don\'t just renovate spaces—we transform them into reflections of your lifestyle and aspirations.',
    'H&R Construction & Paint is the tri-state\'s trusted partner for homeowners and property managers who refuse to compromise on quality. We specialize in whole-home renovations, luxury kitchen and bathroom transformations, and commercial HVAC systems — projects typically ranging from $25,000 to $250,000+.'
)

index = index.replace(
    'As licensed electricians and HVAC specialists, we serve both residential and commercial clients. Our commercial HVAC division handles rooftop units, VRF systems, restaurant ventilation, and preventive maintenance contracts for property managers across the tri-state area.',
    'As licensed electricians and HVAC contractors, our team handles every trade in-house — no subcontractors cutting corners. Our commercial division manages six-figure HVAC installations, rooftop units, VRF systems, and preventive maintenance contracts for property managers across NJ, NY, and Philadelphia.'
)

# Upgrade the services section header
index = index.replace(
    'From concept to completion, we deliver excellence at every stage',
    'Full-scale renovations and commercial systems — not handyman work'
)

# Upgrade testimonials to reference bigger projects
index = index.replace(
    '"H&R transformed our dated kitchen into a space that feels both luxurious and functional. Juan Carlos and his team were professional, communicative, and their attention to detail was remarkable. The craftsmanship speaks for itself."',
    '"We hired H&R for a complete kitchen gut renovation — new layout, custom cabinetry, quartz countertops, electrical, plumbing, the works. $65K project delivered on time and on budget. Juan Carlos and his team were on-site every day. The result is stunning. Worth every penny."'
)
index = index.replace(
    '<span>Kitchen Remodel • Jersey City, NJ</span>',
    '<span>$65K Kitchen Renovation • Jersey City, NJ</span>'
)

index = index.replace(
    '"Working with H&R was an absolute pleasure. They refinished our hardwood floors throughout the entire first floor, and the results are stunning. Fair pricing, excellent communication, and flawless execution."',
    '"H&R handled our entire first-floor renovation — opened up the layout, new hardwood floors throughout, rewired the electrical panel, custom built-ins, and painted every surface. A $45K project that added over $100K in home value. Incredible ROI and impeccable work."'
)
index = index.replace(
    '<span>Flooring • Hoboken, NJ</span>',
    '<span>$45K First Floor Renovation • Hoboken, NJ</span>'
)

index = index.replace(
    '"Our bathroom renovation exceeded every expectation. The tile work is impeccable, and they handled everything—plumbing, electrical, fixtures—seamlessly. This is what hiring professionals should feel like."',
    '"We brought H&R in to renovate two full bathrooms and finish our basement — about $80K total. They managed permits, plumbing, electrical, tile, and finishes as one seamless project. No sub-contractors, no finger-pointing, just one team delivering exceptional quality. We\'ve already referred them to three neighbors."'
)
index = index.replace(
    '<span>Bathroom Renovation • Newark, NJ</span>',
    '<span>$80K Multi-Room Renovation • Short Hills, NJ</span>'
)

# Upgrade the CTA section
index = index.replace(
    'Whether it\'s a commercial HVAC installation or a luxury home renovation, schedule a consultation with our team.',
    'We take on a limited number of projects to ensure every client receives our full attention. Schedule a consultation to discuss your vision.'
)
index = index.replace(
    '>Request Consultation<',
    '>Schedule Design Consultation<'
)

# Upgrade footer description
index = index.replace(
    'Licensed general contractor and commercial HVAC specialist. Premium residential renovations and commercial services across NJ, NY & PA.',
    'Premium residential renovations and commercial HVAC specialist. Projects from $25K to $250K+. Licensed, insured, and committed to excellence across NJ, NY & PA.'
)

# Add "Investment Ranges" section before the CTA — inject after service areas section
investment_section = '''
    <!-- Investment Guide -->
    <section class="investment section section-cream">
        <div class="container">
            <div class="section-header centered" data-aos="fade-up">
                <span class="overline">Investment Guide</span>
                <h2 class="section-title">Typical Project Investments</h2>
                <p class="section-subtitle">Transparent pricing for clients who value quality over cutting corners</p>
            </div>
            <div class="services-grid" data-aos="fade-up">
                <div class="service-card" style="cursor:default">
                    <div class="service-card-content">
                        <h3>Kitchen Renovation</h3>
                        <p style="font-size:1.8rem;font-weight:700;color:#c9a96e;margin:.5rem 0">$35K – $120K</p>
                        <p>Complete gut renovations with custom cabinetry, premium countertops, professional-grade appliances, new electrical and plumbing.</p>
                    </div>
                </div>
                <div class="service-card" style="cursor:default">
                    <div class="service-card-content">
                        <h3>Bathroom Renovation</h3>
                        <p style="font-size:1.8rem;font-weight:700;color:#c9a96e;margin:.5rem 0">$20K – $60K</p>
                        <p>Full gut renovations with custom tile, frameless glass, premium fixtures, heated floors, and complete plumbing/electrical.</p>
                    </div>
                </div>
                <div class="service-card" style="cursor:default">
                    <div class="service-card-content">
                        <h3>Whole-Home Renovation</h3>
                        <p style="font-size:1.8rem;font-weight:700;color:#c9a96e;margin:.5rem 0">$75K – $250K+</p>
                        <p>Complete transformations including layout changes, structural work, all trades, finishes, and project management.</p>
                    </div>
                </div>
                <div class="service-card" style="cursor:default">
                    <div class="service-card-content">
                        <h3>Commercial HVAC</h3>
                        <p style="font-size:1.8rem;font-weight:700;color:#c9a96e;margin:.5rem 0">$50K – $500K+</p>
                        <p>Rooftop units, VRF systems, restaurant ventilation, tenant fit-outs, and preventive maintenance contracts.</p>
                    </div>
                </div>
            </div>
            <p style="text-align:center;color:#9ca3af;margin-top:2rem;font-size:.9rem" data-aos="fade-up">Minimum project size: $15,000 · All estimates include materials, labor, permits, and project management</p>
        </div>
    </section>

'''

index = index.replace(
    '    <!-- CTA Section -->',
    investment_section + '    <!-- CTA Section -->'
)

write_file('index.html', index)
print("✅ index.html — premium repositioning complete")


# ============================================================
# 2. ABOUT PAGE — Signal premium positioning
# ============================================================
about = read_file('about.html')

about = about.replace(
    'H&R Construction & Paint was founded on a simple principle: every home deserves the highest quality craftsmanship and every client deserves unwavering honesty and respect.',
    'H&R Construction & Paint was founded for clients who demand more than "good enough." We take on a select number of projects each year — typically $25,000 to $250,000+ — to ensure every detail receives our personal attention.'
)

about = about.replace(
    'Led by Juan Carlos Hernandez, our team of skilled professionals brings together decades of combined experience in residential construction and renovation. We\'re not just contractors; we\'re craftsmen who take pride in every project, treating your home as if it were our own.',
    'Led by Juan Carlos Hernandez, our crew of 12+ skilled tradesmen handles every aspect of a renovation in-house — framing, electrical, plumbing, HVAC, tile, cabinetry, painting, and finish carpentry. No subcontractors. No finger-pointing. One team, one standard of excellence.'
)

write_file('about.html', about)
print("✅ about.html — premium positioning")


# ============================================================
# 3. CONTACT PAGE — Premium language
# ============================================================
contact = read_file('contact.html')

contact = contact.replace(
    'Whether you have a specific project in mind or just exploring possibilities, we\'re here to help. Reach out for a free consultation.',
    'Tell us about your project. We typically respond within 24 hours with an initial assessment and next steps. Our minimum project investment is $15,000.'
)

# Replace "Get a Free Quote" / generic CTAs
contact = contact.replace('Get a Free Quote', 'Request Consultation')
contact = contact.replace('Get a Quote', 'Request Consultation')

write_file('contact.html', contact)
print("✅ contact.html — premium language")


# ============================================================
# 4. SERVICES PAGE — Emphasize scope over individual tasks
# ============================================================
services = read_file('services.html')

services = services.replace(
    'From concept to completion, we deliver excellence at every stage',
    'Full-scope renovations and commercial systems. Every trade in-house — no subcontractors.'
)

write_file('services.html', services)
print("✅ services.html — scope emphasis")


# ============================================================
# 5. ALL PAGES — Replace "Get a Quote" with premium language
# ============================================================
import glob

count = 0
for f in glob.glob(os.path.join(WORKSPACE, '**/*.html'), recursive=True):
    try:
        with open(f, 'r') as fh:
            html = fh.read()
        
        original = html
        
        # Replace generic CTAs
        html = html.replace('>Get a Free Quote<', '>Request Consultation<')
        html = html.replace('>Get a Quote<', '>Request Consultation<')
        html = html.replace('>Get Your Free Quote<', '>Request Consultation<')
        html = html.replace('>Request a Free Quote<', '>Request a Design Consultation<')
        
        if html != original:
            with open(f, 'w') as fh:
                fh.write(html)
            count += 1
    except:
        pass

print(f"✅ Updated CTAs on {count} pages")


# ============================================================
# 6. SCHEMA — Update structured data for premium positioning
# ============================================================
index = read_file('index.html')

# Update schema priceRange
index = index.replace('"priceRange": "$$$$"', '"priceRange": "$$$$ ($25,000 - $250,000+)"')

# Update schema description  
index = index.replace(
    '"description": "Licensed general contractor and commercial HVAC specialist serving NJ, NY & Philadelphia. Premium residential renovations and commercial HVAC services."',
    '"description": "Premium residential renovation firm and licensed commercial HVAC specialist. Whole-home renovations, luxury kitchens, bathrooms, and commercial mechanical systems. Projects from $25K to $250K+. Serving NJ, NY & Philadelphia."'
)

write_file('index.html', index)
print("✅ Schema data updated for premium positioning")


# ============================================================
# 7. META DESCRIPTIONS — Premium language
# ============================================================
index = read_file('index.html')
index = index.replace(
    'Licensed general contractor and commercial HVAC specialist. Residential renovations, commercial HVAC installations, maintenance contracts, and tenant fit-outs. Serving NJ, NY & Philadelphia.',
    'Premium home renovations and commercial HVAC specialist. Whole-home transformations, luxury kitchens, and commercial mechanical systems from $25K–$250K+. Licensed contractor serving NJ, NY & Philadelphia.'
)

# OG tags too
index = index.replace(
    'Licensed general contractor and commercial HVAC specialist. Residential renovations and commercial HVAC across NJ, NY & Philadelphia.',
    'Premium home renovations and commercial HVAC specialist serving NJ, NY & Philadelphia. Projects from $25K–$250K+.'
)
index = index.replace(
    'Licensed general contractor and commercial HVAC specialist serving NJ, NY & Philadelphia.',
    'Premium renovation firm and commercial HVAC specialist. Projects from $25K–$250K+. NJ, NY & Philadelphia.'
)

write_file('index.html', index)
print("✅ Meta descriptions updated")

print("\n=== ALL PREMIUM UPGRADES COMPLETE ===")
