"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function FAQsPage() {
  useEffect(() => {
    document.title = "Frequently Asked Questions";
  }, []);

  return (
    <div style={{
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      lineHeight: '1.6',
      color: '#333',
      backgroundColor: '#fff',
      minHeight: '100vh',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        maxWidth: '680px',
        margin: '0 auto',
        padding: '40px 20px 60px 20px'
      }}>
        
        {/* Main Title */}
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          lineHeight: '1.1',
          color: '#000',
          marginBottom: '1.5rem',
          marginTop: 0
        }}>
          Your Questions Answered
        </h1>
        
        {/* Subtitle */}
        <p style={{
          fontSize: '1.25rem',
          color: '#666',
          marginBottom: '3rem',
          lineHeight: '1.5'
        }}>
          Get clear answers about the contribution process, timeline, investment, and benefits. If you don't find what you're looking for, we're here to help.
        </p>

        {/* Getting Started Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Getting Started
        </h2>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          How much time will this take?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          60 minutes with Jeff, plus ~30 minutes to complete the one‑page template. Our team polishes the final draft.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Do I need to take an assessment?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Yes—your Trust Factor (via DreamSmart partner DNA Behavior) is included.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Who can contribute to this book?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          We're looking for 28 innovative leaders including founders, executives, team leaders, investors, advisors, board members, veterans, educators, community innovators, connectors, creators, change agents, and purpose-driven professionals. Both experienced authors and first-time contributors are welcome.
        </p>

        {/* Content & Editing Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Content & Editing
        </h2>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Will my content be edited?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Yes, your content will be edited. DO NOT USE AI to edit your submission. We use humans to edit our writers' content, to ensure clarity, coherence, and brand consistency across all contributions. Our professional editorial team will polish your content while maintaining your authentic voice. Final approval is always yours before publication.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Is my contribution promotional?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          It's reflective, practical, and story‑driven—not a sales pitch. We'll include one short bio line and a link.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Is AI-submitted content allowed?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          The author must create all author submissions to the AOC book series as "original works". Use of AI-created passages does not meet originality standards required by either the Library of Congress or the original works standard set forth by the Art of Connection book series creator, Robert W. Jones. This standard preserves the integrity of the publication and meets our Agreement with the Library of Congress, which explicitly states that they cannot certify our books as original art if AI is included. Beyond the use of AI for Ideation and Research for yourself, AI-generated content is prohibited in AOC books as acceptable material for publication, as explained above. Art of Connection publications use an "AI-sniffer" tool and a live Editor to help maintain the "original works" requirement.
        </p>

        {/* Investment & Value Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Investment & Value
        </h2>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Can I get an invoice for my business?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Absolutely. We'll provide a receipt and W‑9 upon request.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          What's included in the $799 investment?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Your investment includes: 60-minute Trust Factor coaching session ($1,250 value), TrustFlow assessment tools ($200 value), professional page design and editing ($500 value), contributor spotlight in launch promotions ($250 value), Library of Congress Certificate (priceless), unique dynamic QR code ($250 annual value), and more—over $2,750 total value.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Are there any additional costs?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          The $799 contributor fee includes everything needed for your participation. Optional upgrades are available such as enhanced editing ($200), editorial advisement ($100), or professional photo optimization ($40), but these are completely optional.
        </p>

        {/* Timeline & Process Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Timeline & Process
        </h2>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          What's the publication timeline?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Drafts within 2–3 weeks of your session. The print and launch dates will be communicated to all contributors.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          How does the submission process work?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          After securing your spot: 1) Complete your Trust Factor session with Jeff Morris, 2) Receive your assessment results, 3) Submit your content and professional photos, 4) Our team reviews and formats your contribution, 5) You approve the final version, 6) Your pages are included in the published book.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          When will I see my finished pages?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          You'll receive a preview of your formatted pages for approval before final publication. This typically happens 1-2 weeks after you submit your content, allowing time for professional design and editing.
        </p>

        {/* Benefits & Outcomes Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Benefits & Outcomes
        </h2>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          What credibility will I gain?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          You'll become a published author in a professionally produced book series, receive Library of Congress registration, gain 2x International Best Selling Author status, and be associated with respected leaders in the trust and leadership space. This provides significant credibility for speaking, consulting, generative search attribution, and business development.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          How will this help my business?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          Published authorship opens doors to speaking opportunities, media interviews, client credibility, and thought-leadership positioning. You'll also gain access to our contributor network for potential partnerships and collaborations with other members.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Will I own the rights to my contribution?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '2rem'
        }}>
          You retain ownership of your original content while granting us publication rights for the book series. You're free to use your contribution in your own marketing materials, with proper attribution to the book series.
        </p>

        {/* Need More Help Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Need More Help?
        </h2>
        
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '3rem'
        }}>
          Our team is here to support you throughout your contributor journey. Get personalized answers to your questions.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Book a Call
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Schedule a 15-minute info call to discuss your questions directly with our team
        </p>
        <button 
          data-cal="jeff"
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            fontFamily: 'inherit',
            display: 'inline-block'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
        >
          Book Info Call
        </button>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Email Support
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Send us your questions and receive detailed answers within 24 hours
        </p>
        <button 
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            fontFamily: 'inherit',
            display: 'inline-block'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#059669'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#10b981'}
        >
          Send Email
        </button>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Live Chat
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Get instant answers during business hours through our live chat support
        </p>
        <button 
          style={{
            backgroundColor: '#06b6d4',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            fontFamily: 'inherit',
            display: 'inline-block'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#0891b2'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#06b6d4'}
        >
          Start Chat
        </button>

        {/* Ready to Join Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Ready to Join the TrustFlow Movement?
        </h2>
        
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '3rem'
        }}>
          Don't let questions hold you back from this incredible opportunity. Our team is here to ensure you have all the information you need to make the best decision.
        </p>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Have Questions?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Get personalized answers from our team
        </p>
        <button 
          data-cal="jeff"
          style={{
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            fontFamily: 'inherit',
            display: 'inline-block'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#d97706'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f59e0b'}
        >
          Ask Your Question
        </button>

        <h3 style={{
          fontSize: '1.375rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '2.5rem',
          marginBottom: '0.75rem'
        }}>
          Ready to Start?
        </h3>
        <p style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#333',
          marginBottom: '1rem'
        }}>
          Secure your spot in the TrustFlow movement
        </p>
        <button 
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            marginBottom: '2.5rem',
            fontFamily: 'inherit',
            display: 'inline-block'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#dc2626'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#ef4444'}
        >
          Apply to Contribute
        </button>

        <p style={{
          fontSize: '0.875rem',
          lineHeight: '1.5',
          color: '#6b7280',
          marginBottom: '4rem'
        }}>
          Support available Monday-Friday, 9 AM - 5 PM EST
        </p>

        {/* Additional Links Section */}
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#000',
          marginTop: '4rem',
          marginBottom: '2rem'
        }}>
          Additional Links
        </h2>
        
        <ul style={{ 
          marginBottom: '4rem',
          paddingLeft: '1.5rem',
          listStyleType: 'disc'
        }}>
          <li style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            marginBottom: '0.5rem'
          }}>
            <Link 
              href="/"
              style={{
                color: '#3b82f6',
                textDecoration: 'underline'
              }}
            >
              TrustFlow
            </Link>
          </li>
        </ul>

        {/* Back Link */}
        <Link 
          href="/" 
          style={{
            color: '#3b82f6',
            textDecoration: 'underline',
            fontSize: '1rem',
            fontWeight: '500'
          }}
        >
          ← Back to home
        </Link>
      </div>
    </div>
  );
}