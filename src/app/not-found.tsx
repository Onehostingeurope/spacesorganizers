"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? "." : d + "."));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Back Shortly | Space Organizers</title>
        <meta name="robots" content="noindex" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,300;1,300&family=Manrope:wght@300;400&display=swap"
          rel="stylesheet"
        />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background: #fffcf7;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-family: 'Manrope', sans-serif;
            color: #2a2520;
            overflow: hidden;
          }
          .grid-bg {
            position: fixed;
            inset: 0;
            pointer-events: none;
            background-image: repeating-linear-gradient(
              90deg,
              rgba(74,67,58,0.03) 0px, rgba(74,67,58,0.03) 1px,
              transparent 1px, transparent 80px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(74,67,58,0.03) 0px, rgba(74,67,58,0.03) 1px,
              transparent 1px, transparent 80px
            );
          }
        `}</style>
      </head>
      <body>
        <div className="grid-bg" />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "2rem" }}>
          {/* Logo */}
          <p style={{
            fontFamily: "'Noto Serif', serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "1.5rem",
            letterSpacing: "-0.02em",
            color: "#2a2520",
            marginBottom: "4rem",
          }}>
            Space Organizers
          </p>

          {/* Animated progress line */}
          <div style={{
            width: "80px",
            height: "1px",
            background: "rgba(74,67,58,0.15)",
            margin: "0 auto 3rem",
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: "#2a2520",
              animation: "slide 1.8s ease-in-out infinite",
              transformOrigin: "left",
            }} />
          </div>

          <h1 style={{
            fontFamily: "'Noto Serif', serif",
            fontWeight: 300,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: "#2a2520",
            marginBottom: "1.5rem",
          }}>
            Back shortly
          </h1>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            fontSize: "0.75rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(74,67,58,0.45)",
            marginBottom: "3rem",
          }}>
            We are refreshing the experience{dots}
          </p>

          <p style={{
            fontFamily: "'Manrope', sans-serif",
            fontWeight: 300,
            fontSize: "0.8rem",
            color: "rgba(74,67,58,0.35)",
            lineHeight: 1.8,
            marginBottom: "3rem",
            maxWidth: "360px",
            margin: "0 auto 3rem",
          }}>
            Our team is applying new touches to your space.
            <br />
            Please come back in a few moments.
          </p>

          {/* Back home link */}
          <a
            href="/"
            style={{
              display: "inline-block",
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 400,
              fontSize: "0.65rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "#2a2520",
              textDecoration: "none",
              borderBottom: "1px solid rgba(74,67,58,0.25)",
              paddingBottom: "3px",
            }}
          >
            Return Home →
          </a>
        </div>

        <style>{`
          @keyframes slide {
            0%   { transform: translateX(-100%); }
            50%  { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
        `}</style>
      </body>
    </html>
  );
}
