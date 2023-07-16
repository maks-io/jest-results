it("Tests something (04 - A)", async () => {
  expect(true).toBeTruthy();
});
it("Tests something (04 - B)", (done) => {
  expect(true).toBeTruthy();

  done();
});
it("Tests something (04 - C)", () => {
  expect(false).toBeTruthy(); // fails on purpose
});
