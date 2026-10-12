import React from "react";

interface MediaProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  type?: "image" | "video";
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  onLoadedData?: () => void;
  onClick?: () => void;
}

export function buildImageUrl(path: string, width?: number): string {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, "");
  if (!endpoint || !path) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const transform = width ? `tr=w-${width},f-auto,q-80` : "tr=f-auto,q-80";
  return `${endpoint}/${transform}${cleanPath}`;
}

export function buildSrcSet(path: string): string {
  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, "");
  if (!endpoint || !path) {
    return "";
  }
  const widths = [640, 1024, 1600, 2400];
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return widths
    .map((w) => `${endpoint}/tr=w-${w},f-auto,q-80${cleanPath} ${w}w`)
    .join(", ");
}

export function Media({
  src,
  alt = "",
  className = "",
  width,
  height,
  priority = false,
  type = "image",
  poster,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  onLoadedData,
  onClick,
}: MediaProps) {
  if (type === "video") {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        onLoadedData={onLoadedData}
        onClick={onClick}
        className={className}
      />
    );
  }

  const endpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  const imageSrc = endpoint ? buildImageUrl(src, width) : src;
  const srcSet = endpoint ? buildSrcSet(src) : undefined;

  return (
    <img
      src={imageSrc}
      srcSet={srcSet}
      sizes={srcSet ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw" : undefined}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      onClick={onClick}
      className={className}
    />
  );
}
