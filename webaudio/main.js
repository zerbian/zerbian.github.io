const TUNING = 440.0;

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();


const sinOsc = audioCtx.createOscillator();
sinOsc.frequency.value = midi2freq(72);
sinOsc.type = "sine";
sinOsc.connect(audioCtx.destination);

class Note {
    constructor() {
        this.value = 69;
    }

    get frequency() {
        return Math.pow(2,(value - 69)/12) * 440.0;
    }

    transposeSemi(amount) {
        this.value = Math.min(127, Math.max(0, this.value + amount));
        return this;
    }

    transposeOctave(amount) {
        return this.transposeSemi(12 * amount);
    }
}

function start() {
    sinOsc.frequency = midi2freq(72);
    sinOsc.start();
}

function stop() {
    sinOsc.stop();
}

function midi2freq(noteNumber) {
    return Math.pow(2,(noteNumber - 69)/12) * TUNING;
}

function quantise(noteNumber,pattern) {

} 

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function newNote() {
    sinOsc.frequency.value = midi2freq(random(40,80));
}
