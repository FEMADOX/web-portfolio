const ProjectLoading = () => (
  <main aria-busy="true" className="mx-auto min-h-dvh max-w-5xl px-6 py-24">
    <div aria-hidden="true" className="space-y-8">
      <div className="h-6 w-40 bg-muted" />
      <div className="h-16 max-w-xl bg-muted" />
      <div className="h-64 border-2 border-border bg-card" />
    </div>
  </main>
)

export default ProjectLoading
