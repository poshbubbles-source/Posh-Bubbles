import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

/** Scaffold placeholder — replace with the real Home page component. */
function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background">
      <div className="text-center space-y-3">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-muted-foreground">
          Coming Soon
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          Posh Bubbles
        </h1>
        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
          Premium bath and beauty for the everyday ritual.
        </p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
