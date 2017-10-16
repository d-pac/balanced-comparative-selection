"use strict";

const _ = require('lodash');
const expect = require("must");
const {
  noneCompared,
  leastCompared
} = require("./fixtures");

const subject = require("../lib/selection");

noneCompared.forEach((r) => {
  r.compared = [];
});


describe("comparativeSelection", () => {
  describe("spec file", () => {
    it("should be found", () => expect(true).to.be.true());
  });
  describe("module", () => {
    it("should export an object", () => expect(subject).to.be.an.object());
  });
  describe("#select", () => {
    it("should be a function", () => expect(subject.select).to.be.a.function());

    it("should always select an item from the other half of list, when none have been compared", () => {
      const N2 = noneCompared.length / 2;
      const ids = noneCompared
        .sort((a, b) => a.ability - b.ability)
        .map((r) => r.id)
      ;
      _.times(2000, (i) => {
        const selected = subject.select({items: noneCompared});
        const aIndex = ids.findIndex((id) => id === selected.a);
        const bIndex = ids.findIndex((id) => id === selected.b);
        try {
          if (aIndex > N2) {
            expect(bIndex).to.be.lte(N2);
          } else {
            expect(bIndex).to.be.gte(N2);
          }
        } catch (err) {
          throw err;
        }
      });
    });
    it('should give preference to the items the first one is least compared with', () => {
      _.times(2000, (i) => {
        const selected = subject.select({items: leastCompared});
        try {
          expect(selected.a).to.be.eql("R10");
          expect(selected.b).to.be.eql("R11");
        } catch (err) {
          throw err;
        }
      });
    });
  });
});
