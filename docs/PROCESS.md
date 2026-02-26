## Process of creating this exercise

## What did you build? Describe the feature in plain language.
I built a sign up/log in/log out page and another page that allows the user to change their email/password, profile image, and adding a display name.
## How did micro-iteration feel? Was working in small steps natural or frustrating? Why?
Working with micro-iterations was easy, it did not feel any different from what I have done previously. Working in small steps felt pretty natural, I did not think it was annoying or that I was doing things too slowly.
## What did self-review catch? When you asked the AI to review its own code, what issues did it find? Give at least one specific example.
Whenever I was not satisfied with an iteration, I would just tell claude what to change. Then the ai would change what i requested.
## Tool impressions. What did you like or dislike about [Copilot Agent / Claude Web]?
During this class I have used claude so far and have not had many issues. Sometimes it would create files outside of the directory that it is in, so I have been telling it what directory to create files in.
## Self-review patterns. Did the AI consistently catch certain types of issues during self-review (e.g., edge cases, missing error handling)? Did it ever miss something you caught yourself?
There were not many errors that the ai caught, there were just some things that the ai iterated that I wanted to change. For example whenever there was a wrong password, a pop-up would appear saying: "Firebase: The supplied auth credential is incorrect, malformed or has expired. (auth/invalid-credential)." I then told it to change it from saying that to saying "Wrong email" or "Wrong password," depending on what was incorrect. The ai then expalined and suggested something else:

 Firebase intentionally combines "wrong email" and "wrong password" into one error. If the site says "that email
  doesn't exist," an attacker can use that to scan for which emails have accounts. This is called user enumeration and
  is a recognized security risk.

  The better fix is to replace the raw Firebase message with a single friendly message that covers both cases:

  "Incorrect email or password. Please try again."

  That's honest, helpful to real users, and doesn't leak information to bad actors. Want me to make that change instead?
   Or if you'd still prefer separate messages (this is a class project and security isn't the priority), let me know and
   I'll do that too.

I chose for it so say "Incorrect email or password. Please try again."
## Browser tool vs. CLI comparison. If you’ve used Claude Code CLI or another terminal tool, how did the browser-based experience compare? What’s better/worse about each?
I have used both claude on the browser and the terminal. For the most part, both offer the same things and iterate whatever you request perfectly. The only limitation with claude web is that it cannot directly edit files or push things onto github. I will say that it is easier to edit your prompts on claude web directly instead of pasting a prompt in the terminal, you get to skip that extra step. Overall, I do prefer the claude terminal over the claude web. I would still use claude web if I needed something quickly and did not have the time to go into a specific directory to start working.
## When would you use micro-iteration + self-review? For what kinds of tasks does this workflow make sense? When would you skip it?
Using micro-iteration and self-review would be beneficial for larger or more complicated projects since there are many layers to them. If you are an experienced programmer then you may be able to skip the self-review and just look it over yourself, but if you want to save time then asking the ai to look over its work can also help.