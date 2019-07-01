# hackDay
HackDay Project at &lt;/salt> 2 months into the course.

On Thursday 27th of June we had a Hackday during the course at </salt> where we were supposed to create something from scratch during a time-limit of 8 hours. I learned a lot from this day and also learned a lot about what I shouldn't do when creating a project from scratch. I did not initiate the project with a compiler which was a huge mistake that forced me to write all code in one file and this is not something I enjoy or will ever do again. This was a large project for one day considering only studying code for 2 months so I felt some pressure to finish everything in time and did not produce the code that I aspire to write in terms of style and functionality. However, I managed to deliver a game that works which I am super proud of managing to produce in only one day from scratch, especially since there is CPU-logic implemented so you play the game against the computer.

I created a Card Game called "Vänd-tian" in Sweden where the winner is the person who has no cards on his hand in the end. I managed to implement a majority of the rules but did not have time to fix following rules:
- If you can't play you get to "chance" before you pick up all cards
- If you have two cards of the same value on your hand you can't play both at once 
- If 4 cards is played of the same value the open cards should be "burnt"

You can read all the rules on following page:
https://www.spelregler.org/vandtia-regler/

Achievements:
- Managed to implement the gameplay from creating a deck that is being shuffled and dealt out to be able to play until there is a winner
- Worked with many different parts of programming and focused a lot of showing my capability to apply logic and find creative solutions
- Implemented a CPU-Player so that you can play against the computer which plays by certain rules and logic so that it should not be easy to beat
- Creating a project from nothing to a product that I could demo for the rest of the class on demo-day

Biggest lesson:
- Don't cut corners early on, take the extra time in the beginning to set up everything in the best environment will save you a lot of time along the process and I really regret not doing it this time

Known bugs:
- If you click on your cards during the CPU Players' turn things will not work as it should. I had full focus on implementing the gameplay and CPU-logic so I put a disregard on this but this can be easy fixed with toggle disable on the buttons during CPU/User turn. 

This is the code that I produced during these 8 hours that we had and unfortunately I didn't have time to refactored everything I wanted and haven't had the opporunity to optimize everything but I am proud over the product I managed to deliver on 8 hours after studying JavaScript for 2 months. I want to showcase the code produced during this HackDay and have therefore not touched the code after the HackDay to make it look better for this push. I know there is some refactoring and optimizing to be done and might be a future update but this is the code I finished with when HackDay was over.

Thanks for reading!
