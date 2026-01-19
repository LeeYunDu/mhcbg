// preflight-check.js
const { execSync } = require('child_process')
const fs = require('fs')

console.log('🚀 开始预检检查...\n')

const checks = [
  {
    name: 'Sass变量检查',
    command: 'npx sass --no-source-map src/',
    onError: error => {
      console.error('❌ Sass编译错误:', error.stdout?.toString() || error.message)
      process.exit(1)
    }
  },
  {
    name: 'ESLint检查',
    command: 'npx eslint src/ --ext .vue,.js,.jsx,.ts,.tsx',
    onError: error => {
      if (error.status !== 0 && error.stdout) {
        console.log('📋 ESLint发现以下问题:')
        console.log(error.stdout.toString())
      }
    }
  },
  {
    name: 'StyleLint检查',
    command: 'npx stylelint "src/**/*.{vue,css,scss,sass}"',
    onError: error => {
      if (error.stdout) console.log(error.stdout.toString())
    }
  }
]

try {
  checks.forEach(check => {
    console.log(`🔍 执行 ${check.name}...`)
    try {
      execSync(check.command, { stdio: 'inherit' })
      console.log(`✅ ${check.name} 通过\n`)
    } catch (error) {
      check.onError(error)
      if (check.name === 'Sass变量检查') {
        console.error('\n❌ 发现Sass编译错误，请先修复以上问题再打包！')
        process.exit(1)
      }
    }
  })

  console.log('🎉 所有预检通过，可以开始打包！')
} catch (error) {
  console.error('💥 预检过程出错:', error)
  process.exit(1)
}
