describe("Example Tests 05 (nested describe blocks)", () => {
  describe("Nesting Level 2", () => {
    describe("Nesting Level 3", () => {
      describe("Nesting Level 4", () => {
        it("Tests something (05 - A)", () => {
          expect(true).toBeTruthy();
        });
        it("Tests something (05 - B)", () => {
          expect(true).toBeTruthy();
        });
        it("Tests something (05 - C)", () => {
          expect(false).toBeTruthy(); // fails on purpose
        });
      });
    });
  });
});
