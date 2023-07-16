describe("Example Tests 01", () => {
  it("Tests something (01 - A)", () => {
    // @ts-ignore
   // console.log("global.hi ", global.hi);
    console.warn("some warning");
    console.warn("some warning");
    console.warn("some warning");
    console.warn("some warning");
    console.warn("some warning");
    expect(true).toBeTruthy();
  });
  it.skip("Tests something (01 - B)", () => {
    expect(true).toBeTruthy();
  });
  it("Tests something (01 - C)", () => {
    console.warn("some warning");
    console.warn("some warning");

    expect(false).toBeTruthy(); // fails on purpose
  });
});
