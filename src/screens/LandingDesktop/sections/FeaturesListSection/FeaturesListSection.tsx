import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    id: 1,
    title: "Webtoon",
    description:
      "Production of original webtoons spanning multiple genres, derived from a shared universe",
    icon: "/img/grid-four-01.svg",
    iconAlt: "Grid four",
    backgroundImage: "/img/bento-card-2-image-2.png",
    backgroundColor:
      "linear-gradient(0deg,rgba(207,17,38,1)_0%,rgba(207,17,38,1)_100%),linear-gradient(0deg,rgba(241,255,126,1)_0%,rgba(241,255,126,1)_100%)",
    badge: "Webtoon",
    stats: "700K+",
    hasLearnMore: false,
  },
  {
    id: 2,
    title: "Animation",
    description:
      "Production of original webtoons spanning multiple genres, derived from a shared universe",
    icon: "/img/grid-two-hr-al-4.svg",
    iconAlt: "Grid two hr al",
    backgroundImage: "/img/image-8.png",
    backgroundColor: "black",
    badge: "Animation",
    hasLearnMore: true,
  },
  {
    id: 3,
    title: "ShortForm",
    description:
      "Creating hybrid-content games utilizing multiple original IPs",
    icon: "/img/grid-two-vr-al-1.svg",
    iconAlt: "Grid two vr al",
    backgroundColor: "#ff69bf",
    badge: "ShortForm",
    hasLearnMore: false,
  },
  {
    id: 4,
    title: "Game",
    description:
      "Production of original webtoons spanning multiple genres, derived from a shared universe",
    icon: "/img/grid-two-hr-al-4.svg",
    iconAlt: "Grid two hr al",
    backgroundImage: "/img/group-6-1.png",
    backgroundColor: "black",
    badge: "Game",
    hasLearnMore: false,
  },
];

export const FeaturesListSection = (): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 스냅 효과를 위한 ScrollTrigger
    const snapTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        console.log('📌 FeaturesListSection pinned');
      },
      onLeave: () => {
        console.log('📌 FeaturesListSection unpinned');
      },
      onEnterBack: () => {
        console.log('📌 FeaturesListSection pinned back');
      },
      onLeaveBack: () => {
        console.log('📌 FeaturesListSection unpinned back');
      }
    });

    return () => {
      snapTrigger.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col w-screen h-screen items-center justify-center relative overflow-hidden bg-transparent"
      data-color-mode-mode="light"
      data-grid-mode="desktop"
      aria-labelledby="features-list-heading"
    >
      <div className="flex flex-col items-center justify-center gap-8 relative w-full h-full max-w-[1200px] px-8">
        <header className="flex flex-col w-full max-w-[864px] items-center gap-[var(--primitives-spacing-spacing-05)] text-center">
          <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                Key Project
              </span>
            </div>
          </div>

          <h2
            id="features-list-heading"
            className="text-[color:var(--color-mode-text-text-primary)] relative font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
          >
            The Story Transcends Platforms
          </h2>
        </header>

        <div className="grid grid-cols-2 gap-6 w-full max-w-[900px]">
          {featuresData.map((feature, index) => (
            <article
              key={feature.id}
              className="flex flex-col items-start justify-center gap-4 relative"
            >
              <div
                className={`relative w-full h-[200px] rounded-[7.2px] overflow-hidden ${feature.backgroundColor === "black" ? "bg-black" : ""}`}
                style={
                  feature.backgroundColor !== "black"
                    ? { background: feature.backgroundColor }
                    : {}
                }
              >
                <div className="relative w-full h-full">
                  {/* Background Image */}
                  {feature.backgroundImage && (
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${feature.backgroundImage})`,
                      }}
                    />
                  )}
                  
                  {/* Content */}
                  <div className="relative h-full flex flex-col justify-between p-3">
                    {/* Tag */}
                    <div className="self-start bg-black rounded-full px-2 py-1">
                      <span className="text-white text-xs font-semibold">
                        {feature.badge}
                      </span>
                    </div>

                    {/* Stats or Learn More */}
                    <div className="flex justify-between items-end">
                      {feature.stats && (
                        <div className="text-black text-2xl font-bold [font-family:'Anton_SC',Helvetica]">
                          {feature.stats}
                        </div>
                      )}
                      {feature.hasLearnMore && (
                        <a
                          href="#"
                          className="inline-flex items-center gap-1 text-white hover:opacity-80 transition-opacity"
                          aria-label={`Learn more about ${feature.title}`}
                        >
                          <span className="text-xs font-medium">Learn more</span>
                          <img className="w-3 h-3" alt="" src="/img/trailing-icon-1.svg" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="font-heading-small font-[number:var(--heading-small-font-weight)] text-[color:var(--color-mode-text-text-primary)] text-[length:var(--heading-small-font-size)] mb-2">
                  {feature.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
