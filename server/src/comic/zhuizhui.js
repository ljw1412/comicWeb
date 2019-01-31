/* 追追漫画 */
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')
const URL = require('url')
const refererFetch = require('../utils/refererFetch')
const FileUtil = require('../utils/fileUtil')
const ObjectUtil = require('../utils/objectUtil')

const headers = {
  'User-Agent':
    'Dalvik/2.1.0 (Linux; U; Android 8.0.0; KNT-AL10 Build/HUAWEIKNT-AL10)'
}
