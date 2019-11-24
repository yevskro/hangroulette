# HANGMAN
    1. For scalability there will be a hangman server class and a hangman client class. Both with
    differ slightly to the protect the game from "hacks".
    2. The backend server will handle the request and the hangmanServer object that is created from the request will handle the game logic.
    3. The client side hangmanClient object will handle the requests and changing of the front end.

# BACK END
## DATABASE - POSTGRESQL
    1. Session Table - (session id, wins, losses, current word at guess, letters guessed)
    2. A Session Model will include current word at guess and letters guessed that will be
    used to initiate a HangmanServer object that will play out the game logic.

## ROUTES 
        Intro Page(-> Hangman GamePage)
        Hangman GamePage

## API LOGIC
    the word to guess is never shared to the client until the game reaches the end

    Get hangman_session responds with sessions info (id, wins, losses, letters guessed)
        edgecase a session id that doesn't exist reponds with "session not found"

    Get hangman_new creates a new session and responds with the session info with default values

    Post guess
        When a client sends a guess the server responds with a loss, keepplaying, won, gameover
            edgecase if a client sends another guess after allowed guesses, respond "error"
            edgecase a client sends a guess when no game is in play, respond "error"

# FRONT END
    1. First Page - Introductory Page
        A session textbox and a button that says "Saved Session"
            Sends the session id to the server and fatches the state of a game in session
            a -1 session of an id sends the game on to the second page with a default
                hangman word to guess.
        A button under that says "Start Game"
            Fetches the spaced out and underscored word to guess.
            Word to guess will not be saved on the client for security reasons.
        
    2. Second Page - Hangman Game Page
        A text msg "Session ID": with the session id.
        A text msg "Hanged #": and a label that shows the number of losses.
        A text msg "Broke Through#:" and a label that shows the number of wins.
        A picture of a hangman.
        Letters to guess will be displayed as underscores.
        Under will be a text "Take a deadly GUESS:"
        There will be letters of the alphabet under the word Guess. 
            The letters will act as buttons and will be disabled once used up as a guess.
        6 guesses allowed. 
        There will be a session object that will hold the wins, losses, id, and a
        HangmanClient object that will handle gamelogic with requests and changing of
        the hangman elements.
        
        If the user loses a text will be displayed "HANGED!"
            And a "try again" button under neath.
            Try again refreshes the game loop.
            Recv's a loss message from the server, with the revieled word
            All guessable letters are disabled.
            Word is shown.
        If won a text "NO WAY ABLE TO BREAK THE ROPE!:o"
            and a "dare to be hanged again?!" 
            button that refreshes the game loop.
            Recvs a win message from the server 
            All guessable letters are disabled