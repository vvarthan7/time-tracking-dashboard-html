(function() {
  function profileActivity(data, timeframe) {
    element = document.querySelector('.profile-activity-wrapper');
    for(let i = 0; i < data.length; i++) {
      let title = data[i].title, time = data[i].timeframes,
      currentTime = time[timeframe].current,
      previousTime = time[timeframe].previous;
      timeframe == 'daily' ? previousPeriod = 'Yesterday' : timeframe == 'monthly' ? previousPeriod = 'Last Month' : previousPeriod = 'Last Week';
      element.innerHTML += `<div class="profile-${title.replace(/\s+/g, '').toLowerCase()} profile-activity active">
        <div class="profile-activity-banner"></div>
        <div class="profile-activity-item">
          <h4>${title}</h4>
          <img src="./images/icon-ellipsis.svg" alt="ellipsis"/>
          <h2>${currentTime}hrs</h2>
          <p>${previousPeriod} - ${previousTime}hrs</p>
        </div>
      </div>`;
    }
  }
  fetch("./data.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    profileActivity(data, 'weekly');
    let profileTimeline = document.querySelectorAll('.profile-timeline h3');
    profileTimeline.forEach(function(item) {
      item.addEventListener('click', function() {
        profileTimeline.forEach(function(item) {
          item.classList.remove('active');
        });
        item.classList.add('active');
        element = document.querySelector('.profile-activity-wrapper');
        element.innerHTML = '';
        profileActivity(data, item.innerHTML.toLowerCase());
      }, false);
    })
  });
})();