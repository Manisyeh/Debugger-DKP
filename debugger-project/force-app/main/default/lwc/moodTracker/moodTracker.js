import { LightningElement } from 'lwc';

export default class MoodTracker extends LightningElement {
    selectedMood = '';
    selectedMessage = '';

    moods = [
        { label: 'Happy', emoji: '😊', message: 'Keep shining bright!' },
        { label: 'Sad', emoji: '😢', message: 'It’s okay to feel down. Brighter days are ahead.' },
        { label: 'Excited', emoji: '🤩', message: 'Ride the wave of excitement!' },
        { label: 'Stressed', emoji: '😫', message: 'Take a deep breath. You’re doing great.' },
        { label: 'Relaxed', emoji: '😌', message: 'Stay calm and enjoy the moment.' },
    ];

    connectedCallback() {
        const savedMood = localStorage.getItem('selectedMood');
        if (savedMood) {
            const mood = this.moods.find(m => m.label === savedMood);
            if (mood) {
                this.selectedMood = mood.label;
                this.selectedMessage = mood.message;
            }
        }
    }

    handleMoodClick(event) {
        const moodLabel = event.currentTarget.dataset.label;
        const mood = this.moods.find(m => m.label === moodLabel);

        if (mood) {
            this.selectedMood = mood.label;
            this.selectedMessage = mood.message;
            localStorage.setItem('selectedMood', mood.label);
        }
    }
}