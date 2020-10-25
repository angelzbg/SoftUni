const solve = (currentStop = 'Depot', nextStop = 'Depot') => {
  const info = document.querySelector('#info > span');
  const [departBtn, arriveBtn] = document.querySelectorAll('#controls input');

  const toggle = (d = true, a = true) => ([departBtn.disabled, arriveBtn.disabled] = [d, a]);

  const fetchData = (isDeparting = false) => {
    fetch(`http://localhost:8000/schedule/${encodeURIComponent(nextStop.toLowerCase())}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.statusText);
      })
      .then(({ name, next }) => {
        info.textContent = `${isDeparting ? 'Next stop' : 'Arriving at'} ${currentStop}`;
        [currentStop, nextStop] = [isDeparting ? currentStop : name, next];
      })
      .catch(() => {
        info.textContent = 'Error';
        toggle();
      });
  };

  const depart = () => {
    toggle(true, false);
    fetchData(true);
  };

  const arrive = () => {
    toggle(false);
    fetchData();
  };

  return { depart, arrive };
};

var result = solve();
