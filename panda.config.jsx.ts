import { defineConfig } from '@pandacss/dev'
import config from './panda.config'

export default defineConfig({ ...config, jsxFramework: 'react' })
