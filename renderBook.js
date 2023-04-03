let data = ``

data = data.split("\n")

data = data.reduce((prev, curr) => curr.trim().length > 0 ? [...prev, curr.trim()] : prev, [])

data = JSON.stringify(data)

console.log(data)