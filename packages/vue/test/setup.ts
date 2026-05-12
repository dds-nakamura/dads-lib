/**
 * Vitest セットアップ。
 *
 * vitest-axe の matcher (toHaveNoViolations) を expect に登録する。
 * 各テストでは `import { axe } from 'vitest-axe'` してから
 * `expect(await axe(el)).toHaveNoViolations()` で利用する。
 */

import { expect } from 'vitest'
import * as matchers from 'vitest-axe/matchers'

expect.extend(matchers)
