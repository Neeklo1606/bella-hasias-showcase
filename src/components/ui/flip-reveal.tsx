import { ComponentProps, useCallback, useEffect, useRef } from "react";

type FlipRevealItemProps = {
  flipKey: string;
} & ComponentProps<"div">;

export const FlipRevealItem = ({ flipKey, ...props }: FlipRevealItemProps) => {
  return <div data-flip={flipKey} {...props} />;
};

type FlipRevealProps = {
  keys: string[];
  showClass?: string;
  hideClass?: string;
} & ComponentProps<"div">;

export const FlipReveal = ({
  keys,
  hideClass = "",
  showClass = "",
  ...props
}: FlipRevealProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const isShow = useCallback(
    (key: string | null) => !!key && (keys.includes("all") || keys.includes(key)),
    [keys]
  );

  useEffect(() => {
    if (!wrapperRef.current) return;
    const items = Array.from(
      wrapperRef.current.querySelectorAll<HTMLDivElement>("[data-flip]")
    );
    items.forEach((item) => {
      const key = item.getAttribute("data-flip");
      if (isShow(key)) {
        item.classList.add(showClass);
        item.classList.remove(hideClass);
      } else {
        item.classList.remove(showClass);
        item.classList.add(hideClass);
      }
    });
  }, [keys, hideClass, showClass, isShow]);

  return <div {...props} ref={wrapperRef} />;
};
