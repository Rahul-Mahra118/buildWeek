let api = null;

let startBtn = document.getElementById("start-Btn");
let micBtn = document.getElementById("mic-Btn");
let camBtn = document.getElementById("cam-Btn");
let screenBtn = document.getElementById("screen-Btn");
let leaveBtn = document.getElementById("leave-Btn");

startBtn.addEventListener("click", () => {
  if (api) {
    // removing the previous instance
    api.dispose();
  }
  const domain = "meet.jit.si";
  const options = {
    roomName: "RahulTestingRoom",
    width: "100%",
    height: 600,
    parentNode: document.querySelector("#video-container"),
    userInfo: {
      displayName: "Rahul",
    },
  };

  api = new JitsiMeetExternalAPI(domain, options);
  // New joined people
  api.addEventListener("participantJoined", (participant) => {
    const id = participant.id;
    const name = participant.displayName || `Participant (${id})`;
    const item = document.createElement("li");
    item.id = `user-${id}`;
    item.innerText = `${name} (joined)`;
    document.getElementById("joining-list").appendChild(item);
  });

  //when anyone leaves the meeting we can just alert it and remove it from the list of UI

  api.addEventListener("participantLeft", (participant) => {
    const name = participant.displayName || `Participant (${id})`;
    alert(`${name} has left the meeting`);
    const id = participant.id;
    const item = document.getElementById(`user-${id}`);
    if (item) item.remove();
  });
  // when someone mute or unmute themselve
  api.addEventListener("audioMuteStatusChanged", (e) => {
    const userId = e.id;
    const userElement = document.getElementById(`user-${userId}`);

    if (userElement) {
      const nameOnly = userElement.innerText.split(" (")[0];
      userElement.innerText = `${nameOnly} (${e.muted ? "Muted" : "Unmuted"})`;
    }
  });
});
