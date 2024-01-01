
const form=document.getElementById("chatt");
const input=document.querySelector('input[type="text"]');
const fileInput=document.querySelector('input[type="file"]');
const vartalabh=document.getElementById("mess");













//let userName;
const socket= io()
let banda;

if (localStorage.getItem('bandanam')) {
    banda = localStorage.getItem('bandanam');
    socket.emit("bandanam", banda, (ack) => {
        if (ack.error) {
            // Handle the error, e.g., prompt the user to enter a new name
            const userName = prompt('Please enter your name:');
            if (userName) {
                socket.emit("bandanam", userName, (ack) => {
                    if (ack.error) {
                        console.error('Error setting bandanam:', ack.error);
                        // Handle the error appropriately
                    } else {
                        localStorage.setItem("bandanam", userName);
                    }
                });
            } else {
                // Handle the case where the user did not enter a new name
            }
        }
    });
} else {
    const userName = prompt('Please enter your name:');
    if (userName) {
        socket.emit("bandanam", userName, (ack) => {
            if (ack.error) {
                console.error('Error setting bandanam:', ack.error);
                // Handle the error appropriately
            } else {
                localStorage.setItem("bandanam", userName);
            }
        });
    } else {
        // Handle the case where the user did not enter a name
    }
}


function scrollToBottom() {
    // Select the element you want to scroll to the bottom
    const chatContainer = document.getElementById('mess'); // Change 'mess' to the actual ID of your chat container

    // Set the scroll position to the bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;
}



socket.on('join_vala_functio', (londa)=>
{
    console.log(londa)
   const ll= document.createElement('li')
   let vartalabh=document.getElementById('mess');
   ll.innerHTML= `<span> ${londa} </span> : has joinde`

   vartalabh.appendChild(ll)

  scrollToBottom()
  



})


socket.on('user_left_zala', (londa)=>
{
    console.log(londa)
   const ll= document.createElement('li')
   let vartalabh=document.getElementById('mess');
   ll.innerHTML= `<span> ${londa} </span> : has lefte`

   vartalabh.appendChild(ll)

  scrollToBottom()
  



})




socket.on('image_and_chat', (me)=>
{
    
   const ll= document.createElement('li')
  
   ll.innerHTML= `<span> ${me.nam} </span> : message   <span> ${me.kam} </span> : content`;


if(me.photo){
    const imgContainer = document.createElement("div");
    const img = document.createElement("img");
    img.src = me.photo;
    img.style.width = "55px";
    img.style.height = "55px";
    imgContainer.appendChild(img);
    ll.appendChild(imgContainer);
}



   vartalabh.appendChild(ll)

  scrollToBottom()
  



})



form.addEventListener('submit',(e)=>{
    e.preventDefault();


    const reader= new FileReader()
    const file = fileInput.files[0]


    if(!file && !input.value)
    {
        alert("Plase enter messahe");
        return;
    }

    if(file){
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            socket.emit("image_and_chat", {
                nam:banda,
                kam: input.value,
                photo:reader.result
            })

            input.value="";
            fileInput.value="";
        }
    }

    else{
        socket.emit("image_and_chat", {
            nam:banda,
            kam: input.value,
            photo:null
        })

        input.value="";

    }
})








socket.on('load messages', (messages) => {
    const messageList = document.getElementById("mess");

    messages.forEach((me) => {
        const ll = document.createElement('li');
        ll.innerHTML = `<span>${me.nam}</span>: message <span>${me.kam}</span>: content`;

        if (me.photo) {
            const img = document.createElement("img");
            img.src = me.photo;
            ll.appendChild(img);
        }

        messageList.appendChild(ll);
    });

    scrollToBottom();
});


