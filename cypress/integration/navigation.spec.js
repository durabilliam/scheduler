describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
    cy.contains('Tuesday')
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");

  });




});