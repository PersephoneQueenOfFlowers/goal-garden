export const asArray = ({ goals }) => {
    return Object.keys(goals).map(key => goals[key])
}

const MOTIVATIONAL_MESSAGES = [
                            "Life is short, nobody knows when it will be their time to leave it, so live fully every moment and do not let sadness overshadow your mind.",
                            "You must never give up; the goals you have will be your motivation to fight until the end.",
                            "Dreaming does not cost anything, but making dreams come true requires a lot of time, dedication and perseverance. What are you waiting for to accomplish yours?",
                            "The first step to being successful is to believe you are. In your thoughts you must visualize where you want to go and you will be there.",
                            "The challenges we face every day help us increase our strength and give us the drive we need so we don’t give up.",
                            "Success is on top so the road is hard, you can slip and fall off, but if you keep an eye on the goal you will never stop.",
                            "If you mess do not blame yourself, no one is free to do so. But you have to be careful not to repeat it.",
                            "Even dreams that seem impossible can be accomplished; you just have to trust yourself and never get tired of fighting.",
                            "The taste of victory is even sweeter if others said you would not be able to do it. Always move forward and never stop.",
                            "If you do not fight the battle of life, you will never be a winner. Come on! Fear nothing and go out and conquer your dreams.",
                            "Falls let us know how far we had gone, get up and continue traveling the long road to success.",
                        ];

export const getMotivationalMsg = () =>{
    const randomNumber = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    return MOTIVATIONAL_MESSAGES[randomNumber];
}