export const asArray = ({ goals }) => {
    return Object.keys(goals).map(key => goals[key])
}

const MOTIVATIONAL_MESSAGES = [
                            "\"Try again. Fail again. Fail better.\" ~ Samuel Beckett",
                            "\"Good things happen to those who hustle\" ~ Anais Nin",
                            "\"My 3 rules for creativity in life: 1) Always be tender. 2) Fear no one. 3) Carry a great bullshit detector.\" ~Laurie Anderson",
                            "\"I hope not. I expect not. I am free. \" ~Anonymously etched on base of The Acropolis",
                            "\"No pressure, no diamonds.\" ~Thomas Carlyle",
                            "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" ~Winston Churchill",
                            "\"It is better to fail in originality, than to succeed in imitation.\" ~Herman Melville",
                            "\"Wealth is not theirs who has it, but theirs who enjoys it.\" ~Ben Franklin",
                            "\"Today, do what others won’t so tomorrow you can accomplish what others can't.\" ~Simone Biles",
                            "\"No matter what life throws at you, or how unfair you think it is, never give up. Pick yourself up and go on.\" ~Megan Rapinoe",
                            "\"Be led by your talent, not by your self-loathing. Those other things, you'll have to manage.\" ~Russell Brand",
                            "\"Surround yourself with people who challenge you, teach you, and push you to be your best self.\" ~Bill Gates",
                            "\"Enthusiasm is one of the most powerful engines of success. When you do a thing, do it with all your might.\" ~Ralph Waldo Emerson",
                            "\"Your trials did not come to punish you, but to awaken you.\" ~Paramahansa Yogananda"
                        ];

export const getMotivationalMsg = () =>{
    const randomNumber = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    return MOTIVATIONAL_MESSAGES[randomNumber];
}