# tl;dr
* Force yourself to select commit email on GitHub PR merge forms.
* Don't trust me, or anyone adding JS code to GitHub. *Seriously! Read the code!*
* Chrome: https://www.google.cz/search?q=tampermonkey+chrome
* Firefox: https://www.google.cz/search?q=greasemonkey#q=greasemonkey+firefox
* https://github.com/radimklaska/github_force_email_select/raw/main/github_force_email_select.user.js

# What it does
* Modifies the "Commit email" dropdown on GitHub PR merge forms.
* Adds an empty placeholder option and makes selection required.
* Blocks the merge until you explicitly select an email address.
* Helps prevent accidental commits with the wrong email.

# Installation
* It's a small script running in your browser.
* You need something like Greasemonkey for Firefox ("Allows you to customize the way a web page displays or behaves, by using small bits of JavaScript.") to run the script. https://addons.mozilla.org/cs/firefox/addon/greasemonkey/
* There is Chrome alternative, Tampermonkey: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
* After installing the browser extension, install the script: http://wiki.greasespot.net/Greasemonkey_Manual:Installing_Scripts / http://tampermonkey.net/faq.php?ext=dhdg#Q102
* The script you need is here: https://github.com/radimklaska/github_force_email_select/raw/main/github_force_email_select.user.js Just visit the URL and Tamper/Grease monkey should catch it. Or do whatever their manual says. :)
