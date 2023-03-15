import useDarkMode from "use-dark-mode";
import {
  Container,
  Switch,
  Navbar,
  Button,
  Link,
  Text,
  useTheme,
  Grid,
  Badge,
} from "@nextui-org/react";
// import { Layout } from "./Layout.js";
// import { AcmeLogo } from "./AcmeLogo.js";
// import { fishIcon } from "../../public/assets/fish-bowl.png";
// import { cartIcon } from "../../public/assets/cart.svg";

import React from "react";
import Image from "next/image";
import { SunIcon } from "./Icon/SunIcon";
import { MoonIcon } from "./Icon/MoonIcon";
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart";

const Header = () => {
  const darkMode = useDarkMode(false);
  const { type, isDark } = useTheme();

  const { cartDetails } = useShoppingCart();

  return (
    <Navbar isBordered={isDark} variant="static">
      <Navbar.Brand>
        {/* <AcmeLogo /> */}
        <Link href="/">
          <Image
            src={require("../../public/assets/fish-bowl.png")}
            alt="fish-bowl"
            width={50}
            height={50}
          />
          <Container>
            <Text size={"$3xl"} b color="primary" hideIn="xs">
              Fish Bank
            </Text>
          </Container>
        </Link>
      </Navbar.Brand>
      <Navbar.Content>
        <Navbar.Link color="inherit" href="/cart">
          <Badge color="error" content={Object.entries(cartDetails).length}>
            <Image
              src={
                darkMode.value
                  ? require("../../public/assets/cart-white.svg")
                  : require("../../public/assets/cart.svg")
              }
              width={40}
              height={40}
              alt="cartImage"
            />
          </Badge>
        </Navbar.Link>
        <Navbar.Item>
          {/* <Switch checked={darkMode.value} onChange={() => darkMode.toggle()} /> */}
          <Switch
            checked={darkMode.value}
            size="xl"
            onChange={() => darkMode.toggle()}
            iconOff={<SunIcon filled />}
            iconOn={<MoonIcon filled />}
          />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
};

export default Header;
