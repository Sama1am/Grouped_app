const socket = io();
const baseUrl = window.location.href.split('/').slice(0, 3).join('/');
const joinBtn = document.getElementById("joinBtn");
const idInput = document.getElementById("join input");
let sessionInput = ''
let allSessions 


joinBtn.addEventListener("click",function(){
    sessionInput = idInput.value; 
    console.log("INPUT WAS: " + sessionInput);
    checkSessionId(sessionInput);
});


function joinSession(sessionCode)
{
    socket.emit('joinRoom', sessionCode);
    window.location.href = '/dashboard?sessionCode=' + sessionCode;
}

const checkSessionId = async (code) => {
    const url = `${baseUrl}/join/checkSession`;
    const postData = {
        code: code,
    };
    console.log(postData);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    };

    try {
        const response = await fetch(url, requestOptions);
        console.log(response);

        // Now you can work with responseData directly
        if (response.status === 200) {
            // Session exists and is active
            console.log("Session exists and is active.");
            joinSession(sessionInput);
        } else if (response.status === 404) {
            // Session does not exist or is not active
            console.log("Session does not exist or is not active.");
            alert("Something went wrong!");
        } else if(response.status === 500){
            // Handle unexpected response
            console.log("Unexpected response from the server.");
        }
    }
    catch(e)
    {
        console.log("an error occurred: " + e);
    }

    // const data =  await fetch(url, requestOptions)
    // console.log( await data.json());
}
