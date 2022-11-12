# Killing Floor 2 achievement tracker and visualizer

## How to use

1. Open browser
2. Go to your Killing Floor 2 achievements page
3. Open browser's console
4. Copy achievement file's content to browsers console
5. Write `getAllData()` to browser's console and input player name
6. The console should get a new row after that. Right click it and select "copy object"
7. Create new file to the data directory named all.js
8. Paste your content like this
```
const dataCollection = [
<------ paste your content here
];
```
9. Now you can double click the index.html and your data should be visible.
