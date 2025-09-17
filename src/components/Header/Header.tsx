import React from "react";

const navigationItems = [
  { label: "About", isActive: true, href: "#about" },
  { label: "Service", isActive: false, href: "#service" },
  { label: "Key Project", isActive: false, href: "#key-project" },
  { label: "Characters", isActive: false, href: "#characters" },
];

// 섹션별 배경색 즉시 적용 함수
const updateBackgroundForSection = (sectionId: string) => {
  const backgroundElement = document.querySelector('[data-background-ref]') as HTMLDivElement;
  if (!backgroundElement) return;

  console.log('🎨 Header click - Updating background for section:', sectionId);

  switch (sectionId) {
    case 'about':
    case 'key-project':
      // About, Key Project 섹션은 흰색
      backgroundElement.style.backgroundColor = 'rgb(255, 255, 255)';
      break;
    case 'service':
    case 'characters':
      // Service, Characters 섹션은 검은색
      backgroundElement.style.backgroundColor = 'rgb(0, 0, 0)';
      break;
    default:
      // 기본값은 흰색
      backgroundElement.style.backgroundColor = 'rgb(255, 255, 255)';
  }
};

export const Header = (): JSX.Element => {
  const handleNavClick = (href: string) => {
    const sectionId = href.substring(1); // # 제거
    // 클릭 즉시 배경색 변경
    updateBackgroundForSection(sectionId);
  };
  return (
    <header
      className="flex flex-col w-full items-center pt-[var(--primitives-spacing-spacing-06)] pr-5 xl:pr-[var(--grid-section-hr-padding)] pb-[var(--primitives-spacing-spacing-06)] pl-5 xl:pl-[var(--grid-section-hr-padding)] absolute top-0 left-0 z-50"
      data-grid-mode="desktop"
    >
      <nav
        className="flex items-center justify-between relative w-full flex-[0_0_auto]"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="inline-flex flex-col h-[60px] xl:h-[60px] items-start gap-2.5 relative flex-[0_0_auto]">
          <img
            className="h-[70%] xl:h-[100%] w-auto object-contain transition-all duration-200"
            alt="Into The Wind Logo"
            src="/img/logo-header.svg"
          />
        </div>

        <ul
          className="hidden xl:inline-flex items-center justify-end gap-8 relative flex-[0_0_auto]"
          role="menubar"
        >
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className="inline-flex h-5 items-center gap-[var(--primitives-spacing-spacing-03)] relative flex-[0_0_auto]"
              role="none"
            >
              <a
                href={item.href}
                className="inline-flex items-center relative flex-[0_0_auto]"
                role="menuitem"
                aria-current={item.isActive ? "page" : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                <span
                  className={`relative w-fit mt-[-1.00px] font-label-small font-[number:var(--label-small-font-weight)] text-[length:var(--label-small-font-size)] tracking-[var(--label-small-letter-spacing)] leading-[var(--label-small-line-height)] whitespace-nowrap [font-style:var(--label-small-font-style)] ${
                    item.isActive
                      ? "text-[color:var(--color-mode-text-text-accent-hover)]"
                      : "text-color-mode-text-text-secondary hover:text-[color:var(--color-mode-text-text-accent-hover)] transition-colors duration-200"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};