import Image from 'next/image'

export const BrandLogo = () => (
  <div className="relative w-max overflow-hidden bg-muted border-2 border-border h-full">
    <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-black text-lg">
      {/* Ligh mode Logo */}
      <Image
        src="brand-logo-black.svg"
        alt="Logo"
        width={10}
        height={10}
        className="object-contain h-full w-full max-h-10 dark:hidden"
        priority
      />
      {/* Dark mode Logo */}
      <Image
        src="brand-logo-white.svg"
        alt="Logo"
        width={10}
        height={10}
        className="object-contain h-full w-full max-h-10 hidden dark:block"
        priority
      />
    </div>
  </div>
)
