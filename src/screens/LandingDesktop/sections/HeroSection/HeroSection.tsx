import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  shouldStartVideo?: boolean;
}

export const HeroSection = ({ shouldStartVideo = false }: HeroSectionProps): JSX.Element => {
  const heroClipContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const heroClipContainer = heroClipContainerRef.current;
    const video = videoRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const heroSection = heroSectionRef.current;

    if (!heroClipContainer || !video || !heading || !paragraph || !heroSection) return;

    // 비디오 로드 이벤트 리스너 (재생은 하지 않음)
    const handleVideoCanPlay = () => {
      console.log('📱 HeroSection video can play - waiting for loading complete');
      // 비디오가 재생 가능하다고 표시하지만, 실제 재생은 하지 않음
    };

    const handleVideoPlaying = () => {
      console.log('🎬 HeroSection video is playing');
      setIsVideoReady(true);
    };

    // 모든 환경에서 비디오 이벤트 리스너 추가
    video.addEventListener('canplay', handleVideoCanPlay);
    video.addEventListener('playing', handleVideoPlaying);
    video.addEventListener('loadeddata', () => {
      console.log('📊 HeroSection video data loaded');
    });
    video.addEventListener('error', (e) => {
      console.error('❌ HeroSection video error:', e);
    });

    // 모든 환경에서 비디오 로딩만 시작 (재생은 하지 않음)
    video.load();

    // Create GSAP timeline for scroll animations with pinning
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "55% top", // End earlier so CardsSection can scroll into view
        scrub: 1,
        pin: heroSection, // Pin the entire hero section instead of sticky container
        pinSpacing: true, // Allow space for next section
        anticipatePin: 1,
      },
    });

    // Single clipping animation for the entire hero container
    tl.to(heroClipContainer, {
      clipPath: "polygon(15% 25%, 75% 30%, 85% 45%, 20% 60%)",
      borderRadius: "20px",
      duration: 1,
      ease: "power2.out",
    });

    // Text scroll up animation - both layers move up together
    tl.to([".hero-text-black", ".hero-text-mask"], {
      y: -200,
      duration: 1,
      ease: "power2.out",
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      // 이벤트 리스너 정리
      if (video) {
        video.removeEventListener('canplay', handleVideoCanPlay);
        video.removeEventListener('playing', handleVideoPlaying);
        video.removeEventListener('loadeddata', () => {});
        video.removeEventListener('error', () => {});
      }
    };
  }, []);

  // 로딩 완료 후 비디오 재생 시작
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !shouldStartVideo) return;

    console.log('🎬 Starting Hero video playback after loading complete');

    // 비디오 재생 시작
    video.play().catch(err => {
      console.log('📱 HeroSection video autoplay failed after loading:', err);
      // 재생 실패 시에도 비디오가 준비됐다고 표시
      setIsVideoReady(true);
    });
  }, [shouldStartVideo]);

  return (
    <>
      {/* Hero Section */}
      <section
        ref={heroSectionRef}
        className="relative w-screen overflow-hidden"
        style={{ height: "120vh" }} // Extended height for scroll effect
      >
        {/* Container for Video and Text - GSAP handles pinning, absolute for iOS 26 Safari compatibility */}
        <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden">
          {/* Black Text Background Layer */}
          <div
            className="hero-text-black absolute top-0 left-0 w-screen h-screen flex flex-col items-start justify-center pt-[var(--grid-section-vr-padding)] pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-[var(--grid-section-hr-padding)] z-10"
            
            role="banner"
            aria-labelledby="hero-heading"
          >
          <div className="flex w-full items-end gap-[var(--grid-container-gap)] relative flex-1 grow ">
            <div className="flex flex-col items-start gap-[var(--grid-block-gap)] relative flex-1 grow">
              <div className="flex flex-col items-start gap-[var(--primitives-spacing-spacing-05)] relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)] border-color-mode-border-border-secondary-muted">
                  <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
                    <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                      Storynomics
                    </span>
                  </div>
                </div>

                {/* Black Text Layer */}
                <h1
                  className="text-black relative max-w-[640px] font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
                >
                  Creating a Story Universe that captivates the world
                </h1>

                <p 
                  className="text-black relative self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]"
                >
                  From a single story to a universe of experiences, where fandoms
                  come alive.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start relative flex-1 grow" />
          </div>
        </div>

        {/* Clipped Container - Video + White Text */}
        <div 
          ref={heroClipContainerRef}
          className="absolute top-0 left-0 w-screen h-screen overflow-hidden z-20"
          style={{
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", // Initial full screen
          }}
        >
          {/* Video Background */}
          <div className={`absolute inset-0 bg-cover bg-center z-10 transition-colors duration-300 ${
            isVideoReady ? 'bg-white' : 'bg-black'
          }`}>
            <div className="flex w-full h-full items-center justify-center relative">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                preload="auto"
              >
                {/* Desktop videos - WebM first for better performance, MP4 fallback */}
                <source src="/img/bg_video.webm" type="video/webm" media="(min-width: 768px)" />
                <source src="/img/bg_video.mp4" type="video/mp4" media="(min-width: 768px)" />
                {/* Mobile videos - WebM first for better performance, MP4 fallback */}
                <source src="/img/bg_video_mobile.webm" type="video/webm" media="(max-width: 767px)" />
                <source src="/img/bg_video_mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
                Your browser does not support the video tag.
              </video>
              {/* Top gradient overlay */}
              <div
                className="absolute top-0 left-0 w-full pointer-events-none bg-red-400 h-[30%]"
                style={{
                  height: "30%",
                  background: "linear-gradient(180deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0) 100%)"
                }}
              ></div>
              {/* Bottom gradient overlay */}
              <div
                className="absolute bottom-0 left-0 w-full pointer-events-none bg-blue-400 h-[50%]"
                style={{
                  height: "30%",
                  background: "linear-gradient(0deg, rgba(0, 0, 0, 0.80) 35%, rgba(0, 0, 0, 0) 100%)"
                }}
              ></div>
            </div>
          </div>

          {/* White Text Layer */}
          <div
            className="hero-text-mask absolute top-0 left-0 w-screen h-screen flex flex-col items-start justify-center pt-[var(--grid-section-vr-padding)] pr-4 sm:pr-6 lg:pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-4 sm:pl-6 lg:pl-[var(--grid-section-hr-padding)] z-30"

          >
            <div className="flex w-full items-end gap-[var(--grid-container-gap)] relative flex-1 grow">
              <div className="flex flex-col items-start gap-[var(--grid-block-gap)] relative w-2/3 sm:w-full sm:flex-1 sm:grow">
                <div className="flex flex-col items-start gap-[var(--primitives-spacing-spacing-05)] relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)] border-color-mode-border-border-secondary-muted">
                    <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
                      <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                          Storynomics
                        </span>
                    </div>
                  </div>

                  {/* White Text Layer */}
                  <h1
                    ref={headingRef}
                    id="hero-heading"
                    className="text-white relative w-full sm:max-w-[500px] lg:max-w-[640px] font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
                  >
                    Creating a Story Universe that captivates the world
                  </h1>

                  <p 
                    ref={paragraphRef}
                    className="text-[#C3C9D1] relative self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]"
                  >
                    From a single story to a universe of experiences, where fandoms
                    come alive.
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-start relative flex-1 grow" />
            </div>
          </div>
          </div>
        </div>
      </section>
    </>
  );
};
