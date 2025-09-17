import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const contentData = [
  {
    id: 1,
    type: "large",
    title: "Into the wind",
    description:
      "A high-octane road action drama featuring fearless pretty girls!",
    backgroundImage: "/img/item-01.png",

    movie: "/img/item-01",  // .webm and .mp4 will be added in video source
    
    buttonText: "COMING SOON",
    buttonIcon: "/img/vector-1.svg",
    buttonBg: "/img/vector.svg",
    textColor: "#fbfbfb",
    position: { top: 0, left: 0 }, // 피그마 기준: x: 0, y: 0
    size: { width: 560, height: 767 }, // 피그마 기준: width: 559.74, height: 767
  },
  {
    id: 2,
    type: "small",
    title: "High Kick to His Face",
    description:
      "A fierce coming-of-age drama of pretty girl pro-wrestlers standing up against the world’s injustices.",
    backgroundImage: "/img/item-02.png",
    movie: "/img/item-02",  // .webm and .mp4 will be added in video source
    
    buttons: [
      {
        text: "COMING SOON",
        icon: "/img/vector-3.svg",
        bg: "/img/vector-2.svg",
        textColor: "#dfdff266",
      }
    ],
    textColor: "#dfdff2",
    position: { top: 0, left: 592 }, // 피그마 기준: x: 735.74 - 144 = 591.74 (144는 그룹 오프셋)
    size: { width: 560, height: 369 }, // 피그마 기준: width: 559.73, height: 369.09
  },
  {
    id: 3,
    type: "small",
    title: "The occult circle",
    description:
      "In the dead of night, an occult ritual of demon worship begins at an empty school.",
    backgroundImage: "/img/item-03.png",
    movie: "/img/item-03",  // .webm and .mp4 will be added in video source
    
    buttons: [
      {
        text: "COMING SOON",
        icon: "/img/vector-7.svg",
        bg: "/img/vector-6.svg",
        textColor: "#dfdff266",
      }
      // {
      //   text: "LAUNCH SITE",
      //   icon: "/img/vector-9.svg",
      //   bg: "/img/vector-8.svg",
      //   textColor: "#ffdbce",
      // },
    ],
    textColor: "#dfdff2",
    position: { top: 401, left: 592 }, // 피그마 기준: x: 736.01 - 144 = 592, y: 749.09 - 348 = 401.09
    size: { width: 560, height: 369 }, // 피그마 기준: width: 559.99, height: 369.09
  },
];

const Button = ({ text, icon, bg, textColor, className = "" }: any) => (
  <button
    className={`inline-flex items-center justify-center p-2.5 h-10 rounded-full border border-[color:var(--color-mode-border-border-primary)] overflow-hidden ${className}`}
  >
    <div className="flex items-center justify-center px-2">
      <div
        className="flex flex-col justify-center font-[family:'Roboto_Mono',Helvetica] font-bold text-[14px] leading-5 whitespace-nowrap"
        style={{ color: 'var(--Text-text-primary, white)' }}
      >
        {text}
      </div>
    </div>
    {icon && (
      <div className="w-5 h-5 relative overflow-hidden">
        <div className="absolute w-[15px] h-[15px] left-[2.5px] top-[2.5px] bg-[color:var(--color-mode-icon-icon-primary)]" />
      </div>
    )}
  </button>
);


