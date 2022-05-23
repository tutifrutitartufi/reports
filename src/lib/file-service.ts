import * as fs from 'fs';
import * as path from 'path';

export const readSync = (fileName) => JSON.parse(fs.readFileSync(`${path.resolve()}/${fileName}`).toString());

export const writeSync = (fileName, data) => fs.writeFileSync(`${path.resolve()}/${fileName}`, JSON.stringify(data, null, 2))

export const appendSync = (fileName, data) => fs.appendFileSync(`${path.resolve()}/${fileName}`, JSON.stringify(data, null, 2))

export const existsSync = (fileName) => fs.existsSync(`${path.resolve()}/${fileName}`)

export const deleteSync = (fileName) => fs.unlinkSync(`${path.resolve()}/${fileName}`)