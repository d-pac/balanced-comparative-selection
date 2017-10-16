"use strict";

// `shuffle` creates a copy and uses a variation of the fisher-yates algorithm,
// see https://github.com/lodash/lodash/blob/master/shuffle.js
const {shuffle} = require("lodash");

function getNumberOfComparisons(compared, id){
  let counter =0;
  compared.forEach((_id)=>{
    if(_id === id){
      counter++;
    }
  });
  return counter;
}

/**
 * @typedef {Object} Item
 * @property {string} id - ID of the item
 * @property {number} ability - the ability of the item
 * @property {string[]} compared - An array containing id's of the items this item has been compared with.
 * N.B. this _must_ contain duplicate ID's if the item has been compared multiple times with another item.
 */

/**
 * @typedef {Object} Comparison
 * @property {string} a - the ID of the "A" item
 * @property {string} b - the ID of the "B" item
 */

/**
 * Simple comparative selection algorithm
 *
 * @example
 * const selected = cs.select([
 *   {
 *     id         : "3",
 *     compared    : [ "2", "4" ]
 *   },
 *   {
 *     id         : "2",
 *     compared    : [ "3" ]
 *   },
 *   {
 *     id         : "1",
 *     compared    : []
 *   },
 *   {
 *     id         : "4",
 *     compared    : [ "3", "5", "6" ]
 *   }
 * ]);
 * console.log( selected );
 * // outputs:
 * // { a:"1", b:"2" }
 * @param {object} payload - The payload object
 * @param {Item[]} payload.items - An array of {@link Item}s
 * @returns {Comparison} - the pair of items to compare
 */
function select(payload) {
  const items = payload.items;
  const sortedByCompared = shuffle(items).sort((a, b) => a.compared.length - b.compared.length);
  const sortedByAbility = items.sort((a, b) => a.ability - b.ability);

  /**
   * @private
   * @type {Item}
   */
  const selected = sortedByCompared.shift();

  const position = sortedByAbility.findIndex((item) => item.id === selected.id);
  const N2 = sortedByAbility.length/2;
  const range ={};
  if(position > N2){
    // we need to pick one in the bottom half
    range.bottom = 0;
    range.top = Math.floor(N2);
  }else{
    range.bottom = Math.ceil(N2);
    range.top = sortedByAbility.length;
  }

  const sliced = shuffle(sortedByAbility.slice(range.bottom, range.top))
    .sort((a,b)=>{
      const aN = getNumberOfComparisons(a.compared, selected.id);
      const bN = getNumberOfComparisons(b.compared, selected.id);
      return aN - bN;
    });

  /**
   * @private
   * @type {Item}
   */
  const opponent = sliced.shift();

  return {
    a: selected.id,
    b: opponent.id
  };
}

module.exports = {
  select: select
};
