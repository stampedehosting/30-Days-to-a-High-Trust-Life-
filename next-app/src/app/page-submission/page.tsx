"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function PageSubmissionPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Page Submission Process - TrustFlow";
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const submissionSteps = [
    {
      id: "step-1",
      step: "Step 1",
      week: "Week 1",
      title: "Complete Your Trust Factor Session",
      description: "Schedule and complete your 60-minute coaching session with Jeff Morris to discover your unique trust-building strengths.",
      icon: "▶"
    },
    {
      id: "step-2", 
      step: "Step 2",
      week: "Week 1-2",
      title: "Receive Your Assessment Results",
      description: "Get your personalized Behavioral SuperPowers® Profile and comprehensive Trust Factor insights and recommendations.",
      icon: "◉"
    },
    {
      id: "step-3",
      step: "Step 3", 
      week: "Week 2",
      title: "Submit Your Content",
      description: "Provide your trust quote, contemplation, Reflective Question, and professional bio using our guided templates.",
      icon: "✎"
    },
    {
      id: "step-4",
      step: "Step 4",
      week: "Week 2",
      title: "Upload Professional Assets", 
      description: "Submit your professional headshot, company logos, and any additional materials for your contributor profile.",
      icon: "⊙"
    },
    {
      id: "step-5",
      step: "Step 5",
      week: "Week 3",
      title: "Review & Approval Process",
      description: "Our editorial team reviews your submission and provides feedback or approval within 3-5 business days.",
      icon: "★"
    },
    {
      id: "step-6",
      step: "Step 6", 
      week: "Week 4",
      title: "Final Publication Preparation",
      description: "Your content is professionally formatted, designed, and prepared for inclusion in the TrustFlow book series.",
      icon: "$"
    }
  ];

  const requirementsSections = [
    {
      id: "content-requirements",
      title: "Content Requirements", 
      icon: "✎",
      items: [
        { name: "Trust Quote", description: "1-2 sentences capturing your core trust philosophy" },
        { name: "Contemplation", description: "200-300 words expanding on your quote" },
        { name: "Reflective Question", description: "Thought-provoking question for readers" },
        { name: "Professional Bio", description: "75-100 words highlighting your expertise" },
        { name: "Contact Information", description: "Website, LinkedIn, and preferred contact method" }
      ]
    },
    {
      id: "asset-requirements",
      title: "Asset Requirements",
      icon: "⊙", 
      items: [
        { name: "Professional Headshot", description: "High-resolution (300 DPI minimum)" },
        { name: "Company Logo", description: "Vector format preferred (SVG, AI, or high-res PNG)" },
        { name: "Book Cover Image", description: "If you have published works (optional)" },
        { name: "Additional Materials", description: "Certificates, awards, or relevant credentials" },
        { name: "File Formats", description: "JPG, PNG, PDF, or vector formats accepted" }
      ]
    }
  ];

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: 'linear-gradient(135deg, #add8e6 0%, #87ceeb 100%)',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      {/* Hero Section */}
      <div style={{
        background: 'url("/assets/PageSubmission-Laptop-Phone-CnGWTNaM.jpg") center/cover no-repeat',
        color: 'black', 
        padding: '80px 20px 60px 20px',
        textAlign: 'center' as const,
        position: 'relative' as const,
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(173, 216, 230, 0.8) 0%, rgba(135, 206, 235, 0.8) 100%)',
          pointerEvents: 'none' as const
        }}></div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative' as const, zIndex: 1 }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            marginTop: 0,
            lineHeight: '1.1',
            textShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            color: 'black'
          }}>
            Your Journey to <span style={{
              background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(5, 150, 105))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Publication</span>
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '3rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            color: 'black'
          }}>
            Follow our streamlined 6-step process to become a published contributor in the TrustFlow movement. We'll guide you every step of the way.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap' as const
          }}>
            <button 
              onClick={() => window.open('https://link.fastpaydirect.com/payment-link/68f7fb2b613b1bb28ccefb8f', '_blank')}
              style={{
                background: 'linear-gradient(135deg, #2563eb, #059669)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                transition: 'all 0.3s ease',
                fontFamily: 'inherit',
                transform: 'translateY(0)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
              }}
            >
              ▶ Secure Your Page
            </button>
          </div>
        </div>
      </div>

      {/* Submission Process Steps */}
      <div style={{
        background: 'linear-gradient(to bottom, #f8f9fa, #ffffff)',
        padding: '80px 20px 60px 20px',
        minHeight: '60vh'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{
            textAlign: 'center' as const,
            marginBottom: '60px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              The Submission Process
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#718096',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Each step is designed to ensure your contribution meets our publication standards
            </p>
          </div>

          {/* Steps Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {submissionSteps.map((step, index) => (
              <div key={step.id} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'all 0.3s ease',
                position: 'relative' as const
              }}>
                <div style={{
                  position: 'absolute' as const,
                  top: '-10px',
                  left: '20px',
                  background: 'linear-gradient(135deg, #add8e6, #87ceeb)',
                  color: 'white',
                  padding: '5px 15px',
                  borderRadius: '15px',
                  fontSize: '0.9rem',
                  fontWeight: '600'
                }}>
                  {step.week}
                </div>
                
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  marginBottom: '15px',
                  marginTop: '10px'
                }}>
                  <span style={{ fontSize: '2rem' }}>{step.icon}</span>
                  <div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#718096',
                      fontWeight: '600'
                    }}>
                      {step.step}
                    </div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#2d3748',
                      margin: '5px 0 0 0'
                    }}>
                      {step.title}
                    </h3>
                  </div>
                </div>
                
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#4a5568',
                  margin: 0
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Submission Requirements Section */}
          <div style={{
            textAlign: 'center' as const,
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#2d3748',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              Submission Requirements
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#718096',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Everything you need to know about preparing your contribution
            </p>
          </div>

          {requirementsSections.map((section) => (
            <div key={section.id} style={{
              marginBottom: '2rem',
              background: 'white',
              borderRadius: '20px',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              transition: 'all 0.3s ease'
            }}>
              <div 
                onClick={() => toggleSection(section.id)}
                style={{
                  background: activeSection === section.id 
                    ? 'linear-gradient(135deg, #add8e6, #87ceeb)' 
                    : 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
                  color: activeSection === section.id ? 'white' : '#2d3748',
                  padding: '25px 30px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  fontSize: '1.4rem',
                  fontWeight: '700',
                  transition: 'all 0.3s ease',
                  position: 'relative' as const,
                  overflow: 'hidden'
                }}
                onMouseOver={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #e2e8f0, #cbd5e0)';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeSection !== section.id) {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
                  }
                }}
              >
                <span style={{ 
                  fontSize: '1.8rem',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))'
                }}>
                  {section.icon}
                </span>
                <span style={{ flex: 1 }}>{section.title}</span>
                <span style={{ 
                  fontSize: '1.2rem',
                  transform: activeSection === section.id ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease'
                }}>
                  ▼
                </span>
              </div>
              
              {activeSection === section.id && (
                <div style={{ 
                  padding: '0 30px 30px 30px'
                }}>
                  {section.items.map((item, index) => (
                    <div key={index} style={{
                      marginBottom: index === section.items.length - 1 ? '0' : '25px',
                      padding: '25px',
                      background: 'linear-gradient(135deg, #f8f9ff, #fff)',
                      borderRadius: '15px',
                      border: '1px solid rgba(173, 216, 230, 0.1)',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                      transition: 'all 0.3s ease'
                    }}>
                      <h4 style={{
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        color: '#2d3748',
                        marginBottom: '8px',
                        marginTop: 0,
                        lineHeight: '1.4'
                      }}>
                        {item.name}
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.6',
                        color: '#4a5568',
                        margin: 0
                      }}>
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Call to Action Section */}
          <div style={{
            marginTop: '60px',
            padding: '40px',
            background: 'linear-gradient(135deg, #add8e6, #87ceeb)',
            borderRadius: '20px',
            color: 'white',
            textAlign: 'center' as const,
            boxShadow: '0 15px 50px rgba(173, 216, 230, 0.3)'
          }}>
            <h3 style={{
              fontSize: '2rem',
              fontWeight: '700',
              marginBottom: '1rem',
              marginTop: 0
            }}>
              Ready to Start Your Submission?
            </h3>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              opacity: '0.9'
            }}>
              Join 28 visionary leaders in creating the first-ever TrustFlow global movement. Your story and insights matter.
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap' as const
            }}>
              <button 
                onClick={() => window.open('https://link.fastpaydirect.com/payment-link/68f7fb2b613b1bb28ccefb8f', '_blank')}
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  transform: 'translateY(0)'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.25)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                }}
              >
                ▶ Apply to Contribute
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div style={{
            marginTop: '40px',
            textAlign: 'center' as const
          }}>
            <Link href="/" style={{
              color: '#000000',
              textDecoration: 'none',
              fontSize: '1.1rem',
              fontWeight: '500',
              padding: '10px 20px',
              borderRadius: '25px',
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
