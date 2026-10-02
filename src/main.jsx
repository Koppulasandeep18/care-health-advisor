import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, CalendarCheck, Check, ChevronDown, ChevronRight, FileText,
  HeartHandshake, HeartPulse, Mail, MapPin, Menu, MessageCircle, Phone,
  ShieldCheck, Stethoscope, UserRound, X
} from 'lucide-react';
import './styles.css';

const WHATSAPP = 'https://wa.me/919966383831';
const PHONE = 'tel:+919966383831';
const EMAIL = 'mailto:padmamerugu9158@gmail.com';

const plans = [
  { title: 'Individual Health Plans', text: 'Coverage options designed around individual healthcare needs.', icon: UserRound },
  { title: 'Family Floater Plans', text: 'Explore options for protecting multiple family members under one plan.', icon: HeartHandshake },
  { title: 'Senior Citizen Plans', text: 'Plan options intended for senior citizens, subject to eligibility and terms.', icon: Stethoscope },
  { title: 'Critical Illness Plans', text: 'Explore specified critical illness protection and applicable benefits.', icon: HeartPulse },
];

const products = [
  { name: 'Care Supreme', tag: 'Popular', desc: 'A comprehensive health insurance option with multiple features, subject to policy terms.', bullets: ['Cumulative bonus features', 'Automatic recharge features', 'Modern & conventional treatment coverage'] },
  { name: 'Ultimate Care', tag: 'Featured', desc: 'A health plan with coverage-growth and wellness-oriented features, subject to policy terms.', bullets: ['Cumulative / infinity bonus features', 'Automatic recharge features', 'Health and wellness benefits'] },
  { name: 'Care Advantage', tag: 'Higher Cover', desc: 'Higher sum-insured options for customers looking to explore broader coverage.', bullets: ['Higher sum-insured options', 'Automatic recharge', 'Plan-specific additional benefits'] },
  { name: 'Ultimate Care Senior', tag: 'Senior', desc: 'A senior-focused option with benefits and eligibility defined by the applicable policy.', bullets: ['Senior-focused coverage', 'Renewal-related benefits', 'Plan-specific care features'] },
];

const faqs = [
  ['What is health insurance?', 'Health insurance helps cover eligible healthcare expenses according to the selected policy. Coverage, limits, waiting periods and exclusions depend on the plan and policy wording.'],
  ['What is a cashless claim?', 'At an eligible network hospital, covered expenses may be settled directly with the hospital after the required process, subject to policy terms and pre-authorisation.'],
  ['What is a waiting period?', 'A waiting period is a specified time before certain benefits or conditions become eligible for coverage. The period varies by product and condition.'],
  ['Can the advisor help with claims?', 'The advisor can help you understand the process and documents. Claim approval and settlement remain subject to the insurer, policy terms and claim assessment.'],
  ['How do I choose a suitable plan?', 'Consider age, family members, medical history, desired coverage, budget, waiting periods, exclusions and preferred hospitals. The advisor can explain available options.'],
];

