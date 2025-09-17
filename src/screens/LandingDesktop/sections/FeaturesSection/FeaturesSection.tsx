import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 1,
    title: "Webtoon",
    description:
      "Original Story Creation: The core medium that explains and establishes the shared universe.",
    icon: "/img/key-icon-01.svg",
    movie: "/img/key-01",  // .webm and .mp4 will be added in video source
    badge: "Webtoon",
    stats: "700K+",
    backgroundImage: "/img/key-01.png",
    backgroundColor:
      "linear-gradient(0deg,rgba(207,17,38,1)_0%,rgba(207,17,38,1)_100%),linear-gradient(0deg,rgba(241,255,126,1)_0%,rgba(241,255,126,1)_100%)",
    hasLearnMore: false,
  },
  {
    id: 2,
    title: "Animation",
    description:
      "Expanding Stories: Telling episodes or perspectives not fully explored in the webtoon.",
    icon: "/img/key-icon-02.svg",
    movie: "/img/key-02",  // .webm and .mp4 will be added in video source
    badge: "Animation",
    backgroundImage: "/img/key-02.png",
    backgroundColor: "black",
    hasLearnMore: false,
  },
  {
    id: 3,
    title: "ShortForm",
    description:
      "Real actors perform as characters in short-form clips, adding authenticity to the IP and sustaining fan engagement.",
    icon: "/img/key-icon-03.svg",
    movie: "/img/key-03",  // .webm and .mp4 will be added in video source
    badge: "ShortForm",
    stats: "140M+",
    backgroundImage: "/img/key-03.png",
    backgroundColor: "#ff69bf",
    hasLearnMore: false,
  },
  {
    id: 4,
    title: "Game",
    description:
      "Interactive Expansion: Users actively engage with the universe and characters.",
    icon: "/img/key-icon-04.svg",
    movie: "/img/key-04",  // .webm and .mp4 will be added in video source
    badge: "Game",
    gameImage: "/img/key-04.png",
    backgroundColor: "black",
    hasLearnMore: false,
  },
];

