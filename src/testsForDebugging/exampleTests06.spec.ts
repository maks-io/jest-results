describe("Example Tests 06 (with logging messages included)", () => {
  it("Tests something (06 - A)", () => {
    console.log("Some log() in 06 - A")
    expect(true).toBeTruthy();
  });
  it("Tests something (06 - B)", () => {
    console.info("Some info() in 06 - B")
    expect(true).toBeTruthy();
  });
  it("Tests something (06 - C)", () => {
    console.warn("Some warn() in 06 - C")
    expect(false).toBeTruthy(); // fails on purpose
  });
});
