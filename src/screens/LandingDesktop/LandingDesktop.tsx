import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Header } from "../../components/Header";
import { CallToActionSection } from "./sections/CallToActionSection/CallToActionSection";
import { CardsSection } from "./sections/CardsSection";
import { FaqSection } from "./sections/FaqSection/FaqSection";
import { FeaturesListSection } from "./sections/FeaturesListSection/FeaturesListSection";
import { FeaturesSection } from "./sections/FeaturesSection/FeaturesSection";
import { FooterSection } from "./sections/FooterSection/FooterSection";
import { GallerySection } from "./sections/GallerySection/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { IpSection } from "./sections/IpSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";

gsap.registerPlugin(ScrollTrigger);

interface LandingDesktopProps {
  shouldStartHeroVideo?: boolean;
}

export const LandingDesktop = ({ shouldStartHeroVideo = false }: LandingDesktopProps): JSX.Element => {
  console.log('🏠 LandingDesktop component rendered');
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [gridMode, setGridMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isInitialized, setIsInitialized] = useState(false);

  // 컴포넌트 렌더링 시 스크롤을 맨 위로 강제 이동
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    console.log('📍 LandingDesktop: 스크롤을 맨 위로 설정');

    // 잠시 후 초기화 완료로 표시 (GSAP 애니메이션 활성화)
    setTimeout(() => {
      setIsInitialized(true);
      console.log('✅ LandingDesktop 초기화 완료');
    }, 100);
  }, []);

  const throttle = useCallback((func: Function, delay: number) => {
    let timeoutId: number | null = null;
    return (...args: any[]) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => func(...args), delay);
    };
  }, []);

  const throttledColorUpdate = useCallback(
    throttle((progress: number) => {
      const colorValue = Math.round(255 * (1 - progress));
      console.log('🎨 Background color update:', { progress, colorValue });
      
      if (backgroundRef.current) {
        try {
          backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
          console.log('✅ Background color applied successfully');
        } catch (error) {
          console.error('❌ Error applying background color:', error);
        }
      } else {
        console.warn('⚠️ backgroundRef.current is null');
      }
    }, 16),
    []
  );

  // 디바이스 타입 감지 및 그리드 모드 설정
  useEffect(() => {
    const detectDeviceType = () => {
      // 실제 모바일/터치 디바이스 감지
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            ('ontouchstart' in window) && (window.innerWidth < 1280);
      
      if (isMobileDevice && window.innerWidth < 1280) {
        setGridMode('mobile');
        document.body.setAttribute('data-grid-mode', 'mobile');
        document.body.setAttribute('data-device-type', 'mobile');
      } else {
        setGridMode('desktop');
        document.body.setAttribute('data-grid-mode', 'desktop');
        document.body.setAttribute('data-device-type', 'desktop');
      }
    };

    // 초기 실행
    detectDeviceType();

    // 리사이즈 이벤트 리스너 추가 (모바일 디바이스에서만)
    const handleResize = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                            ('ontouchstart' in window);
      if (isMobileDevice) {
        detectDeviceType();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 섹션 위치에 따라 배경색을 즉시 설정하는 함수
  const updateBackgroundForSection = useCallback((sectionId: string) => {
    if (!backgroundRef.current) return;

    console.log('🎨 Updating background for section:', sectionId);

    switch (sectionId) {
      case 'about':
      case 'key-project':
        // About, Key Project 섹션은 흰색
        backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
        break;
      case 'service':
      case 'characters':
        // Service, Characters 섹션은 검은색
        backgroundRef.current.style.backgroundColor = 'rgb(0, 0, 0)';
        break;
      default:
        // 기본값은 흰색
        backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }, []);

  // URL hash 변경을 감지하여 배경색 즉시 업데이트
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // # 제거
      if (hash) {
        // 작은 지연을 주어 스크롤이 시작된 후 배경색 적용
        setTimeout(() => {
          updateBackgroundForSection(hash);
        }, 100);
      } else {
        // hash가 없으면 기본적으로 about(흰색)으로 설정
        updateBackgroundForSection('about');
      }
    };

    // 초기 로드 시에도 hash 확인
    handleHashChange();

    // hash 변경 이벤트 리스너 등록
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [updateBackgroundForSection]);

  useEffect(() => {
    console.log('🚀 Background animation useEffect started');
    const backgroundElement = backgroundRef.current;
    if (!backgroundElement) {
      console.error('❌ backgroundElement is null');
      return;
    }

    // 초기 배경색을 명시적으로 흰색으로 설정 (여러 번 적용하여 확실히)
    const setInitialWhiteBackground = () => {
      backgroundElement.style.backgroundColor = 'rgb(255, 255, 255)';
      backgroundElement.style.background = 'rgb(255, 255, 255)';
      console.log('🎨 Initial background set to white');
    };

    setInitialWhiteBackground();

    // 잠시 후에도 다시 한 번 설정
    setTimeout(setInitialWhiteBackground, 100);
    setTimeout(setInitialWhiteBackground, 300);

    // 접근성: 사용자가 애니메이션을 비활성화했는지 확인
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    console.log('🎭 Prefers reduced motion:', prefersReducedMotion);

    if (prefersReducedMotion) {
      console.log('⏸️ Using reduced motion triggers');
      
      // 스크롤 이벤트 감지 테스트 (reduced motion에서도)
      let scrollCount = 0;
      const handleReducedScroll = () => {
        scrollCount++;
        if (scrollCount % 20 === 0) { // reduced motion에서는 더 자주 로그
          const message = `📜 ReducedMotion Scroll: ${scrollCount}, scrollY: ${window.scrollY}`;
          console.log(message);
          if ((window as any).debugLog) {
            (window as any).debugLog(message, 'log');
          }
        }
      };
      window.addEventListener('scroll', handleReducedScroll, { passive: true });
      
      // 애니메이션 없이 즉시 배경색 변경 (하지만 부드럽게 전환)
      const mainContentTrigger = ScrollTrigger.create({
        trigger: "[data-section='main-content']",
        start: "top 50%", // 일반 애니메이션과 동일한 시작점
        end: "top 0%",    // 일반 애니메이션과 동일한 끝점
        scrub: 0.5,       // reduced motion이지만 약간의 부드러움 유지
        onUpdate: (self) => {
          const progress = self.progress;
          console.log('🔄 ReducedMotion MainContent progress:', progress);
          throttledColorUpdate(progress); // 동일한 함수 사용
        },
        onEnter: () => {
          console.log('🚪 ReducedMotion MainContent entered');
        },
        onLeaveBack: () => {
          console.log('🚪 ReducedMotion MainContent left back');
        },
        invalidateOnRefresh: true
      });

      // FeaturesSection에서 다시 흰색으로 복귀 (reduced motion)
      const featuresElement = document.querySelector("[aria-labelledby='features-heading']");
      if (featuresElement) {
        const featuresTrigger = ScrollTrigger.create({
          trigger: featuresElement,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            console.log('🔄 ReducedMotion Features progress:', progress);
            // 검은색(0)에서 흰색(255)으로 전환
            const colorValue = Math.round(255 * progress);
            if (backgroundRef.current) {
              backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            }
          },
          invalidateOnRefresh: true
        });
      }

      // IpSection에서 다시 검은색으로 전환 (reduced motion)
      const ipElement = document.querySelector("[aria-labelledby='ip-section-title']");
      if (ipElement) {
        const ipTrigger = ScrollTrigger.create({
          trigger: ipElement,
          start: "top 100%",
          end: "top 50%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            console.log('🔄 ReducedMotion IP progress:', progress);
            // 흰색(255)에서 검은색(0)으로 전환
            const colorValue = Math.round(255 * (1 - progress));
            if (backgroundRef.current) {
              backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            }
          },
          invalidateOnRefresh: true
        });
      }

      // CallToActionSection에서 다시 흰색으로 전환 (reduced motion)
      const ctaElement = document.querySelector("[aria-labelledby='cta-heading']");
      if (ctaElement) {
        const ctaTrigger = ScrollTrigger.create({
          trigger: ctaElement,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.5,
          onUpdate: (self) => {
            const progress = self.progress;
            console.log('🔄 ReducedMotion CTA progress:', progress);
            // 검은색(0)에서 흰색(255)으로 전환
            const colorValue = Math.round(255 * progress);
            if (backgroundRef.current) {
              backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
            }
          },
          invalidateOnRefresh: true
        });
      }

      return () => {
        // ScrollTrigger cleanup은 전역 cleanup에서 처리
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        window.removeEventListener('scroll', handleReducedScroll);
      };
    }

    console.log('🎬 Creating normal animation triggers');

    // 모든 ScrollTrigger들을 지연 생성하여 초기 배경색이 확실히 설정된 후 실행
    setTimeout(() => {
      console.log('⏰ Creating delayed ScrollTriggers');
    
    // 스크롤 이벤트 감지 테스트
    let scrollCount = 0;
    const handleScroll = () => {
      scrollCount++;
      if (scrollCount % 10 === 0) { // 10번째마다 로그 (너무 많은 로그 방지)
        const message = `📜 Scroll detected: ${scrollCount}, scrollY: ${window.scrollY}`;
        console.log(message);
        // 특정 기기에서 console 오버라이드가 작동하지 않을 경우 대비
        if ((window as any).debugLog) {
          (window as any).debugLog(message, 'log');
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // MainContentSection에서 검은색으로 전환
    console.log('📱 Creating MainContentSection trigger');
    const mainContentElement = document.querySelector("[data-section='main-content']");
    console.log('🎯 MainContent element found:', !!mainContentElement);
    console.log('🎯 MainContent element details:', {
      offsetTop: (mainContentElement as HTMLElement)?.offsetTop,
      offsetHeight: (mainContentElement as HTMLElement)?.offsetHeight,
      className: mainContentElement?.className
    });
    
    if (!mainContentElement) {
      console.error('❌ MainContent section not found!');
      return;
    }
    
    // 초기 로드 시 스크롤 위치 확인 후 ScrollTrigger 생성
    setTimeout(() => {
      const mainContentScrollTrigger = ScrollTrigger.create({
        trigger: mainContentElement,
        start: "top 60%", // 섹션이 화면의 60% 지점에 도달할 때 시작
        end: "top 10%",   // 섹션이 화면의 10% 지점에 도달할 때 완료
        scrub: 1,         // 부드러운 스크럽 애니메이션
        onUpdate: (self) => {
          // 실제 스크롤이 발생했고, hash 네비게이션 중이 아닐 때만 색상 변경
          const hasScrolled = window.scrollY > 100; // 100px 이상 스크롤했을 때만
          if (hasScrolled && (!window.location.hash || window.location.hash === '#service')) {
            const progress = self.progress;
            console.log('🔄 MainContent progress:', progress);
            throttledColorUpdate(progress);
          }
        },
        onEnter: () => {
          console.log('🚪 MainContent entered');
          // 실제 스크롤이 발생했을 때만 검은색으로 설정
          const hasScrolled = window.scrollY > 100;
          if (hasScrolled && (!window.location.hash || window.location.hash === '#service')) {
            if (backgroundRef.current) {
              backgroundRef.current.style.backgroundColor = 'rgb(0, 0, 0)';
            }
          }
        },
        onLeave: () => console.log('🚪 MainContent left'),
        onEnterBack: () => console.log('🚪 MainContent entered back'),
        onLeaveBack: () => {
          console.log('🚪 MainContent left back');
          // MainContent를 위로 벗어날 때 흰색으로 복원
          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
          }
        },
        invalidateOnRefresh: true
      });
    }, 500); // 0.5초 지연 후 ScrollTrigger 생성
    
    // console.log('✅ MainContent ScrollTrigger created:', {
    //   start: mainContentScrollTrigger.start,
    //   end: mainContentScrollTrigger.end,
    //   trigger: mainContentScrollTrigger.trigger
    // });

    // FeaturesSection에서 흰색으로 전환 후 흰색 유지
    const featuresElement = document.querySelector("[aria-labelledby='features-heading']");
    console.log('🎯 Features element found:', !!featuresElement);

    if (!featuresElement) {
      console.error('❌ Features section not found!');
      return;
    }

    const featuresScrollTrigger = ScrollTrigger.create({
      trigger: featuresElement,
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        // hash 네비게이션 중이 아닐 때만 스크롤 기반 색상 변경
        if (!window.location.hash || window.location.hash === '#key-project') {
          const progress = self.progress;
          // 검은색(0)에서 흰색(255)으로 전환
          const colorValue = Math.round(255 * progress);

          if (backgroundRef.current) {
            backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
          }
        }
      },
      onEnter: () => {
        console.log('FeaturesSection entered viewport');
        // Features 섹션에 진입했을 때 즉시 흰색으로 설정
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
        }
      },
      onLeave: () => {
        console.log('FeaturesSection left viewport - maintaining white background');
        // FeaturesSection을 벗어나면 흰색으로 고정
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
        }
      },
      invalidateOnRefresh: true
    });

    // IpSection에서 검은색으로 전환 (섹션이 완전히 보일 때 가장 검은색)
    const ipElement = document.querySelector("[aria-labelledby='ip-section-title']");
    console.log('🎯 IP element found:', !!ipElement);
    
    if (!ipElement) {
      console.error('❌ IP section not found!');
      return;
    }
    
    const ipScrollTrigger = ScrollTrigger.create({
      trigger: ipElement,
      start: "top 100%",  // 섹션이 나타나기 시작할 때
      end: "top 50%",  // 섹션 바닥이 화면 90% 지점에 올 때 완전히 검은색
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // 흰색(255)에서 검은색(0)으로 전환
        const colorValue = Math.round(255 * (1 - progress));

        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        }
      },
      onEnter: () => {
        console.log('IpSection entered viewport');
      },
      onLeave: () => {
        console.log('IpSection left viewport - maintaining black background');
        // IpSection을 벗어나면 검은색으로 고정
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = 'rgb(0, 0, 0)';
        }
      },
      invalidateOnRefresh: true
    });

    // CallToActionSection에서 흰색으로 전환
    const ctaElement = document.querySelector("[aria-labelledby='cta-heading']");
    console.log('🎯 CTA element found:', !!ctaElement);
    
    if (!ctaElement) {
      console.error('❌ CTA section not found!');
      return;
    }
    
    const ctaScrollTrigger = ScrollTrigger.create({
      trigger: ctaElement,
      start: "top 70%",
      end: "top 30%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // 검은색(0)에서 흰색(255)으로 전환
        const colorValue = Math.round(255 * progress);
        
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        }
      },
      onEnter: () => {
        console.log('CallToActionSection entered viewport');
      },
      onLeave: () => {
        console.log('CallToActionSection left viewport - maintaining white background');
        // CallToActionSection을 벗어나면 흰색으로 고정
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = 'rgb(255, 255, 255)';
        }
      },
      invalidateOnRefresh: true
    });

    }, 1000); // 1초 지연 후 모든 ScrollTrigger 생성

    return () => {
      // ScrollTrigger cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [throttledColorUpdate]);

  return (
    <div
      className="relative w-full xl:w-[var(--grid-width)] max-w-full xl:max-w-none xl:overflow-x-visible overflow-x-hidden"
      data-color-mode-mode="dark"
      data-grid-mode={gridMode}
      data-model-id="366:3830"
    >
      {/* 전역 배경 레이어 */}
      <div
        ref={backgroundRef}
        data-background-ref
        className="absolute inset-0 w-full h-full bg-white z-[-1]"
        style={{ backgroundColor: '#ffffff', minHeight: '100vh' }}
      />
      
      {/* 메인 콘텐츠 */}
      <div className="relative z-0 flex flex-col items-start w-full max-w-full xl:max-w-none xl:overflow-x-visible overflow-x-hidden">
        <Header />

        {/* Hero Section - 가장 먼저 표시 */}
        <HeroSection shouldStartVideo={shouldStartHeroVideo} />

        <main className="flex flex-col w-full max-w-full xl:max-w-none xl:overflow-x-visible overflow-x-hidden">
          <CardsSection />
          <MainContentSection />
          <FeaturesSection />
          {/* <FeaturesListSection /> */}
          <IpSection />
          <CallToActionSection />
          {/* <FaqSection /> */}
          <FooterSection />
        </main>
      </div>
    </div>
  );
};
