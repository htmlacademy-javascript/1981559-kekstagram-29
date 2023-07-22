import {renderPhotoArray} from './rendering.js';
import {newArrayOfObjects} from './data.js';
import './upload-image.js';
import {createLoader} from './load.js';

renderPhotoArray(newArrayOfObjects);
const loadData = createLoader(console.log, console.error);
loadData();
