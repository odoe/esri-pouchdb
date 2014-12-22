/*global define, alert */
/*jshint browser:true, laxcomma:true, newcap:false*/
define([
  'dojo/Deferred',
  'dojo/_base/declare',
  'dojo/_base/array',
  'dojo/store/util/QueryResults',
  'pouchdb/pouchdb'
], function (
  Deferred,
  declare, arrayUtil,
  QueryResults,
  PouchDB
) {
  'use strict';

  return declare(null, {

    database: null,
    name: null,

    _db: null,
    /**
     * @example
     *     var pouchDBStore = new PouchStore('dbname', 'test', {
     *        version: 3,
     *        keyPath: 'attributes.AIN',
     *        indexes: ['attributes.AIN'],
     *        indexnames: ['ain'],
     *        indexOptions: { unique: true }
     *     });
     *
     * @constructor
     * @param {string} database - database name.
     * @param {string} name - objectstore name.
     */
    constructor: function (database, name) {
      this.database = database;
      this.name = name;
      this._db = new PouchDB(this.database);
    },

    // public methods
    /**
     * @example
     *   pouchStore.add(feature).then(function(result) {
     *     console.debug('added my feature to indexedDB', result);
     *   });
     *
     * @param {object} object- Item to add to database.
     */
    add: function (object) {
      return this._db.put({
        _id: new Date().toISOString(),
        item: object
      });
    },

    // public methods
    /**
     * @example
     *   pouchStore.delete(doc).then(function(result) {
     *     console.debug('added my feature to indexedDB', result);
     *   });
     *
     * @param {doc} object - PouchDB document.
     */
    delete: function(doc) {
      return this._db.remove(doc);
    },

    /**
     * @example
     *   pouchStore.getAll().then(function(results) {
     *     console.debug('all my stored results', results);
     *   });
     *
     */
    getAll: function () {
      var deferred = new Deferred();
      this._db.allDocs({ include_docs: true }, function (err, response) {
        if (!err) {
          console.warn('PouchDBStore#getAll - response: ', response);
          deferred.resolve(response.rows);
        } else {
          console.warn('PouchDBStore#getAll - error: ', err);
          deferred.reject(err);
        }
      });
      return QueryResults(deferred.promise);
    }

  });

});
