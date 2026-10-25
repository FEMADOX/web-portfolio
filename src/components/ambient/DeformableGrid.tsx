import useDeformableGrid, {
  type DeformableGridOptions
} from '@/hooks/useDeformableGrid'

const DeformableGrid = (props: DeformableGridOptions) => {
  const { svgRef, pathRef, fallbackRef } = useDeformableGrid(props)

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        ref={fallbackRef}
        className="absolute inset-0 bg-[linear-gradient(var(--foreground)_1px,transparent_1px),linear-gradient(90deg,var(--foreground)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.045]"
      />
      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        className="absolute inset-0 size-full text-foreground opacity-[0.06] dark:opacity-[0.08]"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path ref={pathRef} />
      </svg>
    </div>
  )
}

export default DeformableGrid
