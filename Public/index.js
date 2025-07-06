document.querySelectorAll(".postBox").forEach(k => k.addEventListener('click',()=>{
    let target = k.id
    location.replace("/letters/"+target)
}))