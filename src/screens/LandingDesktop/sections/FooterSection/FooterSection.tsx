import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const FooterSection = (): JSX.Element => {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);

  const navigationItems = [
    { label: "About", href: "#about" },
    { label: "Service", href: "#service" },
    { label: "Key Project", href: "#key-project" },
    { label: "Characters", href: "#characters" },
  ];

  const socialIcons = [
    { src: "/img/icon.svg", alt: "Social media icon 1" },
    { src: "/img/icon-1.svg", alt: "Social media icon 2" },
    { src: "/img/icon-2.svg", alt: "Social media icon 3" },
    { src: "/img/icon-3.svg", alt: "Social media icon 4" },
  ];

  useEffect(() => {
    if (!footerRef.current || !logoRef.current) return;

    // 디바이스 타입 감지
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                          ('ontouchstart' in window) ||
                          window.innerWidth < 1280;

    if (isMobileDevice) {
      // 모바일: 로고를 항상 완전히 보이도록 설정
      gsap.set(logoRef.current, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        display: 'block'
      });
      console.log('📱 Mobile: Footer logo always visible');
    } else {
      // 데스크탑: 기존 애니메이션 유지
      // 로고 초기 상태를 숨김으로 설정
      gsap.set(logoRef.current, {
        opacity: 0,
        y: 30
      });

      // 데스크탑 애니메이션
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom -10%",
        onEnter: () => {
          gsap.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          gsap.to(logoRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.in"
          });
        },
        onEnterBack: () => {
          gsap.to(logoRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out"
          });
        },
        onLeaveBack: () => {
          gsap.to(logoRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: "power2.in"
          });
        }
      });
      console.log('💻 Desktop: Footer logo with animation');
    }

    // 정리 함수
    return () => {
      if (!isMobileDevice) {
        ScrollTrigger.getAll().forEach((trigger) => {
          if (trigger.trigger === footerRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, []);
  

  return (
    <footer
      ref={footerRef}
      className="flex flex-col items-start relative self-stretch xl:w-[var(--grid-width)] w-full flex-[0_0_auto] bg-[color:var(--color-mode-surface-surface-accent)] overflow-hidden"
      data-grid-mode="desktop"
      role="contentinfo"
    >
      <div className="flex flex-col items-start pt-[var(--primitives-spacing-spacing-07)] xl:pr-[var(--grid-section-hr-padding)] xl:pl-[var(--grid-section-hr-padding)] pr-4 pl-4 pb-[var(--primitives-spacing-spacing-07)] relative self-stretch xl:w-[var(--grid-width)] w-full flex-[0_0_auto] z-[1]">
        <div className="flex flex-col items-center gap-[var(--grid-container-gap)] relative self-stretch w-full flex-[0_0_auto]">
          <nav
            className="flex xl:flex-row flex-wrap xl:items-start items-center justify-center xl:gap-[var(--grid-content-gap)] gap-4 relative self-stretch w-full flex-[0_0_auto]"
            role="navigation"
            aria-label="Footer navigation"
          >
            <div className="xl:hidden flex flex-wrap justify-center gap-4 w-full">
              {/* 모바일에서 두 줄로 표시: 첫 번째 줄 2개, 두 번째 줄 2개 */}
              <div className="flex justify-center gap-4 w-full">
                {navigationItems.slice(0, 2).map((item, index) => (
                  <div key={index} className="inline-flex h-6 items-center relative flex-[0_0_auto]">
                    <div className="inline-flex items-center relative flex-[0_0_auto]">
                      <a
                        href={item.href}
                        className="relative w-fit mt-[-1.00px] font-label-medium font-[number:var(--label-medium-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)] hover:text-[color:var(--color-mode-text-text-accent-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mode-text-text-accent)] focus:ring-offset-2"
                      >
                        {item.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 w-full">
                {navigationItems.slice(2).map((item, index) => (
                  <div key={index + 2} className="inline-flex h-6 items-center relative flex-[0_0_auto]">
                    <div className="inline-flex items-center relative flex-[0_0_auto]">
                      <a
                        href={item.href}
                        className="relative w-fit mt-[-1.00px] font-label-medium font-[number:var(--label-medium-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)] hover:text-[color:var(--color-mode-text-text-accent-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mode-text-text-accent)] focus:ring-offset-2"
                      >
                        {item.label}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* 데스크탑에서는 한 줄로 표시 */}
            <div className="hidden xl:flex xl:items-start xl:justify-center xl:gap-[var(--grid-content-gap)] xl:w-full">
              {navigationItems.map((item, index) => (
                <div
                  key={index}
                  className="inline-flex h-6 items-center gap-[var(--primitives-spacing-spacing-03)] relative flex-[0_0_auto]"
                >
                  <div className="inline-flex items-center relative flex-[0_0_auto]">
                    <a
                      href={item.href}
                      className="relative w-fit mt-[-1.00px] font-label-medium font-[number:var(--label-medium-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)] hover:text-[color:var(--color-mode-text-text-accent-hover)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[color:var(--color-mode-text-text-accent)] focus:ring-offset-2"
                    >
                      {item.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </nav>

          <div className="flex flex-col items-center gap-[var(--primitives-spacing-spacing-05)] relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative xl:w-[513.5px] xl:h-[347.5px] w-[256px] h-[174px] z-[3]">
              <img
                ref={logoRef}
                className="absolute xl:w-[513px] xl:h-[347px] w-[256px] h-[174px] top-0 left-0"
                alt="Company logo"
                src="/img/vector-12.svg"
              />
            </div>

            <p className="relative xl:w-[1312px] w-full max-w-[400px] px-4 font-paragraph-medium font-[number:var(--paragraph-medium-font-weight)] text-[color:var(--color-mode-text-text-secondary-on-accent)] text-[length:var(--paragraph-medium-font-size)] text-center tracking-[var(--paragraph-medium-letter-spacing)] leading-[var(--paragraph-medium-line-height)] [font-style:var(--paragraph-medium-font-style)]">
            One Story, Infinite Worlds
            </p>

            <div
              className="inline-flex items-start gap-3 relative flex-[0_0_auto]"
              role="list"
              aria-label="Social media links"
            >
              {socialIcons.map((icon, index) => (
                <div
                  key={index}
                  className="relative w-6 h-6 group cursor-not-allowed transition-opacity duration-200"
                  role="listitem"
                  aria-label={`Social media link ${index + 1}`}
                >
                  <img
                    className="relative w-6 h-6"
                    alt={icon.alt}
                    src={icon.src}
                  />
                  {/* COMING SOON 툴팁 */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    COMING SOON
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center pt-[var(--primitives-spacing-spacing-06)] xl:pr-[var(--grid-section-hr-padding)] xl:pl-[var(--grid-section-hr-padding)] pr-4 pl-4 pb-[var(--primitives-spacing-spacing-06)] relative self-stretch xl:w-[var(--grid-width)] w-full flex-[0_0_auto] z-0">
        <div className="flex items-start gap-[var(--grid-container-gap)] relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative flex-1 self-stretch mt-[-1.00px] font-paragraph-small font-[number:var(--paragraph-small-font-weight)] text-[color:var(--color-mode-text-text-secondary-on-accent)] text-[length:var(--paragraph-small-font-size)] text-center tracking-[var(--paragraph-small-letter-spacing)] leading-[var(--paragraph-small-line-height)] [font-style:var(--paragraph-small-font-style)]">
            Copyright © 2025 | SUPERSTORY. All rights reserved.
          </p>
        </div>
      </div>

      <img
        className="absolute xl:w-[716px] xl:h-[612px] w-[400px] h-[342px] top-[200px] xl:top-0 right-0 z-[0]"
        alt="Decorative background element"
        src="/img/frame-34075.svg"
      />
    </footer>
  );
};
