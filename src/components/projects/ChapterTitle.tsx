type ChapterTitleProps = {
  number: string
  label: string
  title: string
}

const ChapterTitle = ({ number, label, title }: ChapterTitleProps) => (
  <div
    data-project-chapter-heading
    className="mb-8 flex items-start gap-[1.1rem]"
  >
    <span
      className="font-mono text-5xl leading-[0.9] font-black tracking-[-0.08em] text-muted-foreground opacity-45"
      aria-hidden="true"
    >
      {number}
    </span>
    <div>
      <p className="mb-[0.6rem] font-mono text-[0.9rem] leading-[1.85] font-bold tracking-[0.13em] text-muted-foreground uppercase">
        {label}
      </p>
      <h2 className="text-[clamp(1.65rem,3vw,2.7rem)] leading-[1.08] font-black tracking-[-0.045em] text-balance">
        {title}
      </h2>
    </div>
  </div>
)

export default ChapterTitle
