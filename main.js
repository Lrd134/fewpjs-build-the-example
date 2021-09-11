// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
const errorDiv = document.getElementById("modal");
const likeBtns = document.getElementsByClassName("like-glyph");

const addHiddenClassToErrorDiv = () => {
  errorDiv.classList.add("hidden");
}

const removeHiddenClassFromErrorDiv = () => {
  errorDiv.classList.remove("hidden");
  setTimeout(addHiddenClassToErrorDiv, 3000);
}

const handleError = (error) => {
  errorDiv.children[1].innerText = error;
  removeHiddenClassFromErrorDiv();
}


for (let i = 0; i < likeBtns.length; i++) {
  likeBtns[i].addEventListener('click', () => {
    const target = event.currentTarget;
    let promise = mimicServerCall("http://mimicServer.example.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"      
      }
    }).then(resp => {
    if (target.innerText === FULL_HEART)
    {
      target.innerText = EMPTY_HEART;
      target.classList.remove("activated-heart");
    }
    else if (target.innerText === EMPTY_HEART)
    {
      target.innerText = FULL_HEART;
      target.classList.add("activated-heart");
    }
    }).catch(error => {
      handleError(error);
    })
  });
}
handleError();
//finish error handling

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

addHiddenClassToErrorDiv();