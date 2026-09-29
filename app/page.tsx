"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as React from "react";
import {
  ShoppingBag, UtensilsCrossed, Scale, Building2, HeartPulse, Cpu,
  Wrench, Plane, Palette, Camera, Flower2, Landmark,
  Music, Sofa, Car, Trophy, Sprout, GraduationCap, ArrowUpRight, Layers, Layout, MousePointerClick, Monitor, Code2, Sparkles, Frame,
} from "lucide-react";

// Image URLs
const logo = "/assets/james-anson-logo.jpg";
const brooklynCandlePreview = "/assets/portfolio-brooklyn-candle.jpg";
const veronicaSolomonPreview = "/assets/portfolio-veronica-solomon.jpg";
const breezyHrPreview = "/assets/portfolio-breezy-hr.jpg";
const viralLoopsPreview = "/assets/portfolio-viral-loops.jpg";

const css = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#060608;--bg2:#0d0d12;--surface:#12121a;--surface2:#1a1a26;
  --border:rgba(255,255,255,0.06);--border2:rgba(255,255,255,0.12);
  --text:#e8e6f0;--muted:#6b6880;--muted2:#9492a0;
  --accent:#f5841f;--accent-glow:rgba(245,132,31,0.18);
  --accent2:#1f3a8a;
  --green:#3ecf8e;--amber:#f5a623;--red:#ef4444;
  --wp:#2196c4;--shopify:#7ab648;--wix:#1b6bc0;--webflow:#4353ff;--woo:#8b5cf6;
}
html{scroll-behavior:smooth}
body.ja-body{background:var(--bg);color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;font-size:16px;line-height:1.6;overflow-x:hidden}
.ja-root ::-webkit-scrollbar{width:3px}
.ja-root ::-webkit-scrollbar-track{background:var(--bg)}
.ja-root ::-webkit-scrollbar-thumb{background:var(--accent);border-radius:3px}

