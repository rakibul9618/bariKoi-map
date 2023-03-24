import { MyAppProps } from "@/@types/common";
import { Provider as ReduxProvider } from "react-redux";
import { ThemeProvider } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import { store } from "@/redux/store";
import createEmotionCache from "@/utils/theme/createEmotionCache";
import theme from "@/utils/theme/theme";
import "@/styles/globals.css";

// create the client-side cache with emotion
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: MyAppProps) {
  return (
    <ReduxProvider store={store}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ReduxProvider>
  );
}
