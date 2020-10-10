const utilitiesID = "utilities",
      linesID = "lines",
      buttonsNavID = "buttonsNav",
      buttonsID = "buttons";
      buttons = new Buttons(buttonsNavID, buttonsID),
      sessions = new Sessions(linesID, buttonsID),
      utilities = new Utilities(utilitiesID, sessions, buttons);