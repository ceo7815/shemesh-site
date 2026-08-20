import Image from "next/image";
import { site } from "@/lib/site";

const sizes = {
  hero: "h-[72px] w-auto md:h-[108px]",
  nav: "h-[52px] w-auto md:h-[72px]",
  footer: "h-[72px] w-auto md:h-[92px]",
} as const;

export function SiteLogo({
  size,
  priority = false,
}: {
  size: keyof typeof sizes;
  priority?: boolean;
}) {
  return (
    <span className={`logo-plate logo-plate-${size}`}>
      <Image
        src="/logo.png"
        alt={site.name}
        width={301}
        height={372}
        className={`${sizes[size]} object-contain`}
        priority={priority}
      />
    </span>
  );
}
