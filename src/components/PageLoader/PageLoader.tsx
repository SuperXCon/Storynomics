import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

interface PageLoaderProps {
  onLoadingComplete: () => void;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const whiteLogoRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 로딩 중 body 스크롤 방지
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = Date.now();
    const minLoadingTime = 1000; // 최소 2초
    const animationDuration = 1000; // 애니메이션은 항상 2초
    const maxWaitTime = 5000; // 최대 5초 후 강제 진행

    let isPageLoaded = false;
    let isVideoPlaying = false;

    // 페이지 로딩 상태 체크
    const checkPageLoaded = () => {
      if (document.readyState === 'complete') {
        isPageLoaded = true;
      }
    };

    // 비디오 재생 시작 감지
    const handleVideoPlaying = () => {
      console.log('🎬 PageLoader 비디오 재생 시작!');
      isVideoPlaying = true;
    };

    // 비디오 준비 상태 감지
    const handleVideoCanPlay = () => {
      console.log('📱 PageLoader 비디오 재생 가능');
      // 비디오가 재생 가능하면 실제 재생 시도
      if (video) {
        video.play().catch(err => {
          console.log('📱 PageLoader 비디오 재생 실패:', err);
          // 재생 실패 시에도 진행 (모바일 제한으로 인한 것일 수 있음)
          setTimeout(() => { isVideoPlaying = true; }, 500);
        });
      }
    };

    // 비디오 설정 및 이벤트 리스너
    const video = videoRef.current;
    if (video) {
      // 모바일 감지
      const isMobile = window.innerWidth < 768;

      // 모바일/데스크탑 공통 이벤트 리스너
      video.addEventListener('playing', handleVideoPlaying);
      video.addEventListener('canplay', handleVideoCanPlay);

      if (isMobile) {
        // 모바일에서는 muted autoplay 시도
        video.muted = true;
        video.load(); // 명시적으로 로드 시작
      } else {
        // 데스크탑에서는 바로 재생 시도
        video.play().catch(err => {
          console.log('🖥️ 데스크탑 초기 재생 실패:', err);
        });
      }

      // 에러 처리
      video.addEventListener('error', () => {
        console.log('❌ 비디오 로딩 에러 - 진행');
        isVideoPlaying = true;
      });
    }

    // 초기 페이지 로딩 상태 체크
    checkPageLoaded();

    // 강제 진행 타이머 (fallback)
    const fallbackTimer = setTimeout(() => {
      console.log('⚠️ Fallback: 강제 로딩 완료 (5초 초과)');
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            setIsVisible(false);
            onLoadingComplete();
          }
        });
      }
    }, maxWaitTime);

    // 애니메이션 진행률 (항상 2초에 걸쳐 진행)
    const interval = setInterval(() => {
      checkPageLoaded();

      const elapsed = Date.now() - startTime;
      const animationProgress = Math.min((elapsed / animationDuration) * 100, 100);
      setProgress(animationProgress);

      // 애니메이션이 100%가 되었을 때
      if (animationProgress >= 100) {
        clearInterval(interval);

        // 완료 조건 체크 - 더 엄격한 조건
        const waitForComplete = () => {
          console.log('🔍 체크:', { isPageLoaded, isVideoPlaying });

          // 페이지 로딩과 비디오 재생이 모두 완료되었고,
          // 추가로 0.5초 더 기다려서 실제 비디오가 안정적으로 재생되는지 확인
          if (isPageLoaded && isVideoPlaying) {
            console.log('⏱️ 비디오 안정성 확인 중...');
            setTimeout(() => {
              console.log('✅ 모든 조건 완료 - 로딩 화면 제거');
              clearTimeout(fallbackTimer);
              if (loaderRef.current) {
                gsap.to(loaderRef.current, {
                  opacity: 0,
                  duration: 0.6,
                  ease: 'power2.out',
                  onComplete: () => {
                    setIsVisible(false);
                    onLoadingComplete();
                  }
                });
              }
            }, 500); // 0.5초 안정성 체크
          } else {
            setTimeout(waitForComplete, 100);
          }
        };

        waitForComplete();
      }
    }, 16); // ~60fps

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackTimer);

      // body overflow 복원
      document.body.style.overflow = originalOverflow;

      if (video) {
        video.removeEventListener('playing', handleVideoPlaying);
        video.removeEventListener('canplay', () => {});
        video.removeEventListener('error', () => {});
      }
    };
  }, [onLoadingComplete]);

  useEffect(() => {
    // 로딩 애니메이션 (아래에서 위로 클리핑)
    if (whiteLogoRef.current && progress > 0) {
      const clipPercentage = 100 - progress;
      gsap.set(whiteLogoRef.current, {
        clipPath: `polygon(0% ${clipPercentage}%, 100% ${clipPercentage}%, 100% 100%, 0% 100%)`
      });
    }
  }, [progress]);

  if (!isVisible) return null;

  return (
    <div
      ref={loaderRef}
      className="page-loader absolute inset-0 z-[9999] bg-black flex items-center justify-center"
      style={{
        width: '100vw',
        height: '120vh', // 더 큰 높이로 설정
        minHeight: '120vh',
        top: '-10vh', // 위로 확장
        left: 0,
        right: 0,
        bottom: '-10vh', // 아래로 확장
        overflow: 'hidden',
        position: 'absolute',
        // Safe area 완전 덮기
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)'
      }}
    >
      <div className="relative">
        {/* 어두운 회색 베이스 로고 */}
        <img
          src="/img/loading.png"
          alt="Loading..."
          className="w-[200px] h-auto sm:w-[250px] md:w-[300px] lg:w-[350px]"
          style={{ filter: 'brightness(0.4) contrast(1.2)' }} // 어두운 회색
        />

        {/* 흰색으로 차오르는 로고 (위에 겹침) */}
        <img
          ref={whiteLogoRef}
          src="/img/loading.png"
          alt=""
          className="absolute top-0 left-0 w-[200px] h-auto sm:w-[250px] md:w-[300px] lg:w-[350px]"
          style={{
            filter: 'brightness(1.2) contrast(1.1)', // 밝은 흰색
            clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)' // 초기에는 안 보임
          }}
        />
      </div>

      {/* 숨겨진 1px 비디오 - 실제 재생 감지용 */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 pointer-events-none opacity-0"
        style={{ width: '1px', height: '1px' }}
        muted
        playsInline
        preload="auto"
      >
        {/* 모바일용 비디오 */}
        <source src="/img/bg_video_mobile.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/img/bg_video_mobile.mp4" type="video/mp4" media="(max-width: 767px)" />
        {/* 데스크탑용 비디오 */}
        <source src="/img/bg_video.webm" type="video/webm" media="(min-width: 768px)" />
        <source src="/img/bg_video.mp4" type="video/mp4" media="(min-width: 768px)" />
      </video>

      {/* 진행률 표시 (개발용) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-sm font-mono">
          Loading: {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};