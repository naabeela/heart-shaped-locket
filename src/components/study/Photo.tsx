import { cn } from "@/lib/utils";

export function Photo({
  src,
  alt,
  caption,
  index,
  className,
  imgClassName,
  tilt = -1.2,
  tape = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  index?: string;
  className?: string;
  imgClassName?: string;
  tilt?: number;
  tape?: boolean;
}) {
  return (
    <figure className={cn("relative", className)} style={{ rotate: `${tilt}deg` }}>
      <div className={cn("relative overflow-hidden bg-paper-deep grain", tape && "tape")}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={cn(
            "block w-full object-cover photo-edge",
            "[clip-path:polygon(0.6%_0.4%,99.6%_0%,100%_99.2%,0%_100%)]",
            imgClassName,
          )}
        />
      </div>
      {index ? (
        <span className="meta absolute -left-1 -top-5 text-muted-foreground">{index}</span>
      ) : null}
      {caption ? (
        <figcaption className="meta mt-3 max-w-[46ch] text-muted-foreground">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
