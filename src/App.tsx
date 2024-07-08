import { Skeleton } from './components/ui/skeleton';
import ThemeProvider from './contexts/ThemeProvider';

const App = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="relative flex min-h-screen flex-col overflow-x-hidden">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
