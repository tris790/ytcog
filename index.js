// ytcog - innertube library - main module
// (c) 2021 gatecrasher777
// https://github.com/gatecrasher777/ytcog
// MIT Licenced

const Session = require('./session');
const Player = require('./player');
const Search = require('./search');
const Channel = require('./channel');
const Video = require('./video');
const ut = require('./ut')();

// exclude these fields in the info request
const exclusions = ['type','userAgent','status','transferred','options',
    'expiry','audioStreams','videoStreams','storyBoards','formats','cancelled'];

// quick download object - no persistence required
class Download {

    // constructor requires options {id[,cookie,userAgent,path,filename,container,videoQuality,audioQuality,mediaBitrate]}
    constructor(options) {
        this.session = new Session(options.cookie,options.userAgent);
        this.video = null;
        this.options = options;
    }

    // fetch the media, report the results
    async fetch() {
        await this.session.fetch();
        if (this.session.status=='OK') {
            this.video = new Video(this.session,this.options);
            await this.video.fetch();
            if (this.video.status=='OK') {
                console.log(ut.jsp(this.video.info(exclusions)));
                await this.video.download();
                if (this.video.downloaded) {
                    console.log('\n\nDone!');
                    console.log(`Downloaded: ${this.video.fn}`);
                } else {
                    console.log(`Video status: ${this.video.status} (${this.video.reason})`);
                }
            } else {
                console.log(`Video status: ${this.video.status} (${this.video.reason})`);
            }
        } else {
            console.log(`Session status: ${this.session.status} (${this.session.reason})`);
        }
    }
}

//encapsulate the object classes
const ytcog = {
    Session : Session,
    Player : Player,
    Search: Search,
    Channel: Channel,
    Video: Video,
    Download: Download,
    dl: async (options) => {
        let download = new Download(options);
        await download.fetch();
    }
}

module.exports = ytcog;