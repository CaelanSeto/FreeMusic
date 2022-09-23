
function MIDIAccess() {

  //MIDI ACCESS + SOUND IN BROWSER
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  
  let ctx = new AudioContext();
  const startButton = document.getElementById('MIDIbutton');
  const oscillators = {};
  const noteOffOsc = {};
  
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
  
  // Checks if browser supports MIDI plugins in the first place
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
  
  let sustain = false;
  function handleInput(input) {
    // console.log(input);
    const command = input.data[0]; // MIDI for saying if note is on or off
    const note = input.data[1]; // MIDI which note if command is 144 or 128. If command is 176, note = 64 means the damper pedal is being used
    const velocity = input.data[2]; // MIDI note velocity if command is 144 or 128, if command is 176, velocity is damper pedal on(127)/off(0)
  
    switch (command) {
  
      case 144: // MIDI for noteOn
        if (velocity > 0) { // sometimes MIDI devices sets velocity to 0 on noteOff instead of changing the command to 128
          noteOn(note, velocity);
        } else {
          noteOff(note);
        }
        break;
      case 128: // MIDI for noteOff
        noteOff(note);
        break;
      // SUSTAIN PEDAL TO FIX
      case 176: // MIDI for various effects and functions
        if (note === 64) {// 64 === sustain pedal
          if (velocity === 127) {  // sustain pedal on
            sustain = true;
          } if (velocity === 0) {  // sustain pedal off
            sustain = false;
          }
        }
        break;
      default:
        break;
    }
  }
  
  /* DAMPER PEDAL FUNCTIONALITY TODO */
  function susOn() {
    // affects unpressed notes and noteOn
    // set fadeout to 15
  }
  
  function susOff() {
    // 
    // set fadeout to 2
    // if note is in 2nd array, fadeout for that note set to 2s as well
  }
  
  /* PLAYING NOTES FUNCTIONALITY */
  function noteOn(note, velocity) {
    // createOscillator function found in web midi API
    const osc = ctx.createOscillator();
  
    const oscGain = ctx.createGain();
    oscGain.gain.value = 0.3;
  
    const velocityGainAmount = (1 / 127) * velocity;  // velocity output by midi has a range from 0 to 127
    const velocityGain = ctx.createGain();
    velocityGain.gain.value = velocityGainAmount;
  
    // oscillator defaults to sine, but you can change it to to square, sawtooth, triangle, etc.
    osc.type = 'sine';
    osc.frequency.value = miditoFreq(note);
  
    //initial gain * velocity % ((0~127) / 127) * speaker volume
    osc.connect(oscGain);
    oscGain.connect(velocityGain);
    velocityGain.connect(ctx.destination); //ctx.destination is your speaker
  
    osc.gain = oscGain;
  
    // fade in over 0.015 seconds to avoid the 'click' sound at the beginning, time could be set longer for cool effects
    oscGain.gain.setValueAtTime(0.0000001, ctx.currentTime);
    oscGain.gain.exponentialRampToValueAtTime(oscGain.gain.value, ctx.currentTime + 0.015);
  
    // adds the note to an array to keep track of what is pressed and not
    oscillators[note.toString()] = osc;
    osc.start();
  }
  
  // stop the note after a 2 second delay for the fade out to function or 10 seconds if the sustain pedal is pressed
  async function noteDelayStop(osc, note) {
    if (!sustain) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      await new Promise(resolve => setTimeout(resolve, 10000));
    }
    delete noteOffOsc[note.toString()];
    osc.stop();
  }
  
  function noteOff(note) {
    const osc = oscillators[note.toString()];
    const oscGain = osc.gain;
  
    // fade out over 2 seconds to avoid the 'click' sound at the end, time could be set shorter or longer for interesting effects
    // You will need to change the time in noteDelayStop to match whatever you set it to as well
  
    oscGain.gain.setValueAtTime(oscGain.gain.value, ctx.currentTime);
    if (!sustain) {
      oscGain.gain.exponentialRampToValueAtTime(0.0000001, ctx.currentTime + 2);  //function will return an error if gain set to 0
    } else {
      oscGain.gain.exponentialRampToValueAtTime(0.0000001, ctx.currentTime + 10);
    }
  
  
    
    // adds note to second array
    noteOffOsc[note.toString()] = osc;
    // deletes note from firstarray
    delete oscillators[note.toString()];
    
    noteDelayStop(osc, note);
    
  }
  
  
  
  // checks and updates in real-time what MIDI devices are plugged in or not; can be used to select which MIDI device you want to use on client-side
  function updateDevices(event) {
    console.log(`Name: ${event.port.name}, Brand: ${event.port.manufacturer}, State: ${event.port.state}, Type: ${event.port.type}`)
  }
  
  function failure() {
    console.log("Could not run MIDI")
  }
}
export default MIDIAccess();