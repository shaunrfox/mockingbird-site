import { Link } from "react-router-dom";
import { Box } from "@okshaun/components";
import { css } from "@styled-system/css";

const navLinkBase = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2px",
  textDecoration: "none",
  fontFamily: "mono",
  fontSize: "16px",
  lineHeight: "20px",
  color: "text.subtlest",
  transition: "color 0.2s",
  cursor: "pointer",
  position: "relative",
  _hover: {
    color: "text",
  },
});

const navLinkSelected = css({
  color: "text",
});

const underline = css({
  width: "100%",
  height: "2px",
  backgroundColor: "transparent",
  transition: "background-color 0.2s",
});

const underlineSelected = css({
  backgroundColor: "yellow.60",
});

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  isActive?: boolean;
}

export default function NavLink({ to, children, isActive }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`${navLinkBase} ${isActive ? navLinkSelected : ""}`}
    >
      <span>{children}</span>
      <Box className={`${underline} ${isActive ? underlineSelected : ""}`} />
    </Link>
  );
}
