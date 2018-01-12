const fllscoreclient = window.fllscoreclient;

window.onload = function() {
    const client = fllscoreclient.createWebClient(`http://${window.location.host}`);
    const ticker = document.getElementById('ticker');

    client.on('lastUpdate', (date) => {
        console.log(date);
    });

    client.once('scoreInfo', () => {
        ticker.className = 'ticker';
    });

    client.on('scoreInfo', (info) => {
        info.teamInfo.forEach((team) => {
            let content = `${team.number} | ${team.name}`;
            if(team.highScore >= 0) {
                content += ` | ${team.highScore}`;
                team.scores.forEach((score) => {
                    if(score >= 0) {
                        content += ` | ${score}`;
                    }
                });
            }

            let tickerItem = document.getElementById(team.number.toString());
            if (tickerItem === null) {
                tickerItem = document.createElement('div');
                tickerItem.className = 'ticker__item';
                tickerItem.id = team.number.toString();
                ticker.appendChild(tickerItem);
            }
            tickerItem.innerText = content;
        });
    });
};
