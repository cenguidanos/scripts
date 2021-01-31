// deno run --unstable --allow-read --allow-net --allow-write .\index.ts --dir=
import { parse } from 'https://deno.land/std@0.85.0/flags/mod.ts'
import { join } from 'https://deno.land/std@0.85.0/path/mod.ts'
import { ensureDirSync } from 'https://deno.land/std@0.85.0/fs/mod.ts'

const dirContext = parse(Deno.args).dir

const folderPath = join(dirContext, '.vscode')
const filePath = join(dirContext, '.vscode', 'settings.json')

ensureDirSync(folderPath)

const file = 'https://raw.githubusercontent.com/cenguidanos/scripts/main/vscode-default-config.json'
const request = await fetch(file)

const jsonContent = await request.json()
const stringContent = JSON.stringify(jsonContent)

Deno.writeTextFileSync(filePath, stringContent, { create: true })
