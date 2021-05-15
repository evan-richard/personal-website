import { TravelStory } from '@landing/models';

export const TRAVEL_STORIES: { [topic: string]: TravelStory} = {
    snowboarding: {
        text: [
            'Between finals, I left Sweden to spend time studying (snowboarding) in Italy. I flew into Venice, from which I would take a bus to the Italian Alps.',
            'I wrote down the bus schedule. In my notes I wrote "Flixbus - Venice Airport - 6:00". I waited three hours at the bus station, when finally a man informed me that my bus had left two hours ago from the "Venice Airport Train Station".',
            'Coincidentally, the man had rented out a private bus for his travel group AND was staying in a hotel just a couple blocks from mine. His travel group (very reluctantly) agreed to let me mooch a ride.'
        ],
        image: 'assets/images/alps.png',
        imageAlt: 'Italian Alps',
        location: 'Cortina d’Ampezzo, Italy'
    },
    sweden: {
        text: [
            'Test paragraph'
        ],
        image: 'assets/images/lund.jpg',
        imageAlt: 'Sweden',
        location: 'Lund, Sweden'
    }
}