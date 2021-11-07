import type { FC, CSSProperties } from "react";
import type { ThemeProps } from "../Icond/icon";

export interface ProgressProps {
  percent: number; // 百分比
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight, showText, styles, theme } = props;

  return (
    <div className="hsueh-progress-bar" style={styles}>
      <div
        className="hsueh-progress-bar-outer"
        style={{ height: `${strokeHeight}px` }}
      >
        <div
          className={`hsueh-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};
export default Progress;
Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};
