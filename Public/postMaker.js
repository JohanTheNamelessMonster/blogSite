document.querySelector('button').addEventListener('click',()=>{

    var task = document.querySelector('input[name="postAction"]:checked');
    var postAction;

    if(task != null){
        postAction = task.value
    }

    let operation = ""

    if(postAction === "Insert" || postAction === ""){
        operation = "POST"
    }else if(postAction === "Update"){
        operation = "PUT"
    }else{
        operation = "DELETE"
    }

    var dataToTransmit = {
        title: document.getElementById('title').value,
        page : document.getElementById('page').value,
        postBody: document.getElementById('bodyText').value,
        accessKey : document.getElementById('accessKey').value,
        identifier: document.getElementById('identifier').value,
    }

    try{
        transmitToDB(dataToTransmit,operation)

        document.getElementById('title').innerText = ""
        document.getElementById('page').innerText = ""
        document.getElementById('bodyText').innerText = ""

        alert("Post made")

    }catch(e){
        if(e){
            console.log(e)
        }
    }

})

async function transmitToDB(data,operation){

    var raw = JSON.stringify({data});

    var requestOptions = {
    method: operation,
    headers: {
        "Content-Type" : "application/json",
    },
    body: raw,
    redirect: 'follow'
    };

    await fetch("https://jfortnerdata.deno.dev", requestOptions)
    .then(response => response.text())
    .then(result => {
        if((typeof result) === "string"){
            alert(result)
        }else{
            alert("New entry unsuccesful")
        }
    })
    .catch(error => console.log('error', error));
}