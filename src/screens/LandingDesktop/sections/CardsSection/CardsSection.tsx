import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const CardsSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleTextRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLVideoElement>(null);
  const contentBoxRef = useRef<HTMLDivElement>(null);

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

    // 비디오 및 클리핑 애니메이션 - 기하학적 모양으로 중앙에서 reveal
    let handleVideoEnded: (() => void) | null = null;
    
    if (imageRef.current && !shouldReduceMotion) {
      const video = imageRef.current;
      
      // 비디오 이벤트 리스너 - 1회 재생 후 정지
      handleVideoEnded = () => {
        video.pause();
      };
      
      video.addEventListener('ended', handleVideoEnded);
      
      // 초기 상태: 완전히 클리핑된 상태 (중앙의 작은 점)
      gsap.set(video, {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        transformOrigin: "center center",
      });

      // 스크롤 기반 클리핑 애니메이션 - 중간지점에서 완전히 reveal
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top 90%",
        end: "center center",
        scrub: 1,
        onEnter: () => {
          // 화면 중간에 들어올 때 비디오 재생
          if (imageRef.current) {
            imageRef.current.currentTime = 0; // 처음부터 재생
            imageRef.current.play();
          }
        },
        onEnterBack: () => {
          // 다시 화면 중간에 들어올 때 비디오 재생
          if (imageRef.current) {
            imageRef.current.currentTime = 0; // 처음부터 재생
            imageRef.current.play();
          }
        },
        onUpdate: (self) => {
          const progress = self.progress;
          let clipPath = "";
          
          if (progress <= 0.25) {
            // 1단계 (0-25%): 중앙에서 작은 다이아몬드로 시작
            const size = progress * 32; // 0% → 8%
            clipPath = `polygon(
              50% ${50 - size}%,
              ${50 + size}% 50%,
              50% ${50 + size}%,
              ${50 - size}% 50%
            )`;
          } else if (progress <= 0.5) {
            // 2단계 (25-50%): 육각형으로 변형
            const hexProgress = (progress - 0.25) / 0.25;
            const size = 8 + (hexProgress * 22); // 8% → 30%
            const centerX = 50;
            const centerY = 50;
            
            clipPath = `polygon(
              ${centerX + size * Math.cos(0)}% ${centerY + size * Math.sin(0)}%,
              ${centerX + size * Math.cos(Math.PI/3)}% ${centerY + size * Math.sin(Math.PI/3)}%,
              ${centerX + size * Math.cos(2*Math.PI/3)}% ${centerY + size * Math.sin(2*Math.PI/3)}%,
              ${centerX + size * Math.cos(Math.PI)}% ${centerY + size * Math.sin(Math.PI)}%,
              ${centerX + size * Math.cos(4*Math.PI/3)}% ${centerY + size * Math.sin(4*Math.PI/3)}%,
              ${centerX + size * Math.cos(5*Math.PI/3)}% ${centerY + size * Math.sin(5*Math.PI/3)}%
            )`;
          } else if (progress <= 0.75) {
            // 3단계 (50-75%): 사선이 들어간 역동적인 팔각형
            const octProgress = (progress - 0.5) / 0.25;
            const size = 30 + (octProgress * 25); // 30% → 55%
            
            clipPath = `polygon(
              ${50 + size * 0.7}% ${50 - size}%,
              ${50 + size}% ${50 - size * 0.4}%,
              ${50 + size}% ${50 + size * 0.4}%,
              ${50 + size * 0.7}% ${50 + size}%,
              ${50 - size * 0.7}% ${50 + size}%,
              ${50 - size}% ${50 + size * 0.4}%,
              ${50 - size}% ${50 - size * 0.4}%,
              ${50 - size * 0.7}% ${50 - size}%
            )`;
          } else {
            // 4단계 (75-100%): 전체 표시로 확장 (중간지점인 100% progress에서 완전 reveal)
            const finalProgress = (progress - 0.75) / 0.25;
            const size = 55 + (finalProgress * 45); // 55% → 100%
            
            if (size >= 100 || progress >= 1) {
              clipPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
            } else {
              clipPath = `polygon(
                ${50 - size}% ${50 - size}%,
                ${50 + size}% ${50 - size}%,
                ${50 + size}% ${50 + size}%,
                ${50 - size}% ${50 + size}%
              )`;
            }
          }
          
          gsap.set(imageRef.current, {
            clipPath: clipPath,
            willChange: "clip-path"
          });
        },
        onLeave: () => {
          // 애니메이션 완료 후 정리
          if (imageRef.current) {
            gsap.set(imageRef.current, { 
              willChange: "auto",
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            });
          }
        }
      });
    }

    // Mission & Core Values 박스 창의적 reveal 애니메이션 - 회전하며 등장
    if (contentBoxRef.current && !shouldReduceMotion) {
      // Mission과 Core Values 섹션을 개별적으로 선택
      const missionSection = contentBoxRef.current.querySelector('[class*="Mission Section"]')?.parentElement;
      const coreValuesSection = contentBoxRef.current.querySelector('[class*="Core Values Section"]')?.parentElement;
      const allValueItems = contentBoxRef.current.querySelectorAll('[class*="flex items-start gap-3"]');
      
      // 초기 상태: 박스는 회전하며 숨겨진 상태
      gsap.set(contentBoxRef.current, {
        y: 150,
        x: -50,
        opacity: 0,
        scale: 0.7,
        rotation: -10,
        transformOrigin: "center center",
        filter: "blur(8px)",
      });

      // Mission과 Core Values 섹션 개별 초기 상태
      if (missionSection) {
        gsap.set(missionSection, {
          x: -100,
          opacity: 0,
          scale: 0.8,
          rotation: 5,
        });
      }
      
      if (coreValuesSection) {
        gsap.set(coreValuesSection, {
          x: 100,
          opacity: 0,
          scale: 0.8,
          rotation: -5,
        });
      }

      // Core Values 개별 아이템들 초기 상태
      allValueItems.forEach((item, index) => {
        gsap.set(item, {
          y: 30 + (index * 10),
          opacity: 0,
          scale: 0.9,
          rotation: index % 2 === 0 ? -3 : 3,
        });
      });

      // 스크롤 트리거로 창의적인 스태거 애니메이션
      ScrollTrigger.create({
        trigger: contentBoxRef.current,
        start: "top 95%",
        end: "bottom 5%",
        scrub: false,
        onEnter: () => {
          const masterTl = gsap.timeline();

          // 1단계: 박스 전체가 회전하며 등장
          masterTl.to(contentBoxRef.current, {
            y: 0,
            x: 0,
            opacity: 1,
            scale: 1,
            rotation: 0,
            filter: "blur(0px)",
            duration: 1.2,
            ease: "back.out(1.4)",
          });

          // 2단계: Mission 섹션이 왼쪽에서 슬라이드 (0.4초 지연)
          if (missionSection) {
            masterTl.to(missionSection, {
              x: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            }, 0.4);
          }

          // 3단계: Core Values 섹션이 오른쪽에서 슬라이드 (0.7초 지연)
          if (coreValuesSection) {
            masterTl.to(coreValuesSection, {
              x: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.8,
              ease: "back.out(1.7)",
            }, 0.7);
          }

          // 4단계: Core Values 아이템들이 순차적으로 등장 (1.0초부터 시작)
          allValueItems.forEach((item, index) => {
            masterTl.to(item, {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.6,
              ease: "back.out(1.5)",
            }, 1.0 + (index * 0.15));
          });
        },
        onLeave: () => {
          // 아래로 벗어날 때 창의적으로 리셋
          gsap.set(contentBoxRef.current, {
            y: 150, x: -50, opacity: 0, scale: 0.7, rotation: -10, filter: "blur(8px)"
          });
          
          if (missionSection) {
            gsap.set(missionSection, { x: -100, opacity: 0, scale: 0.8, rotation: 5 });
          }
          if (coreValuesSection) {
            gsap.set(coreValuesSection, { x: 100, opacity: 0, scale: 0.8, rotation: -5 });
          }
          
          allValueItems.forEach((item, index) => {
            gsap.set(item, {
              y: 30 + (index * 10), opacity: 0, scale: 0.9, rotation: index % 2 === 0 ? -3 : 3
            });
          });
        },
        onEnterBack: () => {
          // 다시 들어올 때 동일한 창의적 애니메이션 재생
          const masterTl = gsap.timeline();

          masterTl.to(contentBoxRef.current, {
            y: 0, x: 0, opacity: 1, scale: 1, rotation: 0, filter: "blur(0px)",
            duration: 1.2, ease: "back.out(1.4)"
          });

          if (missionSection) {
            masterTl.to(missionSection, {
              x: 0, opacity: 1, scale: 1, rotation: 0,
              duration: 0.8, ease: "back.out(1.7)"
            }, 0.4);
          }

          if (coreValuesSection) {
            masterTl.to(coreValuesSection, {
              x: 0, opacity: 1, scale: 1, rotation: 0,
              duration: 0.8, ease: "back.out(1.7)"
            }, 0.7);
          }

          allValueItems.forEach((item, index) => {
            masterTl.to(item, {
              y: 0, opacity: 1, scale: 1, rotation: 0,
              duration: 0.6, ease: "back.out(1.5)"
            }, 1.0 + (index * 0.15));
          });
        },
        onLeaveBack: () => {
          // 위로 벗어날 때 창의적으로 리셋
          gsap.set(contentBoxRef.current, {
            y: 150, x: -50, opacity: 0, scale: 0.7, rotation: -10, filter: "blur(8px)"
          });
          
          if (missionSection) {
            gsap.set(missionSection, { x: -100, opacity: 0, scale: 0.8, rotation: 5 });
          }
          if (coreValuesSection) {
            gsap.set(coreValuesSection, { x: 100, opacity: 0, scale: 0.8, rotation: -5 });
          }
          
          allValueItems.forEach((item, index) => {
            gsap.set(item, {
              y: 30 + (index * 10), opacity: 0, scale: 0.9, rotation: index % 2 === 0 ? -3 : 3
            });
          });
        }
      });
    }

    // 정리 함수
    return () => {
      // 비디오 이벤트 리스너 정리
      if (imageRef.current && handleVideoEnded) {
        imageRef.current.removeEventListener('ended', handleVideoEnded);
      }
      
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === sectionRef.current || 
            trigger.trigger === imageRef.current || 
            trigger.trigger === contentBoxRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="flex flex-col h-[1400px] xl:h-[1580px] items-start pt-[var(--grid-section-vr-padding)] pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-[var(--grid-section-hr-padding)] relative self-stretch w-[var(--grid-width)] bg-transparent"
      data-color-mode-mode="light"
      aria-labelledby="vision-heading"
    >
      <div className="flex flex-col items-center gap-[var(--grid-container-gap)] relative self-stretch w-full flex-[0_0_auto]">
        <header className="flex flex-col w-full max-w-[1152px] px-4 sm:px-6 lg:px-8 items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto] mx-auto">
          <div className="inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden border border-solid border-color-mode-border-border-secondary-muted bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                About
              </span>
            </div>
          </div>

          <h1
            ref={titleTextRef}
            id="vision-heading"
            className="text-[color:var(--color-mode-text-text-primary)] text-center relative self-stretch font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
            style={{ perspective: "1000px" }}
          >
            Vision
          </h1>

          <p className="text-[color:var(--color-mode-text-text-primary)] text-center relative self-stretch font-heading-small font-[number:var(--heading-small-font-weight)] text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
            We turn a single story into a living universe—one that people
            don&apos;t just watch, but truly belong to. Our vision is to inspire
            global fandoms that engage, share, and grow together.
          </p>
        </header>

        <div className="relative w-[1440px] h-[300px] xl:h-[700px] 
        mt-[0.00px] mb-[0px] ml-[0px] mr-[0px] 
        xl:mt-[0.00px] xl:mb-[26.50px] xl:ml-[-64.00px] xl:mr-[-64.00px]">
          <video
            ref={imageRef}
            className="w-[200%] h-[100%] mt-[0px] xl:mt-0 xl:w-full xl:h-full object-contain"
            muted
            playsInline
          >
            <source src="/img/bg_storynomics.webm" type="video/webm" />
            <source src="/img/bg_storynomics.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Mission and Core Values Background Box */}
        <div 
          ref={contentBoxRef}
          className="w-full max-w-[1152px] p-2 xl:p-4 sm:p-6 bg-[var(--color-mode-background-bg-secondary,#F7F8FB)] rounded-xl flex flex-col items-start gap-6 mt-[var(--grid-container-gap)] mx-auto"
        >
          {/* Mission Section */}
          <div className="flex flex-col w-full items-start gap-2">
            <h2 className="relative self-stretch font-heading-x-large font-[number:var(--heading-x-large-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--heading-x-large-font-size)] tracking-[var(--heading-x-large-letter-spacing)] leading-[var(--heading-x-large-line-height)] [font-style:var(--heading-x-large-font-style)]">
              OUR MISSION
            </h2>
            <p className="relative self-stretch text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
              From webtoons to short-form videos, from games to dramas and films—we craft stories that thrive on every platform. By giving fans new ways to connect and participate, we transform storytelling into a sustainable ecosystem.
            </p>
          </div>

          {/* Core Values Section */}
          <div className="flex flex-col w-full items-start gap-2">
            <h2 className="relative self-stretch font-heading-x-large font-[number:var(--heading-x-large-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--heading-x-large-font-size)] tracking-[var(--heading-x-large-letter-spacing)] leading-[var(--heading-x-large-line-height)] [font-style:var(--heading-x-large-font-style)]">
              CORE VALUES
            </h2>
            <div className="flex flex-col items-start gap-4 relative self-stretch w-full">
              <div className="flex items-start gap-3 relative self-stretch w-full">
                <span className="relative text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  1.
                </span>
                <p className="relative flex-1 text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  <span className="font-semibold">Story First:</span> Every great universe begins with a powerful story. That's where we put our heart and focus.
                </p>
              </div>
              <div className="flex items-start gap-3 relative self-stretch w-full">
                <span className="relative text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  2.
                </span>
                <p className="relative flex-1 text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  <span className="font-semibold">Made for Multi-Platform:</span> We don't just copy stories—we reinvent them to shine in each format, creating fresh experiences every time.
                </p>
              </div>
              <div className="flex items-start gap-3 relative self-stretch w-full">
                <span className="relative text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  3.
                </span>
                <p className="relative flex-1 text-[#848E9E] text-base font-medium leading-5 break-words" style={{ fontFamily: 'Roobert' }}>
                  <span className="font-semibold">Co-Creating with Fans:</span> Fandom is more than an audience; it's our partner. Together, we grow the story, the universe, and the culture.
                </p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
};
