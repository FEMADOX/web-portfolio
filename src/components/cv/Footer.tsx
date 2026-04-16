export const Footer = () => (
  <footer className="mt-12 pt-6 border-t-4 border-border bg-black text-background px-4 py-6">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="text-xs font-bold text-accent uppercase tracking-wider">
        © {new Date().getFullYear()} Giancarlos Gonzalez
      </p>
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/FEMADOX"
          className="text-[10px] text-white hover:text-accent transition-colors uppercase tracking-wider"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/giancarlos-gonzalez-leyva"
          className="text-[10px] text-white hover:text-accent transition-colors uppercase tracking-wider"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/FEMADOX/web-portfolio"
          className="text-[10px] text-white hover:text-accent transition-colors uppercase tracking-wider"
        >
          Source
        </a>
      </div>
    </div>
  </footer>
)
