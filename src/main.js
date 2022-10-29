/* global dataCollection maps */

// TODO: Pivot table so the least marks is first and most is last
// TODO: Sort rows based on how many marks they have
// TODO: Make buttons that can change what is visible
(function main() {
  const title = document.getElementById('dataKey');
  const thead = document.querySelector('thead tr');
  const tbody = document.querySelector('tbody');

  const fillTable = (mode, difficulty) => {
    function newCol({ text = '', element = 'TD' }) {
      const col = document.createElement(element);
      col.innerText = text;
      return col;
    }

    maps.forEach((map) => {
      const newRow = document.createElement('TR');

      newRow.appendChild(newCol({ text: map }));
      dataCollection.forEach(() => newRow.appendChild(newCol({})));

      let markCount = 0;

      dataCollection.forEach((data, index) => {
        const datalist = mode === 'collectibles' ? data.achievements[mode] : data.achievements[mode][difficulty]
        if (!datalist.includes(map)) return;
        markCount++;
        newRow.children[index + 1].innerText = 'x';
      });

      if (markCount > 0) {
        tbody.appendChild(newRow);
      }
    });

    thead.appendChild(newCol({ text: 'map', element: 'TH' }));

    dataCollection.forEach((data) => {
      thead.appendChild(newCol({ text: data.name, element: 'TH' }));
    });
  };

  document.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', (event) => {
      const mode = event.currentTarget.dataset.mode;
      const difficulty = mode === 'collectibles' ? '' : event.currentTarget.dataset.difficulty;
      title.innerText = `${mode} ${difficulty}`;
      title.classList.add('capitalize');
      thead.innerHTML = '';
      tbody.innerHTML = '';
      fillTable(mode, difficulty);
    });
  });

  if (dataCollection.length === 0) {
    let message = 'Missing data.\n\n';
    message += 'Have you put any playername1.js to the data directory?\n\n';
    message += 'Have you added the \n<script type="text/javascript" src="data/playername1.js"></script>\n tags to the index.html?\n\n';
    message += '(Also make sure that the tag has the same "data/playername1.js" filename that is in the data directory.)';
    alert(message);
  }
}());
