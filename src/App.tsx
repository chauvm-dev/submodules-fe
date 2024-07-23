import { useEffect, useState } from 'react';
import { Button } from './components/ui/button';
import ThemeProvider from './contexts/ThemeProvider';
import { authTelegramService } from './apis/auth';
import { io } from 'socket.io-client';
import { Input } from './components/ui/input';

// wss://
const socket = io(`${import.meta.env.VITE_HOST_API}`, {
  transports: ['websocket'],
  extraHeaders: {
    'ngrok-skip-browser-warning': 'true',
  },
  autoConnect: true,
  protocols: 'binary',
});

const App = () => {
  const [params, setParams] = useState({});

  useEffect(() => {
    // Extract URL parameters

    console.log(
      `🌈 ~ file: App.tsx:13 ~ useEffect ~ window.location.search:`,
      window.location.search,
    );

    const searchParams = new URLSearchParams(window.location.search);

    console.log(
      `🌈 ~ file: App.tsx:13 ~ useEffect ~ searchParams:`,
      searchParams,
    );

    const paramsObj: Record<string, string> = {};

    searchParams.forEach((value, key) => {
      paramsObj[key] = value;
    });

    setParams(paramsObj);

    const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
    setParams(initDataUnsafe);
  }, []);

  useEffect(() => {
    const webApp = window?.Telegram?.WebApp;

    // console.log(`🌈 ~ file: App.tsx:9 ~ useEffect ~ webApp:`, webApp);

    const webView = window?.Telegram?.WebView;

    // console.log(`🌈 ~ file: App.tsx:13 ~ useEffect ~ webView:`, webView);

    const initData = window?.Telegram?.WebApp?.initData;

    // console.log(`🌈 ~ file: App.tsx:9 ~ useEffect ~ initData:`, initData);

    const initDataUnsafe = window?.Telegram?.WebApp?.initDataUnsafe;

    // (async () => {
    //   const res = await authTelegramService(initData);

    //   console.log(`🌈 ~ file: App.tsx:25 ~ res:`, res);
    // })();

    // console.log(
    //   `🌈 ~ file: App.tsx:13 ~ useEffect ~ initDataUnsafe:`,
    //   initDataUnsafe,
    // );
  }, []);

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
    });

    socket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.off('connect');
      socket.off('message');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('message', input);
      setInput('');
    }
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div>
        <h1>Socket.IO Chat</h1>
        {connected && 'Connected'}
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-fit"
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
      <div className="flex w-fit flex-col gap-2 p-2">
        <h1>URL Parameters</h1>
        <pre>{JSON.stringify(params, null, 2)}</pre>

        <Button
          onClick={async () => {
            const initData = window?.Telegram?.WebApp?.initData;

            const res = await authTelegramService(initData, 'XCMGE');

            console.log(`🌈 ~ file: App.tsx:25 ~ res:`, res);
          }}
        >
          Auth Telegram
        </Button>
        <Button
          onClick={async () => {
            window.open(
              `https://oauth.telegram.org/auth?bot_id=7486727225&origin=https://9146-123-16-247-86.ngrok-free.app&embed=1&return_to=https://9146-123-16-247-86.ngrok-free.app`,
              '_self',
            );
          }}
        >
          Connect Telegram
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent('web_app_close');
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">close</span>
        </Button>

        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_open_popup',
              JSON.stringify({
                title:
                  'Title for the popup (optional string, max 64 characters)',
                message: 'Message of the popup (string, max 256 characters)',
                buttons: [
                  {
                    type: 'ok',
                    text: 'Button ok',
                  },
                  {
                    type: 'close',
                    text: 'Button close',
                  },
                  {
                    type: 'cancel',
                    text: 'Button cancel',
                  },
                ],
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            open_popup
          </span>
        </Button>
        <Button
          onClick={() => {
            console.log('Here');

            const readedText = window.TelegramWebviewProxy.postEvent(
              'web_app_read_text_from_clipboard',
              JSON.stringify({
                req_id: '2k34jb34hb',
              }),
            );

            console.log(`🌈 ~ file: index.tsx:66 ~ readedText:`, readedText);

            // window.Telegram.WebApp.readTextFromClipboard();
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">clipboard</span>
        </Button>

        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_open_scan_qr_popup',
              JSON.stringify({
                text: "Optional string, containing the text to be displayed under the 'Scan QR' heading, 0-64 characters.",
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            scan_qr_popup
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_set_background_color',
              JSON.stringify({
                color: '#fcba03',
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            set_background_color
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_trigger_haptic_feedback',
              JSON.stringify({
                type: 'impact',
                impact_style: 'medium',
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            haptic_feedback
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_open_link',
              JSON.stringify({
                url: 'https://coinmarketcap.com/',
                try_instant_view: true,
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">open_link</span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_open_link',
              JSON.stringify({
                url: 'https://coinmarketcap.com/',
                try_instant_view: false,
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">open_link</span>
        </Button>
        <Button
          onClick={() => {
            const complexObject = {
              ref_code: 'ABCDEF',
              user: {
                id: 123,
                name: 'John_Doe',
              },
              extra_info: 'Some additional info here!',
            };

            // Flatten the object to a simple key-value string representation
            let flattenedString = Object.entries(complexObject)
              .map(([key, value]) => `${key}${value}`)
              .join('');

            // Filter out disallowed characters
            flattenedString = flattenedString.replace(/[^a-zA-Z0-9_]/g, '');

            // Truncate the string to a maximum of 64 characters
            if (flattenedString.length > 64) {
              flattenedString = flattenedString.substring(0, 64);
            }

            console.log(flattenedString);

            const startParam = JSON.stringify({
              ref_code: 'ABCDEF',
            });
            const refParam = 'default_ref_param';

            const url = `/voltix_dev_bot/voltix_dev_app?startapp=ref_code:ABCDEF;another_key:123`;
            if (window.TelegramWebviewProxy) {
              window.TelegramWebviewProxy.postEvent(
                'web_app_open_tg_link',
                JSON.stringify({
                  path_full: url,
                }),
              );
            } else {
              window.open('https://t.me' + url, '_blank'); // Fallback for non-Telegram environments
            }
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            open_tg_link
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent('web_app_expand');
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">expand</span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_setup_back_button',
              JSON.stringify({ is_visible: true }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            back_button
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_setup_settings_button',
              JSON.stringify({ is_visible: true }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            settings_button
          </span>
        </Button>
        <Button
          onClick={() => {
            window.TelegramWebviewProxy.postEvent(
              'web_app_setup_main_button',
              JSON.stringify({
                is_visible: true,
                text: 'Button text (string, if trim(text) is empty the button must be hidden)',
                is_progress_visible: false,
              }),
            );
          }}
        >
          <span className="line-clamp-* truncate text-ellipsis">
            main_button
          </span>
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default App;
