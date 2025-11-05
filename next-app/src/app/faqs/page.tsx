"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FAQsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Frequently Asked Questions - TrustFlow";
  }, []);

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const faqData = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: "▶",
      questions: [
        {
          q: "How much time will this take?",
          a: "60 minutes with Jeff, plus ~30 minutes to complete the one‑page template. Our team polishes the final draft."
        },
        {
          q: "Do I need to take an assessment?",
          a: "Yes—your Trust Factor (via DreamSmart partner DNA Behavior) is included."
        },
        {
          q: "Who can contribute to this book?",
          a: "We're looking for 28 innovative leaders including founders, executives, team leaders, investors, advisors, board members, veterans, educators, community innovators, connectors, creators, change agents, and purpose-driven professionals. Both experienced authors and first-time contributors are welcome."
        }
      ]
    },
    {
      id: "content-editing",
      title: "Content & Editing",
      icon: "✎",
      questions: [
        {
          q: "Will my content be edited?",
          a: "Yes, your content will be edited. DO NOT USE AI to edit your submission. We use humans to edit our writers' content, to ensure clarity, coherence, and brand consistency across all contributions. Our professional editorial team will polish your content while maintaining your authentic voice. Final approval is always yours before publication."
        },
        {
          q: "Is my contribution promotional?",
          a: "It's reflective, practical, and story‑driven—not a sales pitch. We'll include one short bio line and a link."
        },
        {
          q: "Is AI-submitted content allowed?",
          a: "The author must create all author submissions to the AOC book series as \"original works\". Use of AI-created passages does not meet originality standards required by either the Library of Congress or the original works standard set forth by the Art of Connection book series creator, Robert W. Jones. This standard preserves the integrity of the publication and meets our Agreement with the Library of Congress, which explicitly states that they cannot certify our books as original art if AI is included. Beyond the use of AI for Ideation and Research for yourself, AI-generated content is prohibited in AOC books as acceptable material for publication, as explained above. Art of Connection publications use an \"AI-sniffer\" tool and a live Editor to help maintain the \"original works\" requirement."
        }
      ]
    },
    {
      id: "investment-value",
      title: "Investment & Value",
      icon: "$",
      questions: [
        {
          q: "Can I get an invoice for my business?",
          a: "Absolutely. We'll provide a receipt and W‑9 upon request."
        },
        {
          q: "What's included in the $799 investment?",
          a: "Your investment includes: 60-minute Trust Factor coaching session ($1,250 value), TrustFlow assessment tools ($200 value), professional page design and editing ($500 value), contributor spotlight in launch promotions ($250 value), Library of Congress Certificate (priceless), unique dynamic QR code ($250 annual value), and more—over $2,750 total value."
        },
        {
          q: "Are there any additional costs?",
          a: "The $799 contributor fee includes everything needed for your participation. Optional upgrades are available such as enhanced editing ($200), editorial advisement ($100), or professional photo optimization ($40), but these are completely optional."
        }
      ]
    },
    {
      id: "timeline-process",
      title: "Timeline & Process",
      icon: "⊙",
      questions: [
        {
          q: "What's the publication timeline?",
          a: "Drafts within 2–3 weeks of your session. The print and launch dates will be communicated to all contributors."
        },
        {
          q: "How does the submission process work?",
          a: "After securing your spot: 1) Complete your Trust Factor session with Jeff Morris, 2) Receive your assessment results, 3) Submit your content and professional photos, 4) Our team reviews and formats your contribution, 5) You approve the final version, 6) Your pages are included in the published book."
        },
        {
          q: "When will I see my finished pages?",
          a: "You'll receive a preview of your formatted pages for approval before final publication. This typically happens 1-2 weeks after you submit your content, allowing time for professional design and editing."
        }
      ]
    },
    {
      id: "benefits-outcomes",
      title: "Benefits & Outcomes",
      icon: "★",
      questions: [
        {
          q: "What credibility will I gain?",
          a: "You'll become a published author in a professionally produced book series, receive Library of Congress registration, gain 2x International Best Selling Author status, and be associated with respected leaders in the trust and leadership space. This provides significant credibility for speaking, consulting, generative search attribution, and business development."
        },
        {
          q: "How will this help my business?",
          a: "Published authorship opens doors to speaking opportunities, media interviews, client credibility, and thought-leadership positioning. You'll also gain access to our contributor network for potential partnerships and collaborations with other members."
        },
        {
          q: "Will I own the rights to my contribution?",
          a: "You retain ownership of your original content while granting us publication rights for the book series. You're free to use your contribution in your own marketing materials, with proper attribution to the book series."
        }
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
        background: 'url("/assets/FAQs-C4o715Oj.jpg") center/cover no-repeat',
        color: 'white',
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
            Your Questions <span style={{
              background: 'linear-gradient(135deg, rgb(37, 99, 235), rgb(5, 150, 105))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Answered</span>
          </h1>
          
          <p style={{
            fontSize: '1.3rem',
            marginBottom: '3rem',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            color: 'black'
          }}>
            Get clear answers about the contribution process, timeline, investment, and benefits. 
            If you don't find what you're looking for, we're here to help.
          </p>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap' as const
          }}>
            <button 
              data-cal="jeff"
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
              📞 Book a Call
            </button>
          </div>
        </div>
      </div>

      {/* FAQ Content */}
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
              Frequently Asked Questions
            </h2>
            <p style={{
              fontSize: '1.2rem',
              color: '#718096',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Click on any section below to explore detailed answers to common questions
            </p>
          </div>

          {faqData.map((section) => (
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
                  {section.questions.map((item, index) => (
                    <div key={index} style={{
                      marginBottom: index === section.questions.length - 1 ? '0' : '25px',
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
                        marginBottom: '12px',
                        marginTop: 0,
                        lineHeight: '1.4'
                      }}>
                        {item.q}
                      </h4>
                      <p style={{
                        fontSize: '1rem',
                        lineHeight: '1.7',
                        color: '#4a5568',
                        margin: 0
                      }}>
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Support Section */}
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
              Still Have Questions?
            </h3>
            <p style={{
              fontSize: '1.2rem',
              marginBottom: '2rem',
              opacity: '0.9'
            }}>
              Our team is here to support you throughout your contributor journey
            </p>
            
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap' as const
            }}>
              <button 
                data-cal="jeff"
                style={{
                  background: 'linear-gradient(135deg, #2563eb, #059669)',
                  color: 'white',
                  border: 'none',
                  padding: '15px 30px',
                  borderRadius: '50px',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontFamily: 'inherit',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
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
                🗓️ Schedule a Call
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