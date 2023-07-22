import {renderPhotoArray} from './rendering.js';
import {newArrayOfObjects} from './data.js';
import './upload-image.js';
import {createLoader} from './load.js';

const loadData = createLoader();
loadData();

renderPhotoArray(newArrayOfObjects);


