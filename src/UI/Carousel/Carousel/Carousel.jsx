import React, {
  Children,
  cloneElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import s from "./Carousel.module.scss";
import { Page } from "../Page/Page.jsx";
import { CarouselContext } from "../carousel-context.js";

const TRANSITION_DURATION = 300;

export const Carousel = ({ children, infinite }) => {
  const windowElRef = useRef();
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(900);
  const [pages, setPages] = useState([]);
  const [transitionDuration, setTransitionDuration] =
    useState(TRANSITION_DURATION);
  const [clonesCount, setClonesCount] = useState({ head: 0, tail: 0 });
  useEffect(() => {
    if (infinite) {
      setPages([
        cloneElement(children[Children.count(children) - 1]),
        ...children,
        cloneElement(children[0]),
      ]);
      setClonesCount({ head: 1, tail: 1 });
      return;
    }
    setPages(children);
  }, [children, infinite]);

  useEffect(() => {
    const resizeHandler = () => {
      const windowElWidth = windowElRef.current.offsetWidth;
      setWidth(windowElWidth);
      setOffset(-clonesCount.head * width);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, [clonesCount, width]);

  useEffect(() => {
    if (transitionDuration === 0) {
      setTimeout(() => {
        setTransitionDuration(TRANSITION_DURATION);
      }, TRANSITION_DURATION);
    }
  }, [transitionDuration]);

  useEffect(() => {
    if (!infinite) return;
    if (offset === 0) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-(width * (pages.length - 1 - clonesCount.tail)));
      }, TRANSITION_DURATION);
      return;
    }
    if (offset === -(width * (pages.length - 1))) {
      setTimeout(() => {
        setTransitionDuration(0);
        setOffset(-(clonesCount.head * width));
      }, TRANSITION_DURATION);
      return;
    }
  }, [infinite, offset, width, pages, clonesCount]);

  const handleLeftArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + width;
      return Math.min(newOffset, 0);
    });
  };
  const handleRightArrowClick = () => {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - width;
      const maxOffset = -(width * (pages.length - 1));
      return Math.max(newOffset, maxOffset);
    });
  };

  return (
    <CarouselContext.Provider value={{ width }}>
      <div className={s.mainContainer}>
        <FaChevronLeft className={s.arrow} onClick={handleLeftArrowClick} />
        <div className={s.window} ref={windowElRef}>
          <div
            className={s.allPagesContainer}
            style={{
              transitionDuration: `${transitionDuration}ms`,
              transform: `translateX(${offset}px)`,
            }}
          >
            {pages}
          </div>
        </div>
        <FaChevronRight className={s.arrow} onClick={handleRightArrowClick} />
      </div>
    </CarouselContext.Provider>
  );
};

Carousel.Page = Page;