const LargeContentCard = React.forwardRef<HTMLDivElement, { item: any }>(
  ({ item }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (videoRef.current && item.movie) {
        videoRef.current.play();
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    return (
      <div
        ref={ref}
        className="absolute bg-black rounded-[8.27px] cursor-pointer transition-transform duration-500 ease-out"
        style={{
          width: `${item.size.width}px`,
          height: `${item.size.height}px`,
          top: `${item.position.top}px`,
          left: `${item.position.left}px`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute w-[563px] h-[767px] left-[0.75px] -top-[0.33px] rounded-[12px] overflow-hidden border border-solid border-[color:var(--color-mode-border-border-primary)]">
          <div className="absolute w-[563px] h-[767px] left-[0.25px] top-0 inline-flex flex-col justify-center items-center">
            {/* Background Image */}
            <div
              className={`absolute w-[563px] h-[767px] top-0 left-0 bg-cover bg-center transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.20) 100%), url(${item.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {item.logoImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <img
                    className="w-[319px] h-[219px] aspect-[1.46]"
                    alt="Logo"
                    src={item.logoImage}
                  />
                </div>
              )}
            </div>

            {/* Video */}
            {item.movie && (
              <video
                ref={videoRef}
                className={`absolute w-[563px] h-[767px] top-0 left-0 object-cover transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                muted
                loop
                playsInline
              >
                <source src={`${item.movie}.webm`} type="video/webm" />
                <source src={`${item.movie}.mp4`} type="video/mp4" />
              </video>
            )}
          </div>

          {/* 상단 그라디언트 오버레이 */}
          <div className="absolute w-[563px] h-[246px] left-[0.25px] top-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0)_75%)]" />

          {/* 하단 그라디언트 오버레이 */}
          <div className="absolute w-[563px] h-[163px] left-[0.25px] top-[604px] bg-[linear-gradient(0deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0)_75%)]" />

          <div
            className="absolute top-[23.26px] left-[24.3px] text-[39.43px] flex flex-col justify-center [font-family:'Evil_Empire-Regular',Helvetica] font-normal uppercase leading-[48.83px] whitespace-nowrap"
            style={{ color: "#FCFCFC" }}
          >
            {item.title}
          </div>

          <div
            className="absolute w-[256px] h-[62px] top-[87px] left-[24.25px] flex flex-col justify-center [font-family:'Roobert-Medium',Helvetica] font-medium text-[12.82px] leading-[15.63px]"
            style={{ color: "#FCFCFC" }}
          >
            {item.description.split("\n").map((line: string, index: number) => (
              <React.Fragment key={index}>
                {line}
                {index < item.description.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </div>

          <Button
            text={item.buttonText}
            icon={item.buttonIcon}
            bg={item.buttonBg}
            className="absolute top-[704px] left-[24.25px] w-[125px] h-[39px]"
          />
        </div>
      </div>
    );
  }
);

LargeContentCard.displayName = "LargeContentCard";

const SmallContentCard = React.forwardRef<HTMLDivElement, { item: any }>(
  ({ item }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
      setIsHovered(true);
      if (videoRef.current && item.movie) {
        videoRef.current.play();
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    };

    return (
      <div
        ref={ref}
        className="absolute bg-black rounded-[8.27px] cursor-pointer transition-transform duration-500 ease-out"
        style={{
          width: `${item.size.width}px`,
          height: `${item.size.height}px`,
          top: `${item.position.top}px`,
          left: `${item.position.left}px`,
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <div
        className="relative w-[560px] h-[369px] rounded-[var(--corner-corner-04-duplicate)] overflow-hidden border border-solid border-[color:var(--color-mode-border-border-primary)]"
      >
        <div className="relative w-[558px] h-[367px] top-[0.67px] left-[1.26px]">
          <div className="absolute w-[558px] h-[367px] top-0 left-0 overflow-hidden">
            {/* Background Image */}
            <div
              className={`absolute w-[559px] h-[376px] -left-[0.27px] -top-[2.67px] bg-cover bg-[50%_50%] transition-opacity duration-500 ${
                isHovered ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ backgroundImage: `url(${item.backgroundImage})` }}
            >
              {item.overlayImage && (
                <img
                  className="absolute w-[559px] h-[376px] top-0 left-0 object-cover"
                  alt="Overlay"
                  src={item.overlayImage}
                />
              )}

              {item.overlayImages &&
                item.overlayImages.map((image, index) => (
                  <img
                    key={index}
                    className="absolute w-[559px] h-[376px] top-0 left-0 object-cover"
                    alt={`Overlay ${index + 1}`}
                    src={image}
                  />
                ))}
            </div>

            {/* Video */}
            {item.movie && (
              <video
                ref={videoRef}
                className={`absolute w-[559px] h-[376px] -left-[0.27px] -top-[2.67px] object-cover transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`}
                muted
                loop
                playsInline
              >
                <source src={`${item.movie}.webm`} type="video/webm" />
                <source src={`${item.movie}.mp4`} type="video/mp4" />
              </video>
            )}

            <div className="absolute w-[559px] h-[247px] -left-[0.27px] -top-[0.67px] bg-[linear-gradient(180deg,rgba(0,0,0,0.6)_0%,rgba(0,0,0,0)_75%)]" />
          </div>

          <div
            className="top-[23.26px] left-[24.3px] text-[38.15px] absolute h-[49px] [font-family:'Evil_Empire-Regular',Helvetica] font-normal tracking-[-0.60px] leading-[48.83px] whitespace-nowrap"
            style={{ color: item.textColor }}
          >
            {item.title}
          </div>

          <p
            className="absolute w-[256px] top-[87px] left-[23.99px] [font-family:'Roobert-Medium',Helvetica] font-medium text-[12.82px] tracking-[0] leading-[15.63px]"
            style={{ color: item.textColor }}
          >
            {item.description}
          </p>

          <div className="absolute top-[306px] left-[23.99px] flex gap-[8px]">
            <Button
              text={item.buttons[0].text}
              icon={item.buttons[0].icon}
              bg={item.buttons[0].bg}
              textColor={item.buttons[0].textColor}
              className="w-[125px] h-[39px]"
            />

            {/* <LaunchButton
              text={item.buttons[1].text}
              icon={item.buttons[1].icon}
              bg={item.buttons[1].bg}
              textColor={item.buttons[1].textColor}
              className="w-[121px] h-[39px]"
            /> */}
          </div>
        </div>
      </div>
      </div>
    );
  }
);

SmallContentCard.displayName = "SmallContentCard";

const MobileContentCard = ({ item, isFirst = false }) => {
  const [isInView, setIsInView] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // 모바일 디바이스 감지
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  React.useEffect(() => {
    if (!isMobile || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // 카드가 화면 중앙 50% 영역에 있는지 확인
        const isInCenter = entry.intersectionRatio > 0.5;
        setIsInView(isInCenter);

        if (isInCenter && videoRef.current && item.movie) {
          videoRef.current.play();
        } else if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.currentTime = 0;
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-25% 0px -25% 0px' // 화면 중앙 50% 영역만 감지
      }
    );

    observer.observe(cardRef.current);

    return () => observer.disconnect();
  }, [isMobile, item.movie]);

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsInView(true);
      if (videoRef.current && item.movie) {
        videoRef.current.play();
      }
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsInView(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={`w-full bg-black rounded-lg overflow-hidden border border-solid border-[color:var(--color-mode-border-border-primary)] transition-transform duration-500 ease-out ${!isMobile ? 'cursor-pointer' : ''} ${
        isFirst ? "aspect-[9/16]" : "aspect-[16/9]"
      } relative`}
      style={{
        transform: (isInView && !isMobile) ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-full">
        {/* Background Image */}
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${isInView ? 'opacity-0' : 'opacity-100'}`}
          style={{ backgroundImage: `url(${item.backgroundImage})` }}
        >
          {item.overlayImage && (
            <img
              className="absolute inset-0 w-full h-full object-cover"
              alt="Overlay"
              src={item.overlayImage}
            />
          )}

          {item.overlayImages &&
            item.overlayImages.map((image: any, index: any) => (
              <img
                key={index}
                className="absolute inset-0 w-full h-full object-cover"
                alt={`Overlay ${index + 1}`}
                src={image}
              />
            ))}

          {item.logoImage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                className="w-32 h-auto max-w-[60%] aspect-[1.46]"
                alt="Logo"
                src={item.logoImage}
              />
            </div>
          )}
        </div>

        {/* Video */}
        {item.movie && (
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isInView ? 'opacity-100' : 'opacity-0'}`}
            muted
            loop
            playsInline
          >
            <source src={`${item.movie}.webm`} type="video/webm" />
            <source src={`${item.movie}.mp4`} type="video/mp4" />
          </video>
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        <div className="absolute top-4 left-4 right-4">
          <h3
            className="text-2xl sm:text-3xl font-normal tracking-[-0.6px] leading-tight mb-2"
            style={{ color: item.textColor, fontFamily: "Evil Empire" }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm leading-tight opacity-90"
            style={{ color: item.textColor, fontFamily: "Roobert" }}
          >
            {item.description.replace(/\\n/g, " ")}
          </p>
        </div>

        <div className="absolute bottom-4 left-4 flex gap-2">
          {item.buttonText ? (
            <Button
              text={item.buttonText}
              icon={item.buttonIcon}
              bg={item.buttonBg}
              className="w-[125px] h-[39px]"
            />
          ) : item.buttons ? (
            <>
              <Button
                text={item.buttons[0].text}
                icon={item.buttons[0].icon}
                bg={item.buttons[0].bg}
                className="w-[125px] h-[39px]"
              />
              {/* <LaunchButton
                text={item.buttons[1].text}
                icon={item.buttons[1].icon}
                bg={item.buttons[1].bg}
                textColor={item.buttons[1].textColor}
                className="w-[121px] h-[39px]"
              /> */}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const MainContentSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const mobileCardsRef = useRef<HTMLDivElement>(null);
  const largeCardRef = useRef<HTMLDivElement>(null);
  const smallCard1Ref = useRef<HTMLDivElement>(null);
  const smallCard2Ref = useRef<HTMLDivElement>(null);
  const titleTextRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // 접근성 고려 - 모션 감소 설정 확인
    const shouldReduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // 단어별 3D 텍스트 애니메이션 - 왼쪽 아래에서 회전하며 나타남
    if (titleTextRef.current && !shouldReduceMotion) {
      // 텍스트를 단어별로 분리하고 span으로 감싸기
      const titleText = titleTextRef.current.textContent;
      if (titleText) {
        const words = titleText.split(" ");
        titleTextRef.current.innerHTML = words
          .map(
            (word, index) =>
              `<span class="word-${index}" style="display: inline-block;">${word}</span>`
          )
          .join(" ");

        // 각 단어에 초기 상태 설정
        const wordElements =
          titleTextRef.current.querySelectorAll('[class*="word-"]');
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

        // 스크롤 트리거로 단어별 순차 애니메이션 실행 - 일관성 보장
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 100%",
          end: "bottom 0%",
          onEnter: () => {
            // 모든 단어를 먼저 초기 상태로 강제 설정
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

            // 섹션에 들어올 때 애니메이션 재생
            const tl = gsap.timeline();
            wordElements.forEach((word, index) => {
              tl.to(
                word,
                {
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  y: 0,
                  x: 0,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                },
                index * 0.15
              );
            });
          },
          onLeave: () => {
            // 섹션을 벗어날 때 모든 단어를 확실히 초기 상태로 리셋
            wordElements.forEach((word) => {
              gsap.killTweensOf(word); // 진행중인 애니메이션 중단
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
            // 모든 단어를 먼저 초기 상태로 강제 설정
            wordElements.forEach((word) => {
              gsap.killTweensOf(word); // 진행중인 애니메이션 중단
              gsap.set(word, {
                opacity: 0,
                scale: 0.3,
                rotation: -15,
                transformOrigin: "left bottom",
                y: 30,
                x: -20,
              });
            });

            // 뒤로 스크롤해서 다시 들어올 때 애니메이션 재생
            const tl = gsap.timeline();
            wordElements.forEach((word, index) => {
              tl.to(
                word,
                {
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  y: 0,
                  x: 0,
                  duration: 0.6,
                  ease: "back.out(1.7)",
                },
                index * 0.15
              );
            });
          },
          onLeaveBack: () => {
            // 위로 스크롤해서 벗어날 때 모든 단어를 확실히 초기 상태로 리셋
            wordElements.forEach((word) => {
              gsap.killTweensOf(word); // 진행중인 애니메이션 중단
              gsap.set(word, {
                opacity: 0,
                scale: 0.3,
                rotation: -15,
                y: 30,
                x: -20,
              });
            });
          },
        });
      }
    }

    // 카드 영역 창의적 reveal 애니메이션 - 각 카드가 다른 방향에서 등장
    if (cardsContainerRef.current && !shouldReduceMotion) {
      const desktopCards = cardsRef.current;
      const mobileCards = mobileCardsRef.current;

      if (desktopCards && window.innerWidth >= 1280) {
        const largeCard = largeCardRef.current;
        const smallCard1 = smallCard1Ref.current;
        const smallCard2 = smallCard2Ref.current;

        // 초기 상태: 각 카드를 다른 방향에서 숨김
        if (largeCard) {
          gsap.set(largeCard, {
            x: -200,
            y: 100,
            opacity: 0,
            scale: 0.7,
            rotation: -15,
            transformOrigin: "center center",
          });
        }

        if (smallCard1) {
          gsap.set(smallCard1, {
            x: 150,
            y: -80,
            opacity: 0,
            scale: 0.8,
            rotation: 10,
            transformOrigin: "center center",
          });
        }

        if (smallCard2) {
          gsap.set(smallCard2, {
            x: 120,
            y: 150,
            opacity: 0,
            scale: 0.75,
            rotation: -8,
            transformOrigin: "center center",
          });
        }
      }

      if (mobileCards) {
        const mobileCardElements = mobileCards.querySelectorAll("[key]");
        mobileCardElements.forEach((card, index) => {
          gsap.set(card, {
            y: 80 + index * 20,
            opacity: 0,
            scale: 0.85,
            rotation: index % 2 === 0 ? -5 : 5,
          });
        });
      }

      // 스크롤 트리거로 창의적인 스태거 애니메이션
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: "top 90%",
        end: "bottom 10%",
        onEnter: () => {
          // Desktop cards 애니메이션
          if (desktopCards) {
            const tl = gsap.timeline();

            // Large card - 왼쪽에서 회전하며 등장
            if (largeCardRef.current) {
              tl.to(
                largeCardRef.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 1,
                  ease: "back.out(1.7)",
                },
                0
              );
            }

            // Small card 1 - 오른쪽 위에서 등장 (지연)
            if (smallCard1Ref.current) {
              tl.to(
                smallCard1Ref.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.8,
                  ease: "back.out(1.5)",
                },
                0.3
              );
            }

            // Small card 2 - 오른쪽 아래에서 등장 (더 지연)
            if (smallCard2Ref.current) {
              tl.to(
                smallCard2Ref.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.9,
                  ease: "back.out(1.4)",
                },
                0.6
              );
            }
          }

          // Mobile cards 애니메이션
          if (mobileCards) {
            const mobileCardElements = mobileCards.querySelectorAll("[key]");
            const mobileTl = gsap.timeline();

            mobileCardElements.forEach((card, index) => {
              mobileTl.to(
                card,
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.7,
                  ease: "back.out(1.5)",
                },
                index * 0.2
              );
            });
          }
        },
        onLeave: () => {
          // 아래로 벗어날 때 리셋
          if (desktopCards) {
            if (largeCardRef.current) {
              gsap.set(largeCardRef.current, {
                x: -200,
                y: 100,
                opacity: 0,
                scale: 0.7,
                rotation: -15,
              });
            }
            if (smallCard1Ref.current) {
              gsap.set(smallCard1Ref.current, {
                x: 150,
                y: -80,
                opacity: 0,
                scale: 0.8,
                rotation: 10,
              });
            }
            if (smallCard2Ref.current) {
              gsap.set(smallCard2Ref.current, {
                x: 120,
                y: 150,
                opacity: 0,
                scale: 0.75,
                rotation: -8,
              });
            }
          }

          if (mobileCards) {
            const mobileCardElements = mobileCards.querySelectorAll("[key]");
            mobileCardElements.forEach((card, index) => {
              gsap.set(card, {
                y: 80 + index * 20,
                opacity: 0,
                scale: 0.85,
                rotation: index % 2 === 0 ? -5 : 5,
              });
            });
          }
        },
        onEnterBack: () => {
          // 다시 들어올 때 애니메이션 재생 (onEnter와 동일)
          if (desktopCards) {
            const tl = gsap.timeline();

            if (largeCardRef.current) {
              tl.to(
                largeCardRef.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 1,
                  ease: "back.out(1.7)",
                },
                0
              );
            }

            if (smallCard1Ref.current) {
              tl.to(
                smallCard1Ref.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.8,
                  ease: "back.out(1.5)",
                },
                0.3
              );
            }

            if (smallCard2Ref.current) {
              tl.to(
                smallCard2Ref.current,
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.9,
                  ease: "back.out(1.4)",
                },
                0.6
              );
            }
          }

          if (mobileCards) {
            const mobileCardElements = mobileCards.querySelectorAll("[key]");
            const mobileTl = gsap.timeline();

            mobileCardElements.forEach((card, index) => {
              mobileTl.to(
                card,
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  rotation: 0,
                  duration: 0.7,
                  ease: "back.out(1.5)",
                },
                index * 0.2
              );
            });
          }
        },
        onLeaveBack: () => {
          // 위로 벗어날 때 리셋 (onLeave와 동일)
          if (desktopCards) {
            if (largeCardRef.current) {
              gsap.set(largeCardRef.current, {
                x: -200,
                y: 100,
                opacity: 0,
                scale: 0.7,
                rotation: -15,
              });
            }
            if (smallCard1Ref.current) {
              gsap.set(smallCard1Ref.current, {
                x: 150,
                y: -80,
                opacity: 0,
                scale: 0.8,
                rotation: 10,
              });
            }
            if (smallCard2Ref.current) {
              gsap.set(smallCard2Ref.current, {
                x: 120,
                y: 150,
                opacity: 0,
                scale: 0.75,
                rotation: -8,
              });
            }
          }

          if (mobileCards) {
            const mobileCardElements = mobileCards.querySelectorAll("[key]");
            mobileCardElements.forEach((card, index) => {
              gsap.set(card, {
                y: 80 + index * 20,
                opacity: 0,
                scale: 0.85,
                rotation: index % 2 === 0 ? -5 : 5,
              });
            });
          }
        },
      });
    }

    if (shouldReduceMotion) {
      // 접근성: 모션 감소 선호시 카드들은 항상 완전히 보이도록 유지
      console.log("📱 Reduced motion: Keeping cards always visible");

      // 카드들이 항상 완전히 보이도록 초기 상태 설정
      if (cardsRef.current) {
        gsap.set(cardsRef.current, {
          opacity: 1,
          visibility: "visible",
          transform: "none",
          clipPath: "none",
        });
      }
      if (mobileCardsRef.current) {
        gsap.set(mobileCardsRef.current, {
          opacity: 1,
          visibility: "visible",
          transform: "none",
          clipPath: "none",
        });
      }
    } else {
      // 데스크탑 뷰 애니메이션
      if (cardsRef.current && window.innerWidth >= 1280) {
        // 1단계: 섹션 고정 (짧은 시간)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "center center",
          end: "+=40%", // 클리핑 애니메이션이 중간 진행될 때 pin 해제
          pin: true,
          pinSpacing: true,
        });

        // 2단계: 클리핑 애니메이션 (더 긴 범위)
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "center center",
          end: "bottom top", // 섹션이 완전히 사라질 때까지 애니메이션 지속
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // 0 ~ 0.2: 정상 표시 상태 유지
            // 0.2 ~ 1.0: 다단계 다각형 클립패스 애니메이션
            if (progress >= 0.2) {
              const clipProgress = (progress - 0.2) / 0.8; // 0.2~1.0을 0~1로 정규화

              let clipPath = "";

              if (clipProgress <= 0.3) {
                // 1단계 (0-30%): 육각형으로 축소
                const hexProgress = clipProgress / 0.3;
                const size = 50 - hexProgress * 20; // 50% → 30%
                const centerX = 50;
                const centerY = 50;

                clipPath = `polygon(
                  ${centerX + size * Math.cos(0)}% ${
                  centerY + size * Math.sin(0)
                }%,
                  ${centerX + size * Math.cos(Math.PI / 3)}% ${
                  centerY + size * Math.sin(Math.PI / 3)
                }%,
                  ${centerX + size * Math.cos((2 * Math.PI) / 3)}% ${
                  centerY + size * Math.sin((2 * Math.PI) / 3)
                }%,
                  ${centerX + size * Math.cos(Math.PI)}% ${
                  centerY + size * Math.sin(Math.PI)
                }%,
                  ${centerX + size * Math.cos((4 * Math.PI) / 3)}% ${
                  centerY + size * Math.sin((4 * Math.PI) / 3)
                }%,
                  ${centerX + size * Math.cos((5 * Math.PI) / 3)}% ${
                  centerY + size * Math.sin((5 * Math.PI) / 3)
                }%
                )`;
              } else if (clipProgress <= 0.6) {
                // 2단계 (30-60%): 삼각형으로 변형
                const triProgress = (clipProgress - 0.3) / 0.3;
                const size = 30 - triProgress * 15; // 30% → 15%
                const centerX = 50;
                const centerY = 50;

                clipPath = `polygon(
                  ${centerX}% ${centerY - size}%,
                  ${centerX - size * Math.cos(Math.PI / 6)}% ${
                  centerY + size * Math.sin(Math.PI / 6)
                }%,
                  ${centerX + size * Math.cos(Math.PI / 6)}% ${
                  centerY + size * Math.sin(Math.PI / 6)
                }%
                )`;
              } else if (clipProgress <= 0.85) {
                // 3단계 (60-85%): 다이아몬드 모양
                const diamondProgress = (clipProgress - 0.6) / 0.25;
                const size = 15 - diamondProgress * 10; // 15% → 5%
                const centerX = 50;
                const centerY = 50;

                clipPath = `polygon(
                  ${centerX}% ${centerY - size}%,
                  ${centerX + size}% ${centerY}%,
                  ${centerX}% ${centerY + size}%,
                  ${centerX - size}% ${centerY}%
                )`;
              } else {
                // 4단계 (85-100%): 점으로 축소
                const pointProgress = (clipProgress - 0.85) / 0.15;
                const size = 5 - pointProgress * 5; // 5% → 0%

                clipPath = `polygon(
                  50% ${50 - size}%,
                  ${50 + size}% 50%,
                  50% ${50 + size}%,
                  ${50 - size}% 50%
                )`;
              }

              gsap.set(cardsRef.current, {
                clipPath: clipPath,
                willChange: "clip-path",
                transformOrigin: "center center",
                transform: `scale(${1 + clipProgress * 0.02}) rotate(${
                  clipProgress * 10
                }deg)`,
              });
            } else {
              // 정상 표시 상태
              gsap.set(cardsRef.current, {
                clipPath: "none",
                transformOrigin: "center center",
                transform: "scale(1) rotate(0deg)",
              });
            }
          },
          onLeave: () => {
            if (cardsRef.current) {
              gsap.set(cardsRef.current, { willChange: "auto" });
            }
          },
        });
      }

      // 모바일 뷰 애니메이션 (pin 없이 간단한 클리핑만)
      if (mobileCardsRef.current && window.innerWidth < 1280) {
        ScrollTrigger.create({
          trigger: mobileCardsRef.current,
          start: "bottom 50%", // 마지막 카드 아래부분이 화면 중앙보다 위로 올라가기 시작
          end: "bottom 0%", // 마지막 카드 아래부분이 완전히 화면을 벗어날 때 종료
          scrub: 3, // scrub 값을 더 높여서 더 부드럽게
          onUpdate: (self) => {
            const progress = self.progress;
            console.log('🎬 Mobile clipping animation progress:', progress); // 디버깅용 로그

            // 전체 범위에서 애니메이션 진행
            const clipProgress = progress; // 0~1 전체 범위 사용

            let clipPath = "";

            if (clipProgress <= 0.3) {
              // 1단계: 천천히 원형으로 축소 (50% → 35%)
              const size = 50 - clipProgress * 50; // 더 점진적으로
              clipPath = `circle(${size}% at 50% 50%)`;
            } else if (clipProgress <= 0.6) {
              // 2단계: 원형에서 더 천천히 축소 (35% → 15%)
              const circleProgress = (clipProgress - 0.3) / 0.3;
              const size = 35 - circleProgress * 20;
              clipPath = `circle(${size}% at 50% 50%)`;
            } else if (clipProgress <= 0.85) {
              // 3단계: 다이아몬드로 변형 (15% → 5%)
              const diamondProgress = (clipProgress - 0.6) / 0.25;
              const size = 15 - diamondProgress * 10;

              clipPath = `polygon(
                50% ${50 - size}%,
                ${50 + size}% 50%,
                50% ${50 + size}%,
                ${50 - size}% 50%
              )`;
            } else {
              // 4단계: 최종 점으로 축소 (5% → 0%)
              const pointProgress = (clipProgress - 0.85) / 0.15;
              const size = 5 - pointProgress * 5;
              clipPath = `circle(${size}% at 50% 50%)`;
            }

            gsap.set(mobileCardsRef.current, {
              clipPath: clipPath,
              willChange: "clip-path",
              transformOrigin: "center center",
              transform: `scale(${1 + clipProgress * 0.005})`, // 스케일 변화도 더 미묘하게
              opacity: 1 - clipProgress * 0.3, // 투명도도 점진적으로 변경
            });
          },
          onLeave: () => {
            if (mobileCardsRef.current) {
              gsap.set(mobileCardsRef.current, { willChange: "auto" });
            }
          },
          onLeaveBack: () => {
            // 위로 스크롤해서 벗어날 때 - 정상 상태로 복원
            if (mobileCardsRef.current) {
              gsap.set(mobileCardsRef.current, {
                clipPath: "none",
                transformOrigin: "center center",
                transform: "scale(1)",
                opacity: 1,
                willChange: "auto"
              });
            }
          },
          onEnterBack: () => {
            // 아래로 스크롤해서 다시 들어올 때 - 정상 상태 유지
            if (mobileCardsRef.current) {
              gsap.set(mobileCardsRef.current, {
                clipPath: "none",
                transformOrigin: "center center",
                transform: "scale(1)",
                opacity: 1,
                willChange: "clip-path"
              });
            }
          },
        });
      }
    }

    // 정리 함수
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === sectionRef.current ||
          trigger.trigger === cardsContainerRef.current
        ) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      id="service"
      ref={sectionRef}
      className="flex flex-col  min-h-[1394px] lg:h-[1394px] items-center gap-[var(--grid-container-gap-2)] pt-[var(--grid-section-vr-padding)] px-[0px] sm:px-6 lg:px-[0] pb-[var(--grid-section-vr-padding)] xl:mb-0 mb-[40vh] relative self-stretch w-full bg-transparent"
      data-section="main-content"
    >
      {/* Title Section - Responsive with max-width 1440px */}
      <div className="flex flex-col w-full max-w-[1440px] items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto] mx-auto px-4 sm:px-6">
        <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
          <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
              Service
            </div>
          </div>
        </div>

        <p
          ref={titleTextRef}
          className="max-w-[600px] mx-auto text-[color:var(--color-mode-text-text-primary)] text-center relative font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
          style={{ perspective: "1000px" }}
        >
          A Universe Where Genre Has No Limits
        </p>
      </div>

      {/* Cards Section - Responsive layout */}
      <div
        ref={cardsContainerRef}
        className="relative w-full flex justify-center"
      >
        {/* Desktop Layout - Absolute positioning (1150px 이상에서만 표시) */}
        <div
          ref={cardsRef}
          className="hidden xl:block relative w-[1152px] h-[900px]"
          style={{ margin: "0 auto" }}
        >
          {contentData.map((item, index) => {
            if (item.type === "large") {
              return (
                <LargeContentCard
                  key={item.id}
                  item={item}
                  ref={largeCardRef}
                />
              );
            } else {
              const cardRef = index === 1 ? smallCard1Ref : smallCard2Ref;
              return (
                <SmallContentCard key={item.id} item={item} ref={cardRef} />
              );
            }
          })}
        </div>

        {/* Mobile/Tablet Layout - 1컬럼 수직 스택킹 (1150px 미만에서 표시) */}
        <div
          ref={mobileCardsRef}
          className="xl:hidden flex flex-col gap-6 w-full max-w-[600px] px-4"
        >
          {contentData.map((item, index) => (
            <div key={item.id} className="w-full">
              <MobileContentCard item={item} isFirst={index === 0} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
