declare module 'tsconfig.json' {
  import { CompilerOptions } from 'typescript/lib/protocol'
  type TypeScriptConfig = {
    compilerOptions: CompilerOptions,
  }
  const config: TypeScriptConfig
  export default config
}