.ja-root nav{position:fixed;top:0;left:0;right:0;z-index:200;height:76px;display:flex;align-items:center;justify-content:space-between;padding:0 5%;background:rgba(6,6,8,0.72);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);transition:background .25s,box-shadow .25s,border-color .25s}
.ja-root nav.scrolled{background:rgba(6,6,8,0.92);box-shadow:0 8px 32px rgba(0,0,0,0.45);border-bottom-color:var(--border2)}
.ja-root .logo{display:inline-flex;align-items:center;gap:10px;text-decoration:none}
.ja-root .logo-img{height:44px;width:auto;display:block;background:#fff;padding:4px 10px;border-radius:10px;border:1px solid var(--border2);box-shadow:0 4px 14px rgba(0,0,0,0.35)}
.ja-root .nav-mid{display:flex;gap:0.4rem;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:100px;padding:5px}
.ja-root .nav-mid a{position:relative;color:var(--muted2);text-decoration:none;font-size:0.85rem;font-weight:600;letter-spacing:0.2px;padding:8px 16px;border-radius:100px;transition:color .2s,background .2s}
.ja-root .nav-mid a:hover{color:var(--text);background:rgba(255,255,255,0.04)}
.ja-root .nav-right{display:flex;align-items:center;gap:0.6rem}
.ja-root .nav-icon{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;background:var(--surface);border:1px solid var(--border);color:var(--muted2);transition:all .2s}
.ja-root .nav-icon:hover{color:#fff;border-color:var(--accent);transform:translateY(-1px)}
.ja-root .nav-cta{display:inline-flex;align-items:center;gap:0.5rem;background:var(--accent);color:#fff;padding:10px 22px;border-radius:100px;font-size:0.875rem;font-weight:600;text-decoration:none;transition:opacity .2s,transform .2s,box-shadow .2s;box-shadow:0 6px 20px rgba(245,132,31,0.32)}
.ja-root .nav-cta:hover{opacity:0.95;transform:translateY(-1px);box-shadow:0 10px 28px rgba(245,132,31,0.45)}

.ja-root .hero{min-height:100vh;display:flex;align-items:center;padding:100px 5% 60px;position:relative;overflow:hidden}
.ja-root .hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 60% 50% at 80% 30%, rgba(245,132,31,0.10) 0%, transparent 70%),radial-gradient(ellipse 40% 40% at 20% 70%, rgba(31,58,138,0.10) 0%, transparent 60%);pointer-events:none}
.ja-root .hero-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;mask-image:radial-gradient(ellipse 70% 80% at center, black, transparent)}
.ja-root .hero-inner{max-width:1200px;margin:0 auto;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;position:relative;z-index:1}
.ja-root .hero-available{display:inline-flex;align-items:center;gap:8px;background:rgba(62,207,142,0.08);border:1px solid rgba(62,207,142,0.2);border-radius:100px;padding:6px 16px;font-size:0.78rem;font-weight:600;color:var(--green);letter-spacing:0.3px;margin-bottom:1.75rem}
.ja-root .pulse-dot{width:7px;height:7px;border-radius:50%;background:var(--green);animation:ja-pulse 2s infinite}
@keyframes ja-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.4;transform:scale(0.8)}}
.ja-root .hero h1{font-family:'Clash Display',sans-serif;font-size:clamp(2.6rem,4.5vw,4.2rem);font-weight:700;line-height:1.08;letter-spacing:-1.5px;margin-bottom:1.25rem;color:#fff}
.ja-root .hero h1 .line-accent{background:linear-gradient(90deg,var(--accent),#ffb066);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ja-root .hero-desc{color:var(--muted2);font-size:1.05rem;line-height:1.75;max-width:460px;margin-bottom:2.5rem}
.ja-root .hero-btns{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:3rem}
.ja-root .btn-glow{display:inline-flex;align-items:center;gap:8px;background:var(--accent);color:#fff;padding:13px 28px;border-radius:100px;font-weight:600;font-size:0.95rem;text-decoration:none;transition:all .25s;box-shadow:0 0 30px rgba(245,132,31,0.30)}
.ja-root .btn-glow:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(245,132,31,0.5)}
.ja-root .btn-ghost{display:inline-flex;align-items:center;gap:8px;background:transparent;color:var(--text);padding:12px 24px;border-radius:100px;font-weight:500;font-size:0.95rem;text-decoration:none;border:1px solid var(--border2);transition:all .25s}
.ja-root .btn-ghost:hover{background:var(--surface2);border-color:rgba(255,255,255,0.25)}
.ja-root .hero-stats{display:flex;gap:2.5rem;padding-top:2.5rem;border-top:1px solid var(--border);flex-wrap:wrap}
.ja-root .hero-stat-num{font-family:'Clash Display',sans-serif;font-size:2rem;font-weight:700;color:#fff;line-height:1}
.ja-root .hero-stat-num span{color:var(--accent)}
.ja-root .hero-stat-label{font-size:0.8rem;color:var(--muted);margin-top:4px;font-weight:500}

.ja-root .hero-floats{position:absolute;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.ja-root .orbit-ring{position:absolute;top:50%;left:50%;border-radius:50%;border:1px dashed rgba(255,255,255,0.06);transform:translate(-50%,-50%)}
.ja-root .orbit-ring.r-1{width:520px;height:520px}
.ja-root .orbit-ring.r-2{width:780px;height:780px;border-color:rgba(255,255,255,0.045)}
.ja-root .orbit-ring.r-3{width:1080px;height:1080px;border-color:rgba(255,255,255,0.03)}
.ja-root .hf-ico{position:absolute;top:50%;left:50%;width:60px;height:60px;margin:-30px 0 0 -30px;display:flex;align-items:center;justify-content:center;border-radius:16px;background:linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.015));border:1px solid rgba(255,255,255,0.1);backdrop-filter:blur(8px);box-shadow:0 14px 40px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.07);opacity:0}
.ja-root .hf-ico svg{width:30px;height:30px;display:block}
.ja-root .hf-ico::before{content:'';position:absolute;inset:-2px;border-radius:18px;background:linear-gradient(135deg,var(--c1,rgba(245,132,31,0.45)),transparent 65%);opacity:.55;z-index:-1;filter:blur(12px)}
.ja-root .hf-figma{--c1:rgba(245,132,31,0.6);animation:orb-figma 38s linear infinite}
.ja-root .hf-wp   {--c1:rgba(33,150,196,0.55);animation:orb-wp 38s linear infinite}
.ja-root .hf-shop {--c1:rgba(122,182,72,0.55);animation:orb-shop 38s linear infinite}
.ja-root .hf-wf   {--c1:rgba(67,83,255,0.5);animation:orb-wf 56s linear infinite reverse}
.ja-root .hf-wix  {--c1:rgba(255,255,255,0.18);animation:orb-wix 56s linear infinite reverse}
.ja-root .hf-woo  {--c1:rgba(139,92,246,0.55);animation:orb-woo 56s linear infinite reverse}
@keyframes orb-figma{from{opacity:0;transform:rotate(0deg) translateX(260px) rotate(0deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(360deg) translateX(260px) rotate(-360deg)}}
@keyframes orb-wp{from{opacity:0;transform:rotate(120deg) translateX(260px) rotate(-120deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(480deg) translateX(260px) rotate(-480deg)}}
@keyframes orb-shop{from{opacity:0;transform:rotate(240deg) translateX(260px) rotate(-240deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(600deg) translateX(260px) rotate(-600deg)}}
@keyframes orb-wf{from{opacity:0;transform:rotate(30deg) translateX(390px) rotate(-30deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(390deg) translateX(390px) rotate(-390deg)}}
@keyframes orb-wix{from{opacity:0;transform:rotate(150deg) translateX(390px) rotate(-150deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(510deg) translateX(390px) rotate(-510deg)}}
@keyframes orb-woo{from{opacity:0;transform:rotate(270deg) translateX(390px) rotate(-270deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(630deg) translateX(390px) rotate(-630deg)}}
@media (max-width:900px){
  .ja-root .orbit-ring.r-1{width:300px;height:300px}
  .ja-root .orbit-ring.r-2{width:460px;height:460px}
  .ja-root .orbit-ring.r-3{display:none}
  .ja-root .hf-ico{width:44px;height:44px;margin:-22px 0 0 -22px}
  .ja-root .hf-ico svg{width:22px;height:22px}
  @keyframes orb-figma{from{opacity:0;transform:rotate(0deg) translateX(150px) rotate(0deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(360deg) translateX(150px) rotate(-360deg)}}
  @keyframes orb-wp{from{opacity:0;transform:rotate(120deg) translateX(150px) rotate(-120deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(480deg) translateX(150px) rotate(-480deg)}}
  @keyframes orb-shop{from{opacity:0;transform:rotate(240deg) translateX(150px) rotate(-240deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(600deg) translateX(150px) rotate(-600deg)}}
  @keyframes orb-wf{from{opacity:0;transform:rotate(30deg) translateX(230px) rotate(-30deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(390deg) translateX(230px) rotate(-390deg)}}
  @keyframes orb-wix{from{opacity:0;transform:rotate(150deg) translateX(230px) rotate(-150deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(510deg) translateX(230px) rotate(-510deg)}}
  @keyframes orb-woo{from{opacity:0;transform:rotate(270deg) translateX(230px) rotate(-270deg)}8%{opacity:.95}to{opacity:.95;transform:rotate(630deg) translateX(230px) rotate(-630deg)}}
}

.ja-root .hero-orb{position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none;z-index:0}
.ja-root .hero-orb.o1{width:380px;height:380px;background:radial-gradient(circle,rgba(245,132,31,0.18),transparent 70%);top:-80px;right:-80px;animation:orb-drift 18s ease-in-out infinite}
.ja-root .hero-orb.o2{width:320px;height:320px;background:radial-gradient(circle,rgba(67,83,255,0.16),transparent 70%);bottom:-60px;left:-60px;animation:orb-drift 22s ease-in-out infinite reverse}
@keyframes orb-drift{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,-30px)}}

.ja-root .num-tick{display:inline-block;font-variant-numeric:tabular-nums}

.ja-root .hero-right{display:flex;flex-direction:column;gap:0.85rem;position:relative;z-index:1}
.ja-root .platform-stack-card{background:linear-gradient(145deg,rgba(255,255,255,0.028),rgba(255,255,255,0.008));border:1px solid var(--border);border-radius:14px;padding:0.95rem 1.15rem;display:flex;align-items:center;gap:1rem;transition:border-color .3s,transform .3s,background .3s;backdrop-filter:blur(8px)}
.ja-root .platform-stack-card:hover{border-color:var(--border2);transform:translateX(4px);background:linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))}
.ja-root .psc-icon{width:42px;height:42px;border-radius:11px;display:flex;align-items:center;justify-content:center;font-family:'Clash Display',sans-serif;font-size:0.8rem;font-weight:700;flex-shrink:0}
.ja-root .psc-icon svg{width:20px;height:20px}
.ja-root .psc-info{flex:1;min-width:0}
.ja-root .psc-name{font-weight:600;font-size:0.95rem;color:#fff;margin-bottom:2px}
.ja-root .psc-detail{font-size:0.78rem;color:var(--muted)}
.ja-root .psc-count{font-family:'Clash Display',sans-serif;font-size:1.4rem;font-weight:700;color:var(--muted2)}
.ja-root .ic-wp{background:rgba(33,150,196,0.15);color:#2196c4}
.ja-root .ic-sf{background:rgba(122,182,72,0.15);color:#7ab648}
.ja-root .ic-wix{background:rgba(27,107,192,0.15);color:#5b9bde}
.ja-root .ic-wf{background:rgba(67,83,255,0.15);color:#8891ff}
.ja-root .ic-woo{background:rgba(139,92,246,0.15);color:#a78bfa}
.ja-root .ic-fig{background:linear-gradient(135deg,rgba(245,132,31,0.18),rgba(236,64,122,0.18));color:#ff9966}

.ja-root .section{padding:6rem 5%;max-width:1320px;margin:0 auto}
.ja-root .section-inner{max-width:1200px;margin:0 auto}
.ja-root .sec-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:0.73rem;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:var(--accent);margin-bottom:1rem}
.ja-root .sec-eyebrow::before{content:'';width:24px;height:1px;background:var(--accent)}
.ja-root .sec-title{font-family:'Clash Display',sans-serif;font-size:clamp(1.9rem,3vw,2.75rem);font-weight:700;letter-spacing:-1px;color:#fff;margin-bottom:0.75rem}
.ja-root .sec-sub{color:var(--muted2);font-size:1rem;max-width:520px;line-height:1.75;margin-bottom:3rem}
.ja-root hr.divider{border:none;border-top:1px solid var(--border);margin:0}

.ja-root .platforms-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
.ja-root .plat-card.fig::after{background:linear-gradient(90deg,#f5841f,#ec407a);box-shadow:0 0 20px rgba(245,132,31,0.5)}
.ja-root .plat-card.fig .plat-badge{background:linear-gradient(135deg,rgba(245,132,31,0.14),rgba(236,64,122,0.14));color:#ff9966}
.ja-root .plat-card{background:var(--surface);border:1px solid var(--border);border-radius:18px;padding:1.75rem 1.5rem;position:relative;overflow:hidden;transition:border-color .3s,transform .3s}
.ja-root .plat-card:hover{transform:translateY(-5px)}
.ja-root .plat-card::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;border-radius:18px 18px 0 0}
.ja-root .plat-card.wp::after{background:var(--wp);box-shadow:0 0 20px rgba(33,150,196,0.5)}
.ja-root .plat-card.sf::after{background:var(--shopify);box-shadow:0 0 20px rgba(122,182,72,0.5)}
.ja-root .plat-card.wix::after{background:var(--wix);box-shadow:0 0 20px rgba(27,107,192,0.5)}
.ja-root .plat-card.wf::after{background:var(--webflow);box-shadow:0 0 20px rgba(67,83,255,0.5)}
.ja-root .plat-card.woo::after{background:var(--woo);box-shadow:0 0 20px rgba(139,92,246,0.5)}
.ja-root .plat-badge{display:inline-block;padding:6px 14px;border-radius:8px;font-family:'Clash Display',sans-serif;font-size:0.85rem;font-weight:700;margin-bottom:1.25rem}
.ja-root .plat-card.wp .plat-badge{background:rgba(33,150,196,0.12);color:#2196c4}
.ja-root .plat-card.sf .plat-badge{background:rgba(122,182,72,0.12);color:#7ab648}
.ja-root .plat-card.wix .plat-badge{background:rgba(27,107,192,0.12);color:#5b9bde}
.ja-root .plat-card.wf .plat-badge{background:rgba(67,83,255,0.12);color:#8891ff}
.ja-root .plat-card.woo .plat-badge{background:rgba(139,92,246,0.12);color:#a78bfa}
.ja-root .plat-num{font-family:'Clash Display',sans-serif;font-size:2.2rem;font-weight:700;color:#fff;line-height:1;margin-bottom:4px}
.ja-root .plat-label{font-size:0.8rem;color:var(--muted);font-weight:500;margin-bottom:1rem}
.ja-root .plat-desc{font-size:0.82rem;color:var(--muted2);line-height:1.6}

.ja-root .recent-ticker{position:relative;overflow:hidden;width:100vw;margin-left:calc(-50vw + 50%);margin-bottom:2.2rem;mask-image:linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 6%,#000 94%,transparent 100%)}
.ja-root .recent-ticker-track{display:inline-flex;gap:2.2rem;white-space:nowrap;font-family:'Clash Display',sans-serif;font-weight:700;font-size:clamp(2.6rem,5.5vw,5rem);line-height:1;color:rgba(255,255,255,0.09);text-transform:uppercase;letter-spacing:-0.03em;animation:rtickScroll 90s linear infinite}
.ja-root .recent-ticker-track span{display:inline-block;flex-shrink:0}
.ja-root .recent-ticker-track span:nth-child(even){color:rgba(245,132,31,0.18)}
@keyframes rtickScroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@media (max-width:640px){.ja-root .recent-ticker-track{font-size:2.2rem;gap:1.4rem}}
.ja-root .recent-wrap{position:relative;margin-top:2.5rem}
.ja-root .recent-head-bar{display:flex;align-items:center;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;margin-bottom:2rem}
.ja-root .recent-eyebrow{display:inline-flex;align-items:center;gap:14px;font-family:'JetBrains Mono',monospace;font-size:0.66rem;color:var(--accent);font-weight:700;text-transform:uppercase;letter-spacing:0.22em}
.ja-root .recent-eyebrow::before{content:'';width:36px;height:2px;background:var(--accent)}
.ja-root .recent-counter{display:inline-flex;align-items:center;gap:10px;padding:8px 16px;background:rgba(255,255,255,0.03);border:1px solid var(--border);border-radius:100px;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--text);font-weight:600;text-transform:uppercase;letter-spacing:0.18em}
.ja-root .recent-live-dot{position:relative;width:8px;height:8px;border-radius:50%;background:#3fdc7d;flex-shrink:0}
.ja-root .recent-live-dot::after{content:'';position:absolute;inset:-4px;border-radius:50%;background:#3fdc7d;opacity:0.4;animation:rpulse 2s ease-out infinite}
@keyframes rpulse{0%{transform:scale(1);opacity:0.4}100%{transform:scale(2.2);opacity:0}}

.ja-root .recent-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);border:1px solid var(--border);border-radius:6px;overflow:hidden}
.ja-root .recent-cell{position:relative;display:flex;flex-direction:column;justify-content:space-between;background:var(--bg);padding:2.4rem;min-height:280px;text-decoration:none;color:inherit;transition:background .5s ease;overflow:hidden;isolation:isolate}
.ja-root .recent-cell::after{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 100%, rgba(232,87,32,0.08), transparent 60%);opacity:0;transition:opacity .5s ease;pointer-events:none}
.ja-root .recent-cell:hover{background:rgba(255,255,255,0.015)}
.ja-root .recent-cell:hover::after{opacity:1}
.ja-root .recent-cell:hover .rcell-title{transform:translateX(6px);color:var(--accent)}
.ja-root .recent-cell:hover .rcell-num{color:var(--text)}
.ja-root .recent-cell:hover .rcell-arrow{opacity:1;transform:translate(0,0)}
.ja-root .recent-cell:hover .rcell-preview{opacity:0.18;transform:scale(1.04)}

.ja-root .rcell-top{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;position:relative;z-index:2}
.ja-root .rcell-num{font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:var(--muted);font-weight:500;letter-spacing:0.05em;transition:color .35s ease}
.ja-root .rcell-status{display:inline-flex;align-items:center;gap:6px;padding:4px 9px;border:1px solid rgba(63,220,125,0.28);border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:0.6rem;color:#3fdc7d;font-weight:700;text-transform:uppercase;letter-spacing:0.18em}
.ja-root .rcell-status::before{content:'';width:5px;height:5px;border-radius:50%;background:#3fdc7d;box-shadow:0 0 8px #3fdc7d}

.ja-root .rcell-body{position:relative;z-index:2;margin-top:auto}
.ja-root .rcell-cat{font-family:'JetBrains Mono',monospace;font-size:0.62rem;color:var(--muted);font-weight:600;text-transform:uppercase;letter-spacing:0.18em;margin-bottom:14px;display:block}
.ja-root .rcell-title{font-family:'Clash Display',sans-serif;font-size:1.85rem;font-weight:600;color:#fff;letter-spacing:-0.02em;line-height:1.05;margin-bottom:18px;transition:transform .45s cubic-bezier(.2,.8,.2,1),color .35s ease;word-break:break-word}
.ja-root .rcell-foot{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding-top:14px;border-top:1px dashed rgba(255,255,255,0.06)}
.ja-root .rcell-domain{font-family:'JetBrains Mono',monospace;font-size:0.72rem;color:var(--muted2);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}
.ja-root .rcell-arrow{width:28px;height:28px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;opacity:0;transform:translate(-4px,4px);transition:all .35s cubic-bezier(.2,.8,.2,1)}
.ja-root .rcell-arrow svg{width:11px;height:11px}

.ja-root .rcell-preview{position:absolute;inset:0;opacity:0;transition:opacity .6s ease,transform .8s ease;z-index:1;pointer-events:none;background:#0a0a12;transform:scale(1)}
.ja-root .rcell-preview img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;filter:grayscale(1) contrast(1.1)}
.ja-root .rcell-preview-bg{position:absolute;inset:0}

@media (max-width:1100px){
  .ja-root .recent-grid{grid-template-columns:repeat(2,1fr)}
  .ja-root .recent-cell{padding:2rem;min-height:240px}
  .ja-root .rcell-title{font-size:1.55rem}
}
@media (max-width:640px){
  .ja-root .recent-grid{grid-template-columns:1fr}
  .ja-root .recent-cell{padding:1.7rem;min-height:200px}
  .ja-root .rcell-title{font-size:1.4rem}
  .ja-root .rcell-arrow{opacity:1;transform:none;background:transparent;border:1px solid var(--border);color:var(--accent)}
}

.ja-root .filter-row{display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:3rem;margin-top:0.5rem}
.ja-root .fbtn{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);color:var(--muted2);padding:10px 22px;border-radius:100px;font-size:0.78rem;font-weight:600;cursor:pointer;transition:all .25s ease;font-family:'Plus Jakarta Sans',sans-serif;letter-spacing:0.02em}
.ja-root .fbtn:hover{border-color:rgba(255,255,255,0.18);color:#fff;background:rgba(255,255,255,0.05)}
.ja-root .fbtn.on{background:var(--accent);color:#0a0a0a;border-color:var(--accent);box-shadow:0 8px 22px -6px rgba(245,132,31,0.55)}

.ja-root .port-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:2rem 2rem;row-gap:3.5rem}
.ja-root .port-card{background:transparent;border:none;border-radius:0;overflow:visible;text-decoration:none;color:inherit;display:block;cursor:pointer;transition:transform .35s ease}
.ja-root .port-card.hide{display:none}
.ja-root .port-card:hover{transform:translateY(-4px)}
.ja-root .port-thumb{position:relative;aspect-ratio:16/10;height:auto;overflow:hidden;background:#0a0a12;border-radius:18px;border:1px solid rgba(255,255,255,0.06);transition:border-color .4s ease,box-shadow .4s ease}
.ja-root .port-card:hover .port-thumb{border-color:rgba(245,132,31,0.35);box-shadow:0 30px 80px -20px rgba(245,132,31,0.18)}
.ja-root .port-thumb .thumb-bg{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:14px;z-index:0}
.ja-root .port-thumb .thumb-bg::before{content:'';position:absolute;inset:0;background:radial-gradient(120% 80% at 50% 0%,rgba(255,255,255,0.06),transparent 60%),repeating-linear-gradient(45deg,rgba(255,255,255,0.025) 0 1px,transparent 1px 12px);pointer-events:none}
.ja-root .port-thumb .thumb-emoji{font-size:3.4rem;opacity:.7;filter:drop-shadow(0 6px 20px rgba(0,0,0,.5));position:relative;z-index:1}
.ja-root .port-thumb .thumb-brand{position:relative;z-index:1;font-family:'Clash Display',sans-serif;font-size:.78rem;font-weight:600;letter-spacing:1.4px;text-transform:uppercase;color:rgba(255,255,255,.6);background:rgba(0,0,0,.32);backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1);padding:5px 12px;border-radius:100px}
.ja-root .port-thumb img.port-shot{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top center;display:block;transition:transform .8s ease,opacity .5s ease,filter .5s ease;filter:saturate(1.05) contrast(1.02);z-index:1;opacity:.85}
.ja-root .port-card:hover .port-thumb img.port-shot{transform:scale(1.05);opacity:1}
.ja-root .port-thumb::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,12,0) 50%,rgba(10,10,12,0.7) 100%);z-index:2;pointer-events:none;opacity:0;transition:opacity .5s ease}
.ja-root .port-card:hover .port-thumb::after{opacity:1}
.ja-root .port-thumb .ptag{z-index:3}
.ja-root .ptag{position:absolute;top:14px;right:14px;font-size:0.62rem;font-weight:700;padding:5px 11px;border-radius:8px;text-transform:uppercase;letter-spacing:1.4px;backdrop-filter:blur(12px);background:rgba(255,255,255,0.10);border:1px solid rgba(255,255,255,0.18);color:#fff;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.ja-root .ptag-wp{background:rgba(33,150,196,0.22);color:#9fd6f5;border-color:rgba(33,150,196,0.35)}
.ja-root .ptag-sf{background:rgba(122,182,72,0.22);color:#c4e89c;border-color:rgba(122,182,72,0.35)}
.ja-root .ptag-wix{background:rgba(27,107,192,0.22);color:#a4c8ee;border-color:rgba(27,107,192,0.35)}
.ja-root .ptag-wf{background:rgba(67,83,255,0.22);color:#b8bdff;border-color:rgba(67,83,255,0.35)}
.ja-root .ptag-woo{background:rgba(139,92,246,0.22);color:#cebcfb;border-color:rgba(139,92,246,0.35)}
.ja-root .pcat{display:none}
.ja-root .port-body{padding:1.4rem 0.25rem 0;display:flex;flex-direction:column;gap:0.4rem}
.ja-root .port-meta{font-family:'JetBrains Mono',monospace;font-size:0.66rem;color:var(--accent);font-weight:600;letter-spacing:0.18em;text-transform:uppercase}
.ja-root .port-title{font-family:'Clash Display',sans-serif;font-size:1.4rem;font-weight:600;color:#fff;margin-bottom:0;letter-spacing:-0.01em;transition:color .3s ease;line-height:1.2}
.ja-root .port-card:hover .port-title{color:var(--accent)}
.ja-root .port-foot{display:flex;align-items:center;justify-content:space-between;gap:0.75rem;margin-top:0.5rem;padding-top:0.85rem;border-top:1px solid rgba(255,255,255,0.06)}
.ja-root .port-niche{font-size:0.78rem;color:var(--muted);margin-bottom:0;font-weight:500;flex:1;min-width:0}
.ja-root .port-link{display:inline-flex;align-items:center;gap:6px;color:var(--accent);font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;white-space:nowrap}
.ja-root .port-link svg{width:13px;height:13px;transition:transform .25s ease}
.ja-root .port-card:hover .port-link svg{transform:translate(3px,-3px)}

.ja-root .niches-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:1px;background:var(--border);border:1px solid var(--border);border-radius:20px;overflow:hidden;position:relative}
.ja-root .niche-chip{position:relative;background:var(--bg);padding:1.5rem 1.4rem 1.4rem;transition:background .35s ease;display:flex;flex-direction:column;gap:0.85rem;min-height:150px;cursor:default;overflow:hidden}
.ja-root .niche-chip::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at var(--mx,50%) var(--my,50%),rgba(245,132,31,0.12),transparent 60%);opacity:0;transition:opacity .4s ease;pointer-events:none}
.ja-root .niche-chip:hover{background:var(--surface)}
.ja-root .niche-chip:hover::before{opacity:1}
.ja-root .niche-chip:hover .niche-icon{border-color:rgba(245,132,31,0.45);background:var(--accent-glow);color:var(--accent);transform:translateY(-2px)}
.ja-root .niche-chip:hover .niche-num{color:var(--accent)}
.ja-root .niche-chip:hover .niche-arrow{opacity:1;transform:translate(0,0)}
.ja-root .niche-num{position:absolute;top:1rem;right:1.2rem;font-family:'JetBrains Mono',monospace;font-size:0.68rem;color:var(--muted);font-weight:600;letter-spacing:0.05em;transition:color .25s ease}
.ja-root .niche-arrow{position:absolute;bottom:1.1rem;right:1.2rem;width:14px;height:14px;color:var(--accent);opacity:0;transform:translate(-4px,4px);transition:all .3s ease}
.ja-root .niche-icon{width:42px;height:42px;border-radius:11px;background:rgba(255,255,255,0.03);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.7);transition:all .3s ease}
.ja-root .niche-icon svg{width:20px;height:20px}
.ja-root .niche-name{font-family:'Clash Display',sans-serif;font-size:0.95rem;font-weight:600;color:#fff;margin-bottom:4px;letter-spacing:-0.01em}
.ja-root .niche-count{font-size:0.78rem;color:var(--muted2);font-weight:400;line-height:1.5}

.ja-root .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem}
.ja-root .why-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:2rem;transition:border-color .3s}
.ja-root .why-card:hover{border-color:var(--accent)}
.ja-root .why-icon{width:44px;height:44px;border-radius:12px;background:var(--accent-glow);border:1px solid rgba(245,132,31,0.25);display:flex;align-items:center;justify-content:center;font-size:1.25rem;margin-bottom:1.25rem}
.ja-root .why-title{font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin-bottom:0.6rem}
.ja-root .why-text{font-size:0.85rem;color:var(--muted2);line-height:1.7}

.ja-root .cta-wrap{background:var(--surface);border:1px solid var(--border);border-radius:24px;padding:5rem 4rem;text-align:center;position:relative;overflow:hidden;max-width:860px;margin:0 auto}
.ja-root .cta-wrap::before{content:'';position:absolute;top:-50%;left:50%;transform:translateX(-50%);width:600px;height:400px;background:radial-gradient(ellipse,rgba(245,132,31,0.12),transparent 70%);pointer-events:none}
.ja-root .cta-wrap > *{position:relative;z-index:1}
.ja-root .cta-wrap .sec-title{font-size:2.5rem;margin-bottom:1rem}
.ja-root .cta-wrap p{color:var(--muted2);margin-bottom:2.5rem;font-size:1rem;max-width:500px;margin-left:auto;margin-right:auto}

.ja-root .contact-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;max-width:720px;margin:0 auto 2rem}
.ja-root .cc{background:var(--surface2);border:1px solid var(--border);border-radius:14px;padding:1.5rem;text-align:center;text-decoration:none;color:var(--text);transition:border-color .3s,transform .3s;display:block}
.ja-root .cc:hover{border-color:var(--accent);transform:translateY(-3px)}
.ja-root .cc-icon{font-size:1.75rem;margin-bottom:0.75rem}
.ja-root .cc-label{font-size:0.8rem;color:var(--muted);font-weight:500;margin-bottom:4px}
.ja-root .cc-val{font-family:'Clash Display',sans-serif;font-size:1rem;font-weight:600;color:#fff;word-break:break-word}

.ja-root .socials{display:flex;justify-content:center;gap:0.75rem;flex-wrap:wrap}
.ja-root .soc-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:100px;background:var(--surface2);border:1px solid var(--border);color:var(--text);text-decoration:none;font-size:0.85rem;font-weight:600;transition:all .2s}
.ja-root .soc-btn:hover{border-color:var(--accent);color:#fff;transform:translateY(-2px)}

.ja-root .ctav2{position:relative;max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.2fr 1fr;gap:3rem;align-items:center;background:linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01));border:1px solid var(--border);border-radius:40px;padding:4rem;overflow:hidden}
.ja-root .ctav2::before{content:'';position:absolute;top:-120px;right:-120px;width:420px;height:420px;background:radial-gradient(circle,rgba(245,132,31,0.18),transparent 65%);filter:blur(60px);pointer-events:none}
.ja-root .ctav2::after{content:'';position:absolute;bottom:-120px;left:-120px;width:420px;height:420px;background:radial-gradient(circle,rgba(245,132,31,0.10),transparent 65%);filter:blur(60px);pointer-events:none}
.ja-root .ctav2-left,.ja-root .ctav2-right{position:relative;z-index:1}
.ja-root .ctav2-eyebrow{display:inline-flex;align-items:center;gap:0.75rem;margin-bottom:1.4rem}
.ja-root .ctav2-eyebrow .bar{width:32px;height:1px;background:var(--accent)}
.ja-root .ctav2-eyebrow span{color:var(--accent);font-size:0.72rem;font-weight:700;letter-spacing:0.22em;text-transform:uppercase}
.ja-root .ctav2-title{font-family:'Clash Display',sans-serif;font-size:clamp(2.4rem,4.5vw,4rem);line-height:1.05;font-weight:700;letter-spacing:-0.02em;margin-bottom:1.4rem;color:#fff}
.ja-root .ctav2-title .accent{background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.4) 100%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
.ja-root .ctav2-desc{color:var(--muted2);font-size:1.05rem;line-height:1.7;max-width:480px;margin-bottom:2.4rem}
.ja-root .ctav2-socials{display:flex;flex-wrap:wrap;gap:0.7rem}
.ja-root .ctav2-soc{display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:100px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.10);color:var(--muted2);text-decoration:none;font-size:0.82rem;font-weight:600;transition:all .3s}
.ja-root .ctav2-soc:hover{background:rgba(255,255,255,0.10);color:#fff;border-color:rgba(255,255,255,0.20);transform:translateY(-2px)}
.ja-root .ctav2-right{display:grid;gap:0.85rem}
.ja-root .ctav2-card{display:flex;align-items:center;gap:1.1rem;padding:1.4rem 1.5rem;border-radius:22px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);text-decoration:none;color:#fff;transition:all .45s ease}
.ja-root .ctav2-card:hover{border-color:rgba(245,132,31,0.55);background:rgba(245,132,31,0.04);transform:translateY(-2px)}
.ja-root .ctav2-ico{width:50px;height:50px;flex:none;display:flex;align-items:center;justify-content:center;border-radius:16px;background:rgba(255,255,255,0.05);color:var(--accent);transition:all .45s ease}
.ja-root .ctav2-card:hover .ctav2-ico{background:var(--accent);color:#fff}
.ja-root .ctav2-ico svg{width:22px;height:22px}
.ja-root .ctav2-meta{min-width:0}
.ja-root .ctav2-label{font-size:0.7rem;color:var(--muted);font-weight:600;letter-spacing:0.12em;text-transform:uppercase;margin-bottom:4px}
.ja-root .ctav2-val{font-family:'Clash Display',sans-serif;font-size:1.05rem;font-weight:600;color:#fff;word-break:break-word;line-height:1.3}

.ja-root footer{border-top:1px solid var(--border);background:linear-gradient(180deg,transparent 0%,rgba(245,132,31,0.03) 100%);padding:4rem 5% 1.5rem;position:relative}
.ja-root .foot-grid{max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:3rem;padding-bottom:3rem;border-bottom:1px solid var(--border)}
.ja-root .foot-brand .logo-img{height:48px}
.ja-root .foot-tag{margin-top:1.1rem;font-size:0.88rem;color:var(--muted2);line-height:1.7;max-width:320px}
.ja-root .foot-socials{display:flex;gap:0.5rem;margin-top:1.4rem}
.ja-root .foot-socials a{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:10px;background:var(--surface);border:1px solid var(--border);color:var(--muted2);text-decoration:none;font-size:0.78rem;font-weight:700;transition:all .2s}
.ja-root .foot-socials a:hover{color:#fff;border-color:var(--accent);background:var(--accent-glow);transform:translateY(-2px)}
.ja-root .foot-col h4{font-family:'Clash Display',sans-serif;font-size:0.78rem;font-weight:700;color:#fff;text-transform:uppercase;letter-spacing:1.6px;margin-bottom:1.2rem}
.ja-root .foot-col ul{list-style:none;display:flex;flex-direction:column;gap:0.7rem}
.ja-root .foot-col a{font-size:0.88rem;color:var(--muted2);text-decoration:none;transition:color .2s}
.ja-root .foot-col a:hover{color:var(--accent)}
.ja-root .foot-bottom{max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;padding-top:1.5rem}
.ja-root .foot-copy{font-size:0.82rem;color:var(--muted)}
.ja-root .foot-meta{font-size:0.82rem;color:var(--muted)}
.ja-root .foot-meta span{color:var(--accent);font-weight:600}

@media(max-width:1100px){
  .ja-root .platforms-grid{grid-template-columns:repeat(3,1fr)}
  .ja-root .hero-inner{grid-template-columns:1fr}
  .ja-root .hero-right{display:none}
  .ja-root .foot-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .ja-root nav{padding:0 1.25rem;height:68px}
  .ja-root .nav-mid{display:none}
  .ja-root .nav-cta span.cta-text{display:none}
  .ja-root .nav-cta{padding:9px 14px}
  .ja-root .logo-img{height:38px}
  .ja-root .hero{padding:90px 1.25rem 3rem}
  .ja-root .section{padding:4rem 1.25rem}
  .ja-root .platforms-grid{grid-template-columns:repeat(2,1fr)}
  .ja-root .why-grid{grid-template-columns:1fr}
  .ja-root .contact-cards{grid-template-columns:1fr}
  .ja-root .cta-wrap{padding:3rem 1.5rem}
  .ja-root .ctav2{grid-template-columns:1fr;padding:2.5rem 1.5rem;gap:2rem;border-radius:28px}
  .ja-root .ctav2-title{font-size:2.2rem}
  .ja-root .foot-grid{grid-template-columns:1fr;gap:2rem;padding-bottom:2rem}
  .ja-root .foot-bottom{flex-direction:column;text-align:center}
}
`;

const WHATSAPP = "https://wa.me/8801836903940";
const EMAIL = "jamesansonofficial@gmail.com";
const DRIBBBLE = "https://dribbble.com/jamesansondigital";
const BEHANCE = "https://www.behance.net/jamesansondigital";
const LINKEDIN = "https://bd.linkedin.com/in/jamesansonofficial";

type Plat = "wp" | "sf" | "wix" | "wf" | "woo";
type Project = {
  href: string;
  p: Plat;
  emoji: string;
  cat: string;
  title: string;
  niche: string;
  bg: string;
  image?: string;
  recent?: boolean;
};

const projects: Project[] = [
  {
    href: "https://tonyarmer.com/",
    p: "wp", emoji: "🎯", cat: "Personal Brand",
    title: "Tony Armer", niche: "Personal Brand & Portfolio",
    bg: "linear-gradient(135deg,#14100a 0%,#241b10 100%)", recent: true,
  },
  {
    href: "https://toolii.com.au/",
    p: "sf", emoji: "🛠️", cat: "Tools & Equipment",
    title: "Toolii", niche: "Power Tools E-Commerce — Australia",
    bg: "linear-gradient(135deg,#1a1208 0%,#2e1f10 100%)", recent: true,
  },
  {
    href: "https://whiteeagle-security.com/",
    p: "wp", emoji: "🛡️", cat: "Security Services",
    title: "White Eagle Security", niche: "Corporate Security — Europe",
    bg: "linear-gradient(135deg,#0a0a14 0%,#14142a 100%)", recent: true,
  },
  {
    href: "https://australianhouses.com.au/",
    p: "wp", emoji: "🏡", cat: "Real Estate",
    title: "Australian Houses", niche: "Property Listings — Australia",
    bg: "linear-gradient(135deg,#0c1c2a 0%,#142e44 100%)", recent: true,
  },
  {
    href: "https://dreamair.com.au/",
    p: "wp", emoji: "❄️", cat: "Home Services",
    title: "Dream Air", niche: "HVAC & Air Conditioning — Australia",
    bg: "linear-gradient(135deg,#0a1a24 0%,#142a3a 100%)", recent: true,
  },
  {
    href: "https://tashaneshedden.com.au/",
    p: "wp", emoji: "🌸", cat: "Personal Brand",
    title: "Tashane Shedden", niche: "Coach & Speaker — Australia",
    bg: "linear-gradient(135deg,#1e0e1c 0%,#321a2e 100%)", recent: true,
  },
  {
    href: "https://beautea.com.au/",
    p: "sf", emoji: "🍵", cat: "Beverages",
    title: "Beautea", niche: "Premium Tea Brand — Australia",
    bg: "linear-gradient(135deg,#0e1e10 0%,#16321c 100%)", recent: true,
  },
  {
    href: "https://medicaldocumentupload.com.au/",
    p: "wp", emoji: "🩺", cat: "Healthcare",
    title: "Medical Document Upload", niche: "Healthcare Platform — Australia",
    bg: "linear-gradient(135deg,#0c1828 0%,#142840 100%)", recent: true,
  },
  {
    href: "https://premiumframework.ca/",
    p: "wp", emoji: "🏗️", cat: "SaaS & Tech",
    title: "Premium Framework", niche: "Coaching Platform — Canada",
    bg: "linear-gradient(135deg,#1a1208 0%,#2e2010 100%)", recent: true,
  },
  {
    href: "https://petalon.co.uk/",
    p: "sf", emoji: "💐", cat: "Florist & Gifts",
    title: "Petalon", niche: "Florist & Gifts — United Kingdom",
    bg: "linear-gradient(135deg,#1e0e18 0%,#321628 100%)", recent: true,
  },
  {
    href: "https://slagerijgelsema.nl/",
    p: "wp", emoji: "🥩", cat: "Food & Butcher",
    title: "Slagerij Gelsema", niche: "Artisan Butcher — Netherlands",
    bg: "linear-gradient(135deg,#1e0a0a 0%,#321414 100%)", recent: true,
  },
  {
    href: "https://www.bosendevries.nl/",
    p: "wp", emoji: "🌳", cat: "Business & Services",
    title: "Bos en de Vries", niche: "Tree Services — Netherlands",
    bg: "linear-gradient(135deg,#0e1a0e 0%,#162e16 100%)", recent: true,
  },
  {
    href: "https://pcbrains.nl/",
    p: "wp", emoji: "💻", cat: "Tech & IT",
    title: "PC Brains", niche: "Computer Services — Netherlands",
    bg: "linear-gradient(135deg,#0a0e22 0%,#141a36 100%)", recent: true,
  },
  {
    href: "https://lcplunderground.vet/",
    p: "wp", emoji: "🐾", cat: "Veterinary",
    title: "LCPL Underground", niche: "Veterinary Practice",
    bg: "linear-gradient(135deg,#0e1814 0%,#162e22 100%)", recent: true,
  },
  {
    href: "https://www.urbanboxco.com/",
    p: "sf", emoji: "📦", cat: "Lifestyle",
    title: "Urban Box Co", niche: "Subscription Box — Lifestyle",
    bg: "linear-gradient(135deg,#1a1410 0%,#2e231c 100%)", recent: true,
  },
  {
    href: "https://specialisedfilmservices.co.za/",
    p: "wp", emoji: "🎬", cat: "Film & Production",
    title: "Specialised Film Services", niche: "Film Production — South Africa",
    bg: "linear-gradient(135deg,#100a14 0%,#1c1424 100%)", recent: true,
  },
  {
    href: "https://prairieagproducts.com/",
    p: "wp", emoji: "🌾", cat: "Agriculture",
    title: "Prairie Ag Products", niche: "Agriculture — North America",
    bg: "linear-gradient(135deg,#1a1808 0%,#2e2a10 100%)", recent: true,
  },
  {
    href: "https://safegenics.com/",
    p: "wp", emoji: "🧬", cat: "Biotech & Health",
    title: "SafeGenics", niche: "Biotech & Genetic Testing",
    bg: "linear-gradient(135deg,#0a1820 0%,#142a36 100%)", recent: true,
  },
  {
    href: "https://gjmcustomizing.nl/en/",
    p: "wp", emoji: "🏎️", cat: "Automotive",
    title: "GJM Customizing", niche: "Auto Customization — Netherlands",
    bg: "linear-gradient(135deg,#1a0a0a 0%,#2e1414 100%)", recent: true,
  },
  {
    href: "https://grmfamilylaw.com/",
    p: "wp",
    emoji: "⚖️",
    cat: "Legal & Law",
    title: "GRM Family Law",
    niche: "Law Firm — USA",
    bg: "linear-gradient(135deg,#1a1228 0%,#2e1a4e 100%)",
  },
  {
    href: "https://www.danaosbornedesign.com/",
    p: "wp",
    emoji: "💐",
    cat: "Events & Design",
    title: "Dana Osborne Design",
    niche: "Wedding & Event Invitations",
    bg: "linear-gradient(135deg,#2e1218 0%,#4e1a26 100%)",
  },
  {
    href: "https://steelboxco.com",
    p: "wp",
    emoji: "🏗️",
    cat: "Business & Corporate",
    title: "Steel Box Co",
    niche: "Business & Corporate",
    bg: "linear-gradient(135deg,#1c1c1c 0%,#2e2e2e 100%)",
  },
  {
    href: "https://thewoodmansarms.com/",
    p: "wp",
    emoji: "🍻",
    cat: "Restaurant",
    title: "The Woodmans Arms",
    niche: "Restaurant — United Kingdom",
    bg: "linear-gradient(135deg,#1a1208 0%,#2e2010 100%)",
  },
  {
    href: "https://www.gutmanmuseum.co.il/",
    p: "wp",
    emoji: "🏛️",
    cat: "Museum",
    title: "Gutman Museum",
    niche: "Museum & Culture — Israel",
    bg: "linear-gradient(135deg,#1a1020 0%,#2e1a38 100%)",
  },
  {
    href: "https://www.wpelevation.com/",
    p: "wp",
    emoji: "🚀",
    cat: "Agency & Services",
    title: "WP Elevation",
    niche: "Web Agency & Services",
    bg: "linear-gradient(135deg,#0a1628 0%,#122038 100%)",
  },
  {
    href: "https://rejuvenatingveganspa.com/",
    p: "wp",
    emoji: "🌿",
    cat: "Health & Wellness",
    title: "Rejuvenating Vegan Spa",
    niche: "Health & Wellness Spa",
    bg: "linear-gradient(135deg,#0e200e 0%,#163216 100%)",
  },
  {
    href: "https://pacificwild.org/",
    p: "wp",
    emoji: "🐋",
    cat: "Nonprofit / Wildlife",
    title: "Pacific Wild",
    niche: "Wildlife Conservation — Canada",
    bg: "linear-gradient(135deg,#0a1e18 0%,#123028 100%)",
  },
  {
    href: "https://blacklabelhotels.nl/",
    p: "wp",
    emoji: "🏨",
    cat: "Hotel & Travel",
    title: "Black Label Hotels",
    niche: "Luxury Hotel — Netherlands",
    bg: "linear-gradient(135deg,#0c0c14 0%,#18182a 100%)",
  },
  {
    href: "https://www.torgesonelectric.com/",
    p: "wp",
    emoji: "⚡",
    cat: "Electrician",
    title: "Torgeson Electric",
    niche: "Electrical Services — USA",
    bg: "linear-gradient(135deg,#1a1600 0%,#2e2800 100%)",
  },
  {
    href: "https://www.camperboys.de/en/",
    p: "wp",
    emoji: "🚐",
    cat: "Travel & Vans",
    title: "Camper Boys",
    niche: "Camper Van Rentals — Germany",
    bg: "linear-gradient(135deg,#101c10 0%,#1a2e1a 100%)",
  },
  {
    href: "https://brooklyncandlestudio.com",
    p: "sf",
    emoji: "🕯️",
    cat: "Home & Lifestyle",
    title: "Brooklyn Candle Studio",
    niche: "Home & Lifestyle — Brooklyn, NY",
    bg: "linear-gradient(135deg,#1e1212 0%,#3a1a1a 100%)",
    image: brooklynCandlePreview,
  },
  {
    href: "https://betafpv.com/",
    p: "sf",
    emoji: "🤖",
    cat: "Electronics",
    title: "BetaFPV",
    niche: "Electronics & Drones",
    bg: "linear-gradient(135deg,#0c0c20 0%,#141430 100%)",
  },
  {
    href: "https://www.greats.com/",
    p: "sf",
    emoji: "👟",
    cat: "Fashion",
    title: "Greats Brand",
    niche: "Premium Footwear — USA",
    bg: "linear-gradient(135deg,#1a1010 0%,#2e1818 100%)",
  },
  {
    href: "https://www.elfcosmetics.com/",
    p: "sf",
    emoji: "💄",
    cat: "Beauty & Cosmetics",
    title: "e.l.f. Cosmetics",
    niche: "Beauty & Cosmetics — USA",
    bg: "linear-gradient(135deg,#1e0e1a 0%,#321628 100%)",
  },
  {
    href: "https://www.denydesigns.com",
    p: "sf",
    emoji: "🛋️",
    cat: "Home & Decor",
    title: "Deny Designs",
    niche: "Home & Decor — USA",
    bg: "linear-gradient(135deg,#0e1020 0%,#161828 100%)",
  },
  {
    href: "https://zestypaws.com",
    p: "sf",
    emoji: "🐾",
    cat: "Pet Products",
    title: "Zesty Paws",
    niche: "Pet Products & Supplements",
    bg: "linear-gradient(135deg,#1a1400 0%,#2e2200 100%)",
  },
  {
    href: "https://www.peakchocolate.com.au/",
    p: "sf",
    emoji: "🍫",
    cat: "Food & Drink",
    title: "Peak Chocolate",
    niche: "Food & Drink — Australia",
    bg: "linear-gradient(135deg,#200e00 0%,#381600 100%)",
  },
  {
    href: "https://ragdoll-la.com/",
    p: "sf",
    emoji: "👗",
    cat: "Clothing & Fashion",
    title: "Ragdoll LA",
    niche: "Fashion — Los Angeles, USA",
    bg: "linear-gradient(135deg,#200a20 0%,#38103a 100%)",
  },
  {
    href: "https://lyfefuel.com/",
    p: "sf",
    emoji: "💪",
    cat: "Health & Fitness",
    title: "LyfeFuel",
    niche: "Health & Nutrition — USA",
    bg: "linear-gradient(135deg,#0e1e0a 0%,#163010 100%)",
  },
  {
    href: "https://www.heroinesinc.org/",
    p: "wix",
    emoji: "🌟",
    cat: "Nonprofit",
    title: "Heroines Inc",
    niche: "Nonprofit Organization — USA",
    bg: "linear-gradient(135deg,#100a20 0%,#1c1230 100%)",
  },
  {
    href: "https://www.weirlaw.co.uk/",
    p: "wix",
    emoji: "⚖️",
    cat: "Law Firm",
    title: "Weir Law",
    niche: "Law Firm — United Kingdom",
    bg: "linear-gradient(135deg,#0c1422 0%,#141e32 100%)",
  },
  {
    href: "https://www.zelieforshe.com/thestory",
    p: "wix",
    emoji: "✂️",
    cat: "Fashion Designer",
    title: "Zelie For She",
    niche: "Fashion Designer",
    bg: "linear-gradient(135deg,#1e0a18 0%,#2e1228 100%)",
  },
  {
    href: "https://www.veronicasolomon.com/",
    p: "wix",
    emoji: "🪴",
    cat: "Interior Design",
    title: "Veronica Solomon",
    niche: "Interior Design — USA",
    bg: "linear-gradient(135deg,#1a1800 0%,#2a2600 100%)",
    image: veronicaSolomonPreview,
  },
  {
    href: "https://www.temilola.photo/",
    p: "wix",
    emoji: "📸",
    cat: "Photography",
    title: "Temilola Photo",
    niche: "Professional Photographer",
    bg: "linear-gradient(135deg,#0a0a14 0%,#121220 100%)",
  },
  {
    href: "https://www.browngirljane.com/",
    p: "wix",
    emoji: "✨",
    cat: "Wellness & Beauty",
    title: "Brown Girl Jane",
    niche: "Wellness & Beauty Brand",
    bg: "linear-gradient(135deg,#1e1008 0%,#2e1a10 100%)",
  },
  {
    href: "https://breezy.hr/",
    p: "wf",
    emoji: "👥",
    cat: "SaaS",
    title: "Breezy HR",
    niche: "HR & Recruiting SaaS",
    bg: "linear-gradient(135deg,#080c20 0%,#101430 100%)",
    image: breezyHrPreview,
  },
  {
    href: "https://instagantt.com/",
    p: "wf",
    emoji: "📊",
    cat: "Project Management",
    title: "Instagantt",
    niche: "Project Management SaaS",
    bg: "linear-gradient(135deg,#081408 0%,#101e10 100%)",
  },
  {
    href: "https://thefutur.com/",
    p: "wf",
    emoji: "🎓",
    cat: "Education",
    title: "The Futur",
    niche: "Creative Education & Community",
    bg: "linear-gradient(135deg,#10080e 0%,#1c1018 100%)",
  },
  {
    href: "https://mural.co/",
    p: "wf",
    emoji: "🖼️",
    cat: "Collaboration Tool",
    title: "Mural",
    niche: "Digital Collaboration Platform",
    bg: "linear-gradient(135deg,#080c1e 0%,#10142e 100%)",
  },
  {
    href: "https://viral-loops.com/",
    p: "wf",
    emoji: "📈",
    cat: "Marketing SaaS",
    title: "Viral Loops",
    niche: "Referral Marketing Platform",
    bg: "linear-gradient(135deg,#0e1008 0%,#1c1c10 100%)",
    image: viralLoopsPreview,
  },
  {
    href: "https://raygun.com/",
    p: "wf",
    emoji: "🎯",
    cat: "Tech & Software",
    title: "Raygun",
    niche: "Software Intelligence Platform",
    bg: "linear-gradient(135deg,#180808 0%,#281010 100%)",
  },
  {
    href: "https://cronometer.com/",
    p: "wf",
    emoji: "🥗",
    cat: "Health Tech",
    title: "Cronometer",
    niche: "Nutrition Tracking App",
    bg: "linear-gradient(135deg,#0a1e10 0%,#122818 100%)",
  },
  {
    href: "https://www.getguru.com/",
    p: "wf",
    emoji: "🧠",
    cat: "Knowledge SaaS",
    title: "Guru",
    niche: "Knowledge Management SaaS",
    bg: "linear-gradient(135deg,#140a1e 0%,#201030 100%)",
  },
  {
    href: "https://gooddyeyoung.com/",
    p: "woo",
    emoji: "🎨",
    cat: "Beauty",
    title: "Good Dye Young",
    niche: "Hair Color Brand — USA",
    bg: "linear-gradient(135deg,#1a0814 0%,#2a1020 100%)",
  },
  {
    href: "https://boboandboo.com.au/",
    p: "woo",
    emoji: "🍽️",
    cat: "Kids & Babies",
    title: "Bobo & Boo",
    niche: "Kids Dinnerware — Australia",
    bg: "linear-gradient(135deg,#0e1a0e 0%,#162818 100%)",
  },
  {
    href: "https://iluminashop.com/",
    p: "woo",
    emoji: "💡",
    cat: "Electronics",
    title: "Ilumina Shop",
    niche: "Electronics Store — Spain",
    bg: "linear-gradient(135deg,#0a1020 0%,#121830 100%)",
  },
  {
    href: "https://bloomscape.com/",
    p: "woo",
    emoji: "🌱",
    cat: "Home & Garden",
    title: "Bloomscape",
    niche: "Houseplants — Detroit, USA",
    bg: "linear-gradient(135deg,#081408 0%,#101e10 100%)",
  },
];

const niches: Array<[React.ComponentType<{ className?: string }>, string, string]> = [
  [ShoppingBag, "E-Commerce", "Fashion, beauty, food & electronics stores"],
  [UtensilsCrossed, "Restaurant", "Menus, reservations & online ordering"],
  [Scale, "Law & Legal", "Law firms, attorneys & consultants"],
  [Building2, "Real Estate", "Listings, agencies & property platforms"],
  [HeartPulse, "Health & Wellness", "Spa, gym, fitness & nutrition brands"],
  [Cpu, "SaaS & Tech", "Software, startups & digital platforms"],
  [Wrench, "Plumbing & Trade", "Local service business websites"],
  [Plane, "Hotel & Travel", "Booking, hospitality & tourism"],
  [Palette, "Design Agency", "Portfolios & creative studios"],
  [Camera, "Photography", "Galleries, portfolio & booking sites"],
  [Flower2, "Wedding & Events", "Invitations, planners & venues"],
  [Landmark, "Museum & Culture", "Exhibitions, collections & tours"],
  [Music, "Music & Arts", "Artists, bands & galleries"],
  [Sofa, "Home Decor", "Interior, furniture & flooring"],
  [Car, "Automotive", "Parts, dealerships & services"],
  [Trophy, "Sports & Fitness", "Gyms, coaches & sports brands"],
  [Sprout, "Nonprofit & NGO", "Organizations, causes & missions"],
  [GraduationCap, "Education", "Courses, tutoring & academies"],
];

const ArrowSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

function ProjectCard({
  pr,
  hidden,
  ptagClass,
  platLabel,
}: {
  pr: Project;
  hidden: boolean;
  ptagClass: string;
  platLabel: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const services = React.useMemo(
    () => [
      (u: string) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=1280&h=900`,
      (u: string) =>
        `https://api.microlink.io/?url=${encodeURIComponent(u)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=900`,
      (u: string) => `https://image.thum.io/get/width/1280/crop/900/noanimate/${u}`,
    ],
    [],
  );

 const src = pr.image ?? (services[serviceIdx](pr.href) + (attempt ? (services[serviceIdx](pr.href).includes("?") ? "&_r=" + attempt : "?_r=" + attempt) : ""));

  const handleLoad = () => {
    if (pr.image) {
      setLoaded(true);
      return;
    }
    const img = imgRef.current;
    if (img && img.naturalWidth > 0 && img.naturalWidth < 600) {
      if (attempt < 6) {
        setTimeout(() => setAttempt((a) => a + 1), 1500 + attempt * 800);
      } else if (serviceIdx < services.length - 1) {
        setServiceIdx((i) => i + 1);
        setAttempt(0);
      }
      return;
    }
    setLoaded(true);
  };

  const handleError = () => {
    if (pr.image) {
      setErrored(true);
      return;
    }
    if (serviceIdx < services.length - 1) {
      setServiceIdx((i) => i + 1);
      setAttempt(0);
    } else {
      setErrored(true);
    }
  };

  return (
    <a
      href={pr.href}
      target="_blank"
      rel="noreferrer"
      className={`port-card ${hidden ? "hide" : ""}`}
    >
      <div className="port-thumb">
        <div className="thumb-bg" style={{ background: pr.bg }}>
          <span className="thumb-emoji" aria-hidden>
            {pr.emoji}
          </span>
          <span className="thumb-brand">{pr.title}</span>
        </div>
        {!errored && (
          <img
            ref={imgRef}
            key={`${serviceIdx}-${attempt}`}
            className={`port-shot ${loaded ? "loaded" : ""}`}
            src={src}
            alt={`${pr.title} website screenshot`}
            loading="lazy"
            width="1280"
            height="900"
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
        <span className={ptagClass}>{platLabel}</span>
      </div>
      <div className="port-body">
        <div className="port-meta">{pr.cat}</div>
        <div className="port-title">{pr.title}</div>
        <div className="port-foot">
          <div className="port-niche">{pr.niche}</div>
          <div className="port-link">
            Visit Site <ArrowSvg />
          </div>
        </div>
      </div>
    </a>
  );
}

function RecentCard({ pr, index }: { pr: Project; index: number }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [serviceIdx, setServiceIdx] = useState(0);
  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const services = React.useMemo(
    () => [
      (u: string) => `https://s.wordpress.com/mshots/v1/${encodeURIComponent(u)}?w=1280&h=900`,
      (u: string) =>
        `https://api.microlink.io/?url=${encodeURIComponent(u)}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=900`,
      (u: string) => `https://image.thum.io/get/width/1280/crop/900/noanimate/${u}`,
    ],
    [],
  );

const src = pr.image ?? (services[serviceIdx](pr.href) + (attempt ? "&_r=" + attempt : ""));

  const handleLoad = () => {
    if (pr.image) return setLoaded(true);
    const img = imgRef.current;
    if (img && img.naturalWidth > 0 && img.naturalWidth < 600) {
      if (attempt < 14) setTimeout(() => setAttempt((a) => a + 1), 1800 + attempt * 600);
      else if (serviceIdx < services.length - 1) {
        setServiceIdx((i) => i + 1);
        setAttempt(0);
      } else {
        setLoaded(true);
      }
      return;
    }
    setLoaded(true);
  };

  const handleError = () => {
    if (pr.image) return setErrored(true);
    if (serviceIdx < services.length - 1) {
      setServiceIdx((i) => i + 1);
      setAttempt(0);
    } else setErrored(true);
  };

  let domain = pr.href;
  try {
    domain = new URL(pr.href).hostname.replace(/^www\./, "");
  } catch {}

  return (
    <a href={pr.href} target="_blank" rel="noreferrer" className="recent-cell">
      <div className="rcell-preview" aria-hidden>
        <div className="rcell-preview-bg" style={{ background: pr.bg }} />
        {!errored && (
          <img
            ref={imgRef}
            key={`${serviceIdx}-${attempt}`}
            src={src}
            alt=""
            loading="lazy"
            width="1280"
            height="900"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity .4s ease" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
      <div className="rcell-top">
        <span className="rcell-num">/{String(index + 1).padStart(2, "0")}</span>
        <span className="rcell-status">Live</span>
      </div>
      <div className="rcell-body">
        <span className="rcell-cat">{pr.cat} · {pr.niche}</span>
        <h3 className="rcell-title">{pr.title}</h3>
        <div className="rcell-foot">
          <span className="rcell-domain">{domain}</span>
          <span className="rcell-arrow"><ArrowSvg /></span>
        </div>
      </div>
    </a>
  );
}

function CountUp({
  end,
  suffix = "",
  duration = 1800,
  className,
}: {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(end * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return (
    <span ref={ref} className={`num-tick ${className ?? ""}`}>
      {val}
      {suffix}
    </span>
  );
}

export default function Index() {
  const [filter, setFilter] = useState<"all" | Plat>("all");
  const [scrolled, setScrolled] = useState(false);

  const recentProjects = useMemo(() => projects.filter((p) => p.recent), []);
  const olderProjects = useMemo(() => projects.filter((p) => !p.recent), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filters: { id: "all" | Plat; label: string }[] = [
    { id: "all", label: "All Projects" },
    { id: "wp", label: "WordPress" },
    { id: "sf", label: "Shopify" },
    { id: "wix", label: "Wix" },
    { id: "wf", label: "Webflow" },
    { id: "woo", label: "WooCommerce" },
  ];

  const ptagClass = (p: Plat) => `ptag ptag-${p}`;
  const platLabel: Record<Plat, string> = {
    wp: "WordPress",
    sf: "Shopify",
    wix: "Wix",
    wf: "Webflow",
    woo: "WooCommerce",
  };

  return (
    <div className="ja-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "body{background:#060608;color:#e8e6f0;font-family:'Plus Jakarta Sans',sans-serif}",
        }}
      />

      <nav className={scrolled ? "scrolled" : ""}>
        <a href="#" className="logo" aria-label="James Anson — Home">
          <img src={logo} alt="James Anson" className="logo-img" />
        </a>
        <div className="nav-mid">
          <a href="#platforms">Services</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#niches">Niches</a>
          <a href="#why">Why Me</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="nav-right">
          <a
            className="nav-icon"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v7.46h-4.55v-6.61c0-1.58-.03-3.6-2.19-3.6-2.2 0-2.53 1.72-2.53 3.49V22H7.62V8z" />
            </svg>
          </a>
          <a
            className="nav-icon"
            href={BEHANCE}
            target="_blank"
            rel="noreferrer"
            aria-label="Behance"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
            </svg>
          </a>
          <a
            className="nav-icon"
            href={DRIBBBLE}
            target="_blank"
            rel="noreferrer"
            aria-label="Dribbble"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.7 0 12 0zm7.9 5.5c1.4 1.7 2.3 3.9 2.3 6.3-.3-.1-3.5-.7-6.7-.3-.1-.2-.1-.3-.2-.5-.2-.5-.4-.9-.6-1.4 3.6-1.5 5-3.7 5.2-4.1zM12 1.8c2.6 0 4.9.9 6.7 2.4-.2.3-1.5 2.4-4.9 3.7C12.1 4.9 10.4 3.4 10.2 3.2c.6-.1 1.2-.2 1.8-.2v-1.2zM8.1 4c.2.2 1.9 1.7 3.5 4.6-4.4 1.2-8.4 1.2-8.8 1.2.7-3 2.7-5.4 5.3-5.8zM2.2 12v-.3c.4 0 5 .1 9.7-1.3.3.5.5 1 .8 1.5-.1 0-.2.1-.4.1-4.9 1.6-7.5 5.9-7.7 6.3-1.5-1.7-2.4-3.9-2.4-6.3zm9.8 10.2c-2.2 0-4.2-.7-5.8-2 .2-.3 2.2-4.2 7.5-6.1.1 0 .1 0 .2-.1 1.3 3.5 1.9 6.4 2 7.3-1.3.5-2.6.9-3.9.9zm5.5-1.7c-.1-.6-.6-3.4-1.9-6.8 3-.5 5.7.3 6 .4-.4 2.7-1.9 5-4.1 6.4z" />
            </svg>
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="nav-cta"
            aria-label="Hire Me on WhatsApp"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
            </svg>
            <span className="cta-text">Hire Me</span>
          </a>
        </div>
      </nav>

      <header className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-bg" />
        <div className="hero-orb o1" />
        <div className="hero-orb o2" />
        <div className="hero-floats" aria-hidden="true">
          <div className="orbit-ring r-1" />
          <div className="orbit-ring r-2" />
          <div className="orbit-ring r-3" />
          <div className="hf-ico hf-figma" title="Figma">
            <svg viewBox="0 0 38 57" xmlns="http://www.w3.org/2000/svg"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1abcfe"/><path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0acf83"/><path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#ff7262"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#f24e1e"/><path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#a259ff"/></svg>
          </div>
          <div className="hf-ico hf-wp" title="WordPress">
            <svg viewBox="0 0 122 122" xmlns="http://www.w3.org/2000/svg" fill="#21759b"><path d="M8.7 61c0 20.7 12 38.6 29.5 47.1L13.2 39.7c-2.9 6.5-4.5 13.7-4.5 21.3zm87.5-2.6c0-6.5-2.3-10.9-4.3-14.4-2.6-4.3-5.1-7.9-5.1-12.2 0-4.8 3.6-9.3 8.8-9.3.2 0 .5 0 .7.1A52 52 0 0 0 61 9c-17.7 0-33.2 9-42.3 22.7 1.2 0 2.3.1 3.3.1 5.4 0 13.9-.7 13.9-.7 2.8-.2 3.1 3.9.3 4.2 0 0-2.8.3-5.9.5L48.9 91.3l11.2-33.6-8-21.9c-2.8-.2-5.4-.5-5.4-.5-2.8-.2-2.5-4.4.3-4.2 0 0 8.6.7 13.7.7 5.4 0 13.9-.7 13.9-.7 2.8-.2 3.1 3.9.3 4.2 0 0-2.8.3-5.9.5l18.6 55.2 5.1-17.2c2.2-7.1 3.9-12.2 3.9-16.6zM61.9 65.5l-15.4 44.8c4.6 1.4 9.5 2.1 14.5 2.1 6 0 11.7-1 17-2.9-.1-.2-.3-.5-.4-.7L61.9 65.5zm44.8-29.6c.2 1.7.3 3.4.3 5.4 0 5.3-1 11.3-4 18.7l-16.1 46.6A52.2 52.2 0 0 0 113 61c0-9.1-2.3-17.7-6.4-25.1zM61 0a61 61 0 1 0 0 122A61 61 0 0 0 61 0zm0 119.2A58.2 58.2 0 1 1 61 2.8a58.2 58.2 0 0 1 0 116.4z"/></svg>
          </div>
          <div className="hf-ico hf-shop" title="Shopify">
            <svg viewBox="0 0 109 124" xmlns="http://www.w3.org/2000/svg"><path d="M74.7 14.8c0-.5-.4-.8-.8-.8s-6.4.5-6.4.5l-4.8-4.7c-.5-.5-1.4-.4-1.8-.2-.1 0-1 .3-2.4.7-1.4-4-3.9-7.7-8.2-7.7h-.4C49.2.9 47.6 0 46.2 0c-10.7 0-15.8 13.4-17.4 20.2l-7.5 2.3c-2.3.7-2.4.8-2.7 3L12 92l54.3 10.2 29.4-6.4S74.8 15.2 74.7 14.8zM55 17.4l-8 2.5c0-1.1.1-2.3.1-3.5 0-3.5-.5-6.4-1.3-8.7C49 8.1 51.6 12 53.2 16c.6-.1 1.2-.1 1.8 0zm-9.6-3c-1 .3-2 .6-3.1 1l-3.4 1c1.3-5 3.8-7.4 6-8.3 .6 1.4 1 3.4 1 6.3 0 0-.4 0-.5 0zM41.4 4c.5 0 1 .2 1.5.5-2.9 1.4-6 4.8-7.3 11.5l-5.5 1.7C31.7 11.4 36 4 41.4 4z" fill="#95bf47"/><path d="M73.9 14c-.4 0-6.4.5-6.4.5l-4.8-4.7c-.2-.2-.4-.3-.7-.3l-4.1 100.6 29.4-6.4S74.8 15.2 74.7 14.8c0-.5-.4-.8-.8-.8z" fill="#5e8e3e"/><path d="M50.2 39l-3.6 10.8s-3.2-1.7-7.1-1.7c-5.7 0-6 3.6-6 4.5 0 4.9 12.9 6.8 12.9 18.4 0 9.1-5.8 15-13.6 15-9.4 0-14.2-5.9-14.2-5.9l2.5-8.4s4.9 4.2 9.1 4.2c2.7 0 3.8-2.2 3.8-3.8 0-6.4-10.6-6.7-10.6-17.3 0-8.9 6.4-17.6 19.4-17.6 5 0 7.4 1.4 7.4 1.4z" fill="#fff"/></svg>
          </div>
          <div className="hf-ico hf-wf" title="Webflow">
            <svg viewBox="0 0 256 217" xmlns="http://www.w3.org/2000/svg"><path d="M256 .002L160 215.999h-89.997l40.16-77.79h-1.802C81.244 181.183 41.482 211.586 0 215.999v-76.726s26.546-1.57 42.156-18.005H0V.003h76.717v63.106l1.802-.005L109.881.003h57.99v62.71l1.799-.005L201.999 0z" fill="#4353FF"/></svg>
          </div>
          <div className="hf-ico hf-wix" title="Wix">
            <svg viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M14.65 1.81c-1.7.89-2.32 2.4-2.32 6.55 0 0 .86-.83 2.13-1.29.93-.34 1.7-.85 2.16-1.18 1.4-1.04 1.62-2.39 1.62-4.07 0 0-2.53-.13-3.59 0zm-7.2 1.65c-1.41.04-2.82 1.27-3.06 2.6L1.93 22.6 4.12 6.06c.21-1.6 1.38-2.65 2.95-2.6h.38zm14.4 0L17.92 24h2.99l3.93-15.92c.32-1.3 1.74-2.53 3.06-2.6h.39zM50 6.06l-3.16 4.93-3.16-4.93h-3.79l5.05 7.92L40 21.91h3.78l3.16-4.93 3.16 4.93h3.79l-5.05-7.92 5.05-7.93H50zM65.04 6.06h-2.99l-3.79 14.92L54.46 6.06h-3.21l4.95 17.91h2.85l4.99-17.91zm14.42 0a8.41 8.41 0 0 0-8.4 8.4 8.41 8.41 0 0 0 8.4 8.4 8.41 8.41 0 0 0 8.4-8.4 8.41 8.41 0 0 0-8.4-8.4zm0 13.62a5.22 5.22 0 1 1 0-10.44 5.22 5.22 0 0 1 0 10.44z"/></svg>
          </div>
          <div className="hf-ico hf-woo" title="WooCommerce">
            <svg viewBox="0 0 256 153" xmlns="http://www.w3.org/2000/svg"><path d="M23.76 0h208.36c13.18 0 23.84 10.66 23.84 23.84v79.47c0 13.18-10.66 23.84-23.84 23.84h-74.72l10.26 25.13-45.13-25.13H23.84C10.66 127.15 0 116.49 0 103.31V23.84C-.08 10.74 10.58 0 23.76 0z" fill="#7f54b3"/><path d="M14.55 21.74c1.45-1.97 3.63-3 6.55-3.21 5.32-.43 8.34 2.06 9.07 7.49 3.21 21.65 6.72 39.97 10.45 54.96l22.76-43.35c2.06-3.93 4.66-5.99 7.74-6.21 4.55-.34 7.36 2.57 8.5 8.72 2.57 13.7 5.83 25.36 9.71 35.27 2.66-26.04 7.19-44.79 13.53-56.32 1.54-2.91 3.81-4.36 6.81-4.55 2.4-.17 4.55.51 6.47 2.06 1.97 1.54 3 3.51 3.17 5.91.13 1.88-.21 3.43-1.12 4.99-4.02 7.43-7.32 19.86-9.97 37.24-2.57 16.84-3.51 30-2.83 39.46.21 2.57-.21 4.84-1.28 6.81-1.28 2.31-3.21 3.51-5.7 3.68-2.83.21-5.74-1.11-8.55-3.93-10.07-10.28-18.06-25.61-23.94-46-7.06 13.91-12.29 24.34-15.67 31.29-6.42 12.34-11.92 18.66-16.5 18.96-2.96.21-5.49-2.31-7.62-7.49-5.49-14.08-11.41-41.31-17.74-81.66-.36-2.57.21-4.84 1.66-6.81z" fill="#fff"/></svg>
          </div>
        </div>
        <div className="hero-inner">
          <div>
            <div className="hero-available">
              <div className="pulse-dot" />
              Available for new projects
            </div>
            <h1>
              Hi, I'm James
              <br />
              <span className="line-accent">UI/UX Designer</span>
              <br />
              &amp; Web Developer
            </h1>
            <p className="hero-desc">
              I design in <strong style={{ color: "#fff" }}>Figma</strong> and build
              high-converting, visually stunning websites on WordPress, Shopify, Wix, Webflow
              &amp; WooCommerce — from wireframe to launch, end-to-end.
            </p>
            <div className="hero-btns">
              <a href="#portfolio" className="btn-glow">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="m8 21 4-4 4 4M12 17v4" />
                </svg>
                See My Work
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-ghost">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                WhatsApp Me
              </a>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-num">
                  <CountUp end={200} />
                  <span>+</span>
                </div>
                <div className="hero-stat-label">Projects Delivered</div>
              </div>
              <div>
                <div className="hero-stat-num">
                  <CountUp end={6} />
                  <span>+</span>
                </div>
                <div className="hero-stat-label">Platforms Mastered</div>
              </div>
              <div>
                <div className="hero-stat-num">
                  <CountUp end={20} />
                  <span>+</span>
                </div>
                <div className="hero-stat-label">Industry Niches</div>
              </div>
              <div>
                <div className="hero-stat-num">
                  <CountUp end={15} />
                  <span>+</span>
                </div>
                <div className="hero-stat-label">Countries Served</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            {[
              {
                ic: "ic-fig",
                Icon: Palette,
                name: "UI/UX Design",
                det: "Figma · Wireframes · Prototypes · Design Systems",
                count: "100+",
              },
              {
                ic: "ic-wp",
                Icon: Code2,
                name: "WordPress",
                det: "Elementor · Divi · Visual Composer",
                count: "80+",
              },
              {
                ic: "ic-sf",
                Icon: ShoppingBag,
                name: "Shopify",
                det: "PageFly · Custom Themes · Dropship",
                count: "50+",
              },
              {
                ic: "ic-wf",
                Icon: Layout,
                name: "Webflow",
                det: "SaaS · Startup · Agency Sites",
                count: "60+",
              },
              {
                ic: "ic-wix",
                Icon: Monitor,
                name: "Wix",
                det: "Creative · Portfolio · Business",
                count: "40+",
              },
              {
                ic: "ic-woo",
                Icon: Layers,
                name: "WooCommerce",
                det: "E-commerce · Multi-vendor · Stores",
                count: "30+",
              },
            ].map((s) => (
              <div className="platform-stack-card" key={s.name}>
                <div className={`psc-icon ${s.ic}`}>
                  <s.Icon />
                </div>
                <div className="psc-info">
                  <div className="psc-name">{s.name}</div>
                  <div className="psc-detail">{s.det}</div>
                </div>
                <div className="psc-count">{s.count}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <hr className="divider" />

      <section className="section" id="portfolio">
        <div className="section-inner">
          <div className="recent-ticker" aria-hidden="true">
            <div className="recent-ticker-track">
              <span>LIVE · SHIPPING NOW</span><span>·</span>
              <span>E-COMMERCE</span><span>·</span>
              <span>RESTAURANT</span><span>·</span>
              <span>LAW & LEGAL</span><span>·</span>
              <span>REAL ESTATE</span><span>·</span>
              <span>HEALTH & WELLNESS</span><span>·</span>
              <span>SAAS & TECH</span><span>·</span>
              <span>PLUMBING & TRADE</span><span>·</span>
              <span>HOTEL & TRAVEL</span><span>·</span>
              <span>DESIGN AGENCY</span><span>·</span>
              <span>PHOTOGRAPHY</span><span>·</span>
              <span>WEDDING & EVENTS</span><span>·</span>
              <span>MUSEUM & CULTURE</span><span>·</span>
              <span>MUSIC & ARTS</span><span>·</span>
              <span>HOME DECOR</span><span>·</span>
              <span>AUTOMOTIVE</span><span>·</span>
              <span>SPORTS & FITNESS</span><span>·</span>
              <span>NONPROFIT & NGO</span><span>·</span>
              <span>EDUCATION</span><span>·</span>
              <span>RECENTLY LAUNCHED</span><span>·</span>
              <span>REAL BUSINESSES</span><span>·</span>
              <span>LIVE · SHIPPING NOW</span><span>·</span>
              <span>E-COMMERCE</span><span>·</span>
              <span>RESTAURANT</span><span>·</span>
              <span>LAW & LEGAL</span><span>·</span>
              <span>REAL ESTATE</span><span>·</span>
              <span>HEALTH & WELLNESS</span><span>·</span>
              <span>SAAS & TECH</span><span>·</span>
              <span>PLUMBING & TRADE</span><span>·</span>
              <span>HOTEL & TRAVEL</span><span>·</span>
              <span>DESIGN AGENCY</span><span>·</span>
              <span>PHOTOGRAPHY</span><span>·</span>
              <span>WEDDING & EVENTS</span><span>·</span>
              <span>MUSEUM & CULTURE</span><span>·</span>
              <span>MUSIC & ARTS</span><span>·</span>
              <span>HOME DECOR</span><span>·</span>
              <span>AUTOMOTIVE</span><span>·</span>
              <span>SPORTS & FITNESS</span><span>·</span>
              <span>NONPROFIT & NGO</span><span>·</span>
              <span>EDUCATION</span><span>·</span>
              <span>RECENTLY LAUNCHED</span><span>·</span>
              <span>REAL BUSINESSES</span><span>·</span>
            </div>
          </div>
          <div className="sec-eyebrow">Recently Launched</div>
          <h2 className="sec-title">Latest Live Sites</h2>
          <p className="sec-sub">
            Fresh launches from the past few months — real businesses, all live and shipping
            today.
          </p>

          <div className="recent-wrap">
            <div className="recent-head-bar">
              <span className="recent-eyebrow">Live Index · Latest Launches</span>
              <span className="recent-counter">
                <span className="recent-live-dot" />
                {recentProjects.length} Live Projects
              </span>
            </div>
            <div className="recent-grid">
              {recentProjects.map((pr, i) => (
                <RecentCard key={pr.href} pr={pr} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section">
        <div className="section-inner">
          <div className="sec-eyebrow">Live Work</div>
          <h2 className="sec-title">Selected Projects</h2>
          <p className="sec-sub">
            A curated archive of past websites across WordPress, Shopify, Wix, Webflow, and
            WooCommerce.
          </p>

          <div className="filter-row" style={{ position: "relative", zIndex: 50 }}>
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`fbtn ${filter === f.id ? "on" : ""}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="port-grid">
            {olderProjects.map((pr) => {
              const isHidden = !(filter === "all" || filter === pr.p);
              
              // CSS er bodole ekhane sorasori hide kora hocche jate 100% kaj kore
              if (isHidden) return null;
              
              return (
                <ProjectCard
                  key={pr.href}
                  pr={pr}
                  hidden={false}
                  ptagClass={ptagClass(pr.p)}
                  platLabel={platLabel[pr.p]}
                />
              );
            })}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" id="niches">
        <div className="section-inner">
          <div className="sec-eyebrow">Industry Experience</div>
          <h2 className="sec-title">Niches I Serve</h2>
          <p className="sec-sub">
            From local plumbers to global SaaS companies — I have deep experience designing for
            every industry.
          </p>
          <div className="niches-grid">
            {niches.map(([Icon, name, count], i) => (
              <div className="niche-chip" key={name}>
                <span className="niche-num">{String(i + 1).padStart(2, "0")}</span>
                <div className="niche-icon"><Icon /></div>
                <div>
                  <div className="niche-name">{name}</div>
                  <div className="niche-count">{count}</div>
                </div>
                <ArrowUpRight className="niche-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" id="why">
        <div className="section-inner">
          <div className="sec-eyebrow">Why Hire Me</div>
          <h2 className="sec-title">What Makes Me Different</h2>
          <p className="sec-sub">
            Not just a designer — a partner who understands your business goals and builds websites
            that convert.
          </p>
          <div className="why-grid">
            {[
              [
                "🎯",
                "Conversion-Focused Design",
                "Every design decision is made with your business goal in mind. I don't just make sites look good — I make them work hard for your business and convert visitors into customers.",
              ],
              [
                "⚡",
                "Fast Delivery",
                "I respect deadlines. Most projects are delivered on time or early. I communicate throughout the process so you always know where your project stands.",
              ],
              [
                "🌍",
                "Global Experience",
                "I have worked with clients from USA, UK, Australia, Germany, Israel, Denmark, Spain, and many more countries. I understand diverse markets and audiences.",
              ],
              [
                "📱",
                "Mobile-First Approach",
                "Every website I build is fully responsive and looks perfect on all devices — phone, tablet, and desktop. No exceptions.",
              ],
              [
                "🔄",
                "Unlimited Revisions",
                "I work until you are 100% satisfied. Your feedback is taken seriously and implemented promptly. No nickeling and diming for basic changes.",
              ],
              [
                "💬",
                "Clear Communication",
                "Fast responses, clear updates, and honest timelines. I keep you informed at every step and am always available to answer your questions.",
              ],
            ].map(([i, t, d]) => (
              <div className="why-card" key={t}>
                <div className="why-icon">{i}</div>
                <div className="why-title">{t}</div>
                <div className="why-text">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="divider" />

      <section className="section" id="contact">
        <div className="ctav2">
          <div className="ctav2-left">
            <div className="ctav2-eyebrow">
              <span className="bar" />
              <span>Start Your Project</span>
            </div>
            <h2 className="ctav2-title">
              Ready to Build Your<br />
              <span className="accent">Dream Website?</span>
            </h2>
            <p className="ctav2-desc">
              Tell me about your project on WhatsApp or email. I respond within a few hours with a
              clear plan, timeline, and competitive quote. No obligations.
            </p>
            <div className="ctav2-socials">
              <a className="ctav2-soc" href={DRIBBBLE} target="_blank" rel="noreferrer">Dribbble</a>
              <a className="ctav2-soc" href={BEHANCE} target="_blank" rel="noreferrer">Behance</a>
              <a className="ctav2-soc" href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </div>
          <div className="ctav2-right">
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ctav2-card">
              <div className="ctav2-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div className="ctav2-meta">
                <div className="ctav2-label">WhatsApp (Direct)</div>
                <div className="ctav2-val">+880 1836-903940</div>
              </div>
            </a>
            <a href={`mailto:${EMAIL}`} className="ctav2-card">
              <div className="ctav2-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              </div>
              <div className="ctav2-meta">
                <div className="ctav2-label">Email Me</div>
                <div className="ctav2-val">{EMAIL}</div>
              </div>
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" className="ctav2-card">
              <div className="ctav2-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </div>
              <div className="ctav2-meta">
                <div className="ctav2-label">LinkedIn</div>
                <div className="ctav2-val">@jamesansonofficial</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      <footer>
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#" className="logo" aria-label="James Anson">
              <img src={logo} alt="James Anson" className="logo-img" />
            </a>
            <p className="foot-tag">
              Full Stack Web Developer & UI/UX Designer crafting high-converting websites on
              WordPress, Shopify, Wix, Webflow & WooCommerce. Trusted by 200+ clients across 15+
              countries.
            </p>
            <div className="foot-socials">
              <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                in
              </a>
              <a href={BEHANCE} target="_blank" rel="noreferrer" aria-label="Behance">
                Be
              </a>
              <a href={DRIBBBLE} target="_blank" rel="noreferrer" aria-label="Dribbble">
                Dr
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                Wa
              </a>
            </div>
          </div>
          <div className="foot-col">
            <h4>Explore</h4>
            <ul>
              <li>
                <a href="#platforms">Services</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#niches">Niches</a>
              </li>
              <li>
                <a href="#why">Why Hire Me</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Platforms</h4>
            <ul>
              <li>
                <a href="#platforms">WordPress</a>
              </li>
              <li>
                <a href="#platforms">Shopify</a>
              </li>
              <li>
                <a href="#platforms">Wix</a>
              </li>
              <li>
                <a href="#platforms">Webflow</a>
              </li>
              <li>
                <a href="#platforms">WooCommerce</a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h4>Get in Touch</h4>
            <ul>
              <li>
                <a href={WHATSAPP} target="_blank" rel="noreferrer">
                  WhatsApp · +880 1836-903940
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noreferrer">
                  linkedin.com/in/jamesansonofficial
                </a>
              </li>
              <li>
                <a href={BEHANCE} target="_blank" rel="noreferrer">
                  behance.net/jamesansondigital
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <div className="foot-copy">
            © {new Date().getFullYear()} James Anson — All rights reserved.
          </div>
          <div className="foot-meta">
            Designed & developed by <span>James Anson</span>
          </div>
        </div>
      </footer>
    </div>
  );
}