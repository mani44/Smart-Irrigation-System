const onButton=document.querySelector("#on");
const offButton=document.querySelector("#off");
const refreshButton=document.querySelector("#refresh");
const data=document.querySelector("#data1");

onButton.addEventListener("click",()=>{
    fetch("/api/turn",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({on:true})
    })
        .then(res=>{
            return res.json();
        })
        .then(data=>{

        })
});

offButton.addEventListener("click",()=>{
    fetch("/api/turn",{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({on:false})
    })
        .then(res=>{
            return res.json();
        })
        .then(data=>{

        })
})

refreshButton.addEventListener("click",()=>{
    fetch("/api/refresh")
        .then(res=>{
            return res.json();
            console.log("dta fetch")

        })
        .then(dt=>{
            dt=JSON.parse(dt);
            data.value=dt['moisture'];
            console.log(dt.moisture);
        })
})
