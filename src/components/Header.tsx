import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Icon } from "@okshaun/components";
import { HStack, VStack } from "@styled-system/jsx";
import { css } from "@styled-system/css";
import Logo from "./Logo";
import NavLink from "./NavLink";

const headerStyle = css({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "sticky",
  top: 0,
  zIndex: 10,
});

const navWrapperBase = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1152px",
  minHeight: "56px",
  paddingX: "24px",
  paddingY: "8px",
  lg: {
    display: "none",
  },
});

const desktopWrapperStyle = css({
  display: "none",
  lg: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    alignItems: "center",
    width: "100%",
    maxWidth: "1152px",
    paddingX: "48px",
    paddingY: "24px",
  },
});

const mobileMenuStyle = css({
  display: "flex",
  md: {
    display: "none",
  },
});

const tabletNavStyle = css({
  display: "none",
  md: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  lg: {
    display: "none",
  },
});

const mobileMenuDrawer = css({
  width: "100%",
  backgroundColor: "surface",
  paddingY: "16px",
  paddingX: "24px",
  borderTop: "1px solid",
  borderColor: "border",
});

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/staff", label: "Staff" },
    { path: "/pledge", label: "Pledge" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Box as="header" className={headerStyle}>
      {/* Mobile & Tablet Layout */}
      <Box className={navWrapperBase}>
        {/* Logo - changes variant at 480px */}
        <HStack height="100%" alignItems="center">
          <Box display={{ base: "block", xs: "none" }}>
            <Logo variant="mkbd-arts-logotype" height="37px" />
          </Box>
          <Box display={{ base: "none", xs: "block" }}>
            <Logo variant="mockingbird-arts-logotype" height="31px" />
          </Box>
        </HStack>

        {/* Tablet Nav (768px+) */}
        <Box className={tabletNavStyle}>
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={isActive(item.path)}
            >
              {item.label}
            </NavLink>
          ))}
        </Box>

        {/* Mobile Menu Button */}
        <Box className={mobileMenuStyle}>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Icon>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M3 7H21M3 12H21M3 17H21" />
              </svg>
            </Icon>
          </Button>
        </Box>
      </Box>

      {/* Desktop Layout (1024px+) */}
      <VStack className={desktopWrapperStyle}>
        <Logo variant="mockingbird-logo" height="106px" width="165px" />
        <HStack gap="32px" alignItems="center">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={isActive(item.path)}
            >
              {item.label}
            </NavLink>
          ))}
        </HStack>
      </VStack>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <VStack className={mobileMenuDrawer} gap="16px" alignItems="stretch">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              isActive={isActive(item.path)}
            >
              {item.label}
            </NavLink>
          ))}
        </VStack>
      )}
    </Box>
  );
}
