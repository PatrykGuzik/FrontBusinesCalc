const sum = document.getElementById("suma")


const suma_kg = parseFloat(sessionStorage.getItem("sum"))
const suma_t = suma_kg/1000

let sumaToShow = suma_kg.toFixed(0)
if (suma_kg > 1000) {
    sumaToShow = suma_t.toFixed(1)
}

const code  = sessionStorage.getItem("code")
const role  = sessionStorage.getItem("role")

if (code != "null"){
    if(role=="menager"){
        sum.innerHTML = `Twój roczny ślad węglowy: ${sumaToShow}t`
    }else{
        sum.innerHTML = `Twój roczny ślad węglowy: ${sumaToShow}kg`
    }
    
    
}else{
    sessionStorage.setItem("sum", "null")
    sum.innerHTML = `<p>Jeżeli chcesz poznać ślad węglowy swojej firmy skontaktuj się z nami:</p> <a href="https://carbonfootprintfoundation.com/dla-biznesu/">Carbon Footprint Foundation</a>`
}

