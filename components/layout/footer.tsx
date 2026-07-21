export function Footer() {
  return (
    <footer className="border-t border-border/40 py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row px-4 md:px-8 mx-auto">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} DigitalStore. All rights reserved.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
