import { Link, useLocation } from "react-router-dom";
import { Box, Text } from "@okshaun/components";
import { ThemeSwitcher } from "@okshaun/components";
import { HStack } from "@styled-system/jsx";
import { css } from "@styled-system/css";

const navLinkStyle = css({
  textDecoration: "none",
  color: "text.subtle",
  fontSize: "md",
  fontWeight: "medium",
  padding: "2",
  borderRadius: "md",
  transition: "all 0.2s",
  _hover: {
    color: "text",
    bg: "surface.subtle",
  },
});

const activeLinkStyle = css({
  color: "text",
  fontWeight: "bold",
});

export default function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box
      as="nav"
      borderBottom="1px solid"
      borderColor="border"
      bg="surface"
      position="sticky"
      top="0"
      zIndex="10"
    >
      <HStack
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        p="4"
      >
        <HStack gap="6">
          <Link to="/" className={navLinkStyle}>
            <Text
              size="lg"
              weight="bold"
              className={isActive("/") ? activeLinkStyle : ""}
            >
              Mockingbird Arts
            </Text>
          </Link>

          <HStack gap="4">
            <Link
              to="/staff"
              className={`${navLinkStyle} ${isActive("/staff") ? activeLinkStyle : ""}`}
            >
              Staff
            </Link>
            <Link
              to="/pledge"
              className={`${navLinkStyle} ${isActive("/pledge") ? activeLinkStyle : ""}`}
            >
              Pledge
            </Link>
            <Link
              to="/contact"
              className={`${navLinkStyle} ${isActive("/contact") ? activeLinkStyle : ""}`}
            >
              Contact
            </Link>
          </HStack>
        </HStack>

        <ThemeSwitcher />
      </HStack>
    </Box>
  );
}