// 모바일 카드 컴포넌트
const MobileFeatureCard = ({ feature, isCenter }: { feature: any; isCenter: boolean }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    console.log(`🎬 Card ${feature.id} - isCenter: ${isCenter}, hasMovie: ${!!feature.movie}`);

    if (videoRef.current && feature.movie) {
      if (isCenter) {
        console.log(`🎬 Playing video for card ${feature.id}`);
        videoRef.current.play().catch(err => {
          console.log(`🎬 Failed to play video for card ${feature.id}:`, err);
        });
      } else {
        console.log(`🎬 Pausing video for card ${feature.id}`);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isCenter, feature.movie, feature.id]);

  return (
    <article
      data-card-id={feature.id}
      className="w-full h-[568px] relative overflow-hidden rounded-[12px] border border-[#E2E5EB]"
      style={{ background: feature.backgroundColor }}
    >
      {/* Background Image */}
      <div
        className={`absolute inset-0 bg-cover bg-top transition-opacity duration-500 ${
          isCenter ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          backgroundImage: `url(${feature.backgroundImage || feature.gameImage})`,
        }}
      />

      {/* Video */}
      {feature.movie && (
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isCenter ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={`${feature.movie}.webm`} type="video/webm" />
          <source src={`${feature.movie}.mp4`} type="video/mp4" />
        </video>
      )}

      {/* Content Overlay */}
      <div className="relative h-full flex flex-col justify-between p-6">
        {/* Tag */}
        <div className="self-start rounded-full px-4 py-2 bg-[#E2E5EB]">
          <span className="text-sm font-bold font-[family:'Roboto_Mono',Helvetica] text-black">
            {feature.badge}
          </span>
        </div>

        {/* Bottom Content */}
        <div className="space-y-4">
          {/* Stats (for cards that have them) */}
          {feature.stats && (
            <div className="text-white text-4xl font-bold [font-family:'Anton_SC',Helvetica]">
              {feature.stats}
            </div>
          )}

          {/* Title and Description */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center p-2 bg-[color:var(--color-mode-surface-surface-accent-disabled)] rounded-[20px]">
                <img
                  className="w-6 h-6"
                  alt={`${feature.title} icon`}
                  src={feature.icon}
                  style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(96%) saturate(4936%) hue-rotate(343deg) brightness(88%) contrast(108%)' }}
                />
              </div>
              <h3 className="text-white text-xl font-semibold">
                {feature.title}
              </h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export const FeaturesSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardId, setActiveCardId] = useState<number>(1); // 기본으로 첫 번째 카드가 active
  const [centerCardId, setCenterCardId] = useState<number>(0); // 모바일에서 화면 중앙에 위치한 카드 (초기값 0으로 설정)

  // 모바일 Intersection Observer를 별도 useEffect로 분리
  useEffect(() => {
    const checkMobile = () => window.innerWidth < 1280;
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const isMobile = checkMobile();
      console.log('🎬 Setup observer - isMobile:', isMobile, 'window width:', window.innerWidth);

      if (!isMobile) return;

      // DOM이 완전히 렌더링될 때까지 기다림
      const timer = setTimeout(() => {
        // 모바일 카드 컨테이너를 더 정확하게 찾기
        const featuresSection = document.querySelector('[data-section="features"]');
        if (!featuresSection) {
          console.log('🎬 Features section not found');
          return;
        }

        const mobileCardsContainer = featuresSection.querySelector('.xl\\:hidden');
        if (!mobileCardsContainer) {
          console.log('🎬 Mobile cards container not found');
          return;
        }

        const cards = mobileCardsContainer.querySelectorAll('[data-card-id]');
        console.log('🎬 Found mobile cards:', cards.length);

        if (cards.length === 0) {
          console.log('🎬 No cards found with data-card-id');
          return;
        }

        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const cardId = parseInt(entry.target.getAttribute('data-card-id') || '0');
              console.log(`🎬 Card ${cardId} - ratio: ${entry.intersectionRatio.toFixed(2)}, isIntersecting: ${entry.isIntersecting}`);

              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                console.log(`🎬 ✅ Setting center card to: ${cardId}`);
                setCenterCardId(cardId);
              }
            });
          },
          {
            threshold: [0, 0.25, 0.5, 0.75, 1],
            rootMargin: '-25% 0px -25% 0px'
          }
        );

        cards.forEach((card, index) => {
          console.log(`🎬 Observing card ${index + 1}:`, card.getAttribute('data-card-id'));
          observer?.observe(card);
        });
      }, 300); // 더 긴 딜레이로 DOM 안정화 기다림

      return () => clearTimeout(timer);
    };

    setupObserver();

    // 윈도우 리사이즈 시 재설정
    const handleResize = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      setupObserver();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        console.log('🎬 Cleanup: Disconnecting observer');
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 접근성 고려 - 모션 감소 설정 확인
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // 단어별 3D 텍스트 애니메이션 - 왼쪽 아래에서 회전하며 나타남
    if (titleTextRef.current && !shouldReduceMotion) {
      // 텍스트를 단어별로 분리하고 span으로 감싸기
      const titleText = titleTextRef.current.textContent;
      if (titleText) {
        const words = titleText.split(' ');
        titleTextRef.current.innerHTML = words
          .map((word, index) => `<span class="word-${index}" style="display: inline-block;">${word}</span>`)
          .join(' ');

        // 각 단어에 초기 상태 설정
        const wordElements = titleTextRef.current.querySelectorAll('[class*="word-"]');
        wordElements.forEach((word) => {
          gsap.set(word, {
            opacity: 0,
            scale: 0.3,
            rotation: -15,
            transformOrigin: "left bottom",
            y: 30,
            x: -20,
          });
        });

        // 스크롤 트리거로 단어별 순차 애니메이션 실행
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            // 섹션에 들어올 때 애니메이션 재생
            const tl = gsap.timeline();
            wordElements.forEach((word, index) => {
              tl.to(word, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
              }, index * 0.15);
            });
          },
          onLeave: () => {
            // 섹션을 벗어날 때 초기 상태로 리셋
            wordElements.forEach((word) => {
              gsap.set(word, {
                opacity: 0,
                scale: 0.3,
                rotation: -15,
                y: 30,
                x: -20,
              });
            });
          },
          onEnterBack: () => {
            // 뒤로 스크롤해서 다시 들어올 때 애니메이션 재생
            const tl = gsap.timeline();
            wordElements.forEach((word, index) => {
              tl.to(word, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)",
              }, index * 0.15);
            });
          },
          onLeaveBack: () => {
            // 위로 스크롤해서 벗어날 때 초기 상태로 리셋
            wordElements.forEach((word) => {
              gsap.set(word, {
                opacity: 0,
                scale: 0.3,
                rotation: -15,
                y: 30,
                x: -20,
              });
            });
          }
        });
      }
    }

    // 카드 리빌 애니메이션 - 심플한 아래에서 위로 페이드인
    if (cardsContainerRef.current && !shouldReduceMotion) {
      const cards = cardsContainerRef.current.querySelectorAll('article');
      
      if (cards.length > 0) {
        // 각 카드에 초기 상태 설정
        cards.forEach((card) => {
          gsap.set(card, {
            opacity: 0,
            y: 80
          });
        });

        // 스크롤 트리거로 카드 애니메이션 실행
        ScrollTrigger.create({
          trigger: cardsContainerRef.current,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            // 시간차를 두고 아래에서 위로 페이드인
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.2
            });
          },
          onLeave: () => {
            // 섹션을 벗어날 때 초기 상태로 리셋
            gsap.set(cards, {
              opacity: 0,
              y: 80
            });
          },
          onEnterBack: () => {
            // 뒤로 스크롤해서 다시 들어올 때 애니메이션 재생
            gsap.to(cards, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.2
            });
          },
          onLeaveBack: () => {
            // 위로 스크롤해서 벗어날 때 초기 상태로 리셋
            gsap.set(cards, {
              opacity: 0,
              y: 80
            });
          }
        });
      }
    }

    // 배경색 애니메이션 - 섹션이 화면에 나타나기 시작하면 흰색으로 변경
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        gsap.to("body", {
          backgroundColor: "#ffffff",
          duration: 1.5,
          ease: "power2.out"
        });
      },
      onLeave: () => {
        gsap.to("body", {
          backgroundColor: "transparent",
          duration: 1.5,
          ease: "power2.out"
        });
      },
      onEnterBack: () => {
        gsap.to("body", {
          backgroundColor: "#ffffff",
          duration: 1.5,
          ease: "power2.out"
        });
      },
      onLeaveBack: () => {
        gsap.to("body", {
          backgroundColor: "transparent",
          duration: 1.5,
          ease: "power2.out"
        });
      }
    });

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
      id="key-project"
      ref={sectionRef}
      className="flex flex-col items-start pt-[var(--grid-section-vr-padding)] pr-[var(--primitives-spacing-spacing-15)] pb-[var(--grid-section-vr-padding)] pl-[var(--primitives-spacing-spacing-15)] relative self-stretch w-[var(--grid-width)] flex-[0_0_auto] bg-transparent"
      data-section="features"
      data-color-mode-mode="light"
      aria-labelledby="features-heading"
    >
      <div className="flex flex-col items-start gap-[var(--grid-container-gap)] relative self-stretch w-full flex-[0_0_auto] max-w-[1400px] mx-auto">
        <header className="flex flex-col w-full max-w-[864px] items-start gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto]">
          <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] whitespace-nowrap text-[color:var(--Text-text-primary,#0A0A0A)] text-[14px] font-[family:'Roboto_Mono',Helvetica] font-bold leading-5 break-words">
                Key Project
              </span>
            </div>
          </div>

          <h2
            ref={titleTextRef}
            id="features-heading"
            className="text-[color:var(--color-mode-text-text-primary)] relative self-stretch font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
            style={{ perspective: "1000px" }}
          >
            The Story Transcends Platforms
          </h2>
        </header>

        {/* Desktop Features Cards - Active/Inactive 상태에 따른 가변 너비 */}
        <div ref={cardsContainerRef} className="hidden xl:flex flex-row items-stretch gap-8 relative w-full">
          {featuresData.map((feature) => {
            const isActive = activeCardId === feature.id;
            return (
              <article
                key={feature.id}
                className={`flex flex-col items-start gap-[var(--grid-block-gap)] relative transition-all duration-500 ease-out ${
                  isActive ? 'flex-[2]' : 'flex-[1]'
                } w-full`}
                onMouseEnter={() => setActiveCardId(feature.id)}
              >
                <div
                  className={`card-image relative w-full h-[300px] lg:h-[700px] overflow-hidden transition-all duration-500 ease-out ${
                    isActive ? 'rounded-[7.2px] border border-[#E2E5EB]' : 'rounded-[12px] border border-[#E2E5EB]'
                  }`}
                  style={{ background: feature.backgroundColor }}
                >
                  {feature.id === 1 && (
                    <div className="relative w-full h-full">
                      {/* Background Image */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                          isActive ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{
                          backgroundImage: `url(${feature.backgroundImage})`,
                        }}
                      />

                      {/* Video */}
                      {feature.movie && (
                        <video
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={`${feature.movie}.webm`} type="video/webm" />
                          <source src={`${feature.movie}.mp4`} type="video/mp4" />
                        </video>
                      )}

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-4">
                        {/* Tag */}
                        <div className={`self-start rounded-full px-3 py-1 transition-all duration-300 ${
                          isActive
                            ? 'bg-black'
                            : 'bg-[#E2E5EB]'
                        }`}>
                          <span className={`text-sm font-bold font-[family:'Roboto_Mono',Helvetica] ${
                            isActive ? 'text-white' : 'text-black'
                          }`}>
                            {feature.badge}
                          </span>
                        </div>

                        {/* Bottom Content */}
                        {isActive && (
                          <div className="space-y-4">
                            <div className="text-white text-4xl lg:text-6xl font-bold [font-family:'Anton_SC',Helvetica]">
                              {feature.stats}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {feature.id === 2 && (
                    <div className="relative w-full h-full">
                      {/* Background Image */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                          isActive ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{
                          backgroundImage: `url(${feature.backgroundImage})`,
                        }}
                      />

                      {/* Video */}
                      {feature.movie && (
                        <video
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={`${feature.movie}.webm`} type="video/webm" />
                          <source src={`${feature.movie}.mp4`} type="video/mp4" />
                        </video>
                      )}

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-4">
                        {/* Tag */}
                        <div className={`self-start rounded-full px-3 py-1 transition-all duration-300 ${
                          isActive
                            ? 'bg-black'
                            : 'bg-[#E2E5EB]'
                        }`}>
                          <span className={`text-sm font-bold font-[family:'Roboto_Mono',Helvetica] ${
                            isActive ? 'text-white' : 'text-black'
                          }`}>
                            {feature.badge}
                          </span>
                        </div>

                        {/* Learn More Button */}
                        {isActive && (
                          <div className="self-end">
                            <a
                              href="#"
                              className="inline-flex items-center gap-2 text-white hover:opacity-80 transition-opacity"
                              aria-label={`Learn more about ${feature.title}`}
                            >
                              {/* <span className="text-sm font-medium">Learn more</span> */}
                              <img className="w-4 h-4" alt="" src="/img/trailing-icon-1.svg" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {feature.id === 3 && (
                    <div className="relative w-full h-full">
                      {/* Background Image */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                          isActive ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{
                          backgroundImage: `url(${feature.backgroundImage})`,
                        }}
                      />

                      {/* Video */}
                      {feature.movie && (
                        <video
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={`${feature.movie}.webm`} type="video/webm" />
                          
                        </video>
                      )}

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-4">
                        {/* Tag */}
                        <div className={`self-start rounded-full px-3 py-1 transition-all duration-300 ${
                          isActive
                            ? 'bg-black'
                            : 'bg-[#E2E5EB]'
                        }`}>
                          <span className={`text-sm font-bold font-[family:'Roboto_Mono',Helvetica] ${
                            isActive ? 'text-white' : 'text-black'
                          }`}>
                            {feature.badge}
                          </span>
                        </div>

                        {/* Bottom Content */}
                        {isActive && feature.stats && (
                          <div className="space-y-4">
                            <div className="text-white text-4xl lg:text-6xl font-bold [font-family:'Anton_SC',Helvetica]">
                              {feature.stats}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {feature.id === 4 && (
                    <div className="relative w-full h-full">
                      {/* Background Image */}
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                          isActive ? 'opacity-0' : 'opacity-100'
                        }`}
                        style={{
                          backgroundImage: `url(${feature.gameImage})`,
                        }}
                      />

                      {/* Video */}
                      {feature.movie && (
                        <video
                          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                            isActive ? 'opacity-100' : 'opacity-0'
                          }`}
                          autoPlay
                          muted
                          loop
                          playsInline
                        >
                          <source src={`${feature.movie}.webm`} type="video/webm" />
                          <source src={`${feature.movie}.mp4`} type="video/mp4" />
                        </video>
                      )}

                      {/* Content */}
                      <div className="relative h-full flex flex-col justify-between p-4">
                        {/* Tag */}
                        <div className={`self-start rounded-full px-3 py-1 transition-all duration-300 ${
                          isActive
                            ? 'bg-black'
                            : 'bg-[#E2E5EB]'
                        }`}>
                          <span className={`text-sm font-bold font-[family:'Roboto_Mono',Helvetica] ${
                            isActive ? 'text-white' : 'text-black'
                          }`}>
                            {feature.badge}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="card-content flex flex-col items-start gap-[var(--primitives-spacing-spacing-05)] w-full flex-[0_0_auto] relative self-stretch">
                  <div className="flex w-12 h-12 items-center justify-center p-3 bg-[color:var(--color-mode-surface-surface-accent-disabled)] rounded-[24px]">
                    <img
                      className="w-6 h-6"
                      alt={`${feature.title} icon`}
                      src={feature.icon}
                      style={{ filter: 'brightness(0) saturate(100%) invert(8%) sepia(96%) saturate(4936%) hue-rotate(343deg) brightness(88%) contrast(108%)' }}
                    />
                  </div>

                  <h3 className="relative self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                    {feature.title}
                  </h3>

                  <p className="relative self-stretch font-paragraph-large font-[number:var(--paragraph-large-font-weight)] text-color-mode-text-text-secondary text-[length:var(--paragraph-large-font-size)] tracking-[var(--paragraph-large-letter-spacing)] leading-[var(--paragraph-large-line-height)] [font-style:var(--paragraph-large-font-style)]">
                    {feature.description}
                  </p>

                  {feature.hasLearnMore && (
                    <a
                      href="#"
                      className="inline-flex h-6 items-center gap-[var(--primitives-spacing-spacing-03)] relative hover:opacity-80 transition-opacity"
                      aria-label={`Learn more about ${feature.title}`}
                    >
                      <span className="inline-flex items-center relative flex-[0_0_auto]">
                        <span className="relative w-fit mt-[-1.00px] font-label-medium font-[number:var(--label-medium-font-weight)] text-[color:var(--color-mode-text-text-accent)] text-[length:var(--label-medium-font-size)] tracking-[var(--label-medium-letter-spacing)] leading-[var(--label-medium-line-height)] whitespace-nowrap [font-style:var(--label-medium-font-style)]">
                          Learn more
                        </span>
                      </span>

                      <img
                        className="relative w-6 h-6"
                        alt=""
                        src="/img/trailing-icon-1.svg"
                      />
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile Features Cards - 1열 레이아웃 */}
        <div className="xl:hidden flex flex-col gap-6 relative w-full">
          {featuresData.map((feature) => {
            const isCenter = centerCardId === feature.id;
            return (
              <MobileFeatureCard
                key={feature.id}
                feature={feature}
                isCenter={isCenter}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
