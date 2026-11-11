import logoUrl from "@/assets/logo.svg";

/** Векторный логотип «Bella Hasias». Размеры заданы заранее, чтобы шапка не сдвигалась при загрузке. */
const RATIO = 3524 / 552;

type LogoProps = { height?: number; className?: string };

const Logo = ({ height = 22, className = "" }: LogoProps) => (
  <img
    src={logoUrl}
    alt="Bella Hasias"
    width={Math.round(height * RATIO)}
    height={height}
    decoding="async"
    fetchPriority="high"
    className={`block w-auto ${className}`}
    style={{ height }}
  />
);

export default Logo;
