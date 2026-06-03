"use client";

import { useId } from "react";
import {
  DONUT_SEGMENT_LAYERS,
  PAID_ADS_GLOW_LAYER,
  PAID_ADS_ID,
  type DonutSegmentLayer,
} from "./donut-segments";

interface LeadSourcesDonutProps {
  colorsById: Record<string, string>;
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  ariaLabel: string;
}

function SegmentSvg({
  layer,
  fill,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  layer: DonutSegmentLayer;
  fill: string;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <svg
      className={`absolute ${className ?? ""}`}
      style={{
        left: layer.x,
        top: layer.y,
        width: layer.width,
        height: layer.height,
        zIndex: layer.zIndex,
      }}
      viewBox={layer.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-hidden
    >
      <path d={layer.path} fill={fill} />
    </svg>
  );
}

export default function LeadSourcesDonut({
  colorsById,
  hoveredId,
  onHover,
  ariaLabel,
}: LeadSourcesDonutProps) {
  const glowFilterId = useId().replace(/:/g, "");
  const isPaidAdsHovered = hoveredId === PAID_ADS_ID;

  return (
    <div
      className="relative w-[200px] h-[200px] shrink-0"
      role="img"
      aria-label={ariaLabel}
    >
      <svg
        className={`absolute pointer-events-none transition-opacity duration-200 ${
          isPaidAdsHovered ? "opacity-100" : "opacity-30"
        }`}
        style={{
          left: PAID_ADS_GLOW_LAYER.x,
          top: PAID_ADS_GLOW_LAYER.y,
          width: PAID_ADS_GLOW_LAYER.width,
          height: PAID_ADS_GLOW_LAYER.height,
          zIndex: 4,
        }}
        viewBox={PAID_ADS_GLOW_LAYER.viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <g filter={`url(#${glowFilterId})`}>
          <path
            d={PAID_ADS_GLOW_LAYER.path}
            fill={colorsById[PAID_ADS_ID] ?? "#F74608"}
          />
        </g>
        <defs>
          <filter
            id={glowFilterId}
            x="0"
            y="0"
            width="129.617"
            height="138.554"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="15"
              result="effect1_foregroundBlur"
            />
          </filter>
        </defs>
      </svg>

      {DONUT_SEGMENT_LAYERS.filter((layer) => layer.id !== PAID_ADS_ID).map(
        (layer) => (
          <SegmentSvg
            key={layer.id}
            layer={layer}
            fill={colorsById[layer.id] ?? "#E9E9E9"}
            className="cursor-pointer transition-opacity duration-200 hover:opacity-90"
            onMouseEnter={() => onHover(layer.id)}
            onMouseLeave={() => onHover(null)}
          />
        )
      )}

      {DONUT_SEGMENT_LAYERS.filter((layer) => layer.id === PAID_ADS_ID).map(
        (layer) => (
          <SegmentSvg
            key={layer.id}
            layer={layer}
            fill={colorsById[layer.id] ?? "#F74608"}
            className={`cursor-pointer transition-transform duration-200 origin-center ${
              isPaidAdsHovered ? "scale-[1.04]" : "scale-100"
            }`}
            onMouseEnter={() => onHover(PAID_ADS_ID)}
            onMouseLeave={() => onHover(null)}
          />
        )
      )}
    </div>
  );
}
