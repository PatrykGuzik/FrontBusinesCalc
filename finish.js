const sum = document.getElementById("suma")

const suma_t = parseFloat(sessionStorage.getItem("sum"))/1000

sum.innerHTML = `Twój ślad węglowy: ${suma_t.toFixed(1)}t`