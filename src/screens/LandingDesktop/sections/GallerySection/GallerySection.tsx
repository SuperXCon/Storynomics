import React from "react";

export const GallerySection = (): JSX.Element => {
  const galleryItems = [
    {
      id: 1,
      type: "Webtoon",
      title: "700K+",
      description: "",
      bgColor:
        "linear-gradient(0deg,rgba(207,17,38,1)_0%,rgba(207,17,38,1)_100%),linear-gradient(0deg,rgba(241,255,126,1)_0%,rgba(241,255,126,1)_100%)",
      bgImage: "/img/bento-card-2-image-1.png",
      width: "w-[375px]",
      height: "h-[656px]",
      titleFont: "[font-family:'Anton_SC',Helvetica]",
      titleSize: "text-[194.4px]",
      titleColor: "text-black",
      tagBg: "bg-black",
      tagText: "text-white",
      descriptionColor: "text-white",
    },
    {
      id: 2,
      type: "Game",
      title: "",
      description:
        "Production of original webtoons spanning multiple genres, derived from a shared universe",
      bgColor: "bg-black",
      bgImage: "",
      width: "w-[375px]",
      height: "h-[635px]",
      titleFont: "",
      titleSize: "",
      titleColor: "",
      tagBg: "bg-white",
      tagText: "text-black",
      descriptionColor: "text-white",
    },
    {
      id: 3,
      type: "Animation",
      title: "",
      description:
        "Production of original webtoons spanning multiple genres, derived from a shared universe",
      bgColor: "bg-black",
      bgImage: "/img/image-6.png",
      width: "w-[468px]",
      height: "h-[274.5px]",
      titleFont: "",
      titleSize: "",
      titleColor: "",
      tagBg: "bg-black",
      tagText: "text-white",
      descriptionColor: "text-white",
    },
    {
      id: 4,
      type: "ShortForm",
      title: "140M+",
      description:
        "Creating hybrid-content games utilizing multiple original IPs",
      bgColor: "bg-[#ff69bf]",
      bgImage: "/img/image-7.svg",
      width: "w-[375px]",
      height: "h-[635px]",
      titleFont: "[font-family:'Helvetica_Neue-Regular',Helvetica]",
      titleSize: "text-[65.4px]",
      titleColor: "text-black",
      tagBg: "bg-black",
      tagText: "text-white",
      descriptionColor: "text-white",
    },
  ];

  return (
    <section
      className="flex flex-col h-[1960px] items-start pt-[var(--grid-section-vr-padding)] pr-[var(--grid-section-hr-padding)] pb-[var(--grid-section-vr-padding)] pl-[var(--grid-section-hr-padding)] relative self-stretch w-[var(--grid-width)] bg-transparent"
      data-grid-mode="desktop"
      aria-labelledby="gallery-heading"
    >
      <div className="flex flex-col items-center gap-[var(--grid-container-gap-2)] relative self-stretch w-full flex-[0_0_auto]">
        <header className="flex flex-col w-[864px] items-center gap-[var(--primitives-spacing-spacing-05)] relative flex-[0_0_auto]">
          <div className="border border-solid border-color-mode-border-border-secondary-muted inline-flex items-center justify-center pt-[var(--primitives-spacing-spacing-02)] pr-[var(--primitives-spacing-spacing-02)] pb-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] relative flex-[0_0_auto] rounded-[var(--corner-corner-02)] overflow-hidden bg-[color:var(--color-mode-surface-surface-secondary-disabled)]">
            <div className="inline-flex items-center justify-center pr-[var(--primitives-spacing-spacing-02)] pl-[var(--primitives-spacing-spacing-02)] py-0 relative flex-[0_0_auto]">
              <span className="relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[color:var(--color-mode-text-text-primary-inverse)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)]">
                Key Project
              </span>
            </div>
          </div>

          <h2
            id="gallery-heading"
            className="text-[color:var(--color-mode-text-text-primary-inverse)] text-center relative self-stretch font-display-medium font-[number:var(--display-medium-font-weight)] text-[length:var(--display-medium-font-size)] tracking-[var(--display-medium-letter-spacing)] leading-[var(--display-medium-line-height)] [font-style:var(--display-medium-font-style)]"
          >
            The Story Transcends Platforms
          </h2>
        </header>

        <div className="flex items-start gap-[var(--grid-block-gap)] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col h-[880px] items-end gap-[var(--grid-block-gap)] relative flex-1 grow">
            <article className="relative w-[375px] h-[656px] rounded-[7.44px] overflow-hidden bg-[linear-gradient(0deg,rgba(207,17,38,1)_0%,rgba(207,17,38,1)_100%),linear-gradient(0deg,rgba(241,255,126,1)_0%,rgba(241,255,126,1)_100%)]">
              <div className="relative w-[375px] h-[656px]">
                <div className="absolute w-[345px] h-[154px] top-11 left-[15px]">
                  <div className="absolute w-[357px] h-[388px] top-[-81px] left-0 [font-family:'Anton_SC',Helvetica] font-normal text-black text-[194.4px] tracking-[-3.10px] leading-[194.4px]">
                    700K+
                  </div>
                </div>

                <div className="w-[375px] h-[656px] left-0 bg-[url(/img/bento-card-2-image-1.png)] absolute top-0 bg-cover bg-[50%_50%]" />

                <div className="gap-[8.27px] p-[8.27px] top-3.5 left-3.5 bg-black rounded-[33.08px] inline-flex items-center justify-center absolute">
                  <span className="mt-[-1.03px] text-[15.5px] leading-[13.0px] relative w-fit [font-family:'Roobert-SemiBold',Helvetica] font-semibold text-white tracking-[0] whitespace-nowrap">
                    Webtoon
                  </span>
                </div>

                <div className="h-[21px] top-[597px] left-3.5 text-[18.6px] leading-[20.3px] whitespace-nowrap absolute [font-family:'Roobert-Medium',Helvetica] font-medium text-white tracking-[0]">
                  {""}
                </div>
              </div>
            </article>

            <article className="relative w-[375px] h-[635px] mb-[-443.00px] bg-black rounded-[7.2px] overflow-hidden">
              <div className="relative w-[760px] h-[760px] -top-6 left-[-226px]">
                <p className="h-[59px] top-[582px] left-60 text-lg leading-[19.6px] absolute [font-family:'Roobert-Medium',Helvetica] font-medium text-white tracking-[0]">
                  Production of original webtoons
                  <br />
                  spanning multiple genres, derived
                  <br />
                  from a shared universe
                </p>

                <div className="gap-2 p-2 top-[38px] left-60 bg-white rounded-[32px] inline-flex items-center justify-center absolute">
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Roobert-SemiBold',Helvetica] font-semibold text-black text-[15px] tracking-[0] leading-[12.6px] whitespace-nowrap">
                    Game
                  </span>
                </div>
              </div>
            </article>
          </div>

          <div className="flex flex-col h-[1323px] items-start justify-center gap-[var(--grid-block-gap)] relative flex-1 grow">
            <article className="relative w-[468px] h-[274.5px] bg-black rounded-[7.2px] overflow-hidden">
              <div className="relative h-[274px]">
                <div className="absolute w-[468px] h-[274px] top-0 left-0 overflow-hidden bg-[url(/img/image-6.png)] bg-cover bg-[50%_50%]">
                  <div className="w-[482px] h-[289px] top-[-7px] left-[-7px] overflow-hidden bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%)] relative rounded-[var(--corner-corner-04)]">
                    <img
                      className="absolute w-[468px] h-[274px] top-[7px] left-[7px] aspect-[2.01] object-cover"
                      alt="Animation content preview"
                      src="/img/image-39.png"
                    />
                  </div>
                </div>

                <div className="inline-flex items-center justify-center gap-2 p-2 absolute top-3.5 left-3.5 bg-black rounded-[32px]">
                  <span className="relative w-fit mt-[-1.00px] [font-family:'Roobert-SemiBold',Helvetica] font-semibold text-white text-[15px] tracking-[0] leading-[12.6px] whitespace-nowrap">
                    Animation
                  </span>
                </div>

                <p className="h-[79px] top-[191px] left-3.5 text-lg leading-[19.6px] absolute [font-family:'Roobert-Medium',Helvetica] font-medium text-white tracking-[0]">
                  Production of original webtoons
                  <br />
                  spanning multiple genres, derived
                  <br />
                  from a shared universe
                </p>

                <div className="absolute w-[468px] h-[274px] top-0 left-0 rounded-[7.2px] border border-solid border-[#dfdff2] opacity-20" />
              </div>
            </article>

            <article className="relative w-[375px] h-[635px] bg-[#ff69bf] rounded-[7.2px] overflow-hidden">
              <div className="absolute w-[375px] h-[552px] top-3.5 left-0">
                <div className="absolute w-[202px] h-[99px] top-[13px] left-3.5 [font-family:'Helvetica_Neue-Regular',Helvetica] font-normal text-black text-[65.4px] tracking-[-0.90px] leading-[64.8px]">
                  140M+
                </div>

                <div className="absolute w-[375px] h-[512px] top-[39px] left-0 bg-[url(/img/image-7.svg)] bg-cover bg-[50%_50%]" />

                <div className="gap-2 p-2 top-0 left-3.5 bg-black rounded-[32px] inline-flex items-center justify-center absolute">
                  <span className="mt-[-1.00px] text-[15px] leading-[12.6px] relative w-fit [font-family:'Roobert-SemiBold',Helvetica] font-semibold text-white tracking-[0] whitespace-nowrap">
                    ShortForm
                  </span>
                </div>
              </div>

              <p className="absolute h-10 top-[578px] left-3.5 [font-family:'Roobert-Medium',Helvetica] font-medium text-white text-lg tracking-[0] leading-[19.6px]">
                Creating hybrid-content games
                <br />
                utilizing multiple original IPs
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};