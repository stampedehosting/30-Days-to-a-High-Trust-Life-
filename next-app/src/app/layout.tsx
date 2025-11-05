import type { Metadata } from "next";
import Script from "next/script";
import { CAL_JEFF, CAL_ROBERT } from "@/app/lib/links";
import "./globals.css";

export const metadata: Metadata = {
  title: "30 Days to a High-Trust Life",
  description:
    "Join the TrustFlow movement. A co-authored book and coaching program to build, sustain, and repair trust.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Legacy global CSS + favicon served from /public/assets */}
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="stylesheet" href="/assets/index-CKK-Pm5d.css" />
        {/* You can add OG/Twitter defaults later during SEO pass */}
      </head>
      <body>
        {children}
        <Script strategy="afterInteractive" id="navigation-override-script">
          {`
            // Override legacy navigation to work with Next.js routing
            (function() {
              // Completely override the legacy FAQ redirection
              const originalAssign = window.location.assign;
              window.location.assign = function(url) {
                // If trying to redirect to /faqs.html, use Next.js route instead
                if (url === '/faqs.html' || url.endsWith('/faqs.html')) {
                  window.location.href = '/faqs';
                  return;
                }
                // Otherwise use original behavior
                originalAssign.call(window.location, url);
              };

              // Override any click handlers that might interfere with Next.js routing
              document.addEventListener('click', function(e) {
                const link = e.target.closest('a');
                if (!link) return;
                
                const href = link.getAttribute('href');
                const text = (link.textContent || '').toLowerCase();
                
                // Handle FAQ navigation
                if (href === '/faqs' || href === '/faqs.html' || text.includes('faq')) {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = '/faqs';
                  return;
                }
              }, true); // Use capture phase to intercept before legacy script
            })();
          `}
        </Script>
        <Script strategy="afterInteractive" id="calendar-booking-script">
          {`
            (function() {
              // Calendar URLs imported from @/app/lib/links
              const JEFF_CALENDAR = '${CAL_JEFF}';
              const ROBERT_CALENDAR = '${CAL_ROBERT}';

              function wireCalendarButtons(root = document) {
                const buttons = root.querySelectorAll('button, a, [role="button"]');
                
                buttons.forEach(button => {
                  // Skip if already wired
                  if (button.hasAttribute('data-wired')) return;
                  
                  const text = (button.textContent || '').toLowerCase().trim();
                  const dataCal = button.getAttribute('data-cal');
                  
                  let calendarUrl = null;
                  
                  // Check for data attributes first
                  if (dataCal === 'jeff') {
                    calendarUrl = JEFF_CALENDAR;
                  } else if (dataCal === 'robert') {
                    calendarUrl = ROBERT_CALENDAR;
                  }
                  // Check for text patterns
                  else if (text.includes('book call with jeff') || text.includes('book a call') && text.includes('jeff')) {
                    calendarUrl = JEFF_CALENDAR;
                  } else if (text.includes('book call with robert') || text.includes('book a call') && text.includes('robert')) {
                    calendarUrl = ROBERT_CALENDAR;
                  } else if (text.includes('book a time') || text.includes('book a 15-minute chat') || text.includes('book info call')) {
                    calendarUrl = JEFF_CALENDAR; // Default to Jeff for generic booking
                  }
                  
                  if (calendarUrl) {
                    // Mark as wired to avoid double-processing
                    button.setAttribute('data-wired', 'true');
                    
                    // Add click handler
                    button.addEventListener('click', function(e) {
                      e.preventDefault();
                      e.stopPropagation();
                      window.open(calendarUrl, '_blank', 'noopener,noreferrer');
                    });
                    
                    // If it's a link, update href as fallback with security attributes
                    if (button.tagName === 'A') {
                      button.href = calendarUrl;
                      button.target = '_blank';
                      button.rel = 'noopener noreferrer';
                    }
                  }
                });
              }
              
              // Initial wire on DOM ready
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => wireCalendarButtons());
              } else {
                wireCalendarButtons();
              }
              
              // Watch for SPA updates via MutationObserver
              const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                  if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                      if (node.nodeType === 1) { // Element node
                        wireCalendarButtons(node);
                      }
                    });
                  }
                });
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
