import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import {
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { useEffect, useState } from "react";

import { siteConfig } from "../config/site";
import { ThemeSwitch } from "../components/theme-switch";
import { GithubIcon, LinkedInIcon, UserIcon } from "../components/icons";
import { Logo } from "../components/icons";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if userID exists in localStorage
    const userID = localStorage.getItem("userID");

    setIsLoggedIn(!!userID);
  }, []);

  const handleSignOut = () => {
    // Remove userID from localStorage
    localStorage.removeItem("userID");
    // Update state to reflect logged out status
    setIsLoggedIn(false);
    // Redirect to home page
    window.location.href = "/home";
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/home"
          >
            <Logo />
            <p className="font-bold text-inherit">Genecraft</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link color="foreground" href={item.href}>
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.linkedIn} title="LinkedIn">
            <LinkedInIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />

          {isLoggedIn ? (
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  className="transition-transform hover:scale-110 cursor-pointer"
                  icon={<UserIcon />}
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions">
                <DropdownItem key="profile" textValue="Profile">
                  <Link className="w-full" href="/profile">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem key="settings" textValue="Settings">
                  <Link className="w-full" href="/settings">
                    Settings
                  </Link>
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  color="danger"
                  textValue="Sign Out"
                  onClick={handleSignOut}
                >
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <>
              <Button as={Link} color="primary" href="/signUp">
                Sign Up
              </Button>
              <Button
                as={Link}
                color="primary"
                href="/signIn"
                variant="bordered"
              >
                Sign In
              </Button>
            </>
          )}
        </NavbarItem>
        <NavbarItem className="hidden md:flex" />
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />

        {isLoggedIn ? (
          <Dropdown>
            <DropdownTrigger>
              <Avatar
                className="transition-transform hover:scale-110 cursor-pointer"
                color="primary"
                icon={<UserIcon />}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions">
              <DropdownItem key="profile" textValue="Profile">
                <Link className="w-full" href="/profile">
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem key="settings" textValue="Settings">
                <Link className="w-full" href="/settings">
                  Settings
                </Link>
              </DropdownItem>
              <DropdownItem
                key="signout"
                color="danger"
                textValue="Sign Out"
                onClick={handleSignOut}
              >
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <Button as={Link} color="primary" href="/signUp" variant="flat">
            Sign Up
          </Button>
        )}
      </NavbarContent>
    </HeroUINavbar>
  );
};
