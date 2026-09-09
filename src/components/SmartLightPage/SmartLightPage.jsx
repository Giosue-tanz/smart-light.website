import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './SmartLightPage.css';

import BiciBg from '../../assets/bici1.jpg';
import CarpisaVideo from '../../assets/carpisa.mp4';
import Topografia from '../../assets/tech2.png';
import SmartPdf from '../../assets/Smartlight.pdf';
import CoverVideo from '../../assets/VideoC6.mp4';
import TechImg from '../../assets/tech.png';
import SmartLightNavbar from './SmartLightNavbar';
import SmartLightFooter from './SmartLightFooter';
import ProblemCoverVideo from '../../assets/VideoC3.mp4';
import HowItWorksVideo from '../../assets/VideoC6.mp4';
import BusinessModelVideo from '../../assets/VideoC5.mp4';
import CollabVideo from '../../assets/VideoCC.mp4';

export default function SmartLightPage() {
    const navigate = useNavigate();
    // Funzione scroll fluido
    const handleArrowClick = (targetSelector, extraOffset = 0) => {
        const section = document.querySelector(targetSelector);
        if (section) {
            const top = section.getBoundingClientRect().top + window.pageYOffset - extraOffset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    };



    // Scarica il PDF Smartlight.pdf dalla cartella assets
    const handleDownloadPdf = () => {
        // Use imported asset URL (Vite will replace with the correct path during build)
        const url = SmartPdf;
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Smartlight.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
    };

    // Apri la pagina contatti
    const handleRequestPartnership = () => {
        navigate('/contact');
    };

    useEffect(() => {
        // Ensure the page starts scrolled to top so the navbar begins transparent
        try { window.scrollTo(0, 0); } catch (e) { }
        // Preload assets programmatically to prioritize critical media
        try {
            const createPreload = (href, asType) => {
                if (!document.querySelector(`link[rel="preload"][href="${href}"]`)) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.href = href;
                    link.as = asType;
                    // optional: link.crossOrigin = 'anonymous';
                    document.head.appendChild(link);
                }
            };
            createPreload(Topografia, 'image');
            createPreload(BiciBg, 'image');
            // Removed CarpisaVideo preload to save bandwidth
        } catch (e) {
            // ignore
        }

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -25% 0px', // trigger when section nears viewport (earlier)
            threshold: 0 // trigger as soon as any part intersects
        };
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // add in-view immediately for smoother animation start
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target); // animazione solo la prima volta
                }
            });
        }, observerOptions);

        const targets = document.querySelectorAll('.observe-animate');
        targets.forEach(t => observer.observe(t));

        return () => observer.disconnect();
    }, []);

    return (
        <div id="smartlight-top" className="smartlight-container">
            {/* Preload background image to avoid delayed background rendering */}
            <img src={Topografia} alt="" style={{ display: 'none' }} loading="eager" fetchpriority="high" aria-hidden="true" />
            <SmartLightNavbar />
            {/* Cover in alto - ora con layout split */}
            <section id="smartlight-cover" className="smartlight-cover observe-animate" style={{ '--animate-delay': '0ms' }}>
                <video
                    src={CoverVideo}
                    className="smartlight-cover-video-bg"
                    onLoadedData={(e) => e.target.classList.add('loaded')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={Topografia}
                />
                <div className="smartlight-cover-overlay"></div>
                <div className="smartlight-cover-container">
                    <div className="smartlight-cover-content">
                        <h1 className="smartlight-cover-title">SMART LIGHT</h1>
                        <p className="smartlight-cover-desc">
                            L'evoluzione della gestione urbana inizia qui. Trasformiamo l'infrastruttura passiva in una rete neurale adattiva, capace di rispondere alle esigenze della città in tempo reale.
                        </p>
                        <button className="smartlight-cover-btn btn-down" onClick={() => handleArrowClick('#smartlight-combined-cover', 0)}>
                            MORE
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M12 19L6 13M12 19L18 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Update Notice Section - Minimalist & Standardized */}
            <section id="smartlight-update-notice" className="smartlight-cover observe-animate" style={{ '--animate-delay': '100ms', backgroundColor: '#050505', position: 'relative', minHeight: 'auto', padding: '140px 5vw', overflow: 'hidden' }}>
                
                {/* Subtle Colorful Glows for elegance */}
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(255,107,107,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(78,205,196,0.05) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 1, pointerEvents: 'none' }}></div>

                <div className="smartlight-update-container" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', zIndex: 2, position: 'relative', border: '2px solid #fff', borderRadius: '16px', padding: '70px', background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(10px)' }}>
                    <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '25px', display: 'block' }}>Project Update</span>
                    
                    <h2 className="smartlight-cover-title" style={{ fontSize: '3.6rem', marginBottom: '15px' }}>A Chapter Closes</h2>
                    <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '1rem', marginBottom: '50px', fontFamily: 'monospace', letterSpacing: '2px' }}>09/09/2026</p>
                    
                    <div className="smartlight-cover-desc" style={{ fontSize: '1.25rem', lineHeight: '1.8', color: 'rgba(255, 255, 255, 0.9)', display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left', fontWeight: '400', maxWidth: '100%', textTransform: 'none' }}>
                        <p>Every journey has its turning points. Smart Light was one of them — perhaps the most significant one so far.</p>
                        
                        <p>The project was born from a simple but urgent observation: traffic light systems in cities like Pisa are still managed with logic from decades ago, while the technology to change this exists today. The team designed a system based on computer vision, reinforcement learning and IoT sensors, capable of adapting traffic light cycles in real time — reducing waiting times, cutting emissions, and improving safety for pedestrians.</p>
                        
                        <p>We won a call for sustainable mobility. We presented at Bright 2025. We met with PISAMO, the Contamination Lab, and people who believed in the idea. It was real.</p>
                        
                        <p>And yet, today the team has decided to put the project on hold. Not because the idea wasn't valid — it still is. But because life moves forward: the path ahead leads toward a master's degree, new challenges, and new directions that require full commitment.</p>
                        
                        <p>Smart Light remains here, fully documented. The technical plan, the architecture, the research — it's all preserved. You can view the full source code and documentation on the <a href="https://github.com/Giosue-tanz/Smart-Light-pisa" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: '600' }}>GitHub repository</a>, and explore the dedicated <a href="https://giosue-tanz.github.io/smart-light.website/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline', fontWeight: '600' }}>project website</a>.</p>
                        
                        <p>If you're someone who sees potential in this project and wants to carry it forward, I'm open to a conversation. Don't hesitate to get in touch.</p>
                    </div>

                    <div style={{ marginTop: '70px' }}>
                        <button className="smartlight-cover-btn" onClick={() => navigate('/contact')}>
                            CONTACT US
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '20px', height: '20px', marginLeft: '10px' }}>
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Combined Cover - Goals + Problem/Opportunity (Video C3) */}
            <section id="smartlight-combined-cover" className="smartlight-cover observe-animate" style={{ '--animate-delay': '150ms' }}>
                <video
                    src={ProblemCoverVideo}
                    className="smartlight-cover-video-bg"
                    onLoadedData={(e) => e.target.classList.add('loaded')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={BiciBg}
                />
                <div className="smartlight-cover-overlay" style={{ background: 'rgba(10, 10, 10, 0.65)' }}></div>
                <div className="smartlight-cover-container combined-layout">
                    {/* Part 1: Goals */}
                    <div className="smartlight-cover-content-centered" style={{ marginBottom: '80px', marginTop: '60px' }}>
                        <h1 className="smartlight-cover-title">OBIETTIVO DEL PROGETTO</h1>
                        <div className="smartlight-cover-divider"></div>
                        <p className="smartlight-cover-desc" style={{ maxWidth: '900px' }}>
                            Ottimizzare i tempi di attesa e la sicurezza ai semafori urbani, migliorando la <strong>fluidità del traffico</strong> e garantendo la <strong>sicurezza dei pedoni</strong>. Il sistema utilizza <strong>intelligenza artificiale</strong> per una gestione dinamica e sostenibile.
                        </p>
                    </div>

                    {/* Part 2: Problem/Opportunity pillars */}
                    <div className="smartlight-dual-content">
                        <div className="smartlight-dual-column">
                            <h2 className="smartlight-dual-title">THE PROBLEM</h2>
                            <h3 className="smartlight-dual-subtitle">Inefficienza & Liability Ambientale</h3>
                            <ul className="smartlight-dual-list">
                                <li><strong>Asset Saturi</strong> I sistemi statici sprecano il 40% della capacità, creando colli di bottiglia artificiali.</li>
                                <li><strong>Rischio Normativo</strong> Multe ESG (Environmental, Social, and Governance) e pressioni Green Deal rendono lo "Stop-and-Go" una passività finanziaria.</li>
                                <li><strong>Dispersione Valore</strong> La congestione agisce come una tassa occulta su PIL, carburante e logistica urbana.</li>
                            </ul>
                        </div>
                        <div className="smartlight-dual-column">
                            <h2 className="smartlight-dual-title">THE OPPORTUNITY</h2>
                            <h3 className="smartlight-dual-subtitle">FLUSSI & MONETIZZAZIONE GREEN</h3>
                            <ul className="smartlight-dual-list">
                                <li><strong>DATA ASSET</strong> Trasformiamo ogni incrocio in un nodo di gestione dati (anonimi) ad alto valore per logistica, retail e urbanisti.</li>
                                <li><strong>UPGRADE</strong> Aumentiamo la capacità stradale via software su hardware esistente con ROI (Return on Investment) immediato.</li>
                                <li><strong>COMPLIANCE ESG</strong> KPI (Key Performance Indications) granulari per l'accesso a fondi «Green» e obiettivi di sostenibilità.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quarta Cover - Tecnologia */}
            <section id="smartlight-how-it-works-cover" className="smartlight-cover observe-animate tech-section" style={{ '--animate-delay': '210ms' }}>
                <img
                    src={Topografia}
                    alt=""
                    className="smartlight-cover-video-bg"
                    onLoad={(e) => e.target.classList.add('loaded')}
                    style={{ objectFit: 'cover' }}
                />
                <div className="smartlight-cover-container combined-layout">
                    {/* HUD Decorative Elements */}
                    <div className="smartlight-tech-hud-overlay">
                        <div className="hud-line scan-line"></div>
                        <div className="hud-corner top-left"></div>
                        <div className="hud-corner top-right"></div>
                        <div className="hud-corner bottom-left"></div>
                        <div className="hud-corner bottom-right"></div>
                        <div className="hud-stats">
                            <span className="stat-item">LAT: 43.7167° N</span>
                            <span className="stat-item">LNG: 10.4000° E</span>
                            <span className="stat-item">STATUS: AI_ACTIVE</span>
                        </div>
                    </div>

                    <div className="smartlight-tech-glass-card">
                        <div className="tech-card-glow"></div>
                        <h1 className="smartlight-tech-title">TECNOLOGIA</h1>
                        <div className="smartlight-tech-divider"></div>

                        <p className="smartlight-tech-main-description">
                            Trasformiamo i dati visivi in flussi urbani fluidi e sicuri tramite una rete neurale proprietaria addestrata su topologie reali.
                        </p>

                        <button
                            className="smartlight-cover-btn tech-btn-premium-solid"
                            onClick={() => navigate('/technology')}
                        >
                            ESPLORA
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Quinta Cover - Business Model */}
            <section id="smartlight-business-model" className="smartlight-cover observe-animate" style={{ '--animate-delay': '230ms' }}>
                <video
                    src={BusinessModelVideo}
                    className="smartlight-cover-video-bg"
                    onLoadedData={(e) => e.target.classList.add('loaded')}
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={BiciBg}
                />
                <div className="smartlight-cover-overlay" style={{ background: 'rgba(0, 0, 0, 0.6)' }}></div>
                <div className="smartlight-cover-container">
                    <div className="smartlight-cover-content-centered">
                        <h1 className="smartlight-cover-title">BUSINESS MODEL</h1>
                        <div className="smartlight-cover-divider" style={{ background: '#fff' }}></div>
                        <p className="smartlight-cover-desc">
                            SmartLight introduce il modello <strong>Safety as a Service (SaaS)</strong> per la mobilità urbana. Attraverso la <strong>monetizzazione dei flussi informativi</strong> e l'ottimizzazione neurale dei flussi, offriamo una soluzione con <strong>ROI accelerato</strong> e governance data-driven per le amministrazioni pubbliche.
                        </p>
                        <button className="smartlight-cover-btn btn-right" onClick={() => navigate('/business-plan')} style={{ marginTop: '40px' }}>
                            ESPLORA
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* Sezione Collaborazione */}
            <section id="smartlight-collab" className="smartlight-collab-section observe-animate" style={{ '--animate-delay': '250ms' }}>
                <video
                    src={CollabVideo}
                    className="smartlight-collab-video"
                    onLoadedData={(e) => e.target.classList.add('loaded')}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="smartlight-collab-overlay"></div>

                <div className="smartlight-collab-container">
                    <h2 className="smartlight-collab-title">CONTATTACI</h2>
                    <p className="smartlight-collab-desc">Unisciti al progetto SmartLight. Insieme possiamo creare una città più intelligente e sostenibile per tutti.</p>
                    <div className="smartlight-collab-actions">
                        <button className="smartlight-cover-btn btn-right" onClick={handleRequestPartnership}>
                            AGGIORNA LA CITTÀ
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                        <button className="smartlight-cover-btn btn-right" onClick={handleRequestPartnership}>
                            LAVORA CON NOI
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>
            <SmartLightFooter />
        </div>
    );
}
