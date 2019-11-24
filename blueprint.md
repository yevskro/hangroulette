# BACK END

# FRONT END
2 pages
    First Page - Introductory Page
        A session textbox and a button that says "Saved Session"
            Sends the session id to the server and fatches the state of a game in session
            a -1 session of an id sends the game on to the second page with a default
                hangman word to guess.
        A button under that says "Start Game"
            Fetches the spaced out and underscored word to guess.
            Word to guess will not be saved on the client for security reasons.
        
    Second Page - Hangman Game Page
        A text msg "Session ID": with the session id.
        A text msg "Hanged #": and a label that shows the number of losses.
        A text msg "Broke Through#:" and a label that shows the number of wins.
        A picture of a hangman.
        Letters to guess will be displayed as underscores.
        Under will be a text "Take a deadly GUESS:"
        There will be letters of the alphabet under the word Guess. 
            The letters will act as buttons and will be disabled once used up as a guess.
        6 guesses allowed. 
        If the user loses a text will be displayed "HANGED!"
            And a "try again" button under neath.
            Try again refreshes the game loop.
            Sends a loss message to the server to record the loss
        If won a text "NO WAY ABLE TO BREAK THE ROPE!:o"
            and a "dare to be hanged again?!" 
            button that refreshes the game loop.
            Sends a win message to the server to record the win