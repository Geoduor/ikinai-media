import Image from "next/image";

// Real logo mark, supplied by the Builder (Aug 2026) as
// ikinai_media_Logo_260810_185907.pdf, extracted to a transparent PNG.
// Source of truth: /public/brand/logo-mark.png and logo-full.png.
//
// The mark image is used directly (authentic artwork, works on any
// background). The "IKINAI MEDIA" wordmark is set in code rather than
// using the full raster lockup, because the source file bakes the
// wordmark in dark gray (#555555) — fine on white, unreadable on the
// site's dark sections. Coding it lets color adapt: `invert` for use on
// dark backgrounds (e.g. the footer).

export function Logo({
  className = "",
  withWordmark = true,
  invert = false,
}: {
  className?: string;
  withWordmark?: boolean;
  invert?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Image
        src="/brand/logo-mark.png"
        alt="Ikinai Media"
        width={36}
        height={36}
        priority
      />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[15px] tracking-tight ${invert ? "text-paper" : "text-ink"}`}
          >
            IKINAI
          </span>
          <span
            className={`font-display text-[15px] tracking-tight -mt-0.5 ${invert ? "text-paper" : "text-ink"}`}
          >
            MEDIA
          </span>
          <span className="mt-1 h-[2px] w-6 bg-signal" />
        </span>
      )}
    </span>
  );
}
