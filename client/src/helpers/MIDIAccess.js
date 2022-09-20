//MIDI ACCESS + SOUND IN BROWSER
window.AudioContext = window.AudioContext || window.webkitAudioContext;

let ctx = new AudioContext();
const startButton = document.getElementById('MIDIbutton');
const oscillators = {};

if (startButton) {
  startButton.addEventListener('click', () => {
    ctx = new AudioContext();
    console.log(ctx);
  })
}

function miditoFreq(number) {
  const a = 440;
  return (a / 32) * (2 ** ((number - 9) / 12));
}

if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
  midiAccess.onstatechange = updateDevices;

  const inputs = midiAccess.inputs;

  inputs.forEach((input) => {
    input.addEventListener('midimessage', handleInput);
  })
}

function handleInput(input) {
  const command = input.data[0];
  const note = input.data[1];
  const velocity = input.data[2];
  
  switch (command) {
    case 144: // noteOn
    if (velocity > 0) {
      noteOn(note, velocity);
    } else {
      noteOff(note);
    }
    break;
    case 128: // noteOff
    noteOff(note);
    break;
    default:
    break;
  }
}

function noteOn(note, velocity) {
  const osc = ctx.createOscillator();

  const oscGain = ctx.createGain();
  oscGain.gain.value = 0.3;

  const velocityGainAmount = (1/127) * velocity;
  const velocityGain = ctx.createGain();
  velocityGain.gain.value = velocityGainAmount;

  osc.type = 'sine';
  osc.frequency.value = miditoFreq(note);
  
  osc.connect(oscGain);
  oscGain.connect(velocityGain);
  velocityGain.connect(ctx.destination); //ctx.destination is your speaker
  
  osc.gain = oscGain;
  oscillators[note.toString()] = osc;
  osc.start();
}

function noteOff(note) {
  const osc = oscillators[note.toString()];
  const oscGain = osc.gain;
  oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime);
  oscGain.gain.exponentialRampToValueAtTime(0.0000001, ctx.currentTime + 2);

  

  delete oscillators[note.toString()];
}

function updateDevices(event) {
  console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`)
}

function failure() {
  console.log("Could not run MIDI")
}