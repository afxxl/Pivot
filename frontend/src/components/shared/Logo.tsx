interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
  variant?: "default" | "light";
}

export const Logo = ({
  size = "md",
  showText = true,
  className = "",
  variant = "default",
}: LogoProps) => {
  const sizeMap = {
    sm: { width: 24, height: 24, text: "text-lg" },
    md: { width: 32, height: 32, text: "text-xl" },
    lg: { width: 40, height: 40, text: "text-2xl" },
  };

  const currentSize = sizeMap[size];

  const colors = {
    default: {
      gradientId: "pivotGradientBlue",
      stop1: "#4F46E5",
      stop2: "#06B6D4",
      textColor: "#1E293B",
    },
    light: {
      gradientId: "pivotGradientLight",
      stop1: "#F8FAFC",
      stop2: "#CBD5E1",
      textColor: "#FFFFFF",
    },
  };
  const colorScheme = colors[variant];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient
            id={colorScheme.gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: colorScheme.stop1, stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: colorScheme.stop2, stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M20.2688,28.2021l-1.5169,1.7087a8.3516,8.3516,0,1,1,0-11.8216L29.2481,29.9108a8.3516,8.3516,0,1,0,0-11.8216l-1.5169,1.7087"
          fill="none"
          stroke={`url(#${colorScheme.gradientId})`}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {showText && (
        <span
          className={`font-bold ${currentSize.text}`}
          style={{ color: colorScheme.textColor }}
        >
          PIVOT
        </span>
      )}
    </div>
  );
};
