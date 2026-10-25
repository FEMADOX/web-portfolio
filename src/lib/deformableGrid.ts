const GAP = 48
const RADIUS = 180
const DEPTH = 24
const INFLUENCE_LIMIT = RADIUS * 4

export interface GridGeometry {
  width: number
  height: number
  columns: readonly number[]
  rows: readonly number[]
}

const coordinates = (length: number) =>
  Array.from(
    { length: Math.ceil(length / GAP) + 3 },
    (_, index) => (index - 1) * GAP
  )

export function createGridGeometry(width: number, height: number): GridGeometry {
  return {
    width,
    height,
    columns: coordinates(width),
    rows: coordinates(height)
  }
}

export function createGridPath(
  { columns, rows }: GridGeometry,
  centerX: number,
  centerY: number,
  active: boolean
) {
  const commands: string[] = []
  // A Gaussian is separable: calculate each axis once rather than an
  // exponential for every vertex. Shared vertices keep grid crossings joined.
  const influenceAt = (position: number, center: number) => {
    const distance = position - center
    return active && Math.abs(distance) < INFLUENCE_LIMIT
      ? Math.exp(-(distance * distance) / (2 * RADIUS * RADIUS))
      : 0
  }
  const columnInfluences = columns.map(position =>
    influenceAt(position, centerX)
  )
  const rowInfluences = rows.map(position => influenceAt(position, centerY))

  const addLine = (vertical: boolean, fixedIndex: number) => {
    const positions = vertical ? rows : columns
    const fixed = (vertical ? columns : rows)[fixedIndex]
    const fixedInfluence = (vertical ? columnInfluences : rowInfluences)[
      fixedIndex
    ]
    const influences = vertical ? rowInfluences : columnInfluences
    if (!fixedInfluence) {
      commands.push(
        vertical
          ? `M${fixed} ${positions[0]}V${positions[positions.length - 1]}`
          : `M${positions[0]} ${fixed}H${positions[positions.length - 1]}`
      )
      return
    }
    for (let index = 0; index < positions.length; index++) {
      const px = vertical ? fixed : positions[index]
      const py = vertical ? positions[index] : fixed
      const influence = fixedInfluence * influences[index]
      const nextX = px + (px - centerX) * influence * 0.12
      const nextY = py + (py - centerY) * influence * 0.12 - DEPTH * influence
      commands.push(
        `${index === 0 ? 'M' : 'L'}${nextX.toFixed(1)} ${nextY.toFixed(1)}`
      )
    }
  }

  for (let column = 0; column < columns.length; column++) addLine(true, column)
  for (let row = 0; row < rows.length; row++) addLine(false, row)

  return commands.join(' ')
}
