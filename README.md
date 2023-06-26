# Killing Floor 2 achievement tracker and visualizer

## How to use

### First time usage
1. Copy profile-ids.js.tpl and rename it to profile-ids.js
2. Edit the file so players part of the code has all the players names and profile IDs
3. Open browser
4. Go to your Killing Floor 2 achievements page
5. Open browser's console
6. Copy profile-ids.js content to the browser's console
7. The console should have as many rows after the copied code as there are players listed in the code. Right click on the last one and select "copy object"
8. Create new file to the data directory named all.js
9. Paste your content like this
```
const dataCollection = <------ paste your content here
```
11. Now you can double click the index.html and your data should be visible.

### Normal use, if the cookie has not expired
1. Open browser
2. Go to your Killing Floor 2 achievements page
3. Open browser's console
4. Copy profile-ids.js content to the browser's console
5. The console should have as many rows after the copied code as there are players listed in the code. Right click on the last one and select "copy object"
6. Paste your content like this
```
const dataCollection = <------ paste your content here
```
7. Now you can double click the index.html and your data should be visible.
