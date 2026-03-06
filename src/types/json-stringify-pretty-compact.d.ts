declare module '@aitodotai/json-stringify-pretty-compact' {
  const stringify: (object: unknown, options?: {
    indent?: number | string
    maxLength?: number
    maxNesting?: number
    margins?: boolean
    arrayMargins?: boolean
    objectMargins?: boolean
  }) => string
  export default stringify
}
