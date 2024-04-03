HTML/CSS
-make container
-pipes
-bird

Pseudocode & Objects
is a simpler version of a progamming code in plain English before it is implemented in a specific programming language

callbacks
-if bird flys out of screen or collide means gameeover

Concept
"A simple game about a fish that swims through obstacles and for each obstacle that it passes, it's awarded a +1 point.
When you tap, the object of control goes up, when you don't do anything – it falls to the ground due to the gravity.  Test your limits and beat your high score!"

How To Play

Classes provide a cleaner and elegant syntax for adding methods

Flappy Bird introduction
Flappy Bird game logic
Setting up our project
Writing our start game logic
Making our bird jump
Hooking up our keyboard keys
Generate a pipe
Generate new obstacles using setInterval() and setTimeout()
Write our game over logic
We learn how to add images to our project
We expand our collision rules using && and ||

The setTimeout method is used to execute the callback after a specified time (in this case, 3 seconds). The callback will be executed asynchronously, which means that the program will continue to execute the next line of code without waiting for the timeout to complete.

a simple game where a pipe moves horizontally across the screen, and the player (controlled by the variable birdBottom) has to avoid colliding with it.

movePipe() function:

Decrements the pipeLeft variable by 2 units each time it's called, effectively moving the pipe to the left.
Updates the left style property of the pipe element to move it visually on the screen.
Checks if the pipe has reached the left boundary (pipeLeft === -60). If it has, it clears the interval timer (timerId) and removes the pipe element from the game display.

Checks for collision:
Checks if the bird is within a specific range horizontally (pipeLeft > 200 && pipeLeft < 280) and vertically (birdBottom < pipeBottom + 10) relative to the pipe's position.
Additionally, it checks if the bird has reached the top and bottom of the screen
If any of these conditions are met, it calls the gameOver() function and clears the interval timer.
timerId is set to repeatedly call the movePipe() function every 20 milliseconds.

After 3 seconds (setTimeout(generatePipe, 3000)), it generates a new pipe by calling the generatePipe() function.
