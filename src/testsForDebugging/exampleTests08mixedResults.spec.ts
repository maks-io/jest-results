describe("Example Tests 08 (mixed results)", () => {
  it("Tests something and succeeds (08 - A)", () => {
    expect(true).toBeTruthy();
  });
  it("Tests something and fails (08 - B)", () => {
    expect(true).toBeFalsy();
  });
  it.skip("Tests something but is skipped (08 - C)", () => {
    expect(true).toBeFalsy();
  });
  it.todo("Tests something but is todo (08 - D)");
});
