'use strict';
const vscode = require('vscode');
const md5 = require('md5');
const {head} = require('./utils');

function metricsCounterPath() {
  return '/clientapi/metrics/counters';
}

function languagesPath() {
  return '/clientapi/languages';
}

function accountPath() {
  return '/api/account/user';
}

function statusPath(path) {
  return [
    '/clientapi/status',
    `filename=${encodeURI(normalizeDriveLetter(path))}`,
  ].join('?');
}

function signaturePath() {
  return '/clientapi/editor/signatures';
}

function errorRescuePath() {
  return '/clientapi/editor/autocorrect';
}

function errorRescueModelInfoPath() {
  return '/api/editor/autocorrect/model-info';
}

function errorRescueMetricsPath() {
  return '/clientapi/editor/autocorrect/metrics';
}

function errorRescueFeedbackPath() {
  return '/clientapi/editor/autocorrect/feedback';
}

function onSaveValidationPath() {
  return '/clientapi/editor/autocorrect/validation/on-save';
}

function searchPath(query, offset = 0, limit = 10) {
  return [
    '/api/editor/search',
    [
      `q=${encodeURI(query)}`,
      `offset=${offset}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function projectDirPath(path) {
  return [
    '/clientapi/projectdir',
    `filename=${encodeURI(normalizeDriveLetter(path))}`,
  ].join('?');
}

function shouldNotifyPath(path) {
  return [
    '/clientapi/permissions/notify',
    `filename=${encodeURI(normalizeDriveLetter(path))}`,
  ].join('?');
}

function completionsPath() {
  return '/clientapi/editor/completions';
}

function reportPath(data) {
  const symbol = head(data.symbol);

  return valueReportPath(symbol.id);
}

function valueReportPath(id) {
  return `/api/editor/value/${id}`;
}

function symbolReportPath(id) {
  return `/api/editor/symbol/${id}`;
}

function membersPath(id, page = 0, limit = 999) {
  return [
    `/api/editor/value/${id}/members`,
    [
      `offset=${page}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function usagesPath(id, page = 0, limit = 999) {
  return [
    `/api/editor/value/${id}/usages`,
    [
      `offset=${page}`,
      `limit=${limit}`,
    ].join('&'),
  ].join('?');
}

function usagePath(id) {
  return `/api/editor/usages/${id}`;
}

function examplePath(id) {
  return `/api/python/curation/${id}`;
}

function openDocumentationInWebURL(id) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/docs/${escapeId(id)}`;
  return url;
}

function openSignatureInWebURL(id) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/docs/${escapeId(id)}%23signature`;
  return url;
}

function openExampleInWebURL(id) {
  const url = `http://localhost:46624/clientapi/desktoplogin?d=/examples/python/${escapeId(id)}`;
  return url;
}

function hoverPath(document, position) {
  position = new vscode.Position(position.line, position.character);
  const state = md5(document.getText());
  const filename = document.fileName;
  const buffer = cleanPath(filename);
  const pos = document.offsetAt(position);
  return [
    `/api/buffer/vscode/${buffer}/${state}/hover`,
    `cursor_runes=${pos}`,
  ].join('?');
}

function escapeId(id) {
  return encodeURI(String(id)).replace(/;/g, '%3B');
}

function cleanPath(p) {
  return encodeURI(normalizeDriveLetter(p))
  .replace(/^([a-zA-Z]):/, (m, d) => `/windows/${d}`)
  .replace(/\/|\\|%5C/g, ':');
}

function serializeRangeForPath(range) {
  return `${range.start.row}:${range.start.column}/${range.end.row}:${range.end.column}`;
}

function normalizeDriveLetter(str) {
  return str.replace(/^[a-z]:/, m => m.toUpperCase());
}

module.exports = {
  accountPath,
  errorRescueFeedbackPath,
  errorRescueMetricsPath,
  errorRescueModelInfoPath,
  errorRescuePath,
  completionsPath,
  examplePath,
  hoverPath,
  languagesPath,
  membersPath,
  metricsCounterPath,
  normalizeDriveLetter,
  onSaveValidationPath,
  openDocumentationInWebURL,
  openExampleInWebURL,
  openSignatureInWebURL,
  projectDirPath,
  reportPath,
  searchPath,
  serializeRangeForPath,
  shouldNotifyPath,
  signaturePath,
  statusPath,
  symbolReportPath,
  usagePath,
  usagesPath,
  valueReportPath,
};
