// ytcog - innertube library - example to test session & player classes
// (c) 2021 gatecrasher777
// https://github.com/gatecrasher777/ytcog
// MIT Licenced

const ytcog = require('../lib/index');
const ut = require('../lib/ut')();
const fs = require('fs');

//User editable data:
let app = {
    cookie: '',
    userAgent: '',
    test_sig: 'bAOWAOq0QJ8wRgIhAKPhqgv5y77wjGkFy9QyrYFFXWwNTA7AyqFeQ2M_0BJyAiEA4vTHJI2yQZUGioAU3qf3RG5q1GhsEFRfpgoNtwhDoEw=',
    test_n: 'y6g6RU6jf9yMgk4GXDe'
}

async function run() {
    let session = new ytcog.Session(app.cookie,app.userAgent);
    await session.fetch();
    console.log(`Session status: ${session.status} (${session.reason})`);
    if (session.status == 'OK') {
        console.log(`\nSession key: ${session.key}`);
        console.log(`Visitor id: ${session.context.client.visitorData}`);
        console.log(`Signature timestamp: ${session.sts}`);
        if (session.loggedIn) {
            console.log('\nYour are logged into YouTube. Enjoy.');
        } else {
            console.log('\nYou are not logged into YouTube. As a consequence: \nSome downloads in ytcog may not work \nYou may experience rate limiting and age-restrictions.');
        }
        console.log('\nConvert n example:');
        console.log(app.test_n);
        console.log(session.player.ncodeFn(app.test_n));
        console.log('\nConvert sig example:');
        stest = 'bAOWAOq0QJ8wRgIhAKPhqgv5y77wjGkFy9QyrYFFXWwNTA7AyqFeQ2M_0BJyAiEA4vTHJI2yQZUGioAU3qf3RG5q1GhsEFRfpgoNtwhDoEw=';
        console.log(app.test_sig);
        console.log(session.player.decipherFn(app.test_sig));
        console.log('\nCreate sapisid hash example:');
        console.log(session.player.idhashFn(session.sapisid));
        console.log('\nSession info saved to ./examples/session_info.json');
        fs.writeFileSync('./examples/session_info.json',ut.jsp(session.info()),'utf8');
        console.log('Session json saved to ./examples/session.json');
        fs.writeFileSync('./examples/session.json',ut.jsp(session.data),'utf8');
        console.log('Player js saved to ./examples/player.js');
        fs.writeFileSync('./examples/player.js',session.player.data,'utf8');
    }
}

if (process.argv.length==2) {
    run();
} else {
    console.log('usage: >node examples/session_test');
}
