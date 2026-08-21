import Image from "next/image";
import { site } from "@/lib/site";

const sizes = {
  hero: "h-[72px] w-auto md:h-[108px]",
  nav: "h-[52px] w-auto md:h-[72px]",
  footer: "h-[72px] w-auto md:h-[92px]",
} as const;

const assets = {
  hero: { src: "/logo.png", width: 297, height: 385 },
  nav: { src: "/logo.png", width: 297, height: 385 },
  footer: { src: "/logo-solid.png", width: 755, height: 977 },
} as const;

export function SiteLogo({
  size,
  priority = false,
}: {
  size: keyof typeof sizes;
  priority?: boolean;
}) {
  const asset = assets[size];

  return (
    <span className={`logo-plate logo-plate-${size}`}>
      <Image
        src={asset.src}
        alt={site.name}
        width={asset.width}
        height={asset.height}
        className={`${sizes[size]} object-contain`}
        priority={priority}
      />
    </span>
  );
}
