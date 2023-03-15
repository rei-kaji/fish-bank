// 1. Import `createTheme`
import { createTheme, NextUIProvider } from "@nextui-org/react";
import useDarkMode from "use-dark-mode";
import { CartProvider } from "use-shopping-cart";

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: "light",
  theme: {
    // colors: {...}, // optional
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primaryLight: "$green200",
      primaryLightHover: "$green300",
      primaryLightActive: "$green400",
      primaryLightContrast: "$green600",
      primary: "#4ADE7B",
      primaryBorder: "$green500",
      primaryBorderHover: "$green600",
      primarySolidHover: "$green700",
      primarySolidContrast: "$white",
      primaryShadow: "$green500",

      gradient:
        "linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)",
      link: "#5E1DAD",
    },
  },
});

function App({ Component, pageProps }) {
  const darkMode = useDarkMode(false);
  return (
    // 2. Use at the root of your app
    <NextUIProvider theme={darkMode.value ? darkTheme : lightTheme}>
      <CartProvider
        mode="payment"
        cartMode="client-only"
        stripe="pk_test_51MTKmdJcuBamldbXZLjznQDtlVIMDjp18Y8Ic2RZFV8QhxlVfcIcq81GBNIblIp3oxZ4WVaVsIyiC5k0h4mvsg8P009Bm1qq7o"
        successUrl="http://localhost:3000"
        cancelUrl="http://localhost:3000"
        currency="USD"
        allowedCountries={["US", "GB", "JP"]}
        billingAddressCollection={true}
      >
        <Component {...pageProps} />
      </CartProvider>
    </NextUIProvider>
  );
}

export default App;
