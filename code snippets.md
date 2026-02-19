?///////////////auto-complete////////////////
import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/auto-complete/',
params: {
q: 'desp',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

////////////////////////Home//////////////////////////
import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/home/',
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

//////////////////////////// channel/details ////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/details/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

/////////////////////////// v2/channel-details ////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/v2/channel-details',
params: {
channel_id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
hl: 'en'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

/////////////////////////////// channel/videos/ /////////////////////////
import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/videos/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
filter: 'videos_latest',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

////////////////////////////////////////// channel/videos/ POST /////////////////////////

import axios from 'axios';

const options = {
method: 'POST',
url: 'https://youtube138.p.rapidapi.com/channel/videos/',
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com',
'Content-Type': 'application/json'
},
data: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
filter: 'videos_latest',
cursor: '',
hl: 'en',
gl: 'US'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

/////////////////////////////////// channel/playlists/ /////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/playlists/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

///////////////////////////// channel/community/ /////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/community/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}
/////////////////////////////////// channel/channels/ //////////////////////////////////
import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/channels/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}
///////////////////////////// channel/search/ //////////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/channel/search/',
params: {
id: 'UCJ5v_MCY6GNUBTO8-D3XoAg',
q: 'john cena',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

****\*\*****\*\*\*\*****\*\*****\*\*\*\*****\*\*****\*\*\*\*****\*\***** video **\*\*\*\***\*\*\*\***\*\*\*\***\***\*\*\*\***\*\*\*\***\*\*\*\***

///////////////////////////////////// video/details /////////////////////////////////////////
import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/video/details/',
params: {
id: 'kJQP7kiw5Fk',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

//////////////////////////// /v2/video-details //////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/v2/video-details',
params: {
video_id: 'kJQP7kiw5Fk',
hl: 'en'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

//////////////////////////// video/comments /////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/video/comments/',
params: {
id: 'kJQP7kiw5Fk',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '<VITE_RAPIDAPI_KEY>',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

//////////////////////////// video/related-contents/ /////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/video/related-contents/',
params: {
id: 'kJQP7kiw5Fk',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

///////////////////////// video/streaming-data/ ////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/video/streaming-data/',
params: {id: 'VyHV0BRtdxo'},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

****\*\*****\*\*\*\*****\*\*****\*****\*\*****\*\*\*\*****\*\***** playlist **\*\***\*\*\*\***\*\***\*\*\***\*\***\*\*\*\***\*\***

///////////////////////////// playlist/details/ //////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/playlist/details/',
params: {
id: 'PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

//////////////////////////// playlist/videos/ ////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/playlist/videos/',
params: {
id: 'PLcirGkCPmbmFeQ1sm4wFciF03D_EroIfr',
hl: 'en',
gl: 'US'
},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

**\*\*\*\***\*\*\*\***\*\*\*\***\*\***\*\*\*\***\*\*\*\***\*\*\*\*** community-post **\*\***\*\*\*\***\*\***\*\*\***\*\***\*\*\*\***\*\***

///////////////////////////////////// community-post/details/ //////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/community-post/details/',
params: {
id: 'UgkxCWeKPiIOLsnh_5a0MPHWCmYgbhifgwIZ'
},
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}

/////////////////////////// community-post/comments //////////////////////////////

import axios from 'axios';

const options = {
method: 'GET',
url: 'https://youtube138.p.rapidapi.com/community-post/comments/',
headers: {
'x-rapidapi-key': '267bf901f7mshda658897c5f3b9ap1d7b28jsn1029658462f3',
'x-rapidapi-host': 'youtube138.p.rapidapi.com'
}
};

try {
const response = await axios.request(options);
console.log(response.data);
} catch (error) {
console.error(error);
}
