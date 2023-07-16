describe("Example Tests 03 (async tests)", () => {
  it("Tests something (03 - A)", async () => {
    expect(true).toBeTruthy();
  });
  it.only("Tests something (03 - B)", (done) => {
    expect(true).toBeTruthy();

    done();
  });
  it("Tests something (03 - C)", () => {
    expect(false).toBeTruthy(); // fails on purpose
  });
});
