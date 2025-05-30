import { LightningElement } from 'lwc';

export default class MoodTracker2 extends LightningElement {
    selectedMood="";
    selectedMessage="";

    Moods = [
        {label: 'Happy', emoji: '😊', message: 'Keep shining bright!'},
        {label: 'Sad', emoji: '😢', message: 'It’s okay to feel down. Brighter days are ahead.'},
        {label: 'Excited', emoji: '🤩', message: 'Ride the wave of excitement!'},
        {label: 'Stressed', emoji: '😫', message: 'Take a deep breath. You’re doing great.'},
        {label: 'Relaxed', emoji: '😌', message: 'Stay calm and enjoy the moment.'},
    ];

    handleMoodClick(event) {
        this.selectedMood = event.target.name;
        this.selectedMessage = event.target.message;
    }
}