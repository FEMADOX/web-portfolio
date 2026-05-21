export const BrandLogo = () => (
  <div className="relative size-10 shrink-0 overflow-hidden border-2 border-border bg-muted">
    {/* Light mode Logo */}
    <div
      className="h-full w-full bg-[url('/brand-logo-black.svg')] bg-contain bg-center bg-no-repeat dark:hidden"
      role="img"
      aria-label="Logo"
    />
    {/* Dark mode Logo */}
    <div
      className="hidden h-full w-full bg-[url('/brand-logo-white.svg')] bg-contain bg-center bg-no-repeat dark:block"
      role="img"
      aria-label="Logo"
    />
  </div>
)
