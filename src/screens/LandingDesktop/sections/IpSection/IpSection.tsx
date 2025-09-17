import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const IpSection = (): JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const currentTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const ipItems = [
    {
      name: "ROSE",
      label: "INTO THE WINDS",
      image: "/img/cha/cha-4.png",
      movie: "/img/cha/cha-4",
    },
    {
      name: "AE",
      label: "INTO THE WINDS",
      image: "/img/cha/cha-2.png",
      movie: "/img/cha/cha-2",
    },
    {
      name: "CHALIN",
      label: "INTO THE WINDS",
      image: "/img/cha/cha-1.png",
      movie: "/img/cha/cha-1",
    },
    {
      name: "BIT",
      label: "INTO THE WINDS",
      image: "/img/cha/cha-3.png",
      movie: "/img/cha/cha-3",
    },
    {
      name: "LIBBY",
      label: "INTO THE WINDS",
      image: "/img/cha/cha-5.png",
      movie: "/img/cha/cha-5",
    },
  ];


  // 스크롤 기반 활성 아이템 감지 및 이미지 위치 조정
  useEffect(() => {
    if (!sectionRef.current || !navigationRef.current || !imageContainerRef.current) return;

    const handleScroll = () => {
      const navigationItems = navigationRef.current?.querySelectorAll('[data-ip-item]');
      if (!navigationItems) return;

      const viewportCenter = window.innerHeight / 2 + window.scrollY;
      let closestIndex = 0;
      let minDistance = Infinity;

      // 화면 중앙에 가장 가까운 아이템 찾기
      navigationItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.top + window.scrollY + rect.height / 2;
        const distance = Math.abs(viewportCenter - itemCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      // 활성 아이템이 변경되었을 때만 업데이트
      if (closestIndex !== activeIndex) {
        setPrevActiveIndex(activeIndex);
        setActiveIndex(closestIndex);

        // 활성 아이템이 변경될 때 즉시 Y 위치를 새 위치로 설정
        if (imageContainerRef.current && navigationItems[closestIndex]) {
          const activeItemRect = navigationItems[closestIndex].getBoundingClientRect();

          // 활성 아이템의 중앙 위치를 절대 좌표로 계산
          const absoluteActiveCenter = activeItemRect.top + window.scrollY + activeItemRect.height / 2;

          // 섹션의 절대 위치 계산
          const sectionRect = sectionRef.current?.getBoundingClientRect();
          const sectionTop = sectionRect ? sectionRect.top + window.scrollY : 0;

          // 이미지 컨테이너가 활성 아이템 중앙에 위치하도록 계산
          const targetTop = absoluteActiveCenter - sectionTop;

          console.log('🎯 Image alignment:', {
            activeItem: ipItems[closestIndex].name,
            targetTop: targetTop
          });

          // Y 위치를 즉시 새 위치로 설정 (애니메이션 없음)
          gsap.set(imageContainerRef.current, {
            top: `${targetTop}px`
          });
        }
      } else {
        // 활성 아이템이 같더라도 스크롤로 인한 미세 조정
        if (imageContainerRef.current && navigationItems[closestIndex]) {
          const activeItemRect = navigationItems[closestIndex].getBoundingClientRect();
          const absoluteActiveCenter = activeItemRect.top + window.scrollY + activeItemRect.height / 2;
          const sectionRect = sectionRef.current?.getBoundingClientRect();
          const sectionTop = sectionRect ? sectionRect.top + window.scrollY : 0;
          const targetTop = absoluteActiveCenter - sectionTop;

          // 부드러운 전환을 위한 transition 추가
          gsap.to(imageContainerRef.current, {
            top: `${targetTop}px`,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    };

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 초기 위치 설정
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeIndex]);

  // 중앙 확장 사각형 클리핑 애니메이션
  useEffect(() => {
    if (activeIndex !== prevActiveIndex && imageContainerRef.current) {
      console.log('🖼️ Central rectangle expansion:', ipItems[prevActiveIndex]?.name, '→', ipItems[activeIndex].name);
      
      const container = imageContainerRef.current;
      const allImages = container.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
      const newImage = container.querySelector(`[data-image-index="${activeIndex}"]`) as HTMLImageElement;

      if (newImage) {
        // 이전 타임라인이 있다면 완전히 종료하고 콜백도 실행하지 않음
        if (currentTimelineRef.current) {
          currentTimelineRef.current.kill(); // 타임라인과 모든 콜백 완전 제거
          currentTimelineRef.current = null;
        }
        
        // 모든 이미지의 애니메이션도 중단
        gsap.killTweensOf(allImages);

        // 1. 모든 이미지를 투명 상태로 즉시 초기화
        allImages.forEach((img) => {
          gsap.set(img, {
            opacity: 0,
            zIndex: 0,
            y: 0 // y 위치 리셋
          });
        });

        // 2. 새 이미지를 투명 상태로 설정 (위에서 시작)
        gsap.set(newImage, {
          opacity: 0,
          zIndex: 1,
          y: -100 // 위에서 시작
        });

        // 새로운 타임라인 생성 및 참조 저장
        const tl = gsap.timeline();
        currentTimelineRef.current = tl;

        // 현재 activeIndex 값을 캡처 (콜백에서 사용할 값을 고정)
        const targetIndex = activeIndex;

        // 3. 위에서 아래로 슬라이딩하면서 페이드인
        tl.to(newImage, {
          opacity: 1,
          y: 0, // 원래 위치로
          duration: 0.3,
          ease: "power2.out"
        })
        .call(() => {
          // 이 콜백이 실행될 때 여전히 현재 타임라인이 맞는지 확인
          if (currentTimelineRef.current === tl) {
            // 애니메이션 완료 후 최종 정리 - 캡처된 targetIndex 사용
            allImages.forEach((img, index) => {
              if (index === targetIndex) {
                gsap.set(img, { opacity: 1, zIndex: 1, y: 0 });
              } else {
                gsap.set(img, { opacity: 0, zIndex: 0, y: 0 });
              }
            });
            currentTimelineRef.current = null; // 타임라인 참조 정리
          }
        });
      }
    }
  }, [activeIndex, prevActiveIndex]);

  return (
    <section
      id="characters"
      ref={sectionRef}
      className="relative w-full h-screen py-32 mb-[200px] mt-[200px] xl:mt-0"
      data-color-mode-mode="dark"
      aria-labelledby="ip-section-title"
    >
      {/* Floating Image Layer - iOS 26 Safari 호환성을 위해 absolute + transform 사용 */}
      <div
        ref={imageContainerRef}
        className="absolute mt-[200px] left-[-80px] xl:mt-[280px] xl:left-0 z-10 flex items-center xl:justify-end justify-center xl:w-3/5 w-full pointer-events-none xl:pr-16 pr-0"
        style={{
          top: '50%', // 초기 위치는 섹션 중앙
          transform: 'translateY(-50%)', // 중앙 정렬
          position: 'absolute'
        }}
      >
        {/* 모든 이미지 미리 로딩 */}
        {ipItems.map((item, index) => (
          <img
            key={item.name}
            data-image-index={index}
            className="absolute w-[400px] h-[400px] xl:w-[720px] xl:h-[720px] lg:w-[840px] lg:h-[840px] aspect-[1] object-contain transform -translate-y-1/2"
            alt={`${item.name} character`}
            src={item.image}
            style={{
              opacity: index === 0 ? 1 : 0, // 초기에는 첫 번째 이미지만 표시
              zIndex: index === 0 ? 1 : 0
            }}
          />
        ))}
      </div>

      <div className="relative max-w-[1200px] mx-auto xl:px-8 px-4 h-full flex items-center z-20">
        {/* Content Area - Right Side */}
        <div className="xl:ml-auto ml-0 xl:w-[480px] w-full xl:mt-[100px] mt-[50px] xl:text-left text-right">
          {/* Header */}
          <header className="flex flex-col xl:items-start items-end gap-[var(--primitives-spacing-spacing-05)] xl:mb-16 mb-8">
            <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
              <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
                <span className="relative w-fit mt-[-1.00px] whitespace-nowrap text-[color:var(--Text-text-primary-inverse,white)] text-[14px] font-[family:'Roboto_Mono',Helvetica] font-bold leading-5 break-words">
                  Storynomics Characters
                </span>
              </div>
            </div>

            <h2
              id="ip-section-title"
              className="text-[color:var(--color-mode-text-text-primary)] font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
            >
              CHARACTERS
            </h2>
          </header>

          {/* Navigation */}
          <nav
            ref={navigationRef}
            className="flex flex-col xl:gap-4 gap-2"
            aria-label="IP portfolio navigation"
          >
            {ipItems.map((item, index) => (
              <div
                key={item.name}
                data-ip-item
                className="relative flex xl:items-center items-end xl:justify-start justify-end xl:gap-4 gap-2 cursor-pointer transition-all duration-300 hover:opacity-80 xl:flex-row flex-col"
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`xl:text-xs text-[10px] font-medium tracking-[0.18px] [font-family:'Roboto_Mono',Helvetica] transition-all duration-300 xl:order-1 order-2 ${
                    index === activeIndex ? "text-[#cf1126] opacity-100" : "opacity-50 text-[#dfdff2]"
                  }`}
                >
                  {item.label}
                </div>
                
                <h3
                  className={`xl:text-6xl text-3xl font-normal [font-family:'Evil_Empire-Regular',Helvetica] tracking-[-0.58px] leading-tight transition-all duration-300 xl:order-2 order-1 ${
                    index === activeIndex ? "text-[#cf1126] xl:transform xl:scale-110" : "text-white"
                  }`}
                >
                  {item.name}
                </h3>
              </div>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};