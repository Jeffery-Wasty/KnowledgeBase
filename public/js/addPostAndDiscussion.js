async function addPost () {
    //await fetch('/addPost', intermediary)
}

async function addDiscussion () {
    //await fetch('/addDiscussion', intermediary)
}

async function searchByTopic () {
    //await fetch('/searchByTopic', document.getElementById("searchByTopicDropDown").value)
}

async function createDB () {
    console.log("inside addpnd.js createDB()")
    await fetch('/createDB');
    /*await fetch('addArtist', intermediary).then((data)=>{
        let artistTable = document.getElementById("artistTable");
        showArtist(artistTable, data[0].id, name, about, link);
    })*/
}

async function test () {
    await fetch('test');
}

/*
async function start () {
    console.log("Start")
    let response = await fetch('/getTopics').then(res => res.json()).then(function(data){
        console.log(data)
    }).catch( err => console.log(err));
    console.log("Finito")
}*/