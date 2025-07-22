function splitArrayIntoGroups<T>(array: T[], groups: number): T[][] {
  const groupSize = Math.ceil(array.length / groups)
  const result: T[][] = []

  for (let i = 0; i < groups; i++) {
    const start = i * groupSize
    const end = start + groupSize
    result.push(array.slice(start, end))
  }

  return result
}

export default splitArrayIntoGroups
