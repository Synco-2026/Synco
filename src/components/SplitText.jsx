import React from "react";

export default function SplitText({
  text = "",
  className = "",
  delay = 40,
  duration = 1.1,
  onLetterAnimationComplete
}) {
  const words = text.split(" ");

  return (
    <span className={`d-inline-block ${className}`} style={{ overflow: "hidden" }}>
      <style>{`
        @keyframes riseUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .split-word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.25em;
        }
        .split-char {
          display: inline-block;
          opacity: 0;
          animation: riseUp ${duration}s ease forwards;
        }
      `}</style>

      {words.map((word, wordIndex) => (
        <span className="split-word" key={wordIndex}>
          {word.split("").map((char, charIndex) => {
            const globalIndex = wordIndex * 5 + charIndex;
            const calculatedDelay = globalIndex * (delay / 1000);

            return (
              <span
                key={charIndex}
                className="split-char"
                style={{
                  animationDelay: `${calculatedDelay}s`,
                }}
                onAnimationEnd={() => {
                  if (
                    wordIndex === words.length - 1 &&
                    charIndex === word.length - 1 &&
                    onLetterAnimationComplete
                  ) {
                    onLetterAnimationComplete();
                  }
                }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}