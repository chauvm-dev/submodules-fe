declare global {
  interface Window {
    Telegram: {
      WebApp: Record<string, any>;
      WebView: Record<string, any>;
    } & Record<string, any>;
    TelegramWebviewProxy: Record<string, any>;
  }
}

export default global;
