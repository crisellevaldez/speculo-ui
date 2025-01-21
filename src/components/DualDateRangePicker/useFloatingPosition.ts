import { RefObject, useEffect } from "react";

interface PositionConfig {
  dropdownHeight: number;
  dropdownWidth: number;
  mobileBreakpoint: number;
  padding: number;
}

export const useFloatingPosition = (
  triggerRef: RefObject<HTMLElement>,
  dropdownRef: RefObject<HTMLElement>,
  isOpen: boolean,
  config: PositionConfig,
) => {
  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = triggerRef.current;
      const dropdown = dropdownRef.current;

      if (!trigger || !dropdown) return;

      const { dropdownHeight, dropdownWidth, mobileBreakpoint, padding } =
        config;

      const buttonRect = trigger.getBoundingClientRect();
      const isLargeScreen = window.innerWidth >= mobileBreakpoint;

      if (isLargeScreen) {
        // Calculate available space
        const spaceBelow = window.innerHeight - buttonRect.bottom;
        const spaceAbove = buttonRect.top;
        const openUpward =
          spaceBelow < dropdownHeight && spaceAbove > spaceBelow;

        // Check horizontal overflow
        const spaceRight = window.innerWidth - buttonRect.left;
        const wouldOverflowRight = spaceRight < dropdownWidth;

        // Set horizontal position
        if (wouldOverflowRight) {
          dropdown.style.right = `${padding}px`;
          dropdown.style.left = "auto";
          dropdown.style.transform = "none";
        } else {
          dropdown.style.left = `${buttonRect.left}px`;
          dropdown.style.right = "auto";
          dropdown.style.transform = "translateX(0)";
        }

        // Set vertical position
        if (openUpward) {
          dropdown.style.bottom = `${window.innerHeight - buttonRect.top + padding}px`;
          dropdown.style.top = "auto";
          dropdown.style.maxHeight = `${spaceAbove - padding * 2}px`;
        } else {
          dropdown.style.top = `${buttonRect.bottom + padding}px`;
          dropdown.style.bottom = "auto";
          dropdown.style.maxHeight = `${spaceBelow - padding * 2}px`;
        }
      } else {
        // Center the dropdown on mobile
        dropdown.style.left = "50%";
        dropdown.style.top = "50%";
        dropdown.style.transform = "translate(-50%, -50%)";
        dropdown.style.maxHeight = `${window.innerHeight - padding * 2}px`;
      }
    };

    // Initial position
    updatePosition();

    // Add event listeners with capture phase for better scroll detection
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, config]);
};
