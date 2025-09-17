import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CallToActionSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const socialMediaRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const socialMediaLinks = [
    {
      id: 1,
      icon: "/img/frame-34072.svg",
      alt: "Frame",
      className: "relative w-[40.67px] h-[40.67px]",
    },
    {
      id: 2,
      icon: "/img/vector-10.svg",
      alt: "Vector",
      className: "absolute w-6 h-6 top-[9px] left-[9px]",
      containerClassName: "relative w-[40.92px] h-[41.35px]",
    },
    {
      id: 3,
      icon: "/img/vector-11.svg",
      alt: "Vector",
      className: "absolute w-6 h-[17px] top-3 left-2",
      containerClassName: "relative w-[41.35px] h-[40.92px]",
    },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    // 접근성 고려 - 모션 감소 설정 확인
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!shouldReduceMotion) {
      // 모든 요소들을 배열로 수집
      const elements = [
        badgeRef.current,
        titleRef.current,
        descriptionRef.current,
        socialMediaRef.current,
        dividerRef.current,
        subTitleRef.current,
        buttonRef.current,
      ].filter(Boolean);

      // 모든 요소에 초기 상태 설정
      elements.forEach((element) => {
        gsap.set(element, {
          opacity: 0,
          y: 50
        });
      });

      // 스크롤 트리거로 순차 애니메이션 실행
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          // 시간차를 두고 아래에서 위로 페이드인
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15
          });
        },
        onLeave: () => {
          // 섹션을 벗어날 때 초기 상태로 리셋
          gsap.set(elements, {
            opacity: 0,
            y: 50
          });
        },
        onEnterBack: () => {
          // 뒤로 스크롤해서 다시 들어올 때 애니메이션 재생
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15
          });
        },
        onLeaveBack: () => {
          // 위로 스크롤해서 벗어날 때 초기 상태로 리셋
          gsap.set(elements, {
            opacity: 0,
            y: 50
          });
        }
      });
    }

    // 정리 함수
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-start pt-[var(--grid-section-vr-padding)] pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-[var(--grid-section-hr-padding)] relative self-stretch w-[var(--grid-width)] flex-[0_0_auto] bg-transparent"
      data-color-mode-mode="light"
      aria-labelledby="cta-heading"
    >
      <div
        className="flex flex-col items-center gap-[var(--grid-container-gap)] pt-[var(--primitives-spacing-spacing-10)] pr-[var(--primitives-spacing-spacing-12)] pb-[var(--primitives-spacing-spacing-10)] pl-[var(--primitives-spacing-spacing-12)] relative self-stretch w-full max-w-[1440px] mx-auto flex-[0_0_auto] bg-black rounded-[var(--corner-corner-05)] overflow-hidden"
        data-color-mode-mode="light"
      >
        <div className="flex flex-col w-[864px] items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto] z-[4] px-[40px]">
          <div 
            ref={badgeRef}
            className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]"
          >
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] whitespace-nowrap text-[color:var(--Text-text-primary,#0A0A0A)] text-[14px] font-[family:'Roboto_Mono',Helvetica] font-bold leading-5 break-words">
                Join StoryNomics
              </span>
            </div>
          </div>

          <h2
            ref={titleRef}
            id="cta-heading"
            className="text-[color:var(--color-mode-text-text-primary-inverse)] text-center relative self-stretch font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
          >
            Get In Touch
          </h2>

          <p 
            ref={descriptionRef}
            className="relative self-stretch font-paragraph-large font-[number:var(--paragraph-large-font-weight)] text-color-mode-text-text-secondary text-[length:var(--paragraph-large-font-size)] text-center tracking-[var(--paragraph-large-letter-spacing)] leading-[var(--paragraph-large-line-height)] [font-style:var(--paragraph-large-font-style)]"
          >
            Connect With us in social media for the latest updates and news
          </p>
        </div>

        <nav
          ref={socialMediaRef}
          className="inline-flex items-center gap-[20.1px] px-[3.58px] py-[16.54px] relative flex-[0_0_auto] z-[3]"
          aria-label="Social media links"
        >
          {socialMediaLinks.map((link) => (
            <div
              key={link.id}
              className={`relative group cursor-not-allowed ${link.containerClassName || ""}`}
              aria-label={`Follow us on ${link.alt}`}
            >
              {link.containerClassName ? (
                <div className={link.containerClassName}>
                  <img
                    className={link.className}
                    alt={link.alt}
                    src={link.icon}
                  />
                </div>
              ) : (
                <img
                  className={link.className}
                  alt={link.alt}
                  src={link.icon}
                />
              )}
              {/* COMING SOON 툴팁 */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                COMING SOON
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          ))}
        </nav>

        <hr
          ref={dividerRef}
          className="relative w-full max-w-[1200px] mx-auto h-[1px] z-[2] opacity-60 bg-[#252525] border-0"
        />

        <div className="flex flex-col items-center gap-[var(--primitives-spacing-spacing-05)] relative self-stretch w-full flex-[0_0_auto] z-[1]">
          <h3 
            ref={subTitleRef}
            className="mt-[-1.00px] text-[color:var(--color-mode-text-text-primary-inverse)] text-center relative self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]"
          >
            Or each out directly
          </h3>
        </div>

        <div
          ref={buttonRef}
          className="all-[unset] box-border inline-flex flex-col items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto] z-0"
        >
          <div className="inline-flex items-start gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto]">
            <div className="relative group">
              <button
                className="all-[unset] box-border inline-flex h-12 items-center justify-center pt-[var(--primitives-spacing-spacing-04)] pr-[var(--primitives-spacing-spacing-04)] pb-[var(--primitives-spacing-spacing-04)] pl-[var(--primitives-spacing-spacing-04)] relative flex-[0_0_auto] bg-color-mode-surface-surface-secondary rounded-[var(--primitives-radius-radius-999px)] overflow-hidden cursor-not-allowed transition-colors hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-color-mode-text-text-primary focus:ring-offset-2"
                type="button"
                aria-label="Contact us - Coming Soon"
                disabled
              >
                <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-03)] pl-[var(--primitives-spacing-spacing-03)] py-0 relative flex-[0_0_auto]">
                  <span className="relative w-fit mt-[-1.00px] font-label-medium font-[number:var(--label-medium-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)]">
                    Contact Us
                  </span>
                </div>

                <img
                  className="relative w-6 h-6"
                  alt=""
                  src="/img/trailing-icon-2.svg"
                  aria-hidden="true"
                />
              </button>
              {/* COMING SOON 툴팁 */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                COMING SOON
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
