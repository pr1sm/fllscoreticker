const fllscoreclient = window.fllscoreclient;

function getAnimationEvent(){
    const el = document.createElement("div");
    const animations = {
        animation : "animationiteration",
        OAnimation : "oAnimationiteration",
        MozAnimation : "animationiteration",
        WebkitAnimation : "webkitAnimationiteration"
    };

    // test each style for the appropriate event
    for(const key in animations) {
        if(el.style[key] !== undefined) {
            return animations[key];
        }
    }
}


window.onload = function() {
    const client = fllscoreclient.createWebClient(`http://${window.location.host}`);
    const ticker = document.getElementById('ticker');

    let scoreInfo = undefined;

    const updateContent = function(info) {
        info.teamInfo.forEach((team) => {
            let content = `${team.number} | ${team.name}`;
            if(team.highScore >= 0) {
                // content += ` | ${team.highScore}`;
                team.scores.forEach((score) => {
                    if(score >= 0) {
                        content += ` | ${score}`;
                    }
                });
            }

            let oldItem = document.getElementById(team.number.toString());
            let tickerItem = document.createElement('div');
            tickerItem.className = 'ticker__item';
            tickerItem.id = team.number.toString();
            tickerItem.innerText = content;
            if(oldItem !== null) {
                ticker.replaceChild(tickerItem, oldItem);
            } else {
                ticker.appendChild(tickerItem);
            }

        });
    };

    client.on('lastUpdate', (date) => {
        console.log(date);
    });

    client.once('scoreInfo', (info) => {
        ticker.classList.add('ticker');
        updateContent(info);
        ticker.addEventListener(getAnimationEvent(), () => {
            console.log('new animation');
            updateContent(scoreInfo);
        });
    });

    client.on('scoreInfo', (info) => {
        scoreInfo = info;
    });
};