function App() {
  const [openFaq, setOpenFaq] = useState(null);
  const [modal, setModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [submitState, setSubmitState] = useState({ loading: false, success: '', error: '' });

  const closeMenu = () => setMobileOpen(false);
  const submit = async (e) => {
    e.preventDefault();
    setSubmitState({ loading: true, success: '', error: '' });

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get('name') || '').trim(),
      mobile: String(data.get('mobile') || '').trim(),
      requirement: String(data.get('requirement') || '').trim(),
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Unable to submit your enquiry.');
      }

      // MongoDB save successful → open WhatsApp with the lead details pre-filled.
      const whatsappNumber = '919966383831';

      const whatsappMessage = `🔔 New Website Lead

Name: ${payload.name}
Mobile: ${payload.mobile}
Requirement: ${payload.requirement}

Source: Website
Please contact this customer.`;

      const whatsappUrl =
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

      setSubmitState({
        loading: false,
        success: 'Enquiry submitted successfully. WhatsApp is opening...',
        error: '',
      });

      form.reset();

      // Open WhatsApp only after the lead is successfully saved in MongoDB.
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (error) {
      setSubmitState({
        loading: false,
        success: '',
        error: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="site-shell">
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#top" onClick={closeMenu}>
            <img src="/care-logo.png" alt="Care Health Insurance" />
          </a>
          <nav className={mobileOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#plans" onClick={closeMenu}>Plans</a>
            <a href="#advisor" onClick={closeMenu}>Advisor</a>
            <a href="#claims" onClick={closeMenu}>Claims</a>
            <a href="#faq" onClick={closeMenu}>FAQs</a>
            <a className="mobile-wa" href={WHATSAPP} target="_blank" rel="noreferrer" onClick={closeMenu}><MessageCircle size={17}/> WhatsApp</a>
          </nav>
          <a className="header-wa" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a>
          <button className="menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">
            {mobileOpen ? <X size={22}/> : <Menu size={22}/>} 
          </button>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-orb orb-one"/><div className="hero-orb orb-two"/>
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><ShieldCheck size={16}/> PERSONALIZED INSURANCE GUIDANCE</div>
              <h1>Protect your <strong>health.</strong><br/><span>Protect your family.</span></h1>
              <p className="hero-lead">Understand your health insurance options with personalized guidance from <b>Nagaraju Merugu</b>, a Care Health Insurance Advisor.</p>
              <div className="hero-actions">
                <button className="btn btn-primary" onClick={() => setModal(true)}>Get a Free Consultation <ArrowRight size={18}/></button>
                <a className="btn btn-light" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp</a>
              </div>
              <div className="trust-line">
                <span><Check size={15}/> Clear guidance</span>
                <span><Check size={15}/> Policy assistance</span>
                <span><Check size={15}/> Renewal support</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="family-illustration" aria-hidden="true">
                <div className="blob blob-back"/><div className="blob blob-main"/>
                <div className="person person-one"><i/></div>
                <div className="person person-two"><i/></div>
                <div className="person person-three"><i/></div>
                <div className="family-label"><HeartPulse size={19}/><div><b>Health-first guidance</b><small>Plans explained in simple language</small></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="container trust-strip-grid">
            <div><div className="trust-icon blue"><UserRound size={22}/></div><div><b>Personalized Plan Guidance</b><span>Understand available options clearly.</span></div></div>
            <div><div className="trust-icon green"><FileText size={22}/></div><div><b>Policy Assistance</b><span>Help with documents and next steps.</span></div></div>
            <div><div className="trust-icon gold"><HeartPulse size={22}/></div><div><b>Claim Process Guidance</b><span>Understand the process and documents.</span></div></div>
            <div><div className="trust-icon purple"><HeartHandshake size={22}/></div><div><b>Ongoing Customer Support</b><span>Stay connected for service queries.</span></div></div>
          </div>
        </section>

        <section id="advisor" className="section advisor-section">
          <div className="container advisor-layout">
            <div className="section-copy">
              <span className="section-kicker">ABOUT YOUR ADVISOR</span>
              <h2>Health insurance, explained in simple language.</h2>
              <p>Buying health insurance can involve terms, exclusions, waiting periods and coverage choices. The goal here is to make those details easier to understand before you make a purchase decision.</p>
              <div className="check-grid">
                <div><Check size={18}/><b>Transparent guidance</b><span>Understand benefits, exclusions and key conditions.</span></div>
                <div><Check size={18}/><b>Family-focused support</b><span>Discuss individual, family and senior requirements.</span></div>
                <div><Check size={18}/><b>Policy assistance</b><span>Help understanding forms and policy documents.</span></div>
                <div><Check size={18}/><b>Follow-up support</b><span>Assistance for renewals and service queries.</span></div>
              </div>
            </div>
            <div className="advisor-profile-card">
              <div className="profile-glow"/>
              <div className="portrait-large"><img src="/nagaraju-merugu.jpg" alt="Nagaraju Merugu - Care Health Insurance Advisor"/></div>
              <span className="profile-role">CARE HEALTH INSURANCE ADVISOR</span>
              <h3>Nagaraju Merugu</h3>
              <p className="profile-note">Personalized assistance for health insurance enquiries and policy-related guidance.</p>
              <div className="profile-data">
                <div><span>License / Agency No.</span><b>21008671</b></div>
                <div><span>Service Area</span><b>Secunderabad & Hyderabad</b></div>
                <div><span>Email</span><b>padmamerugu9158@gmail.com</b></div>
              </div>
              <div className="profile-actions"><a href={PHONE} className="btn btn-primary"><Phone size={17}/> Call</a><a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle size={17}/> WhatsApp</a></div>
            </div>
          </div>
        </section>

        <section className="section light-section">
          <div className="container">
            <div className="center-head"><span className="section-kicker">WHY HEALTH INSURANCE</span><h2>Protection designed around real-life needs.</h2><p>Explore the areas that matter when choosing a health insurance policy.</p></div>
            <div className="benefits-grid">
              <div className="benefit"><Stethoscope/><h3>Hospitalisation</h3><p>Eligible hospitalisation expenses are covered according to the selected plan.</p></div>
              <div className="benefit"><HeartPulse/><h3>Health benefits</h3><p>Depending on the plan, benefits may include day care, AYUSH and advanced treatments.</p></div>
              <div className="benefit"><UserRound/><h3>Family options</h3><p>Explore individual and family-oriented plans for different requirements.</p></div>
              <div className="benefit"><ShieldCheck/><h3>Policy clarity</h3><p>Understand waiting periods, exclusions, limits and other important conditions.</p></div>
            </div>
          </div>
        </section>

        <section id="plans" className="section plans-section">
          <div className="container">
            <div className="section-heading-row"><div><span className="section-kicker">HEALTH INSURANCE PLANS</span><h2>Explore plans by need.</h2><p>Product availability, benefits and terms depend on the applicable policy documents.</p></div><a href="https://www.careinsurance.com/health-insurance/individual-health-insurance" target="_blank" rel="noreferrer">View official plans <ArrowRight size={17}/></a></div>
            <div className="plan-category-grid">{plans.map(({title,text,icon:Icon}) => <article className="plan-category" key={title}><div className="category-icon"><Icon size={23}/></div><div><h3>{title}</h3><p>{text}</p></div><ChevronRight size={20}/></article>)}</div>
            <div className="product-heading"><h3>Selected plan examples</h3><span>Check the latest official brochure before purchase.</span></div>
            <div className="product-grid">{products.map((p, i) => <article className="product-card" key={p.name}><div className="product-top"><span className="tag">{p.tag}</span><span className="product-number">0{i+1}</span></div><h3>{p.name}</h3><p>{p.desc}</p><ul>{p.bullets.map(b => <li key={b}><Check size={15}/>{b}</li>)}</ul><div className="product-actions"><button onClick={() => setModal(true)}>Get Assistance <ArrowRight size={16}/></button><a href="https://www.careinsurance.com/other-downloads.html" target="_blank" rel="noreferrer">Official documents</a></div></article>)}</div>
          </div>
        </section>

        <section id="claims" className="section claims-section">
          <div className="container">
            <div className="center-head"><span className="section-kicker">CLAIM ASSISTANCE</span><h2>Guidance through the claim journey.</h2><p>The advisor can explain the process; claim decisions remain subject to the insurer, policy terms and assessment.</p></div>
            <div className="claim-steps">
              <div><span>01</span><h3>Inform the insurer</h3><p>Start the claim process through the applicable insurer channel.</p></div>
              <div><span>02</span><h3>Submit documents</h3><p>Provide the medical and identification documents requested.</p></div>
              <div><span>03</span><h3>Assessment</h3><p>The insurer reviews the request under the applicable process.</p></div>
              <div><span>04</span><h3>Decision & settlement</h3><p>Settlement depends on coverage, exclusions and claim assessment.</p></div>
            </div>
            <div className="claim-callout"><div className="callout-icon"><MapPin size={22}/></div><div><b>Looking for a network hospital?</b><span>Use the latest official hospital-network information before visiting.</span></div><a href="https://www.careinsurance.com/health-plan-network-hospitals.html" target="_blank" rel="noreferrer">Open locator <ChevronRight size={16}/></a></div>
          </div>
        </section>

        <section id="faq" className="section faq-section">
          <div className="container faq-wrap"><div className="center-head"><span className="section-kicker">FAQS</span><h2>Questions, answered clearly.</h2></div><div className="faq-list">{faqs.map(([q,a], i) => <div className={openFaq===i?'faq-item open':'faq-item'} key={q}><button onClick={() => setOpenFaq(openFaq===i?null:i)}><span>{q}</span><ChevronDown size={20}/></button>{openFaq===i && <div className="faq-answer">{a}</div>}</div>)}</div></div>
        </section>

        <section className="cta-section"><div className="container"><div className="cta-card"><div><span className="section-kicker">READY WHEN YOU ARE</span><h2>Let’s make your health insurance easier to understand.</h2><p>Speak with Nagaraju Merugu for personalized guidance based on your requirements.</p></div><div className="cta-actions"><button className="btn btn-primary" onClick={() => setModal(true)}>Get a Free Consultation <ArrowRight size={18}/></button><a className="btn btn-whatsapp" href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Talk on WhatsApp</a></div></div></div></section>
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div><img src="/care-logo.png" className="footer-logo" alt="Care Health Insurance"/><h3>Nagaraju Merugu</h3><p>Care Health Insurance Advisor</p><div className="footer-contact"><a href={PHONE}><Phone size={16}/> 99663 83831</a><a href={EMAIL}><Mail size={16}/> padmamerugu9158@gmail.com</a><span><MapPin size={16}/> Secunderabad & Hyderabad</span></div></div>
          <div><h4>Explore</h4><a href="#plans">Plans</a><a href="#advisor">Advisor</a><a href="#claims">Claims</a><a href="#faq">FAQs</a></div>
          <div><h4>Support</h4><a href={WHATSAPP} target="_blank" rel="noreferrer">WhatsApp</a><a href={PHONE}>Call Advisor</a><button onClick={() => setModal(true)}>Book a Consultation</button></div>
          <div><h4>Important</h4><a href="https://www.careinsurance.com/other-downloads.html" target="_blank" rel="noreferrer">Official documents</a><a href="https://www.careinsurance.com/" target="_blank" rel="noreferrer">Care Health Insurance</a><a href="#top">Back to top</a></div>
        </div>
        <div className="container disclaimer"><b>Important:</b> Insurance is the subject matter of solicitation. Product benefits, coverage, exclusions, waiting periods, premiums and other terms are subject to the applicable policy wording, prospectus and terms & conditions. The advisor does not guarantee claim approval or settlement.</div>
        <div className="copyright">© {new Date().getFullYear()} Nagaraju Merugu. All rights reserved.</div>
      </footer>

      {modal && <div className="modal-backdrop" onMouseDown={() => setModal(false)}><div className="modal" onMouseDown={e => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(false)} aria-label="Close"><X size={19}/></button><span className="section-kicker">FREE CONSULTATION</span><h2>Tell us what you need.</h2><p>Share your details and connect with the advisor.</p><form onSubmit={submit}>
  <input name="name" required maxLength="100" placeholder="Full name"/>
  <input name="mobile" required inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength="10" placeholder="Mobile number"/>
  <select name="requirement" defaultValue="" required>
    <option value="" disabled>Select requirement</option>
    <option>Individual health insurance</option>
    <option>Family health insurance</option>
    <option>Senior citizen</option>
    <option>Critical illness</option>
    <option>Other</option>
  </select>
  <button className="btn btn-primary" type="submit" disabled={submitState.loading}>
    {submitState.loading ? 'Submitting...' : 'Submit Enquiry'} {!submitState.loading && <ArrowRight size={17}/>}
  </button>
  {submitState.success && <div className="form-success" role="status">{submitState.success}</div>}
  {submitState.error && <div className="form-error" role="alert">{submitState.error}</div>}
</form>
<small>Your details are sent securely to the advisor enquiry system.</small></div></div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App/>);
