$f = 'e:/resume/src/components/Builder/FormSections.tsx'
$c = [System.IO.File]::ReadAllText($f)

# Replace all dark input variants with peach builder-field class
$c = $c.Replace('bg-[#0f172a] border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-indigo-600"', 'builder-field border"')
$c = $c.Replace('bg-[#0f172a] border border-slate-800 rounded-xl px-3 py-2.5 text-white outline-none focus:border-indigo-600 disabled:opacity-40"', 'builder-field border"')
$c = $c.Replace('bg-[#0f172a] border border-slate-800 rounded-lg px-2.5 py-2 text-white outline-none focus:border-indigo-600"', 'builder-field border"')
$c = $c.Replace('bg-[#0f172a] border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-600"', 'builder-field border"')
$c = $c.Replace('bg-[#0f172a] border border-slate-800 rounded-xl px-3 py-2 text-white outline-none focus:border-indigo-600 font-medium"', 'builder-field border font-bold"')

# Replace dark section backgrounds with peach builder-section class
$c = $c.Replace('border border-slate-850 p-5 rounded-2xl bg-[#151f32]/25"', 'builder-section border p-5 rounded-2xl"')

[System.IO.File]::WriteAllText($f, $c)
Write-Host "Patched successfully"
