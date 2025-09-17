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

  return (
    <>
      {/* 로딩 중에도 LandingDesktop을 백그라운드에서 렌더링 */}
      <LandingDesktop shouldStartHeroVideo={shouldStartHeroVideo} />

      {/* 로딩화면을 오버레이로 표시 */}
      {isLoading && <PageLoader onLoadingComplete={handleLoadingComplete} />}
    </>
  );
};