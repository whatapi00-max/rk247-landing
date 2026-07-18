import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initAnimations(): void {
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero intro timeline
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl
    .from(".hero-bar", {
      scaleY: 0,
      transformOrigin: "bottom",
      stagger: 0.06,
      duration: 0.9,
    })
    .from(".hero-man", { y: 60, opacity: 0, duration: 1 }, "-=0.5")
    .from(".hero-title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
    .from(".chip", { y: 16, opacity: 0, stagger: 0.05, duration: 0.5 }, "-=0.4");

  if (prefersReduced) return;

  // Generic reveal-on-scroll for all .reveal elements
  gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      }
    );
  });

  // Anniversary "11" pop + parallax
  gsap.fromTo(
    ".anniv-img",
    { scale: 0.8, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "back.out(1.4)",
      scrollTrigger: { trigger: ".anniv-img", start: "top 80%" },
    }
  );

  // Statement headline word emphasis
  gsap.from(".statement", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: { trigger: ".statement", start: "top 80%" },
  });

  // Phone in hand subtle float driven by scroll
  gsap.to(".platform-phone", {
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".platform-phone",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  // Broker logo rotate-in
  gsap.fromTo(
    ".broker-logo",
    { rotate: -8, scale: 0.9, opacity: 0 },
    {
      rotate: 0,
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".broker-logo", start: "top 80%" },
    }
  );

  // Globe parallax zoom
  gsap.fromTo(
    ".globe-img",
    { scale: 1.15 },
    {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".globe-img",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    }
  );

  // Animated chart line draw
  gsap.utils.toArray<SVGPolylineElement>(".trade-line").forEach((line) => {
    const len = line.getTotalLength();
    gsap.set(line, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(line, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: { trigger: line, start: "top 85%" },
    });
  });

  // Clock hand sweep
  gsap.to(".clock-hand", {
    rotation: 360,
    transformOrigin: "bottom center",
    duration: 8,
    repeat: -1,
    ease: "none",
  });
}
