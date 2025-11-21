import { Box } from "@okshaun/components";
import mockingbirdLogo from "../assets/logos/mockingbird-logo.svg";
import mockingbirdArtsLogotype from "../assets/logos/mockingbird-arts-logotype.svg";
import mkbdArtsLogotype from "../assets/logos/mkbd-arts-logotype.svg";

type LogoVariant =
  | "mockingbird-logo"
  | "mockingbird-arts-logotype"
  | "mkbd-arts-logotype";

interface LogoProps {
  variant?: LogoVariant;
  height?: string;
  width?: string;
}

const logos = {
  "mockingbird-logo": mockingbirdLogo,
  "mockingbird-arts-logotype": mockingbirdArtsLogotype,
  "mkbd-arts-logotype": mkbdArtsLogotype,
};

export default function Logo({
  variant = "mockingbird-logo",
  height,
  width,
}: LogoProps) {
  return (
    <Box
      as="img"
      src={logos[variant]}
      alt="Mockingbird Arts"
      height={height || "auto"}
      width={width || "auto"}
      style={{ objectFit: "contain" }}
    />
  );
}
