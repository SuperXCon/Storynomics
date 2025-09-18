import React, { useState } from 'react';
import { LandingDesktop } from './screens/LandingDesktop/LandingDesktop';
import { PageLoader } from './components/PageLoader/PageLoader';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldStartHeroVideo, setShouldStartHeroVideo] = useState(false);

  const handleLoadingComplete = () => {
    // 로딩 완료 후 페이지를 맨 위로 스크롤
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // DOM 업데이트 후 다시 한 번 확실히 맨 위로
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      setIsLoading(false);
      setShouldStartHeroVideo(true); // Hero 비디오 시작 신호
    });
  };

  // HTML 로더에서 호출할 수 있도록 전역에 등록
  React.useEffect(() => {
    (window as any).handleHtmlLoadingComplete = handleLoadingComplete;

    return () => {
      delete (window as any).handleHtmlLoadingComplete;
    };
  }, []);

  return (
    <>
      {/* 로딩화면을 최우선으로 표시 */}
      {isLoading && <PageLoader onLoadingComplete={handleLoadingComplete} />}

      {/* LandingDesktop은 로딩 중에도 백그라운드에서 렌더링하지만 늦게 로드 */}
      {!isLoading ? (
        <LandingDesktop shouldStartHeroVideo={shouldStartHeroVideo} />
      ) : (
        // 로딩 중에는 숨겨진 상태로만 미리 로드
        <div style={{ opacity: 0, position: 'absolute', pointerEvents: 'none', zIndex: -1 }}>
          <LandingDesktop shouldStartHeroVideo={false} />
        </div>
      )}
    </>
  );
};