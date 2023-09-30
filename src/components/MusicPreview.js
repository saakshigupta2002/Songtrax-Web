
import React, { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import MusicSpinner from './animations/MusicSpinner';

const MusicPreview = ({ instrumentName, musicData, transport, onPlaybackChange }) => {
    // State to control playback
    Tone.start();
    const [isPlaying, setIsPlaying] = useState(false);
    const [noteDuration, setNoteDuration] = useState('4n')
    const [startTime, setStartTime] = useState(0.5)

    const instrument = useRef(null); // Use useRef to store the instrument
    const sequenceRef = useRef(null)

    // create sampler instance
    const createSampler = () => {
        switch (instrumentName) {
            case 'piano':
                instrument.current = new Tone.Sampler({
                    C4: '/assets/piano/C4.mp3',
                    D4: '/assets/piano/D4.mp3',
                    E4: '/assets/piano/E4.mp3',
                    F4: '/assets/piano/F4.mp3',
                    G4: '/assets/piano/G4.mp3',
                    A4: '/assets/piano/A4.mp3',
                    B4: '/assets/piano/B4.mp3',
                }).toDestination();
                setNoteDuration('4n')
                setStartTime(0.5)

                return
            case 'guitar':
                instrument.current = new Tone.Sampler({
                    C4: '/assets/guitar/C4.mp3',
                    D4: '/assets/guitar/D4.mp3',
                    E4: '/assets/guitar/E4.mp3',
                    F4: '/assets/guitar/F4.mp3',
                    G4: '/assets/guitar/G4.mp3',
                    A4: '/assets/guitar/A4.mp3',
                    B4: '/assets/guitar/B4.mp3',
                }).toDestination();
                setNoteDuration('4n')
                setStartTime(0.5)

                return
            case 'violin':
                instrument.current = new Tone.Sampler({
                    C4: '/assets/violin/C4.mp3',
                    D4: '/assets/violin/C4.mp3',
                    E4: '/assets/violin/E4.mp3',
                    F4: '/assets/violin/E4.mp3',
                    G4: '/assets/violin/G4.mp3',
                    A4: '/assets/violin/A4.mp3',
                    B4: '/assets/violin/A5.mp3',
                }).toDestination();
                setNoteDuration('2n')
                setStartTime(1)

                return
            case 'drums':
                instrument.current = new Tone.Sampler({
                    C4: '/assets/drums/C4.mp3',
                    D4: '/assets/drums/D4.mp3',
                    E4: '/assets/drums/E4.mp3',
                    F4: '/assets/drums/F4.mp3',
                    G4: '/assets/drums/G4.mp3',
                    A4: '/assets/drums/A4.mp3',
                    B4: '/assets/drums/B4.mp3',
                }).toDestination();
                setNoteDuration('8n')
                setStartTime(0.25)

                return
            default:
                // Default to a PolySynth if instrumentName is unrecognized
                instrument.current = new Tone.Sampler({
                    C4: '/assets/piano/C4.mp3',
                    D4: '/assets/piano/D4.mp3',
                    E4: '/assets/piano/E4.mp3',
                    F4: '/assets/piano/F4.mp3',
                    G4: '/assets/piano/G4.mp3',
                    A4: '/assets/piano/A4.mp3',
                    B4: '/assets/piano/B4.mp3',
                }).toDestination();
                return
        }
    }


    useEffect(() => {
        createSampler()

        return () => {
            transport.off('stop');
        };
    }, [instrumentName]);

    const togglePlayback = async () => {
        if (transport.state === 'started') {
            // If the central transport is playing, stop it
            if (sequenceRef.current) {
                sequenceRef.current.stop();
                sequenceRef.current = null
            }
            transport.stop();
            onPlaybackChange(false);
            setIsPlaying(false)
        } else {
            Tone.loaded().then(() => {

                setIsPlaying(true)

                transport.start();
                onPlaybackChange(true);
                playMusic();
            })
        }
    };

    // Function to play the music
    const playMusic = () => {
        const notesSequence = [];

        musicData.forEach((noteData, index) => {
            const noteName = Object.keys(noteData)[0];
            const noteArray = noteData[noteName];

            noteArray.forEach((isNoteOn, time) => {
                if (isNoteOn) {
                    const note = noteName + '4'; // Assuming all notes are in the 4th octave
                    notesSequence.push({
                        time: `+${time * startTime}`,
                        note,
                        duration: noteDuration,
                    });
                }
            });
        });
        const sequence = new Tone.Part((time, event) => {
            instrument.current.triggerAttackRelease(event.note, event.duration, time);
        }, notesSequence);
        // if (!sequence.current)
        sequenceRef.current = sequence
        sequence.start()
        const totalDuration = notesSequence.reduce((duration, event) => {
            return Math.max(duration, parseFloat(event.time) + parseFloat(event.duration));
        }, 0);

        // Schedule a callback to stop the transport after the sequence finishes
        transport.scheduleOnce(() => {
            if (sequenceRef.current) {
                sequenceRef.current.stop()
                sequenceRef.current = null
            }
            transport.stop();
            setIsPlaying(false);
            onPlaybackChange(false);
        }, `+${totalDuration}`);


    };


    return (
        <>
        {/* {
isPlaying &&
        <MusicSpinner />
        } */}
        <button onClick={(e)=>{e.preventDefault();togglePlayback()}} className={isPlaying ? "dark-button" : "bright-button"}>
            {isPlaying ? 'Stop Previewing' : 'Preview'}
        </button>
        </>
    );
};

export default MusicPreview;
