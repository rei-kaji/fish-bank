// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

function App({ Component, pageProps }) {
  return (
    // 2. Use at the root of your app
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default App;
